import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { getCancelledOrders, getPendingOrders, getCompletedOrders, getOwnerShare } from '../DesignerActions';
import clientConfig from '../../../config';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// Import Style
import styles from './designer.css';


class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment().startOf('month'),
            endDate: moment().endOf('day')
        }
    }

    componentDidMount() {
        if (this.props.owner) {
            this.props.getOwnerShare(this.props.owner);
            this.props.getCompletedOrders(this.props.owner, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
            this.props.getPendingOrders(this.props.owner);
            this.props.getCancelledOrders(this.props.owner, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.owner !== nextProps.owner) {
            this.props.getCompletedOrders(nextProps.owner, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
            this.props.getPendingOrders(nextProps.owner);
            this.props.getCancelledOrders(nextProps.owner, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
        }
    }

    handleChangeStartDate(date) {
        this.setState({
            startDate: date.startOf('day')
        });
    }

    handleChangeEndDate(date) {
        this.setState({
            endDate: date.endOf('day')
        });
    }

    refreshDesignerOrders() {
        this.props.getCompletedOrders(this.props.owner, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
        this.props.getPendingOrders(this.props.owner);
        this.props.getCancelledOrders(this.props.owner, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
    }

    renderDateFilter() {
        return <div className={styles.orderStartEnd}>
            <div className={styles.width50}>
                <h4>Start Date</h4>
                <DatePicker selected={this.state.startDate} onChange={this.handleChangeStartDate.bind(this)} />
            </div>
            {/* <div className={styles.width50}>
                <h4>End Date</h4>
                <DatePicker selected={this.state.endDate} onChange={this.handleChangeEndDate.bind(this)} />
            </div> */}
            <button onClick={this.refreshDesignerOrders.bind(this)}><img src="https://res.cloudinary.com/stage3/image/upload/f_auto,q_auto:low/icon-refresh.png" alt="refresh" />Refresh</button>
        </div>;
    }

    renderCompletedOrders() {
        if (this.props.completedDesignerOrders) {
            if (this.props.designerShare) {
                let completedDesignerOrders = this.props.completedDesignerOrders;
                completedDesignerOrders.map((order) => {
                    order.share = this.props.designerShare;
                });
                return <div>
                    <ReactTable filterable data={completedDesignerOrders} columns={clientConfig.designerOrderColumns} defaultPageSize={10} className="-striped -highlight" />
                </div>;
            }
        }
    }

    renderPendingOrders() {
        if (this.props.pendingDesignerOrders) {
            if (this.props.designerShare) {
                let pendingDesignerOrders = this.props.pendingDesignerOrders;
                pendingDesignerOrders.map((order) => {
                    order.share = this.props.designerShare;
                });
                return <div>
                    <ReactTable filterable data={pendingDesignerOrders} columns={clientConfig.designerOrderColumns} defaultPageSize={10} className="-striped -highlight" />
                </div>;
            }
        }
    }

    renderCancelledOrders() {
        if (this.props.cancelledDesignerOrders) {
            if (this.props.designerShare) {
                let cancelledDesignerOrders = this.props.cancelledDesignerOrders;
                cancelledDesignerOrders.map((order) => {
                    order.share = this.props.designerShare;
                });
                return <div>
                    <ReactTable filterable data={cancelledDesignerOrders} columns={clientConfig.designerOrderColumns} defaultPageSize={10} className="-striped -highlight" />
                </div>;
            }
        }
    }

    renderOrderTotal() {
        if (this.props.completedDesignerOrders) {
            let total = 0;
            let totalGST = 0;
            this.props.completedDesignerOrders.map((order) => {
                if (order.rentPaid > 1050) {
                    total += ((order.rentPaid * (this.props.designerShare / 100)) / 1.12);
                    totalGST += (((order.rentPaid * (this.props.designerShare / 100)) / 1.12) > 1050 ? ((order.rentPaid * (this.props.designerShare / 100)) / 1.12) * 0.12 : ((order.rentPaid * (this.props.designerShare / 100)) / 1.12) * 0.05);
                } else {
                    total += ((order.rentPaid * (this.props.designerShare / 100)) / 1.05);
                    totalGST += (((order.rentPaid * (this.props.designerShare / 100)) / 1.05) > 1050 ? ((order.rentPaid * (this.props.designerShare / 100)) / 1.05) * 0.12 : ((order.rentPaid * (this.props.designerShare / 100)) / 1.05) * 0.05);
                }
            });
            return <h3>COMPLETED - [ SHARE: <span style={{ color: "green" }}>₹{total.toFixed(2)}</span> & GST: <span style={{ color: "green" }}>₹{totalGST.toFixed(2)}</span> ]</h3>;
        }
    }

    renderPendingOrderTotal() {
        if (this.props.pendingDesignerOrders) {
            let total = 0;
            let totalGST = 0;
            this.props.pendingDesignerOrders.map((order) => {
                if (order.rentPaid > 1050) {
                    total += ((order.rentPaid * (this.props.designerShare / 100)) / 1.12);
                    totalGST += (((order.rentPaid * (this.props.designerShare / 100)) / 1.12) > 1050 ? ((order.rentPaid * (this.props.designerShare / 100)) / 1.12) * 0.12 : ((order.rentPaid * (this.props.designerShare / 100)) / 1.12) * 0.05);
                } else {
                    total += ((order.rentPaid * (this.props.designerShare / 100)) / 1.05);
                    totalGST += (((order.rentPaid * (this.props.designerShare / 100)) / 1.05) > 1050 ? ((order.rentPaid * (this.props.designerShare / 100)) / 1.05) * 0.12 : ((order.rentPaid * (this.props.designerShare / 100)) / 1.05) * 0.05);
                }
            });
            return <h3>PENDING - [ SHARE: <span style={{ color: "green" }}>₹{total.toFixed(2)}</span> & GST: <span style={{ color: "green" }}>₹{totalGST.toFixed(2)}</span> ]</h3>;
        }
    }

    render() {
        return <section className={styles.designerOrder}>
            <h1>Orders</h1>
            <br />
            {this.renderOrderTotal()}
            <br />
            {this.renderPendingOrderTotal()}
            <br />
            {this.renderDateFilter()}
            <br />
            <Tabs>
                <TabList>
                    <Tab>Completed</Tab>
                    <Tab>Pending</Tab>
                    <Tab>Cancelled</Tab>
                </TabList>
                <TabPanel>
                    {this.renderCompletedOrders()}
                </TabPanel>
                <TabPanel>
                    {this.renderPendingOrders()}
                </TabPanel>
                <TabPanel>
                    {this.renderCancelledOrders()}
                </TabPanel>
            </Tabs>
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getCompletedOrders,
        getPendingOrders,
        getCancelledOrders,
        getOwnerShare
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        completedDesignerOrders: state.completedDesignerOrders,
        pendingDesignerOrders: state.pendingDesignerOrders,
        cancelledDesignerOrders: state.cancelledDesignerOrders,
        role: state.auth.role,
        owner: state.auth.owner,
        user: state.auth.email,
        designerShare: state.designerShare ? state.designerShare.revenueshare : null
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(Orders);
