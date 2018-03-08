import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { fetchAccessoryCatalog, fetchRentCatalog, fetchShopCatalog, changeShopLookLocation, changeRentLookLocation, changeRentAccessoryLocation, fetchShopProduct, fetchRentProduct, fetchAccessory, updateShopProduct, clearShopProduct, updateRentProduct, clearRentProduct, updateAccessory, clearAccessory } from '../InventoryActions';
import clientConfig from '../../../config';
import { CSVLink } from 'react-csv';
import ReactModal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Accessory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            viewOrderDetails: false,
            tabIndex: 0,
            accessory: null
        }
    }

    componentDidMount() {
        this.props.fetchAccessory(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.accessory) {
            this.setState({
                accessory: nextProps.accessory
            });
        }
    }

    handleChangeProductSku(e) {
        this.state.accessory.sku = e.target.value;
    }

    handleChangeProductName(e) {
        this.state.accessory.name = e.target.value;
    }

    handleChangeProductDesigner(e) {
        this.state.accessory.designer = e.target.value;
    }

    handleChangeProductRetailPrice(e) {
        this.state.accessory.retailPrice = e.target.value;
    }

    handleChangeProductRentalPrice(e) {
        this.state.accessory.rentalPrice = e.target.value;
    }

    handleChangeProductGender(e) {
        this.state.accessory.gender = e.target.value;
    }

    handleChangeProductCategory(e) {
        this.state.accessory.category = e.target.value;
    }

    handleChangeProductLocation(e) {
        this.state.accessory.location = e.target.value;
    }

    viewAccessory(id) {
        browserHistory.push('/inventory/accessory/' + id);
    }

    updateAccessoryDetails() {
        this.props.updateAccessory(this.state.accessory);
    }

    renderRentAccessories() {
        if (this.props.accessoryCatalog) {
            if (this.props.accessoryCatalog.length > 0) {
                if (!clientConfig.rentAccessoriesColumns.find(o => o.id == 'changeLocation') && (this.props.role == 'admin' || this.props.role == 'delivery')) {
                    clientConfig.rentAccessoriesColumns.unshift({
                        Header: '',
                        id: 'changeLocation',
                        accessor: '_id',
                        Cell: ({ value }) => <div>
                            <button onClick={this.viewAccessory.bind(this, value)}>Edit Accessory</button>
                        </div>
                    });
                }
                return <div>
                    <ReactTable filterable data={this.props.accessoryCatalog} columns={clientConfig.rentAccessoriesColumns} defaultPageSize={10} className="-striped -highlight" />
                </div>;
            }
        }
    }

    render() {
        if (this.state.accessory) {
            return (<div>
                <button onClick={this.renderRentAccessories.bind(this)}>Back</button>
                <div>
                    <h4>Sku: </h4>
                    <input type="text" value={this.state.accessory.sku} onChange={this.handleChangeProductSku.bind(this)} />
                </div>
                <div>
                    <h4>Name: </h4>
                    <input type="text" defaultValue={this.state.accessory.name} onChange={this.handleChangeProductName.bind(this)} />
                </div>
                <div>
                    <h4>Designer: </h4>
                    <input type="text" defaultValue={this.state.accessory.designer} onChange={this.handleChangeProductDesigner.bind(this)} />
                </div>
                <div>
                    <h4>Retail Price: </h4>
                    <input type="text" defaultValue={this.state.accessory.retailprice} onChange={this.handleChangeProductRetailPrice.bind(this)} />
                </div>
                <div>
                    <h4>Rental Price: </h4>
                    <input type="text" defaultValue={this.state.accessory.rentalprice} onChange={this.handleChangeProductRentalPrice.bind(this)} />
                </div>
                <div>
                    <h4>Gender: </h4>
                    <input type="text" defaultValue={this.state.accessory.gender} onChange={this.handleChangeProductGender.bind(this)} />
                </div>
                <div>
                    <h4>Category: </h4>
                    <input type="text" defaultValue={this.state.accessory.categories} onChange={this.handleChangeProductCategory.bind(this)} />
                </div>
                <div>
                    <h4>Location: </h4>
                    <input type="text" defaultValue={this.state.accessory.location} onChange={this.handleChangeProductLocation.bind(this)} />
                </div>
                <button onClick={this.updateAccessoryDetails.bind(this)}>Update Product</button>
            </div>)

        }
        else {
            return <h1>Not Available</h1>;
        }
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchAccessory,
        updateAccessory,
        clearAccessory
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        accessory: state.accessory
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Accessory);

