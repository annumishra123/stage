import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clientConfig from '../../../config';
import { getAllContexts, getAllDispositions, createInboundTask } from '../CRMActions';
import Select from 'react-select';
import { getCustomerDetailByPhoneNumber, getCustomerComments, createComment } from '../../Customer/CustomerActions';
import CustomerForm from '../../Customer/components/CustomerForm';
import moment from 'moment';

// Import Style
import styles from './crm.css';

class Inbound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskObject: {
                "actionLabel": "",
                "comment": "",
                "creater": "",
                "name": "",
                "phoneNumber": "",
                "reasonCode": ""
            },
            comment: ""
        }
    }

    componentDidMount() {
        this.props.getAllContexts();
        this.props.getAllDispositions();
        if (this.props.location.query.phoneNumber) {
            this.props.getCustomerDetailByPhoneNumber(this.props.location.query.phoneNumber);
            this.setState({
                taskObject: {
                    "actionLabel": "",
                    "comment": "",
                    "creater": "",
                    "name": "",
                    "phoneNumber": this.props.location.query.phoneNumber,
                    "reasonCode": ""
                }
            })
        }
    }

    componentWillReceiveProps(props) {
        if (this.props.customerDetail !== props.customerDetail) {
            this.props.getCustomerComments(props.customerDetail.email);
        }
    }

    saveComment() {
        this.props.createComment(this.props.customerDetail.email, this.state.comment);
    }

    handleChangeComment(e) {
        this.setState({
            comment: e.target.value
        });
    }

    renderComments() {
        if (this.props.customerComments && this.props.customerComments.length > 0) {
            return <div><table>
                <tr>
                    <th>Comment</th>
                    <th>Date</th>
                </tr>
                {this.props.customerComments.map((comment) => {
                    return <tr>
                        <td>
                            {comment.comment}
                        </td>
                        <td>
                            {moment.unix(comment.createdtimestamp).format('lll')}
                        </td>
                    </tr>
                })}
            </table><br />
                <div>
                    <input type="text" onChange={this.handleChangeComment.bind(this)} />
                    <button onClick={this.saveComment.bind(this)}>Save Comment</button>
                </div>
                <br /></div>
        }
    }

    changeLabel(e) {
        let taskObject = this.state.taskObject;
        taskObject.actionLabel = e.target.value;
        this.setState({
            taskObject: taskObject
        });
    }

    changeComment(e) {
        let taskObject = this.state.taskObject;
        taskObject.comment = e.target.value;
        this.setState({
            taskObject: taskObject
        });
    }

    changeName(e) {
        let taskObject = this.state.taskObject;
        taskObject.name = e.target.value;
        this.setState({
            taskObject: taskObject
        });
    }

    changePhoneNumber(e) {
        let taskObject = this.state.taskObject;
        taskObject.phoneNumber = e.target.value;
        this.setState({
            taskObject: taskObject
        });
    }

    changeDisposition(e) {
        let taskObject = this.state.taskObject;
        taskObject.reasonCode = e.value;
        this.setState({
            taskObject: taskObject
        });
    }

    createInboundTask() {
        if (this.state.taskObject.actionLabel && this.state.taskObject.comment && this.state.taskObject.name && this.state.taskObject.phoneNumber && this.state.taskObject.reasonCode && this.props.user) {
            let taskObject = this.state.taskObject;
            taskObject.creater = this.props.user;
            this.props.createInboundTask(taskObject);
        } else {
            alert('Please fill in all the details');
        }
    }

    renderCustomerInformation() {
        if (this.props.customerDetail) {
            return <div className={styles.inboundCustomerDetails}>
                <h1>Customer Details</h1>
                <p>Email: {this.props.customerDetail.email}</p>
                <p>Name: {this.props.customerDetail.firstName + ' ' + this.props.customerDetail.lastName}</p>
                <p>Source: {this.props.customerDetail.dataSource}</p>
            </div>;
        }
    }

    render() {
        return <section className={styles.inboundCall}>
            {this.renderCustomerInformation()}
            <h1>Inbound Call</h1>
            {this.renderComments()}
            <div>
                <label>Label </label>
                {this.props.contexts ? <select onChange={(e) => this.changeLabel(e)}>
                    <option value=""> -- Select Label -- </option>
                    {this.props.contexts.map((context, i) => {
                        return <option key={i} value={context.actionLabel}>{context.actionLabel}</option>
                    })}
                </select> : <span>Loading...</span>}
            </div>
            <br />
            <div>
                <label>Comment </label>
                <input type="text" onChange={(e) => this.changeComment(e)} />
            </div>
            <br />
            <div>
                <label>Name </label>
                <input type="text" onChange={(e) => this.changeName(e)} />
            </div>
            <br />
            <div>
                <label>Phone Number </label>
                <input type="number" value={this.state.taskObject.phoneNumber} onChange={(e) => this.changePhoneNumber(e)} />
            </div>
            <br />
            <div>
                <label>Reason Code </label>
                <div className={styles.crmReason}>
                    {this.props.dispositions ?
                        <Select name="form-field-name"
                            value={this.state.taskObject.reasonCode}
                            onChange={(e) => this.changeDisposition(e)}
                            options={this.props.dispositions.map((disposition, i) => {
                                return { value: disposition.label, label: disposition.label }
                            })}></Select> : <span>Loading...</span>}
                </div>
            </div>
            <br />
            <button onClick={(e) => this.createInboundTask(e)}>Create</button>
        </section>
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllContexts,
        getAllDispositions,
        createInboundTask,
        getCustomerDetailByPhoneNumber,
        createComment,
        getCustomerComments
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        customerDetail: state.customerDetail,
        customerComments: state.customerComments,
        dispositions: state.dispositions,
        contexts: state.contexts
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Inbound);

