import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { fetchAccessoryCatalog, fetchRentCatalog, fetchShopCatalog, changeShopLookLocation, changeRentLookLocation, changeRentAccessoryLocation, fetchShopProduct, fetchRentProduct, updateShopProduct, clearShopProduct, updateRentProduct, clearRentProduct } from '../InventoryActions';
import clientConfig from '../../../config';
import { CSVLink } from 'react-csv';
import ReactModal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class RentProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            viewOrderDetails: false,
            tabIndex: 0,
            rentProduct: null
        }
    }

    componentDidMount() {
        this.props.fetchRentProduct(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rentProduct) {
            this.setState({
                rentProduct: nextProps.rentProduct
            });
        }
    }

    handleChangeProductSku(e) {
        this.state.rentProduct.sku = e.target.value;
    }

    handleChangeProductName(e) {
        this.state.rentProduct.name = e.target.value;
    }

    handleChangeProductDesigner(e) {
        this.state.rentProduct.designer = e.target.value;
    }

    handleChangeProductDescription(e) {
        this.state.rentProduct.description = e.target.value;
    }

    handleChangeProductOccasion(e) {
        this.state.rentProduct.occasion = e.target.value;
    }

    handleChangeProductRetailPrice(e) {
        this.state.rentProduct.retailPrice = e.target.value;
    }

    handleChangeProductRentalPrice(e) {
        this.state.rentProduct.rentalPrice = e.target.value;
    }

    handleChangeProductDiscountedRentalPrice(e) {
        this.state.rentProduct.discountedRentalPrice = e.target.value;
    }

    handleChangeProductAccessories(e) {
        this.state.rentProduct.accessories = e.target.value;
    }

    handleChangeProductGender(e) {
        this.state.rentProduct.gender = e.target.value;
    }

    handleChangeProductImage(e) {
        this.state.rentProduct.image = e.target.value;
    }

    handleChangeProductSize(e) {
        this.state.rentProduct.size = e.target.value;
    }

    handleChangeProductMeasurements(e) {
        this.state.rentProduct.measurements = e.target.value;
    }

    handleChangeProductComposition(e) {
        this.state.rentProduct.composition = e.target.value;
    }

    handleChangeProductStatus(e) {
        this.state.rentProduct.status = e.target.value;
    }

    handleChangeProductCategory(e) {
        this.state.rentProduct.category = e.target.value;
    }

    handleChangeProductColor(e) {
        this.state.rentProduct.color = e.target.value;
    }

    handleChangeProductOwner(e) {
        this.state.rentProduct.owner = e.target.value;
    }

    handleChangeProductLocation(e) {
        this.state.rentProduct.location = e.target.value;
    }

    viewRentLook(id) {
        browserHistory.push('/inventory/rent/' + id);
    }

    updateRentProductDetails() {
        this.props.updateRentProduct(this.state.rentProduct);
    }

    renderRentLooks() {
        if (this.props.rentCatalog) {
            if (this.props.rentCatalog.length > 0) {
                if (!clientConfig.rentLooksColumns.find(o => o.id == 'edit') && (this.props.role == 'admin')) {
                    clientConfig.rentLooksColumns.unshift({
                        Header: '',
                        id: 'edit',
                        accessor: 'id',
                        Cell: ({ value }) => <div>
                            <button onClick={this.viewRentLook.bind(this, value)}>Edit Product</button>
                        </div>
                    });
                }
                return <div>
                    <ReactTable filterable data={this.props.rentCatalog} columns={clientConfig.rentLooksColumns} defaultPageSize={10} className="-striped -highlight" />
                </div>;
            }
        }
    }

    renderMeasurements() {
        debugger;
        if(Object.keys(this.state.rentProduct.measurements).length > 0) {
            return Object.keys(this.state.rentProduct.measurements).map((line, i) => {
                return
                <div key={i}>
                    <label>{line}</label>
                    {/* <input type="text" defaultValue={line.chest.min} onChange={this.handleChangeProductMeasurements.bind(this)} /> */}
                </div>;
            })
        }
    }

    render() {
        if (this.state.rentProduct) {
            return (<div>
                <button onClick={this.renderRentLooks.bind(this)}>Back</button>
                <div>
                    <h4>Sku: </h4>
                    <input type="text" value={this.state.rentProduct.sku} onChange={this.handleChangeProductSku.bind(this)} />
                </div>
                <div>
                    <h4>Name: </h4>
                    <input type="text" defaultValue={this.state.rentProduct.name} onChange={this.handleChangeProductName.bind(this)} />
                </div>
                <div>
                    <h4>Designer: </h4>
                    <input type="text" defaultValue={this.state.rentProduct.designer} onChange={this.handleChangeProductDesigner.bind(this)} />
                </div>
                <div>
                    <h4>Description: </h4>
                    <textarea type="text" defaultValue={this.state.rentProduct.description} onChange={this.handleChangeProductDescription.bind(this)} />
                </div>
                <div>
                    <h4>Occasion: </h4>
                    <input type="text" defaultValue={this.state.rentProduct.occasion} onChange={this.handleChangeProductOccasion.bind(this)} />
                </div>
                <div>
                    <h4>Retail Price: </h4>
                    <input type="text" defaultValue={this.state.rentProduct.retailprice} onChange={this.handleChangeProductRetailPrice.bind(this)} />
                </div>
                <div>
                    <h4>Rental Price: </h4>
                    <input type="text" defaultValue={this.state.rentProduct.rentalprice} onChange={this.handleChangeProductRentalPrice.bind(this)} />
                </div>
                <div>
                    <h4>Discounted Rental Price: </h4>
                    <input type="text" defaultValue={this.state.rentProduct.discountedrentalprice} onChange={this.handleChangeProductDiscountedRentalPrice.bind(this)} />
                </div>
                <div>
                    <h4>Accessories: </h4>
                    <textarea type="text" defaultValue={JSON.stringify(this.state.rentProduct.accessories)} onChange={this.handleChangeProductAccessories.bind(this)} />
                </div>
                <div>
                    <h4>Gender: </h4>
                    <input type="text" defaultValue={this.state.rentProduct.gender} onChange={this.handleChangeProductGender.bind(this)} />
                </div>
                <div>
                    <h4>Image: </h4>
                    <input type="text" defaultValue={this.state.rentProduct.frontimage} onChange={this.handleChangeProductImage.bind(this)} />
                </div>
                <div>
                    <h4>Size: </h4>
                    <input type="text" defaultValue={this.state.rentProduct.size} onChange={this.handleChangeProductSize.bind(this)} />
                </div>
                <div>
                <h4>Measurements: </h4>
                {this.renderMeasurements()}
            </div>
                <div>
                    <h4>Composition: </h4>
                    <input type="text" defaultValue={this.state.rentProduct.composition} onChange={this.handleChangeProductComposition.bind(this)} />
                </div>
                <div>
                    <h4>Status: </h4>
                    <input type="text" defaultValue={this.state.rentProduct.status} onChange={this.handleChangeProductStatus.bind(this)} />
                </div>
                <div>
                    <h4>Category: </h4>
                    <input type="text" defaultValue={this.state.rentProduct.categories} onChange={this.handleChangeProductCategory.bind(this)} />
                </div>
                <div>
                    <h4>Color: </h4>
                    <input type="text" defaultValue={this.state.rentProduct.color} onChange={this.handleChangeProductColor.bind(this)} />
                </div>
                <div>
                    <h4>Owner: </h4>
                    <input type="text" defaultValue={this.state.rentProduct.owner} onChange={this.handleChangeProductOwner.bind(this)} />
                </div>
                <div>
                    <h4>Location: </h4>
                    <input type="text" defaultValue={this.state.rentProduct.location} onChange={this.handleChangeProductLocation.bind(this)} />
                </div>
                <button onClick={this.updateRentProductDetails.bind(this)}>Update Product</button>
            </div>)

        }
        else {
            return <h1>Not Available</h1>;
        }
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchRentProduct,
        updateRentProduct,
        clearRentProduct
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        rentProduct: state.rentProduct
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(RentProduct);

