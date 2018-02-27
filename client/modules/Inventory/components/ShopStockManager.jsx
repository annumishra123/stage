import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { fetchShopStock, updateShopStock } from '../InventoryActions';
import clientConfig from '../../../config';
import ReactModal from 'react-modal';

// Import Style
import styles from './inventory.css';


class ShopStockManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
            viewModal: false,
            row: null
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

    showModal(row) {
        this.setState({
            viewModal: true,
            row: row
        });
    }

    hideModal() {
        this.setState({
            viewModal: false,
            row: null,
            quantity: 0
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
            viewModal: false,
            row: null,
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
                        Cell: ({row}) => <button onClick={ this.showModal.bind(this, row) }>Update</button>
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
                 <ReactModal className={ styles.stockPopup } isOpen={ this.state.viewModal } onRequestClose={ this.hideModal.bind(this) } contentLabel="Update Quantity">
                   <span onClick={ this.hideModal.bind(this) }>×</span>
                   <br/>
                   <h3>Stock Manager</h3>
                   <input onChange={ this.handleChangeQuantity.bind(this) } value={ this.state.quantity } type="number" />
                   <button onClick={ this.updateQuantity.bind(this, this.state.row) }>
                     { this.state.quantity == 0 ? 'Reconcile' : 'Update' }
                   </button>
                 </ReactModal>
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
