import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clientConfig from '../../../config';
import { getTasksByContext, getAllContexts } from '../CRMActions';
import ReactTable from 'react-table';
import moment from 'moment';

// Import Style
import styles from './crm.css';

class Tasks extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          pageIndex: 0,
          pageSize: 20,
          context: '',
          sortBy: 'priorityScore',
          lastUpdated: moment(),
        };
    }

  componentDidMount() {
      this.props.getTasksByContext(this.state.context, this.state.sortBy, this.state.pageIndex, this.state.pageSize);
      this.props.getAllContexts();
      this.updateInterval = setInterval(function () {
          this.props.getTasksByContext(this.state.context, this.state.sortBy, this.state.pageIndex, this.state.pageSize);
          this.setState({
              lastUpdated: moment(),
            });
        }.bind(this), 120000);
    }

  componentWillUnmount() {
      clearInterval(this.updateInterval);
      this.updateInterval = false;
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
      this.props.getTasksByContext(this.state.context, this.state.sortBy, state.page, state.pageSize);
    }

  getFilteredTasks() {
      this.props.getTasksByContext(this.state.context, this.state.sortBy, this.state.pageIndex, this.state.pageSize);
    }

  viewTask(task) {
      browserHistory.push('/crm/tasks/' + task.id);
    }
  getIcon(task) {
      let slaTime = moment(task.slaEndTime).fromNow();
      return (<div><p>Time to Resolve: {slaTime}</p> <p>Requests : <b>{task.callBacksRequested.length}</b></p></div >);
    }

  getStatus(task) {
      return (<div>{task.status == 'RECHURNED' ? <i className="fa fa-recycle fa-2x" aria-hidden="true"></i> : task.status == 'PARTIALLY_COMPLETED' ? <i className="fa  fa-star-half-o fa-2x" aria-hidden="true"></i> : <i className="fa fa-flag-checkered fa-2x" aria-hidden="true"></i>}</div>);
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
                    <ReactTable data={this.props.tasks} manual defaultPageSize={this.state.pageSize} columns={clientConfig.taskColumns} pages={this.props.pages} onFetchData={(state, instance) => { this.fetchData(state); }} className="-striped -highlight" />
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
                    <label>Label </label>
                    {this.props.contexts ? <select onChange={(e) => this.changeLabel(e)}>
                        <option value="">All</option>
                        {this.props.contexts.map((context, i) => {
                          return <option key={i} value={context.actionLabel}>{context.actionLabel}</option>;
                        })}
                    </select> : <span>Loading...</span>}
                </div>
                <div className={styles.col4}>
                    <label>Sort By </label>
                    <select onChange={(e) => this.changeSortBy(e)}>
                        <option value="priorityScore">Priority Score</option>
                        <option value="slaSeconds">Resolution Time</option>
                    </select>
                </div>
                <div className={styles.col4}>
                    <button onClick={() => this.getFilteredTasks()}>Apply</button>
                </div>
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

