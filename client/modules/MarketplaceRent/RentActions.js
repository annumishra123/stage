import axios from 'axios';

export function getShopOrderListByDate(startDate, endDate) {
    return function (dispatch) {
        if (startDate && endDate) {
            let url = `/api/shop-service/backend/getOrderLinesbyDateRange/:${startDate}/:${endDate}`;
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                responseType: 'json',
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                }
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_MARKET_RENT_ORDERS',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function getOrdersByUserId(userId) {
    return function (dispatch) {
        if (userId) {
            let url = `/api/shop-service/backend/getOrderLinesByUserId?userId=${userId}`;
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                responseType: 'json',
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                }
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_MARKET_RENT_ORDERS',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function getOrdersByLookNumber(looknumber) {
    return function (dispatch) {
        if (looknumber) {
            let url = `/api/shop-service/backend/getOrderLinesBySku?sku=${looknumber}`
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                responseType: 'json',
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                }
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_MARKET_RENT_ORDERS',
                    payload: response.data
                });
            }).catch(function (error) {
                alert('Look number not found.');
                console.log(error);
            });
        } else {
            alert('Enter a valid Look Number');
        }
    }
}

export function getOrderDetail(id) {
    return function (dispatch) {
        if (id) {
            let url = `/api/shop-service/backend/getOrderLinesByFrontendId?orderId=${id}`;
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                responseType: 'json',
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                }
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_MARKET_RENT_ORDERS',
                    payload: response.data
                });
            }).catch(function (error) {
                alert('Could not fetch order detail');
                console.log(error);
            });
        }
    }
}