import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { getOwners, getCompletedOrders, getPendingOrders, getCancelledOrders, getOwnerShare } from '../DesignerActions';
import clientConfig from '../../../config';
import FormSubmitButton from '../../Customer/components/FormSubmitButton.js';
import OwnerForm from './OwnerForm.jsx';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { CSVLink } from 'react-csv';

// Import Style
import styles from './designer.css';

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
                          <ReactTable filterable data={ this.props.revshares } columns={ clientConfig.ownersColumns } defaultPageSize={ 5 } className="-striped -highlight" />
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
        this.setState({
            csvData: null
        });
        this.props.getOwnerShare(this.state.designer);
        this.props.getCompletedOrders(this.state.designer, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
        this.props.getPendingOrders(this.state.designer);
        this.props.getCancelledOrders(this.state.designer, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
    }

    generateExportLink() {
        this.setState({
            csvData: this.designerTable.getResolvedState().sortedData
        });
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
            if (this.props.designerShare) {
                let completedDesignerOrders = this.props.completedDesignerOrders;
                completedDesignerOrders.map((order) => {
                    order.share = this.props.designerShare;
                });
                return <div>
                         <ReactTable filterable data={ completedDesignerOrders } columns={ clientConfig.designerOrderColumns } defaultPageSize={ 10 } ref={ (r) => this.designerTable = r } onSortedChange={ this.generateExportLink.bind(this) }
                           onFilteredChange={ this.generateExportLink.bind(this) } className="-striped -highlight" />
                         { !this.state.csvData ? <button onClick={ this.generateExportLink.bind(this) }>Generate Export Link</button> : null }
                         { this.state.csvData ? <CSVLink data={ this.state.csvData } filename={ this.state.designer + '_' + this.state.startDate.format('ll') + '_' + this.state.endDate.format('ll') + '.csv' }>Export CSV</CSVLink> : null }
                       </div>;
            }
        }
    }

    renderPendingOrders() {
        if (this.props.pendingDesignerOrders) {
            if (this.props.designerShare) {
                let pendingDesignerOrders = this.props.pendingDesignerOrders;
                pendingDesignerOrders.map((order) => {
                    order.share = this.props.designerShare;
                });
                return <div>
                         <ReactTable filterable data={ pendingDesignerOrders } columns={ clientConfig.designerOrderColumns } defaultPageSize={ 10 } className="-striped -highlight" />
                       </div>;
            }
        }
    }

    renderCancelledOrders() {
        if (this.props.cancelledDesignerOrders) {
            if (this.props.designerShare) {
                let cancelledDesignerOrders = this.props.cancelledDesignerOrders;
                cancelledDesignerOrders.map((order) => {
                    order.share = this.props.designerShare;
                });
                return <div>
                         <ReactTable filterable data={ cancelledDesignerOrders } columns={ clientConfig.designerOrderColumns } defaultPageSize={ 10 } className="-striped -highlight" />
                       </div>;
            }
        }
    }

    renderOrderTotal() {
        if (this.props.completedDesignerOrders) {
            let total = 0;
            let totalGST = 0;
            this.props.completedDesignerOrders.map((order) => {
                if (order.rentPaid > 999) {
                    total += ((order.rentPaid * (this.props.designerShare / 100)) / 1.12);
                    totalGST += (((order.rentPaid * (this.props.designerShare / 100)) / 1.12) > 999 ? ((order.rentPaid * (this.props.designerShare / 100)) / 1.12) * 0.12 : ((order.rentPaid * (this.props.designerShare / 100)) / 1.12) * 0.05);
                } else {
                    total += ((order.rentPaid * (this.props.designerShare / 100)) / 1.05);
                    totalGST += (((order.rentPaid * (this.props.designerShare / 100)) / 1.05) > 999 ? ((order.rentPaid * (this.props.designerShare / 100)) / 1.05) * 0.12 : ((order.rentPaid * (this.props.designerShare / 100)) / 1.05) * 0.05);
                }
            });
            return <p>Completed - Share: <strong><span style={ { color: "green" } }>₹{ total.toFixed(2) }</span></strong> & GST: <strong><span style={ { color: "green" } }>₹{ totalGST.toFixed(2) }</span></strong></p>;
        }
    }

    renderPendingOrderTotal() {
        if (this.props.pendingDesignerOrders) {
            let total = 0;
            let totalGST = 0;
            this.props.pendingDesignerOrders.map((order) => {
                if (order.rentPaid > 999) {
                    total += ((order.rentPaid * (this.props.designerShare / 100)) / 1.12);
                    totalGST += (((order.rentPaid * (this.props.designerShare / 100)) / 1.12) > 999 ? ((order.rentPaid * (this.props.designerShare / 100)) / 1.12) * 0.12 : ((order.rentPaid * (this.props.designerShare / 100)) / 1.12) * 0.05);
                } else {
                    total += ((order.rentPaid * (this.props.designerShare / 100)) / 1.05);
                    totalGST += (((order.rentPaid * (this.props.designerShare / 100)) / 1.05) > 999 ? ((order.rentPaid * (this.props.designerShare / 100)) / 1.05) * 0.12 : ((order.rentPaid * (this.props.designerShare / 100)) / 1.05) * 0.05);
                }
            });
            return <p>Pending - Share: <strong><span style={ { color: "green" } }>₹{ total.toFixed(2) }</span></strong> & GST: <strong><span style={ { color: "green" } }>₹{ totalGST.toFixed(2) }</span></strong></p>;
        }
    }

    render() {
        return <section className={ styles.owners }>
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
                 <a target="blank" className={ styles.link } href={ '/api/revshare/api/owners/invoice?owner=' + this.state.designer + '&month=' + this.state.month + '&year=' + this.state.year + '&ut=' + this.state.isDelhi }>Generate Invoice</a>
                 <br/>
                 { this.state.designer ? <div>
                                           <br/>
                                           <h1>Orders</h1>
                                           <br/>
                                           <p>Designer:
                                             { ' ' + this.state.designer.toUpperCase() }
                                           </p>
                                           <br/>
                                           { this.renderOrderTotal() }
                                           <br/>
                                           { this.renderPendingOrderTotal() }
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
                                         </div> : null }
               </section>;
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getOwners,
        getCompletedOrders,
        getPendingOrders,
        getCancelledOrders,
        getOwnerShare
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
        user: state.auth.email,
        designerShare: state.designerShare ? state.designerShare.revenueshare : null
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Owner);
