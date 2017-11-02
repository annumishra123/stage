import axios from 'axios';

export function getShopOrderListByDate(startDate, endDate) {
    return function(dispatch) {
        if (startDate && endDate) {
            let url = '/api/shop-service/backend/getOrdersbyDateRange/' + startDate + '/' + endDate;
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                responseType: 'json'
            }).then(function(response) {
                dispatch({
                    type: 'FETCH_SHOP_ORDERS',
                    payload: response.data
                })
            }).catch(function(error) {
                console.log(error);
            })
        }
    }
}

export function getOrderDetailByUserId(userId) {
    return function(dispatch) {
        if (userId) {
            let url = '/api/shop-service/backend/getOrdersByUserId?userId=' + userId;
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                responseType: 'json'
            }).then(function(response) {
                dispatch({
                    type: 'FETCH_SHOP_ORDERS',
                    payload: response.data
                })
            }).catch(function(error) {
                console.log(error);
            })
        }
    }
}

export function getOrderDetail(id) {
    return function(dispatch) {
        if (id) {
            let url = '/api/shop-service/backend/getOrderByFrontendId?orderId=' + id;
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                responseType: 'json'
            }).then(function(response) {
                dispatch({
                    type: 'FETCH_SHOP_ORDER_DETAIL',
                    payload: response.data
                })
            }).catch(function(error) {
                console.log(error);
            })
        }
    }
}

export function removeItem(cancelRequest) {
    return function(dispatch, getState) {
        let cancellationObject = {
            cancellationReason: cancelRequest.cancelReason,
            cancellationUser: getState().auth.email,
            orderId: cancelRequest.orderId,
            skusToCancel: cancelRequest.sku ? [
                cancelRequest.sku
            ] : null
        };
        let url = '/api/shop-service/backend/cancelOrder';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: cancellationObject,
            responseType: 'json'
        }).then(function(response) {
            dispatch(getOrderDetail(cancelRequest.frontendOrderId));
            if (cancelRequest.sku) {
                alert('Product has been removed from the order');
            } else {
                alert('The order has been canceled');
            }
        }).catch(function(error) {
            console.log(error);
        })
    }
}

