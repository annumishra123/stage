import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import CustomerForm from './CustomerForm.js';
import AddressForm from './AddressForm.js';
import EmailForm from './EmailForm.js';
import MeasurementsForm from './MeasurementsForm.js';
import FormSubmitButton from './FormSubmitButton.js';
import moment from 'moment';
import { selectAddress, saveAllCustomerDetails, getCustomerDetailByPhoneNumber, createComment } from '../CustomerActions';

// Import Style
import styles from './customerForm.css';

const style = {
    padding: '10px 20px',
    width: 300,
    display: 'block',
    margin: '20px auto',
    fontSize: '16px',
};

class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        };
    }

    saveAllCustomerDetails() {
        this.props.saveAllCustomerDetails();
    }

    createShopOrder() {
        browserHistory.push('/shop/create');
    }

    createRentOrder() {
        browserHistory.push('/rent/create');
    }

    selectAddress(id) {
        this.props.selectAddress(id);
    }

    handleChangeMobileNumber(e) {
        this.setState({
            phoneNumber: e.target.value
        });
    }

    getCustomerDetailByPhoneNumber(e) {
        e.preventDefault();
        this.props.getCustomerDetailByPhoneNumber(this.state.phoneNumber);
    }

    handleChangeComment(e) {
        this.setState({
            comment: e.target.value
        });
    }

    saveComment() {
        this.props.createComment(this.props.customerDetail.email, this.state.comment);
    }

    renderComments() {
        if (this.props.customerComments && this.props.customerComments.length > 0) {
            return <table>
                <tr>
                    <th>Comment</th>
                    <th>Date</th>
                </tr>
                {this.props.customerComments.map((comment) => {
                    return <tr>
                        <td>
                            {comment.comment}
                        </td>
                        <td>
                            {moment.unix(comment.createdtimestamp).format('lll')}
                        </td>
                    </tr>
                })}
            </table>
        }
    }

    render() {
        return (<section className={styles.createCustomer}>
            <EmailForm />
            <div className={styles.byMailbtn}>
                <FormSubmitButton formName="createEmail" text="Find Customer By Email" />
            </div>
            <br />
            <form onSubmit={this.getCustomerDetailByPhoneNumber.bind(this)}>
                <label htmlFor="email">Phone Number </label>
                <input type="text" onChange={this.handleChangeMobileNumber.bind(this)} />
                <div className={styles.byMailbtn}>
                    <button type="submit" style={style} onClick={this.getCustomerDetailByPhoneNumber.bind(this)}>Find Customer By Number</button>
                </div>
            </form>
            <CustomerForm />
            {this.props.role == 'admin' || this.props.role == 'superuser' ? <FormSubmitButton formName="createCustomer" text="Save Contact" /> : <br />}
            <AddressForm selectAddress={this.selectAddress.bind(this)} />
            {this.props.role == 'admin' || this.props.role == 'superuser' ? <FormSubmitButton formName="createAddress" text="Save Address" /> : <br />}
            {/* <MeasurementsForm />
            {this.props.role === 'admin' ? <FormSubmitButton formName="createMeasurements" text="Save Measurements" /> : <br />} */}
            {this.props.role == 'admin' || this.props.role == 'superuser' ? <button type="button" style={style} onClick={this.saveAllCustomerDetails.bind(this)}>Save All Information</button> : <br />}
            {this.renderComments()}
            <div>
                <input type="text" onChange={this.handleChangeComment.bind(this)} />
                <button onClick={this.saveComment.bind(this)}>Save Comment</button>
            </div>
            {/* {this.props.role === 'admin' && this.props.customerDetail && this.props.selectedAddress ? <button type="button" className={styles.marginSides} style={style} onClick={this.createShopOrder.bind(this)}>New Shop Order</button> : <br />} */}
            {/* {(this.props.role == 'admin' || this.props.role == 'superuser') && this.props.customerDetail && this.props.selectedAddress ? <button type="button" className={styles.marginSides} style={style} onClick={this.createRentOrder.bind(this)}>New Rent Order</button> : <br />} */}
        </section>);
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        submit: submit,
        selectAddress: selectAddress,
        saveAllCustomerDetails: saveAllCustomerDetails,
        getCustomerDetailByPhoneNumber: getCustomerDetailByPhoneNumber,
        createComment: createComment
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        customerDetail: state.customerDetail,
        selectedAddress: state.selectedAddress,
        customerComments: state.customerComments
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Customer);
