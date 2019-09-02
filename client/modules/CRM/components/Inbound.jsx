import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clientConfig from '../../../config';
import { getAllContexts, getAllDispositions, createInboundTask } from '../CRMActions';
import Select from 'react-select';
import { getCustomerDetailByPhoneNumber } from '../../Customer/CustomerActions';
import CustomerForm from '../../Customer/components/CustomerForm';


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
            }
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
            return <div>
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
            <button onClick={() => this.createInboundTask()}>Create</button>
        </section>
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllContexts,
        getAllDispositions,
        createInboundTask,
        getCustomerDetailByPhoneNumber
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        customerDetail: state.customerDetail,
        dispositions: state.dispositions,
        contexts: state.contexts
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Inbound);

