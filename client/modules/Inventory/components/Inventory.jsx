import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { fetchAccessoryCatalog, fetchRentCatalog, fetchShopCatalog, changeShopLookLocation, changeRentLookLocation, changeRentAccessoryLocation } from '../InventoryActions';
import clientConfig from '../../../config';
import { CSVLink } from 'react-csv';
import ReactModal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: ''
        }
    }

    componentDidMount() {
        this.props.fetchAccessoryCatalog();
        this.props.fetchRentCatalog();
        this.props.fetchShopCatalog();
    }

    handleChangeLocation(e) {
        this.state.location = e.target.value;
    }

    changeRentLooksLocation(id) {
        if (this.state.location && id) {
            this.props.changeRentLookLocation(id, this.state.location);
        }
    }

    changeRentAccessoriesLocation(id) {
        if (this.state.location && id) {
            this.props.changeRentAccessoryLocation(id, this.state.location);
        }
    }

    changeShopLooksLocation(id) {
        if (this.state.location && id) {
            this.props.changeShopLookLocation(id, this.state.location);
        }
    }

    renderRentLooks() {
        if (this.props.rentCatalog) {
            if (this.props.rentCatalog.length > 0) {
                if (!clientConfig.rentLooksColumns.find(o => o.id == 'changeLocation') && (this.props.role == 'admin' || this.props.role == 'delivery')) {
                    clientConfig.rentLooksColumns.unshift({
                        Header: '',
                        id: 'changeLocation',
                        accessor: '_id',
                        Cell: ({value}) => <div>
                                             <select onChange={ this.handleChangeLocation.bind(this) }>
                                               <option value=""> -- Select Location -- </option>
                                               <option value="store">Store</option>
                                               <option value="office">Office</option>
                                               <option value="customer">Customer</option>
                                             </select>
                                             <button onClick={ this.changeRentLooksLocation.bind(this, value) }>Change</button>
                                           </div>
                    });
                }
                return <div>
                         <ReactTable filterable data={ this.props.rentCatalog } columns={ clientConfig.rentLooksColumns } defaultPageSize={ 10 } className="-striped -highlight" />
                       </div>;
            }
        }
    }

    renderRentAccessories() {
        if (this.props.accessoryCatalog) {
            if (this.props.accessoryCatalog.length > 0) {
                if (!clientConfig.rentAccessoriesColumns.find(o => o.id == 'changeLocation') && (this.props.role == 'admin' || this.props.role == 'delivery')) {
                    clientConfig.rentAccessoriesColumns.unshift({
                        Header: '',
                        id: 'changeLocation',
                        accessor: '_id',
                        Cell: ({value}) => <div>
                                             <select onChange={ this.handleChangeLocation.bind(this) }>
                                               <option value=""> -- Select Location -- </option>
                                               <option value="store">Store</option>
                                               <option value="office">Office</option>
                                               <option value="customer">Customer</option>
                                             </select>
                                             <button onClick={ this.changeRentAccessoriesLocation.bind(this, value) }>Change</button>
                                           </div>
                    });
                }
                return <div>
                         <ReactTable filterable data={ this.props.accessoryCatalog } columns={ clientConfig.rentAccessoriesColumns } defaultPageSize={ 10 } className="-striped -highlight" />
                       </div>;
            }
        }
    }

    renderShopLooks() {
        if (this.props.shopCatalog) {
            if (this.props.shopCatalog.length > 0) {
                if (!clientConfig.shopLooksColumns.find(o => o.id == 'changeLocation') && (this.props.role == 'admin' || this.props.role == 'delivery')) {
                    clientConfig.shopLooksColumns.unshift({
                        Header: '',
                        id: 'changeLocation',
                        accessor: 'id',
                        Cell: ({value}) => <div>
                                             <select onChange={ this.handleChangeLocation.bind(this) }>
                                               <option value=""> -- Select Location -- </option>
                                               <option value="store">Store</option>
                                               <option value="office">Office</option>
                                               <option value="customer">Customer</option>
                                             </select>
                                             <button onClick={ this.changeShopLooksLocation.bind(this, value) }>Change</button>
                                           </div>
                    });
                }
                return <div>
                         <ReactTable filterable data={ this.props.shopCatalog } columns={ clientConfig.shopLooksColumns } defaultPageSize={ 10 } className="-striped -highlight" />
                       </div>;
            }
        }
    }

    render() {
        return <section>
                 <h1>Inventory</h1>
                 <br/>
                 <Tabs>
                   <TabList>
                     <Tab>Shop</Tab>
                     <Tab>Rent</Tab>
                     <Tab>Accessory</Tab>
                   </TabList>
                   <TabPanel>
                     { this.renderShopLooks() }
                   </TabPanel>
                   <TabPanel>
                     { this.renderRentLooks() }
                   </TabPanel>
                   <TabPanel>
                     { this.renderRentAccessories() }
                   </TabPanel>
                 </Tabs>
               </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchAccessoryCatalog,
        fetchRentCatalog,
        fetchShopCatalog,
        changeShopLookLocation,
        changeRentLookLocation,
        changeRentAccessoryLocation
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        accessoryCatalog: state.accessoryCatalog,
        rentCatalog: state.rentCatalog,
        shopCatalog: state.shopCatalog,
        role: state.auth.role,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Inventory);
