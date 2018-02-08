import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { fetchAccessoryCatalog, fetchRentCatalog, fetchShopCatalog, changeShopLookLocation, changeRentLookLocation, changeRentAccessoryLocation, fetchShopProduct, fetchRentProduct, updateShopProduct, clearShopProduct } from '../InventoryActions';
import clientConfig from '../../../config';
import { CSVLink } from 'react-csv';
import ReactModal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class ShopProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            viewOrderDetails: false,
            tabIndex: 0,
            shopProduct: null
        }
    }

    componentDidMount() {
        this.props.fetchShopProduct(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.shopProduct) {
            this.setState({
                shopProduct: nextProps.shopProduct
            });
        }
    }

    handleChangeProductSku(e) {
        this.state.shopProduct.sku = e.target.value;
    }

    handleChangeProductName(e) {
        this.state.shopProduct.name = e.target.value;
    }

    handleChangeProductDesigner(e) {
        this.state.shopProduct.designer = e.target.value;
    }

    handleChangeProductDescription(e) {
        this.state.shopProduct.description = e.target.value;
    }

    handleChangeProductCondition(e) {
        this.state.shopProduct.condition = e.target.value;
    }

    handleChangeProductRetailPrice(e) {
        this.state.shopProduct.retailPrice = e.target.value;
    }

    handleChangeProductSalePrice(e) {
        this.state.shopProduct.salePrice = e.target.value;
    }

    handleChangeProductGender(e) {
        this.state.shopProduct.gender = e.target.value;
    }

    handleChangeProductImage(e) {
        this.state.shopProduct.image = e.target.value;
    }

    handleChangeProductSize(e) {
        this.state.shopProduct.size = e.target.value;
    }

    handleChangeProductMeasurements(e) {
        this.state.shopProduct.measurements = e.target.value;
    }

    handleChangeProductComposition(e) {
        this.state.shopProduct.composition = e.target.value;
    }

    handleChangeProductStatus(e) {
        this.state.shopProduct.status = e.target.value;
    }


    handleChangeProductCategory(e) {
        this.state.shopProduct.category = e.target.value;
    }

    handleChangeProductColor(e) {
        this.state.shopProduct.color = e.target.value;
    }

    handleChangeProductLocation(e) {
        this.state.shopProduct.location = e.target.value;
    }

    viewShopLook(id) {
        browserHistory.push('/inventory/shop/' + id);
    }

    updateShopProductDetails() {
        this.props.updateShopProduct(this.state.shopProduct);
    }

    renderShopLooks() {
        if (this.props.shopCatalog) {
            if (this.props.shopCatalog.length > 0) {
                if (!clientConfig.shopLooksColumns.find(o => o.id == 'edit') && (this.props.role == 'admin')) {
                    clientConfig.shopLooksColumns.unshift({
                        Header: '',
                        id: 'edit',
                        accessor: 'id',
                        Cell: ({ value }) => <div>
                            <button onClick={this.viewShopLook.bind(this, value)}>Edit Product</button>
                        </div>
                    });
                }
                return <div>
                    <ReactTable filterable data={this.props.shopCatalog} columns={clientConfig.shopLooksColumns} defaultPageSize={10} className="-striped -highlight" />
                </div>;
            }
        }
    }

    render() {
        if (this.state.shopProduct) {
            return (<div>
                <button onClick={this.renderShopLooks.bind(this)}>Back</button>
                <div>
                    <h4>Sku: </h4>
                    <input type="text" value={this.state.shopProduct.sku} onChange={this.handleChangeProductSku.bind(this)} />
                </div>
                <div>
                    <h4>Name: </h4>
                    <input type="text" defaultValue={this.state.shopProduct.name} onChange={this.handleChangeProductName.bind(this)} />
                </div>
                <div>
                    <h4>Designer: </h4>
                    <input type="text" defaultValue={this.state.shopProduct.designer} onChange={this.handleChangeProductDesigner.bind(this)} />
                </div>
                <div>
                    <h4>Description: </h4>
                    <textarea type="text" defaultValue={this.state.shopProduct.description} onChange={this.handleChangeProductDescription.bind(this)} />
                </div>
                <div>
                    <h4>Condition: </h4>
                    <input type="text" defaultValue={this.state.shopProduct.condition} onChange={this.handleChangeProductCondition.bind(this)} />
                </div>
                <div>
                    <h4>Retail Price: </h4>
                    <input type="text" defaultValue={this.state.shopProduct.originalretailprice} onChange={this.handleChangeProductRetailPrice.bind(this)} />
                </div>
                <div>
                    <h4>Sale Price: </h4>
                    <input type="text" defaultValue={this.state.shopProduct.saleprice} onChange={this.handleChangeProductSalePrice.bind(this)} />
                </div>
                <div>
                    <h4>Gender: </h4>
                    <input type="text" defaultValue={this.state.shopProduct.gender} onChange={this.handleChangeProductGender.bind(this)} />
                </div>
                <div>
                    <h4>Image: </h4>
                    <input type="text" defaultValue={this.state.shopProduct.frontimage} onChange={this.handleChangeProductImage.bind(this)} />
                </div>
                <div>
                    <h4>Size: </h4>
                    <input type="text" defaultValue={this.state.shopProduct.size} onChange={this.handleChangeProductSize.bind(this)} />
                </div>
                <div>
                    <h4>Composition: </h4>
                    <input type="text" defaultValue={this.state.shopProduct.composition} onChange={this.handleChangeProductComposition.bind(this)} />
                </div>
                <div>
                    <h4>Status: </h4>
                    <input type="text" defaultValue={this.state.shopProduct.status} onChange={this.handleChangeProductStatus.bind(this)} />
                </div>
                <div>
                    <h4>Category: </h4>
                    <input type="text" defaultValue={this.state.shopProduct.categories} onChange={this.handleChangeProductCategory.bind(this)} />
                </div>
                <div>
                    <h4>Color: </h4>
                    <input type="text" defaultValue={this.state.shopProduct.color} onChange={this.handleChangeProductColor.bind(this)} />
                </div>
                <div>
                    <h4>Location: </h4>
                    <input type="text" defaultValue={this.state.shopProduct.location} onChange={this.handleChangeProductLocation.bind(this)} />
                </div>
                <button onClick={this.updateShopProductDetails.bind(this)}>Update Product</button>
            </div>)
        }
        else{
            return null;
        }

    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchShopProduct,
        updateShopProduct,
        clearShopProduct
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        shopProduct: state.shopProduct
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(ShopProduct);

