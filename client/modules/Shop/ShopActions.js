import axios from 'axios';
import clientConfig from '../../config';
import { browserHistory } from 'react-router'

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
            });
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
            });
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
                alert('Could not fetch order detail');
                console.log(error);
            });
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
            alert('Could not change order status');
            console.log(error);
        });
    }
}

export function fetchProduct(sku) {
    return function(dispatch) {
        let loopBackFilter = {
            where: {
                sku: sku.toUpperCase()
            }
        }
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/SaleProducts/findOne?filter=' + JSON.stringify(loopBackFilter);
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function(response) {
            dispatch({
                type: 'FETCH_PRODUCT',
                payload: response.data
            })
        }).catch(function(error) {
            alert('Could not fetch product');
            console.log(error);
        });
    }
}

export function getPricingOfShoppingCart(cart) {
    return function(dispatch, getState) {
        let cartObject = {
            "discountCode": "",
            "products": cart,
            "userId": getState().customerDetail.email
        }
        let url = '/api/shop-service/backend/getPricing';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: cartObject,
            responseType: 'json'
        }).then(function(response) {
            dispatch({
                type: 'FETCH_SHOP_PRICING',
                payload: response.data
            });
            dispatch({
                type: 'FETCH_PRODUCT',
                payload: null
            });
        }).catch(function(error) {
            alert('Could not fetch pricing');
            console.log(error);
        });
    }
}

export function addItemToCart(id) {
    return function(dispatch, getState) {
        let cart = getState().shopPricing ? Object.keys(getState().shopPricing.linePricing) : [];
        if (cart.indexOf(id) == -1) {
            cart.push(id);
        }
        dispatch(getPricingOfShoppingCart(cart));
        alert('Product added to cart');
    }
}

export function removeItemFromCart(id) {
    return function(dispatch, getState) {
        let cart = getState().shopPricing ? Object.keys(getState().shopPricing.linePricing) : [];
        if (cart.indexOf(id) !== -1) {
            cart = cart.filter(e => e !== id);
        }
        dispatch(getPricingOfShoppingCart(cart));
        alert('Product removed from cart');
    }
}

export function placeOrder(orderObject) {
    return function(dispatch) {
        let url = '/api/shop-service/backend/initiateOrder';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: orderObject,
            responseType: 'json'
        }).then(function(response) {
            dispatch({
                type: 'FETCH_SHOP_PRICING',
                payload: null
            });
            browserHistory.push('/shop?orderId=' + response.data.order.frontendOrderId);
        }).catch(function(error) {
            alert('Could not initiate order');
            console.log(error);
        });
    }
}

export function confirmPayment(confirmPaymentObject) {
    return function(dispatch) {
        let url = '/api/shop-service/backend/recordPayment';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: confirmPaymentObject,
            responseType: 'json'
        }).then(function(response) {
            alert('Payment has been recorded');
            browserHistory.push('/customer');
        }).catch(function(error) {
            alert('Could not confirm payment');
            console.log(error);
        });
    }
}

