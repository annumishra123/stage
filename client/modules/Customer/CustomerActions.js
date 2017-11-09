import axios from 'axios';
import { reset, submit } from 'redux-form';

export function createCustomer(customer) {
    return function(dispatch, getState) {
        let isValid = false;
        let mobileRegex = /^\d{10}$/;
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (customer.firstName && customer.lastName && mobileRegex.test(customer.phoneNumber) && customer.dataSource && emailRegex.test(getState().form.createEmail.values.email)) {
            isValid = true;
        }
        if (isValid) {
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
            });
        } else {
            alert('Enter valid customer information');
        }
    }
}

export function getCustomerDetail(email) {
    return function(dispatch) {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = regex.test(email);
        if (isValid) {
            let url = '/api/myaccount/profile/backend/get/?emailId=' + email;
            dispatch({
                type: 'SELECT_ADDRESS',
                payload: null
            });
            dispatch({
                type: 'FETCH_CUSTOMER_DETAIL',
                payload: null
            });
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
                    dispatch(getCreditPoints(customer.email));
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
            });
        } else {
            alert('Enter a valid email address');
        }
    }
}

export function createMeasurements(measurements) {
    return function(dispatch, getState) {
        let isValidMeasurements = true;
        if (Object.keys(measurements).length > 0) {
            measurements.email = getState().customerDetail.email;
            Object.keys(measurements).map((key) => {
                if (key != 'email') {
                    if (measurements[key] !== '' && isNaN(measurements[key])) {
                        isValidMeasurements = false;
                    }
                }
            });
        } else {
            isValidMeasurements = false;
        }
        let isValid = false;
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRegex.test(measurements.email) && isValidMeasurements) {
            isValid = true;
        }
        if (isValid) {
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
            });
        } else {
            alert('Enter valid measurements');
        }
    }
}

export function createAddress(address) {
    return function(dispatch, getState) {
        let isValid = false;
        let pincodeRegex = /^[0-9]{6}$/;
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (address.address && address.city && address.state && pincodeRegex.test(address.pincode) && emailRegex.test(getState().customerDetail.email)) {
            isValid = true;
        }
        if (isValid) {
            address.userId = getState().customerDetail.email;
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
            });
        } else {
            alert('Enter a valid address');
        }
    }
}

export function saveAllCustomerDetails() {
    return function(dispatch) {
        Promise.resolve(dispatch(submit('createCustomer'))).then((value) => {
            dispatch(submit('createAddress'));
            dispatch(submit('createMeasurements'));
        });
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

export function getCreditPoints(userId) {
    return function(dispatch) {
        if (userId) {
            let url = '/api/credits/getAccount/';
            return axios({
                url: url,
                timeout: 20000,
                method: 'post',
                data: {
                    "userId": userId
                },
                responseType: 'json'
            }).then(function(response) {
                dispatch({
                    type: 'FETCH_CREDIT_POINTS',
                    payload: response.data.availablePoints
                })
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
}