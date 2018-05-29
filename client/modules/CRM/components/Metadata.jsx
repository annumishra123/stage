import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clientConfig from '../../../config';
import { getAllContexts, getAllDispositions, createContext, createDisposition } from '../CRMActions';
import ReactTable from 'react-table';
import Datetime from 'react-datetime';
import moment from 'moment';

// Import Style
import styles from './crm.css';

class Metadata extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contextObject: {
                "actionLabel": "",
                "deleted": false,
                "description": "",
                "priorityLevel": 0,
                "priorityScore": 0,
                "slaSeconds": 0
            },
            dispositionObject: {
                "rechurnDelaySeconds": 0,
                "label": "",
                "priorityScore": 0,
                "rechurn": true
            }
        }
    }

    componentDidMount() {
        this.props.getAllContexts();
        this.props.getAllDispositions();
    }

    changeContextLabel(e) {
        let contextObject = this.state.contextObject;
        contextObject.actionLabel = e.target.value;
        this.setState({
            contextObject: contextObject
        });
    }

    changeContextDescription(e) {
        let contextObject = this.state.contextObject;
        contextObject.description = e.target.value;
        this.setState({
            contextObject: contextObject
        });
    }

    changeContextPriorityScore(e) {
        let contextObject = this.state.contextObject;
        contextObject.priorityScore = e.target.value;
        this.setState({
            contextObject: contextObject
        });
    }

    changeContextPriorityLevel(e) {
        let contextObject = this.state.contextObject;
        contextObject.priorityLevel = e.target.value;
        this.setState({
            contextObject: contextObject
        });
    }

    changeContextSLA(e) {
        let contextObject = this.state.contextObject;
        contextObject.slaSeconds = e.target.value;
        this.setState({
            contextObject: contextObject
        });
    }

    renderContexts() {
        if (this.props.contexts) {
            return <div>
                <ReactTable filterable data={this.props.contexts} defaultPageSize={5} columns={clientConfig.contextColumns} className="-striped -highlight" />
            </div>
        }
    }

    changeDispositionLabel(e) {
        let dispositionObject = this.state.dispositionObject;
        dispositionObject.label = e.target.value;
        this.setState({
            dispositionObject: dispositionObject
        });
    }

    changeDispositionScore(e) {
        let dispositionObject = this.state.dispositionObject;
        dispositionObject.priorityScore = e.target.value;
        this.setState({
            dispositionObject: dispositionObject
        });
    }

    changeDispositionRechurn(e) {
        let dispositionObject = this.state.dispositionObject;
        dispositionObject.rechurn = e.target.checked;
        this.setState({
            dispositionObject: dispositionObject
        });
    }

    changeDispositionRechurnInterval(e) {
        let dispositionObject = this.state.dispositionObject;
        dispositionObject.rechurnDelaySeconds = e.target.value;
        this.setState({
            dispositionObject: dispositionObject
        });
    }

    renderDispositions() {
        if (this.props.dispositions) {
            return <div>
                <ReactTable filterable data={this.props.dispositions} defaultPageSize={5} columns={clientConfig.dispositionColumns} className="-striped -highlight" />
            </div>
        }
    }

    addContext() {
        if (this.state.contextObject.actionLabel && this.state.contextObject.description && this.state.contextObject.priorityLevel && this.state.contextObject.priorityScore && this.state.contextObject.slaSeconds) {
            this.props.createContext(this.state.contextObject);
        } else {
            alert('Please fill in all the details');
        }
    }

    addDisposition() {
        if (this.state.dispositionObject.label && this.state.dispositionObject.priorityScore && this.state.dispositionObject.rechurnDelaySeconds) {
            this.props.createDisposition(this.state.dispositionObject);
        } else {
            alert('Please fill in all the details');
        }
    }

    render() {
        return <section>
            <h1>Contexts</h1>
            <div className={styles.metadataForm}>
                <div className={styles.col6}>
                <label>Label</label>
                <input type="text" onChange={(e) => this.changeContextLabel(e)} />
                </div>
                <div className={styles.col6}>
                <label>Description</label>
                <input type="text" onChange={(e) => this.changeContextDescription(e)} />
                </div>
                <div className={styles.col6}>
                <label>Score</label>
                <input type="number" onChange={(e) => this.changeContextPriorityScore(e)} />
                </div>
                <div className={styles.col6}>
                <label>Level</label>
                <input type="number" onChange={(e) => this.changeContextPriorityLevel(e)} />
                </div>
                <div className={styles.col6}>
                <label>Resolution Time (sec)</label>
                <input type="number" onChange={(e) => this.changeContextSLA(e)} />
                </div>
                <button onClick={() => this.addContext()}>Add Context</button>
            </div>
            {this.renderContexts()}
            <br />
            <h1>Dispositions</h1>
            <div className={styles.metadataForm}>
                <div className={styles.col6}>
                <label>Label</label>
                <input type="text" onChange={(e) => this.changeDispositionLabel(e)} />
                </div>
                <div className={styles.col6}>
                <label>Score</label>
                <input type="number" onChange={(e) => this.changeDispositionScore(e)} />
                </div>
                <div className={styles.col6}>
                <label>Rechurn</label>
                <input type="checkbox" defaultChecked="true" onChange={(e) => this.changeDispositionRechurn(e)} />
                </div>
                <div className={styles.col6}>
                <label>Rechurn Interval (sec)</label>
                <input type="number" onChange={(e) => this.changeDispositionRechurnInterval(e)} />
                </div>
                <button onClick={() => this.addDisposition()}>Add Disposition</button>
            </div>
            {this.renderDispositions()}
        </section>
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllContexts,
        getAllDispositions,
        createContext,
        createDisposition
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


export default connect(mapStateToProps, matchDispatchToProps)(Metadata);

