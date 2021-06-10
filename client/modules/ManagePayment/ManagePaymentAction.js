import clientConfig from '../../config';
import axios from 'axios';

export function fetchAllOrderLine() {
    return function (dispatch) {
        let url = `${clientConfig.targetURL}/api/shop-service/backend/getOrderLinesForPayment`;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_ALL_ORDERLINE',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function fetchAllReturnOrderLine() {
    return function (dispatch) {
        let url = `${clientConfig.targetURL}/api/shop-service/backend/getReturnOrdersForPayment`;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_ALL_RETURN_ORDERLINE',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function approvalUpdateOrderLine(param) {
    return function (dispatch) {
        let action = param.actionName, // either approve or disapprove
            url = `${clientConfig.targetURL}/api/shop-service/backend/orderLinePayment/${action}`;
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: param.requestData
        }).then((response) => {
            console.log(response.data);
            dispatch(fetchAllOrderLine());
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function approvalUpdateRefund(param) {
    return function (dispatch) {
        let action = param.actionName, // either approve or disapprove
            url = `${clientConfig.targetURL}/api/shop-service/backend/refund/${action}`;
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: param.requestData
        }).then((response) => {
            console.log(response.data);
            dispatch(fetchAllReturnOrderLine());
        }).catch((error) => {
            console.log(error);
        });
    }
}