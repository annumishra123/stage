import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clientConfig from '../../../config';
import { getTasksByContext, getAllContexts, getAllDispositions, createInboundTask } from '../CRMActions';

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
        taskObject.reasonCode = e.target.value;
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

    render() {
        return <section>
            <h1>New Task</h1>
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
                <input type="number" onChange={(e) => this.changePhoneNumber(e)} />
            </div>
            <br />
            <div>
                <label>Reason Code </label>
                {this.props.dispositions ? <select onChange={(e) => this.changeDisposition(e)}>
                    <option value=""> -- Select Label -- </option>
                    {this.props.dispositions.map((disposition, i) => {
                        return <option key={i} value={disposition.label}>{disposition.label}</option>
                    })}
                </select> : <span>Loading...</span>}
            </div>
            <br />
            <button onClick={() => this.createInboundTask()}>Create</button>
        </section>
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getTasksByContext,
        getAllContexts,
        getAllDispositions,
        createInboundTask
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        dispositions: state.dispositions,
        contexts: state.contexts
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Inbound);

