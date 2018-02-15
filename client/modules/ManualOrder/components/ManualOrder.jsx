import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getOrderlineById, updateOrderline, deleteOrderLine, createOrderline } from '../ManualOrderActions';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import _ from 'lodash-uuid';

// Import Style
import styles from './ManualOrder.css';


class ManualOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderLine: null,
            newOrderLine: {}
        }
    }

    componentDidMount() {
        if (this.props.params.id) {
            this.props.getOrderlineById(this.props.params.id);
        }
    }

    componentWillReceiveProps(props) {
        if (props.orderLine) {
            this.setState({
                orderLine: props.orderLine
            });
        }
    }

    updateOrderLine() {
        let orderLine = this.state.orderLine;
        orderLine.lastUpdatedTime = moment().unix() * 1000;
        if (orderLine.outfitname && orderLine.designer && orderLine.rentPaid && orderLine.pickupDateUTC && orderLine.orderDate && orderLine.orderCity) {
            this.props.updateOrderline(orderLine);
        } else {
            alert('Please Enter Valid Data');
        }
    }

    generateLetterId() {
        let rtn = '';
        let ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = 0; i < 3; i++) {
            rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
        }
        return rtn;
    }

    generateNumericId() {
        let rtn = '';
        let ALPHABET = '0123456789';
        for (var i = 0; i < 9; i++) {
            rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
        }
        return rtn;
    }

    saveOrderLine() {
        let orderLine = this.state.newOrderLine;
        if (orderLine.outfitname && orderLine.designer && orderLine.rentPaid && orderLine.pickupDateUTC && orderLine.orderDate && orderLine.orderCity) {
            orderLine._id = _.uuid().replace(/-/g, '');
            orderLine.orderId = 'STAGE3-MANUAL-' + this.generateLetterId() + '-' + this.generateNumericId();
            orderLine.lastUpdatedTime = moment().unix() * 1000;
            orderLine.owner = this.props.params.owner;
            orderLine.status = 'MANUAL';
            orderLine.isCancelled = false;
            this.props.createOrderline(orderLine);
        } else {
            alert('Please Enter Valid Data');
        }
    }

    deleteOrderLine() {
        this.props.deleteOrderLine(this.state.orderLine._id);
    }

    handleChangeName(e) {
        let orderLine = this.state.orderLine;
        orderLine.outfitname = e.target.value;
        this.setState({
            orderLine: orderLine
        });
    }

    handleChangeDesigner(e) {
        let orderLine = this.state.orderLine;
        orderLine.designer = e.target.value;
        this.setState({
            orderLine: orderLine
        });
    }

    handleChangePrice(e) {
        let orderLine = this.state.orderLine;
        orderLine.rentPaid = e.target.value;
        this.setState({
            orderLine: orderLine
        });
    }

    handleChangeCity(e) {
        let orderLine = this.state.orderLine;
        orderLine.orderCity = e.target.value;
        this.setState({
            orderLine: orderLine
        });
    }

    handleChangeCancelled(e) {
        let orderLine = this.state.orderLine;
        orderLine.isCancelled = e.target.value;
        this.setState({
            orderLine: orderLine
        });
    }

    handleChangePickupDate(date) {
        let orderLine = this.state.orderLine;
        orderLine.pickupDateUTC = date.unix() * 1000;
        this.setState({
            orderLine: orderLine
        });
    }

    handleChangeOrderDate(date) {
        let orderLine = this.state.orderLine;
        orderLine.orderDate = date.unix() * 1000;
        this.setState({
            orderLine: orderLine
        });
    }

    renderUpdateOrderline() {
        if (this.state.orderLine) {
            return <div>
                     { this.state.orderLine.image ? <img src={ this.state.orderLine.image } style={ { width: '200px' } } /> : null }
                     <br/>
                     <div className={ styles.manualdetail }>
                     <label>Order Id </label>
                     <input disabled={ true } type="text" value={ this.state.orderLine.orderId } />
                     <br/>
                     <label>Name </label>
                     <input type="text" defaultValue={ this.state.orderLine.outfitname } onChange={ this.handleChangeName.bind(this) } />
                     <br/>
                     <label>Owner </label>
                     <input type="text" disabled={ true } defaultValue={ this.state.orderLine.owner } />
                     <br/>
                     <label>Designer </label>
                     <input type="text" defaultValue={ this.state.orderLine.designer } onChange={ this.handleChangeDesigner.bind(this) } />
                     <br/>
                     <label>Rent Price </label>
                     <input type="number" defaultValue={ this.state.orderLine.rentPaid } onChange={ this.handleChangePrice.bind(this) } />
                     <br/>
                     <label>Order City </label>
                     <input type="text" defaultValue={ this.state.orderLine.orderCity } onChange={ this.handleChangeCity.bind(this) } />
                     <br/>
                     <label>Status </label>
                     <input disabled={ true } type="text" defaultValue={ this.state.orderLine.status } />
                     <br/>
                     <label>Cancelled </label>
                     <input disabled={ this.state.orderLine.status !== 'MANUAL' ? true : false } defaultValue={ this.state.orderLine.isCancelled } onChange={ this.handleChangeCancelled.bind(this) } />
                     <br/>
                     <label>Pickup Date </label>
                     <DatePicker selected={ moment(this.state.orderLine.pickupDateUTC) } onChange={ this.handleChangePickupDate.bind(this) } />
                     <label>Order Date </label>
                     <DatePicker selected={ moment(this.state.orderLine.orderDate) } onChange={ this.handleChangeOrderDate.bind(this) } />
                     <button onClick={ this.updateOrderLine.bind(this) }>Save</button>
                     { this.state.orderLine.status == 'MANUAL' ? <button onClick={ this.deleteOrderLine.bind(this) }>Delete</button> : null }
                    </div>
                   </div>
        }
    }

    handleChangeNewName(e) {
        let orderLine = this.state.newOrderLine;
        orderLine.outfitname = e.target.value;
        this.setState({
            orderLine: orderLine
        });
    }

    handleChangeNewDesigner(e) {
        let orderLine = this.state.newOrderLine;
        orderLine.designer = e.target.value;
        this.setState({
            orderLine: orderLine
        });
    }

    handleChangeNewPrice(e) {
        let orderLine = this.state.newOrderLine;
        orderLine.rentPaid = e.target.value;
        this.setState({
            orderLine: orderLine
        });
    }

    handleChangeNewCity(e) {
        let orderLine = this.state.newOrderLine;
        orderLine.orderCity = e.target.value;
        this.setState({
            orderLine: orderLine
        });
    }

    handleChangeNewPickupDate(date) {
        let orderLine = this.state.newOrderLine;
        orderLine.pickupDateUTC = date.unix() * 1000;
        this.setState({
            orderLine: orderLine
        });
    }

    handleChangeNewOrderDate(date) {
        let orderLine = this.state.newOrderLine;
        orderLine.orderDate = date.unix() * 1000;
        this.setState({
            orderLine: orderLine
        });
    }

    renderCreateOrderLine() {
        return <div className={ styles.manualdetail }>
                 <label>Name </label>
                 <input type="text" onChange={ this.handleChangeNewName.bind(this) } />
                 <br/>
                 <label>Owner </label>
                 <input disabled={ true } type="text" value={ this.props.params.owner } />
                 <br/>
                 <label>Designer </label>
                 <input type="text" onChange={ this.handleChangeNewDesigner.bind(this) } />
                 <br/>
                 <label>Rent Price </label>
                 <input type="number" onChange={ this.handleChangeNewPrice.bind(this) } />
                 <br/>
                 <label>Order City </label>
                 <input type="text" onChange={ this.handleChangeNewCity.bind(this) } />
                 <br/>
                 <label>Pickup Date </label>
                 <DatePicker selected={ this.state.newOrderLine ? moment(this.state.newOrderLine.pickupDateUTC) : moment() } onChange={ this.handleChangeNewPickupDate.bind(this) } />
                 <label>Order Date </label>
                 <DatePicker selected={ this.state.newOrderLine ? moment(this.state.newOrderLine.orderDate) : moment() } onChange={ this.handleChangeNewOrderDate.bind(this) } />
                 <button onClick={ this.saveOrderLine.bind(this) }>Create</button>
               </div>
    }

    renderAuthenticationIssue() {
        return <div>
                 <p>You don't have the rights to view this page!</p>
               </div>
    }

    render() {
        return <section className={ styles.ManualOrder }>
                 <h1>{ this.props.params.id ? 'Update' : 'Create' } Order Line</h1>
                 <br/>
                 { this.props.user == 'rishi@stage3.co' ? this.props.params.id ? this.renderUpdateOrderline() : this.renderCreateOrderLine() : this.renderAuthenticationIssue() }
               </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getOrderlineById,
        updateOrderline,
        deleteOrderLine,
        createOrderline
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        orderLine: state.revShareOrderLine
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(ManualOrder);