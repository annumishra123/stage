import axios from 'axios';

export function createCustomer(customer) {
    return function(dispatch, getState) {
        customer.emailId = getState().form.createEmail.values.email;
        let url = '/api/myaccount/profile/backend/create';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: customer,
            responseType: 'json'
        }).then(function(response) {
            alert('Customer information has been saved.');
        }).catch(function(error) {
            console.log(error);
        })
    }
}

export function getCustomerDetail(customer) {
    return function(dispatch) {
        let url = '/api/myaccount/profile/backend/get/?emailId=' + customer.email;
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
                alert('Customer found.');
            } else {
                dispatch({
                    type: 'FETCH_CUSTOMER_DETAIL',
                    payload: {}
                });
                alert('Customer not found.');
            }
        }).catch(function(error) {
            dispatch({
                type: 'FETCH_CUSTOMER_DETAIL',
                payload: {}
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
            alert('New address has been saved.');
        }).catch(function(error) {
            alert("Couldn't save new address.");
            console.log(error);
        })
    }
}
