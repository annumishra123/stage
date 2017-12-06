import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { getOwners, getCompletedOrders, getPendingOrders, getCancelledOrders } from '../DesignerActions';
import clientConfig from '../../../config';
import FormSubmitButton from '../../Customer/components/FormSubmitButton.js';
import OwnerForm from './OwnerForm.jsx';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


class Owner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: moment().month() + 1,
            year: moment().year(),
            designer: '',
            isDelhi: true,
            startDate: moment().startOf('month'),
            endDate: moment().endOf('day')
        }
    }

    componentDidMount() {
        this.props.getOwners();
    }

  renderOwners() {
      if (this.props.revshares) {
          if (this.props.revshares.length > 0) {
              return (<div>
                    <ReactTable filterable data={this.props.revshares} columns={clientConfig.ownersColumns} defaultPageSize={5} className="-striped -highlight" />
                </div>);
            }
        }
    }

  handleChangeMonth(e) {
      this.setState({
          month: e.target.value,
        });
    }

    handleChangeDesigner(e) {
        this.setState({
            designer: e.target.value
        }, this.refreshDesignerOrders);
    }

  handleChangeYear(e) {
      this.setState({
          year: e.target.value,
        });
    }

  handleChangeCity(value) {
      this.setState({
          isDelhi: value,
        });
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
        this.props.getCompletedOrders(this.state.designer, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
        this.props.getPendingOrders(this.state.designer);
        this.props.getCancelledOrders(this.state.designer, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
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
                 <h1>Owners</h1>
                 <br />
                 { this.renderOwners() }
                 <br/>
                 <OwnerForm />
                 <FormSubmitButton formName="createOwner" text="Create Owner" />
                 <br/>
                 <br/>
                 <h1>Create Invoice</h1>
                 <br/>
                 <select onChange={ this.handleChangeDesigner.bind(this) }>
                   <option value=""> -- Select Designer -- </option>
                   { this.props.revshares ? this.props.revshares.map((share, i) => {
                         return <option key={ i } value={ share.ownername }>
                                  { share.ownername }
                                </option>;
                     }) : null }
                 </select>
                 <select defaultValue={ this.state.month } onChange={ this.handleChangeMonth.bind(this) }>
                   <option value="1">January</option>
                   <option value="2">February</option>
                   <option value="3">March</option>
                   <option value="4">April</option>
                   <option value="5">May</option>
                   <option value="6">June</option>
                   <option value="7">July</option>
                   <option value="8">August</option>
                   <option value="9">September</option>
                   <option value="10">October</option>
                   <option value="11">November</option>
                   <option value="12">December</option>
                 </select>
                 <input type="number" defaultValue={ this.state.year } onChange={ this.handleChangeYear.bind(this) } />
                 <br/>
                 <input type="radio" name="city" onClick={ this.handleChangeCity.bind(this, true) } defaultChecked={ true } />
                 <label> Delhi </label>
                 <input type="radio" name="city" onClick={ this.handleChangeCity.bind(this, false) } />
                 <label> Other </label>
                 <br/>
                 <a target="blank" href={ '/api/revshare/api/owners/invoice?owner=' + this.state.designer + '&month=' + this.state.month + '&year=' + this.state.year + '&ut=' + this.state.isDelhi }>Generate Invoice</a>
                 <br/>
                 <br/>
                 <h1>Orders</h1>
                 <br/>
                 <h4>Designer:
                                                                                                             { ' ' + this.state.designer.toUpperCase() }
                                                                                                           </h4>
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
               </section>;
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getOwners,
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
        revshares: state.revshares,
        role: state.auth.role,
        owner: state.auth.owner,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Owner);
