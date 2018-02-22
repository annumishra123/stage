import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { fetchShopStock, updateShopStock } from '../InventoryActions';
import clientConfig from '../../../config';


class ShopStockManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0
        }
    }

    componentDidMount() {
        this.props.fetchShopStock();
    }

    handleChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }

    updateQuantity(row) {
        if (this.state.quantity != 0) {
            let confirmUpdate = this.state.quantity < 0 ? confirm("Do you confirm to decrement the quantity by " + this.state.quantity) : confirm("Do you confirm to increment the quantity by " + this.state.quantity);
            if (confirmUpdate) {
                this.props.updateShopStock(row._original.product.id, row.sku, parseInt(this.state.quantity));
            }
        } else {
            let confirmReconcile = confirm("Do you confirm to reconcile the quantity");
            if (confirmReconcile) {
                this.props.updateShopStock(row._original.product.id, row.sku, parseInt(this.state.quantity));
            }
        }
        this.setState({
            quantity: 0
        });
    }

    renderShopStock() {
        if (this.props.shopStock) {
            if (this.props.shopStock.length > 0) {
                if (!clientConfig.shopStockColumns.find(o => o.id == 'edit') && (this.props.role == 'admin')) {
                    clientConfig.shopStockColumns.unshift({
                        Header: 'Quantity',
                        id: 'edit',
                        accessor: (row) => row,
                        Cell: ({row}) => <div>
                                           <input onChange={ this.handleChangeQuantity.bind(this) } value={ this.state.quantity } type="number" />
                                           <button onClick={ this.updateQuantity.bind(this, row) }>
                                             { this.state.quantity == 0 ? 'Reconcile' : 'Update' }
                                           </button>
                                         </div>
                    });
                }
                return <div>
                         <ReactTable filterable data={ this.props.shopStock } columns={ clientConfig.shopStockColumns } defaultPageSize={ 10 } className="-striped -highlight" />
                       </div>;
            }
        }
    }

    render() {
        return <section>
                 <h1>Shop Stock Manager</h1>
                 <br/>
                 { this.renderShopStock() }
               </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchShopStock,
        updateShopStock
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        shopStock: state.shopStock,
        role: state.auth.role,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(ShopStockManager);
