import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clientConfig from '../../../config';
import { getTasksByContext, getAllContexts } from '../CRMActions';
import ReactTable from 'react-table';
import moment from 'moment';
import { CSVLink } from 'react-csv';

// Import Style
import styles from './crm.css';

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: parseInt(this.props.params.page),
            pageSize: parseInt(this.props.params.size),
            context: this.props.params.context,
            sortBy: this.props.params.sort,
            lastUpdated: moment(),
            phoneNumber: this.props.params.number,
            crmTasksCSV: null
        };
    }

    componentDidMount() {
        this.props.getTasksByContext(this.props.params.context == 'all' ? '' : this.props.params.context, this.props.params.sort, this.props.params.page, this.props.params.size, this.props.params.number != 0 ? this.props.params.number : '');
        this.props.getAllContexts();
        this.updateInterval = setInterval(function () {
            this.props.getTasksByContext(this.props.params.context == 'all' ? '' : this.props.params.context, this.props.params.sort, this.props.params.page, this.props.params.size, this.props.params.number != 0 ? this.props.params.number : '');
            this.setState({
                pageIndex: parseInt(this.props.params.page),
                pageSize: parseInt(this.props.params.size),
                context: this.props.params.context,
                sortBy: this.props.params.sort,
                lastUpdated: moment(),
                phoneNumber: this.props.params.number
            });
        }.bind(this), 120000);
    }

    componentWillReceiveProps(props) {
        if (this.props.location.pathname != props.location.pathname) {
            this.setState({
                pageIndex: parseInt(props.params.page),
                pageSize: parseInt(props.params.size),
                context: props.params.context,
                sortBy: props.params.sort,
                lastUpdated: moment(),
                phoneNumber: props.params.number
            });
            this.props.getTasksByContext(props.params.context == 'all' ? '' : props.params.context, props.params.sort, props.params.page, props.params.size, props.params.number != 0 ? props.params.number : '');
        }
        if (this.props.tasks) {
            let crmTasksCSV = props.tasks.map((item) => {
                return {
                    'phoneNumber': item.phoneNumber,
                    'taskId': item.id,
                }
            });
            this.setState({
                crmTasksCSV: crmTasksCSV
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
        this.updateInterval = false;
    }

    changePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value == '' ? 0 : e.target.value,
        });
    }

    changeLabel(e) {
        this.setState({
            context: e.target.value,
        });
    }

    changeSortBy(e) {
        this.setState({
            sortBy: e.target.value,
        });
    }

    fetchData(state) {
        this.setState({
            pageIndex: state.page,
            pageSize: state.pageSize,
        });
        let location = '/crm/tasks/' + this.state.context + '/' + this.state.sortBy + '/' + state.page + '/' + state.pageSize + '/' + this.state.phoneNumber;
        if (location != this.props.location.pathname) {
            browserHistory.push(location);
        } else {
            this.props.getTasksByContext(this.props.params.context == 'all' ? '' : this.props.params.context, this.props.params.sort, state.page, state.pageSize, this.props.params.number != 0 ? this.props.params.number : '');
        }
    }

    getFilteredTasks() {
        let location = '/crm/tasks/' + this.state.context + '/' + this.state.sortBy + '/0/' + this.state.pageSize + '/' + this.state.phoneNumber;
        if (location != this.props.location.pathname) {
            browserHistory.push(location);
        } else {
            this.props.getTasksByContext(this.props.params.context == 'all' ? '' : this.props.params.context, this.props.params.sort, this.props.params.page, this.props.params.size, this.props.params.number != 0 ? this.props.params.number : '');
        }
    }

    viewTask(task) {
        browserHistory.push('/crm/tasks/detail?uui=' + task.id);
    }

    getIcon(task) {
        let slaTime = moment(task.slaEndTime).fromNow();
        return (<div><p>Time to Resolve: {slaTime}</p> <p>Requests : <b>{task.callBacksRequested.length}</b></p></div >);
    }

    getStatus(task) {
        return (<span>{task.status == 'RECHURNED' ? <i className={styles.rechurned + ' fa fa-recycle fa-2x'} aria-hidden="true"></i> : task.status == 'PARTIALLY_COMPLETED' ? <i className={styles.starhalf + ' fa fa-star-half-o fa-2x partiallyCcompleted'} aria-hidden="true"></i> : <i className={styles.taskdone + ' fa fa-flag-checkered fa-2x'} aria-hidden="true"></i>}</span>);
    }

    renderTasks() {
        if (this.props.tasks) {
            if (this.props.tasks.length > 0) {
                if (!clientConfig.taskColumns.find(o => o.id == 'view')) {
                    clientConfig.taskColumns.unshift({
                        Header: 'Status',
                        id: 'status',
                        accessor: o => { return o; },
                        Cell: ({ value }) => (<div>{this.getStatus(value)} {value.status}</div>),
                    });
                    clientConfig.taskColumns.unshift({
                        Header: '',
                        id: 'view',
                        accessor: o => { return o; },
                        Cell: ({ value }) => (<div><button className={styles.viewtask} onClick={this.viewTask.bind(this, value)}>View ></button></div>),
                    });
                    clientConfig.taskColumns.unshift({
                        Header: 'Info',
                        id: 'info',
                        accessor: o => { return o; },
                        Cell: ({ value }) => (<div>{this.getIcon(value)}</div>),
                    });
                }
                return (<div>
                    <p className={styles.lastUpdate}>Last Updated: {this.state.lastUpdated.fromNow()} </p>
                    <br />
                    <ReactTable className={styles.tasktable} data={this.props.tasks} manual defaultPageSize={this.state.pageSize} columns={clientConfig.taskColumns} pages={this.props.pages} onFetchData={(state, instance) => { this.fetchData(state); }} className="-striped -highlight" />
                    {this.state.crmTasksCSV ? <CSVLink data={this.state.crmTasksCSV} filename={"CRM Taks.csv"}>Export CSV</CSVLink> : null}
                </div>);
            }
        }
    }

    render() {
        return (<section className={styles.tasks}>
            {this.props.tasks ? <h1>People to call : {this.props.numberOfLeads}</h1> : <h1>Tasks</h1>}
            <Link className={styles.newTask} to="/crm/inbound">Inbound Call</Link>
            <br /><br />
            <div>
                <div className={styles.col4}>
                    <label>Phone </label>
                    <input type="number" value={this.state.phoneNumber == 0 ? '' : this.state.phoneNumber} placeholder="Phone Number" onChange={(e) => this.changePhoneNumber(e)} />
                </div>
                <div className={styles.col4}>
                    <label>Label </label>
                    {this.props.contexts ? <select value={this.state.context} onChange={(e) => this.changeLabel(e)}>
                        <option value="all">All</option>
                        {this.props.contexts.map((context, i) => {
                            return <option key={i} value={context.actionLabel}>{context.actionLabel}</option>;
                        })}
                    </select> : <span>Loading...</span>}
                </div>
                <div className={styles.col4}>
                    <label>Sort By </label>
                    <select value={this.state.sortBy} onChange={(e) => this.changeSortBy(e)}>
                        <option value="slaSeconds">Resolution Time</option>
                        <option value="priorityScore">Priority Score</option>
                    </select>
                </div>
                    <button className={styles.taskapply} onClick={() => this.getFilteredTasks()}>Apply</button>
            </div>
            <br />
            {this.renderTasks()}
        </section>);
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getTasksByContext,
        getAllContexts,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        tasks: state.tasks ? state.tasks.content : null,
        pages: state.tasks ? state.tasks.totalPages : -1,
        numberOfLeads: state.tasks ? state.tasks.totalElements : 0,
        contexts: state.contexts,
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(Tasks);

