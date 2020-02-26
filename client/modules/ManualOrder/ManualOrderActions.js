import axios from 'axios';

export function getOrderlineById(id) {
    return function(dispatch) {
        if (id) {
            let url = '/api/revshare/api/orderlinelogs/' + id;
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                responseType: 'json',
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                }
            }).then(function(response) {
                dispatch({
                    type: 'FETCH_REVSHARE_ORDERLINE',
                    payload: response.data
                })
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
}

export function updateOrderline(orderLine) {
    return function(dispatch) {
        let url = '/api/revshare/api/orderlinelogs/' + orderLine._id + '/replace';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: orderLine,
            responseType: 'json',
            headers: {
                "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
            }
        }).then(function(response) {
            alert('The Order Has Been Updated');
            dispatch({
                type: 'FETCH_REVSHARE_ORDERLINE',
                payload: response.data
            })
        }).catch(function(error) {
            console.log(error);
        });
    }
}

export function createOrderline(orderLine) {
    return function(dispatch) {
        let url = '/api/revshare/api/orderlinelogs';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: orderLine,
            responseType: 'json',
            headers: {
                "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
            }
        }).then(function(response) {
            alert('The Order Has Been Created');
            dispatch({
                type: 'FETCH_REVSHARE_ORDERLINE',
                payload: response.data
            });
        }).catch(function(error) {
            console.log(error);
        });
    }
}

export function deleteOrderLine(id) {
    return function(dispatch) {
        if (id) {
            let url = '/api/revshare/api/orderlinelogs/' + id;
            return axios({
                url: url,
                timeout: 20000,
                method: 'delete',
                responseType: 'json',
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                }
            }).then(function(response) {
                alert('The Order Has Been Deleted');
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
}