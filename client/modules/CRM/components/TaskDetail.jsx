import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clientConfig from '../../../config';
import { getTaskById, updateCallbackRequest } from '../CRMActions';
import { getCustomerDetailByPhoneNumber } from '../../Customer/CustomerActions';
import moment from 'moment';

class TaskDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getTaskById(this.props.params.id);
    }

    viewCustomerProfile(phoneNumber) {
        this.props.getCustomerDetailByPhoneNumber(phoneNumber);
        browserHistory.push('/customer');
    }

    render() {
        if (this.props.taskDetail) {
            return <section>
                <h1>Customer Detail</h1>
                <p>Email: {this.props.taskDetail.customerId}</p>
                <p>Name: {this.props.taskDetail.profile.firstName + ' ' + this.props.taskDetail.profile.lastName}</p>
                <p>Phone: {this.props.taskDetail.phoneNumber}</p>
                <button onClick={() => this.viewCustomerProfile(this.props.taskDetail.phoneNumber)}>View Profile/Create Order</button>
                <br />
                <h1>Task Detail</h1>
                <p>Status: {this.props.taskDetail.status}</p>
                <p>Primary Context: {this.props.taskDetail.primaryCallbackContext}</p>
                <p>Assignee: {this.props.taskDetail.assignee ? this.props.taskDetail.assignee : 'Unassigned'}</p>
                <p>Promised Resolution Time: {this.props.taskDetail.slaEndTime ? moment(this.props.taskDetail.slaEndTime).format('lll') : null}</p>
                <p>Created On: {this.props.taskDetail.createdTime ? moment(this.props.taskDetail.createdTime).format('lll') : null}</p>
                <p>Updated On: {this.props.taskDetail.updatedTime ? moment(this.props.taskDetail.updatedTime).format('lll') : 'Not Updated'}</p>
                <p>Task Comment: {this.props.taskDetail.taskComment ? this.props.taskDetail.taskComment : 'Not Provided'}</p>
                <br />
                <h1>Call Backs</h1>
                {this.props.taskDetail.callbacks.map((callback, i) => {
                    return <div key={i}>
                        <hr />
                        <br />
                        <p>Label: {callback.context.actionLabel}</p>
                        <p>Status: {callback.status}</p>
                        <p>Assignee: {callback.assignee ? callback.assignee : 'Unassigned'}</p>
                        <p>Created On: {callback.createdTimeStamp ? moment(callback.createdTimeStamp).format('lll') : null}</p>
                        <p>Created By: {callback.creater}</p>
                        <p>Inbound: {callback.inbound ? 'Yes' : 'No'}</p>
                        <p>Promised Resolution Time: {callback.slaEndTime ? moment(callback.slaEndTime).format('lll') : null}</p>
                        <p>Updated On: {callback.updatedTimeStamp ? moment(callback.updatedTimeStamp).format('lll') : 'Not Updated'}</p>
                        <p>Closed On: {callback.closedDate ? moment(callback.closedDate).format('lll') : 'Open'}</p>
                        <ul>Comments: {callback.comment.length > 0 ? callback.comment.map((comment, i) => {
                            return <li key={i}>{comment}</li>
                        }) : 'Not Provided'}</ul>
                        <ul>Task Description: {callback.taskData ? Object.keys(callback.taskData).map((key, i) => {
                            return <li key={i}>{key}: callback.taskData[key]</li>
                        }) : null}
                        </ul>
                    </div>
                })}
            </section>
        } else {
            return <section>
                <h1>Fetching Details...</h1>
            </section>
        }
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getTaskById,
        updateCallbackRequest,
        getCustomerDetailByPhoneNumber
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        taskDetail: state.taskDetail,
        dispositions: state.dispositions
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(TaskDetail);

