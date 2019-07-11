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

// Import Style
import styles from './inventory.css';

class RentProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            viewOrderDetails: false,
            tabIndex: 0,
            rentProduct: null,
            measurementType: null,
            minMeasurement: 0,
            maxMeasurement: 0,
            loosingMeasurement: 0,
            productStatus: ''
        }
    }

    componentDidMount() {
        this.props.fetchRentProduct(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rentProduct) {
            let rentProduct = nextProps.rentProduct;
            rentProduct.size = rentProduct.size.join(',');
            rentProduct.color = rentProduct.color.join(',');
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

    handleChangeProductAccessoriesName(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleChangeProductAccessoriesSku(e) {
        this.setState({
            sku: e.target.value
        })
    }

    handleChangeProductAccessoriesDesigner(e) {
        this.setState({
            designer: e.target.value
        })
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

    changeProductStatus(e) {
        this.setState({
            productStatus: e.target.value
        })
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

    viewInventory() {
        browserHistory.push('/inventory/');
    }

    updateRentProductDetails() {
        let product = this.state.rentProduct;
        if (this.state.productStatus == 'enable') {
            this.state.rentProduct.status = true;
            this.state.rentProduct.disabled = false;
        } else if (this.state.productStatus == 'temporary-disable') {
            this.state.rentProduct.status = false;
        } else if (this.state.productStatus == 'permanent-disable') {
            this.state.rentProduct.disabled = true;
            this.state.rentProduct.status = false;
        }
        product.size = product.size ? product.size.split(',').map(function (size) {
            return size.trim()
        }) : product.size;
        product.color = product.color ? product.color.split(',').map(function (color) {
            return color.trim()
        }) : product.color;
        this.props.updateRentProduct(this.state.rentProduct);
    }

    renderProductStatus() {
        if (this.state.rentProduct.disabled == true && this.state.rentProduct.status == false) {
            return ('The Product Is Permamently Disabled')
        } else if (this.state.rentProduct.status == false && this.state.rentProduct.disabled == false) {
            return ('The Product Is Temporarily Disabled')
        } else if (this.state.rentProduct.status == true && this.state.rentProduct.disabled == false) {
            return ('The Product Is Enabled')
        } else {
            return ('Please check the status')
        }
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

    handleChangeMeasurementType(e) {
        this.setState({
            measurementType: e.target.value
        })
    }

    handleChangeMinMeasurement(e) {
        this.setState({
            minMeasurement: e.target.value
        })
    }

    handleChangeMaxMeasurement(e) {
        this.setState({
            maxMeasurement: e.target.value
        })
    }

    handleChangeLoosingMeasurement(e) {
        this.setState({
            loosingMeasurement: e.target.value
        })
    }

    addNewMeasurement() {
        if (this.state.measurementType) {
            let rentProduct = this.state.rentProduct;
            rentProduct.measurements[this.state.measurementType] = {
                min: this.state.minMeasurement,
                max: this.state.maxMeasurement,
                loosing: this.state.loosingMeasurement
            };
            this.setState({
                rentProduct: rentProduct
            });
        }
    }

    removeMeasurement(type) {
        let rentProduct = this.state.rentProduct;
        delete rentProduct.measurements[type];
        this.setState({
            rentProduct: rentProduct
        });
    }

    renderMeasurements() {
        if (Object.keys(this.state.rentProduct.measurements).length > 0) {
            let measurements = Object.keys(this.state.rentProduct.measurements);
            return <div>
                {measurements.map((line, i) => {
                    return <div key={i}>
                        <br />
                        <label><b>{line.toUpperCase()}</b></label>
                        <br />
                        <br />
                        <label>MIN: </label>
                        <input type="text" disabled={true} value={this.state.rentProduct.measurements[line].min} onChange={this.handleChangeProductMeasurements.bind(this)} />
                        <label>MAX: </label>
                        <input type="text" disabled={true} value={this.state.rentProduct.measurements[line].max} onChange={this.handleChangeProductMeasurements.bind(this)} />
                        <label>LOOSING: </label>
                        <input type="text" disabled={true} value={this.state.rentProduct.measurements[line].loosing} onChange={this.handleChangeProductMeasurements.bind(this)} />
                        <button onClick={this.removeMeasurement.bind(this, line)}>DELETE</button>
                        <br />
                    </div>;
                })}
                <br />
            </div>
        }
    }

    renderNewMeasurements() { }

    render() {
        if (this.state.rentProduct) {
            return (<div className={styles.rentStatus}>
                <button className={styles.backBtn} onClick={this.viewInventory.bind(this)}>Back</button>
                { /*} <div>
                                                        <h4>Sku: </h4>
                                                        <input type="text" value={ this.state.rentProduct.sku } onChange={ this.handleChangeProductSku.bind(this) } />
                                                      </div>
                                                      <div>
                                                        <h4>Name: </h4>
                                                        <input type="text" defaultValue={ this.state.rentProduct.name } onChange={ this.handleChangeProductName.bind(this) } />
                                                      </div>
                                                      <div>
                                                        <h4>Designer: </h4>
                                                        <input type="text" defaultValue={ this.state.rentProduct.designer } onChange={ this.handleChangeProductDesigner.bind(this) } />
                                                      </div>
                                                      <div>
                                                        <h4>Description: </h4>
                                                        <textarea type="text" defaultValue={ this.state.rentProduct.description } onChange={ this.handleChangeProductDescription.bind(this) } />
                                                      </div>
                                                      <div>
                                                        <h4>Occasion: </h4>
                                                        <input type="text" defaultValue={ this.state.rentProduct.occasion } onChange={ this.handleChangeProductOccasion.bind(this) } />
                                                      </div>
                                                      <div>
                                                        <h4>Retail Price: </h4>
                                                        <input type="text" defaultValue={ this.state.rentProduct.retailprice } onChange={ this.handleChangeProductRetailPrice.bind(this) } />
                                                      </div>
                                                      <div>
                                                        <h4>Rental Price: </h4>
                                                        <input type="text" defaultValue={ this.state.rentProduct.rentalprice } onChange={ this.handleChangeProductRentalPrice.bind(this) } />
                                                      </div>
                                                      <div>
                                                        <h4>Discounted Rental Price: </h4>
                                                        <input type="text" defaultValue={ this.state.rentProduct.discountedrentalprice } onChange={ this.handleChangeProductDiscountedRentalPrice.bind(this) } />
                                                      </div>
                                                      <div>
                                                        <h4>Accessories: </h4>
                                                        { this.state.rentProduct.accessories.map((line, i) => {
                                                    return (
                                                      <div key={ i }>
                                                          <br/>
                                                            <h4>NAME: </h4>
                                                            <input type="text" defaultValue={ line.name } onChange={ this.handleChangeProductAccessoriesName.bind(this) }/>
                                                            <br/>
                                                            <h4>SKU: </h4>
                                                            <input type="text" defaultValue={ line.sku } onChange={ this.handleChangeProductAccessoriesSku.bind(this) }/>
                                                            <br/>
                                                            <h4>DESIGNER: </h4>
                                                            <input type="text" defaultValue={ line.designer } onChange={ this.handleChangeProductAccessoriesDesigner.bind(this) }/>
                                                            <br/>
                                                          </div>)})}
                                                          </div>
                                                          <br/>
                                                      <div>
                                                        <h4>Gender: </h4>
                                                        <input type="text" defaultValue={ this.state.rentProduct.gender } onChange={ this.handleChangeProductGender.bind(this) } />
                                                      </div>
                                                      <div>
                                                        <h4>Image: </h4>
                                                        <input type="text" defaultValue={ this.state.rentProduct.frontimage } onChange={ this.handleChangeProductImage.bind(this) } />
                                                      </div>
                                                      <div>
                                                        <h4>Size: </h4>
                                                        <input type="text" defaultValue={ this.state.rentProduct.size } onChange={ this.handleChangeProductSize.bind(this) } />
                                                      </div>
                                                      <div>
                                                        <h4>Measurements: </h4>
                                                        { this.renderMeasurements() }
                                                        <select onChange={ this.handleChangeMeasurementType.bind(this) }>
                                                          <option value="">SELECT TYPE</option>
                                                          { clientConfig.measurements.map((type, i) => {
                                                                return <option key={ i } value={ type }>
                                                                         { type.toUpperCase() }
                                                                       </option>
                                                            }) }
                                                        </select>
                                                        <br/>
                                                        <br/>
                                                        <label>MIN: </label>
                                                        <input type="text" value={ this.state.minMeasurement } onChange={ this.handleChangeMinMeasurement.bind(this) } />
                                                        <label>MAX: </label>
                                                        <input type="text" value={ this.state.maxMeasurement } onChange={ this.handleChangeMaxMeasurement.bind(this) } />
                                                        <label>LOOSING: </label>
                                                        <input type="text" value={ this.state.loosingMeasurement } onChange={ this.handleChangeLoosingMeasurement.bind(this) } />
                                                        <button onClick={ this.addNewMeasurement.bind(this) }>ADD</button>
                                                        <br/>
                                                        <br/>
                                                      </div>
                                                      <div>
                                                        <h4>Composition: </h4>
                                                        <input type="text" defaultValue={ this.state.rentProduct.composition } onChange={ this.handleChangeProductComposition.bind(this) } />
                                                      </div>*/ }
                <div className={styles.proDisable}>
                    <h3>{this.state.rentProduct.name}</h3>
                    <br />
                    <br />
                    <select value={this.state.productStatus} onChange={this.changeProductStatus.bind(this)}>
                        <option value="">-- Select Status --</option>
                        {Object.keys(clientConfig.rentProductStatus).map((status, i) => {
                            return <option key={i} value={status}>
                                {clientConfig.rentProductStatus[status]}
                            </option>;
                        })}
                    </select>
                    <br />
                    <br />
                    <h5>{this.renderProductStatus()}</h5>
                </div>
                { /*<div>
                                                        <h4>Category: </h4>
                                                        <input type="text" defaultValue={ this.state.rentProduct.categories } onChange={ this.handleChangeProductCategory.bind(this) } />
                                                      </div>
                                                      <div>
                                                        <h4>Color: </h4>
                                                        <input type="text" defaultValue={ this.state.rentProduct.color } onChange={ this.handleChangeProductColor.bind(this) } />
                                                      </div>
                                                      <div>
                                                        <h4>Owner: </h4>
                                                        <input type="text" defaultValue={ this.state.rentProduct.owner } onChange={ this.handleChangeProductOwner.bind(this) } />
                                                      </div>
                                                      <div>
                                                        <h4>Location: </h4>
                                                        <input type="text" defaultValue={ this.state.rentProduct.location } onChange={ this.handleChangeProductLocation.bind(this) } />
                                                      </div>*/ }
                <br />
                <button onClick={this.updateRentProductDetails.bind(this)}>Update Product</button>
            </div>)

        } else {
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

