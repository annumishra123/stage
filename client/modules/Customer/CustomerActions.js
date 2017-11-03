import axios from 'axios';
import { reset } from 'redux-form';

export function createCustomer(customer) {
    return function(dispatch, getState) {
        let cust = {
            emailId: getState().form.createEmail.values.email,
            firstName: customer.firstName,
            lastName: customer.lastName,
            phoneNumber: customer.phoneNumber,
            dataSource: customer.dataSource
        }
        let url = '/api/myaccount/profile/backend/create';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: cust,
            responseType: 'json'
        }).then(function(response) {
            dispatch(getCustomerDetail(cust.emailId));
            alert('Customer information has been saved.');
        }).catch(function(error) {
            console.log(error);
        })
    }
}

export function getCustomerDetail(email) {
    return function(dispatch) {
        dispatch({
            type: 'FETCH_CUSTOMER_DETAIL',
            payload: null
        });
        let url = '/api/myaccount/profile/backend/get/?emailId=' + email;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function(response) {
            let customer = response.data;
            if (customer) {
                dispatch({
                    type: 'FETCH_CUSTOMER_DETAIL',
                    payload: customer
                });
            } else {
                dispatch({
                    type: 'FETCH_CUSTOMER_DETAIL',
                    payload: null
                });
                alert('Customer not found.');
            }
        }).catch(function(error) {
            dispatch({
                type: 'FETCH_CUSTOMER_DETAIL',
                payload: null
            });
            alert('Customer not found.');
            console.log(error);
        })
    }
}

export function createMeasurements(measurements) {
    return function(dispatch, getState) {
        measurements.email = getState().form.createEmail.values.email;
        let url = '/api/myaccount/profile/backend/measurements/save';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: measurements,
            responseType: 'json'
        }).then(function(response) {
            dispatch(getCustomerDetail(measurements.email));
            alert('Customer measurements have been saved.');
        }).catch(function(error) {
            alert("Customer measurements couldn't be saved.");
            console.log(error);
        })
    }
}

export function createAddress(address) {
    return function(dispatch, getState) {
        address.userId = getState().form.createEmail.values.email;
        let url = '/api/myaccount/profile/backend/shipping/backend/save';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: address,
            responseType: 'json'
        }).then(function(response) {
            dispatch(reset('createAddress'));
            dispatch(getCustomerDetail(address.userId));
            alert('New address has been saved.');
        }).catch(function(error) {
            alert("Couldn't save new address.");
            console.log(error);
        })
    }
}

export function selectAddress(id) {
    return function(dispatch) {
        dispatch({
            type: 'SELECT_ADDRESS',
            payload: id
        });
    }
}
