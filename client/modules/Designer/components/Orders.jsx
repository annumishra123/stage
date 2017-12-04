import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { getCancelledOrders, getPendingOrders, getCompletedOrders } from '../DesignerActions';
import clientConfig from '../../../config';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


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
            this.props.getCompletedOrders(this.props.owner, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
            this.props.getPendingOrders(this.props.owner);
            this.props.getCancelledOrders(this.props.owner, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.owner !== nextProps.owner) {
            this.props.getCompletedOrders(nextProps.owner, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
            this.props.getPendingOrders(this.props.owner);
            this.props.getCancelledOrders(this.props.owner, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
        }
    }

    handleChangeStartDate(date) {
        if (date.unix() <= moment().unix()) {
            this.setState({
                startDate: date.startOf('day')
            });
        }
    }

    handleChangeEndDate(date) {
        if (date.unix() <= moment().endOf('day').unix()) {
            this.setState({
                endDate: date.endOf('day')
            });
        }
    }

    refreshDesignerOrders() {
        this.props.getCompletedOrders(this.props.owner, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
        this.props.getPendingOrders(this.props.owner);
        this.props.getCancelledOrders(this.props.owner, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
    }

    renderDateFilter() {
        return <div>
                 <div>
                   <h4>Start Date</h4>
                   <DatePicker selected={ this.state.startDate } onChange={ this.handleChangeStartDate.bind(this) } />
                 </div>
                 <div>
                   <h4>End Date</h4>
                   <DatePicker selected={ this.state.endDate } onChange={ this.handleChangeEndDate.bind(this) } />
                 </div>
                 <button onClick={ this.refreshDesignerOrders.bind(this) }>Refresh</button>
               </div>;
    }

    renderCompletedOrders() {
        if (this.props.completedDesignerOrders) {
            return <div>
                     <ReactTable filterable data={ this.props.completedDesignerOrders } columns={ clientConfig.designerOrderColumns } defaultPageSize={ 10 } className="-striped -highlight" />
                   </div>;
        }
    }

    renderPendingOrders() {
        if (this.props.pendingDesignerOrders) {
            return <div>
                     <ReactTable filterable data={ this.props.pendingDesignerOrders } columns={ clientConfig.designerOrderColumns } defaultPageSize={ 10 } className="-striped -highlight" />
                   </div>;
        }
    }

    renderCancelledOrders() {
        if (this.props.cancelledDesignerOrders) {
            return <div>
                     <ReactTable filterable data={ this.props.cancelledDesignerOrders } columns={ clientConfig.designerOrderColumns } defaultPageSize={ 10 } className="-striped -highlight" />
                   </div>;
        }
    }

    render() {
        return <section>
                 <h1>Orders</h1>
                 <br/>
                 { this.renderDateFilter() }
                 <br/>
                 <Tabs>
                   <TabList>
                     <Tab>Completed</Tab>
                     <Tab>Pending</Tab>
                     <Tab>Cancelled</Tab>
                   </TabList>
                   <TabPanel>
                     { this.renderCompletedOrders() }
                   </TabPanel>
                   <TabPanel>
                     { this.renderPendingOrders() }
                   </TabPanel>
                   <TabPanel>
                     { this.renderCancelledOrders() }
                   </TabPanel>
                 </Tabs>
               </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getCompletedOrders,
        getPendingOrders,
        getCancelledOrders
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        completedDesignerOrders: state.completedDesignerOrders,
        pendingDesignerOrders: state.pendingDesignerOrders,
        cancelledDesignerOrders: state.cancelledDesignerOrders,
        role: state.auth.role,
        owner: state.auth.owner,
        user: state.auth.email
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(Orders);
