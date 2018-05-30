import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clientConfig from '../../../config';
import { getTaskById, updateCallbackRequest, getAllDispositions } from '../CRMActions';
import { getCustomerDetailByPhoneNumber } from '../../Customer/CustomerActions';
import { getOrdersByPhoneNumber as getRentOrdersByPhoneNumber } from '../../Rent/RentActions';
import { getOrdersByPhoneNumber as getShopOrdersByPhoneNumber } from '../../Shop/ShopActions';
import moment from 'moment';
import ReactModal from 'react-modal';

// Import Style
import styles from './crm.css';

class TaskDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewCallbackModal: false,
            callbackObject: {},
        };
    }

    componentDidMount() {
        this.props.getTaskById(this.props.params.id);
    }

    viewCustomerProfile(phoneNumber) {
        this.props.getCustomerDetailByPhoneNumber(phoneNumber);
        browserHistory.push('/customer');
    }

    viewPreviousRentOrders(phoneNumber) {
        this.props.getRentOrdersByPhoneNumber(phoneNumber);
        browserHistory.push('/rent');
    }

    viewPreviousShopOrders(phoneNumber) {
        this.props.getShopOrdersByPhoneNumber(phoneNumber);
        browserHistory.push('/shop');
    }

    changeComment(e) {
        let callbackObject = this.state.callbackObject;
        callbackObject.comment = e.target.value;
        this.setState({
            callbackObject,
        });
    }

    changeDisposition(e) {
        let callbackObject = this.state.callbackObject;
        callbackObject.reasonCode = e.target.value;
        this.setState({
            callbackObject,
        });
    }

    hideCallbackModal() {
        this.setState({
            callbackObject: {},
            viewCallbackModal: false,
        });
    }

    showCallbackModal(id) {
        this.props.getAllDispositions();
        let callbackObject = this.state.callbackObject;
        callbackObject.agentId = this.props.user;
        callbackObject.callbackRequestId = id;
        callbackObject.taskId = this.props.taskDetail.id;
        this.setState({
            callbackObject,
            viewCallbackModal: true,
        });
    }

    updateCallbackRequest() {
        if (this.state.callbackObject.agentId && this.state.callbackObject.callbackRequestId && this.state.callbackObject.taskId && this.state.callbackObject.reasonCode && this.state.callbackObject.comment) {
            this.props.updateCallbackRequest(this.state.callbackObject);
            this.hideCallbackModal();
        } else {
            alert('Please fill in all the details');
        }
    }

    renderPreviousTasks() {
        if (this.props.taskDetail.previousComments.length > 0) {
            return (<div>
                <h1>Task History</h1>
                <ul className={styles.previousUpdate}>{this.props.taskDetail.previousComments.length > 0 ? this.props.taskDetail.previousComments.map((comment, i) => {
                    return <li key={i}>Label: {comment.actionLabel}<br />Commenter: {comment.commenter}<br />Created On: {comment.createdTime ? moment(comment.createdTime).format('lll') : null}<br />Reason Code: {comment.reasonCode}<br />Comment: {comment.comment}</li>;
                }) : 'Not Provided'}</ul>
            </div>);
        }
    }

    render() {
        if (this.props.taskDetail) {
            return (<section className={styles.taskDetail}>
                <h1>Customer Detail</h1>
                <div className={styles.customer}>
                    <p>Email: {this.props.taskDetail.customerId ? this.props.taskDetail.customerId : 'Not Provided'}</p>
                    <p>Name: {this.props.taskDetail.profile ? this.props.taskDetail.profile.firstName + ' ' + this.props.taskDetail.profile.lastName : 'Not Provided'}</p>
                    <p>Phone: {this.props.taskDetail.phoneNumber}</p>
                </div>
                <div className={styles.taskButtons}>
                    <button onClick={() => this.viewCustomerProfile(this.props.taskDetail.phoneNumber)}>View Profile/Create Order</button>
                    <button onClick={() => this.viewPreviousRentOrders(this.props.taskDetail.phoneNumber)}>Rent History</button>
                    <button onClick={() => this.viewPreviousShopOrders(this.props.taskDetail.phoneNumber)}>Shop History</button>
                </div>
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
                    return (<div key={i}>
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
                        <br />
                        <h2>Description</h2>
                        {callback.taskData ? <ul className={styles.previousUpdate}>{callback.taskData.data ? Object.keys(callback.taskData.data).length > 0 ? Object.keys(callback.taskData.data).map((key, i) => {
                            return <li key={i}>{key}: {callback.taskData.data[key]}</li>
                        }) : <li>Unavailable</li> : <li>Unavailable</li>}
                        </ul> : <li>Unavailable</li>}

                        <br />
                        <button onClick={() => this.showCallbackModal(callback.id)}>Update</button>
                        <br />
                    </div>);
                })}
                {this.renderPreviousTasks()}
                <ReactModal className={styles.taskPopup} isOpen={this.state.viewCallbackModal} onRequestClose={() => this.hideCallbackModal()} contentLabel="Change Delivery Status">
                    <span onClick={() => this.hideCallbackModal()}>×</span>
                    <br />
                    <div>
                        <label>Reason Code </label>
                        {this.props.dispositions ? <select onChange={(e) => this.changeDisposition(e)}>
                            <option value=""> -- Select Option -- </option>
                            {this.props.dispositions.map((disposition, i) => {
                                return <option key={i} value={disposition.label}>{disposition.label}</option>;
                            })}
                        </select> : <span>Loading...</span>}
                    </div>
                    <label>Add Comment </label>
                    <input onChange={(e) => this.changeComment(e)} />
                    <button onClick={() => this.updateCallbackRequest()}>Update</button>
                </ReactModal>
            </section>);
        } else {
            return (<section>
                <h1>Fetching Details...</h1>
            </section>);
        }
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getTaskById,
        updateCallbackRequest,
        getCustomerDetailByPhoneNumber,
        getAllDispositions,
        getShopOrdersByPhoneNumber,
        getRentOrdersByPhoneNumber,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        taskDetail: state.taskDetail,
        dispositions: state.dispositions,
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(TaskDetail);

