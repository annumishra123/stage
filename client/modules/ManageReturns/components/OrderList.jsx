import React from "react";
import { browserHistory } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactTable from "react-table";
import clientConfig from "../../../config";
import {
  fetchAllReturnOrderLine,
  approvalUpdateReturn,
} from "../ManageReturnsAction";

// Import Style
import styles from "./orderLists.css";

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allOrderLineList: [],
      allReturnOrderLineList: [],
      tabIndex: 0,
      selectedOrderLineIds: [],
      selectedRefundOrderLineIds: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllReturnOrderLine();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.allOrderLine) {
      this.setState({
        allOrderLineList: nextProps.allOrderLine,
      });
    }
    if (nextProps.allReturnOrderLine) {
      this.setState({
        allReturnOrderLineList: nextProps.allReturnOrderLine,
      });
    }
  }

  handleChange(rowId, tabName, e) {
    const {
      allOrderLineList,
      selectedOrderLineIds,
      selectedRefundOrderLineIds,
    } = this.state,
      { checked } = e.target;
    let tempIdsList = [],
      listData = [];
    switch (tabName) {
      case "payment":
        tempIdsList = selectedOrderLineIds;
        listData = allOrderLineList;
        break;
      case "refund":
        tempIdsList = selectedRefundOrderLineIds;
        listData = allReturnOrderLineList;
        break;
    }
    if (rowId) {
      let selectedRow = listData.find((item) => item.id == rowId);
      if (selectedRow && checked) {
        tempIdsList.push(selectedRow.orderlineProcess.orderlineId);
      } else {
        tempIdsList = tempIdsList.filter((listItem) => listItem != rowId);
      }

      if (tabName == "payment") {
        this.setState({ selectedOrderLineIds: tempIdsList });
      } else {
        this.setState({ selectedRefundOrderLineIds: tempIdsList });
      }
    }
    tempIdsList = [];
    listData = [];
  }

  handleClick(actionName, tabName) {
    const { selectedOrderLineIds, selectedRefundOrderLineIds } = this.state;
    let requestData = {
      approver: this.props.user,
    };
    switch (tabName) {
      case "payment":
        if (selectedOrderLineIds.length != 0) {
          requestData.orderlineIds = selectedOrderLineIds;
          this.props.approvalUpdateOrderLine({ requestData, actionName });
        }
        break;
      case "refund":
        if (selectedRefundOrderLineIds.length != 0) {
          requestData.orderlineIds = selectedRefundOrderLineIds;
          this.props.approvalUpdateReturn({ requestData, actionName });
        }
        break;
    }
  }

  renderPaymentListSection(tabName) {
    const { role } = this.props,
      { allReturnOrderLineList } = this.state;
    if (role == "admin" || role == "superuser") {
      if (!clientConfig.orderlineColumns.find((o) => o.id == "select")) {
        clientConfig.orderlineColumns.unshift({
          Header: "",
          id: "select",
          accessor: "id",
          filterable: false,
          sortable: false,
          Cell: ({ value }) => (
            <div style={{ textAlign: "center" }}>
              <input
                type="checkbox"
                onClick={this.handleChange.bind(this, value, tabName)}
              />
            </div>
          ),
        });
      }
    }
    return (
      <ReactTable
        data={allReturnOrderLineList}
        columns={clientConfig.orderlineColumns}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    );
  }

  render() {
    const { allOrderLineList, allReturnOrderLineList } = this.state;
    let isOrderLineEnable = allOrderLineList.length != 0,
      isRefundOrderLineEnable = allReturnOrderLineList != 0;
    return (
      <section>
        <button
          className={styles.backBtn}
          onClick={() => browserHistory.goBack()}
        >
          <i
            className="login__backicon__a-Exb fa fa-chevron-left"
            aria-hidden="true"
          />{" "}
          Back
        </button>
        <div className={styles.orderBodySection}>
          <h1>Manage Returns</h1><br /><br /><br />
          <button
            className={styles.listBtn}
            style={{
              marginRight: "1em",
              cursor: !isOrderLineEnable && "not-allowed",
            }}
            disabled={!isOrderLineEnable}
            onClick={this.handleClick.bind(this, "approve", "payment")}
          >
            Approve
          </button>
          <button
            className={styles.listBtn}
            style={{ cursor: !isOrderLineEnable && "not-allowed" }}
            disabled={!isOrderLineEnable}
            onClick={this.handleClick.bind(this, "disapprove", "payment")}
          >
            Disapprove
          </button>
          {this.renderPaymentListSection("payment")}
        </div>
      </section>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchAllReturnOrderLine,
      approvalUpdateReturn,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    role: state.auth.role,
    user: state.auth.email,
    allReturnOrderLine: state.allReturnOrderLineForApproval
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(OrderList);
