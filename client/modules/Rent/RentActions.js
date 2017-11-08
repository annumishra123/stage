import axios from 'axios';
import clientConfig from '../../config';
import { browserHistory } from 'react-router';
import moment from 'moment';

export function getShopOrderListByDate(startDate, endDate) {
    return function (dispatch) {
        if (startDate && endDate) {
            let url = '/api/om/orders/backend/get/byDateRange/' + startDate + '/' + endDate;
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                responseType: 'json'
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_RENT_ORDERS',
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
            let url = '/api/om/orders/backend/get/byUserId/' + userId + '/';
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                responseType: 'json'
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_RENT_ORDERS',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function getOrderDetail(id) {
    return function (dispatch) {
        if (id) {
            let url = '/api/om/orders/backend/view/' + id + '/';
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                responseType: 'json'
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_RENT_ORDER_DETAIL',
                    payload: response.data
                })
            }).catch(function (error) {
                alert('Could not fetch order detail');
                console.log(error);
            });
        }
    }
}

export function removeItem(cancelRequest) {
    return function (dispatch, getState) {
        let cancellationObject = {
            cancellationReason: cancelRequest.cancelReason,
            cancellationUser: getState().auth.email,
            orderlineId: cancelRequest.lineId
        };
        let url = '/api/om/orders/backend/partialCancellation/';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: cancellationObject,
            responseType: 'json'
        }).then(function (response) {
            dispatch(getOrderDetail(cancelRequest.frontendOrderId));
            alert('Product has been removed from the order');
        }).catch(function (error) {
            alert('Could not change order status');
            console.log(error);
        });
    }
}

export function cancelOrder(cancelRequest) {
    return function (dispatch, getState) {
        let cancellationObject = {
            cancellationReason: cancelRequest.cancelReason,
            cancellationUser: getState().auth.email,
            orderId: cancelRequest.orderId
        };
        let url = '/api/om/orders/backend/requestcancel/v2/';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: cancellationObject,
            responseType: 'json'
        }).then(function (response) {
            dispatch(getOrderDetail(cancelRequest.frontendOrderId));
            alert('The order has been canceled');
        }).catch(function (error) {
            alert('Could not change order status');
            console.log(error);
        });
    }
}

export function fetchProduct(looknumber) {
    return function (dispatch) {
        let loopBackFilter = {
            where: {
                looknumber: looknumber.toUpperCase()
            }
        }
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/Looks/findOne?filter=' + JSON.stringify(loopBackFilter);
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch({
                type: 'FETCH_RENTAL_PRODUCT',
                payload: response.data
            });
            dispatch(getBookedDates(moment()));
        }).catch(function (error) {
            alert('Could not fetch product');
            console.log(error);
        });
    }
}

export function fetchAccessory(sku) {
    return function (dispatch) {
        let loopBackFilter = {
            where: {
                sku: sku.toUpperCase()
            }
        }
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/Accessories/findOne?filter=' + JSON.stringify(loopBackFilter);
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch({
                type: 'FETCH_RENTAL_PRODUCT',
                payload: response.data
            });
            dispatch(getBookedDates(moment()));
        }).catch(function (error) {
            alert('Could not fetch product');
            console.log(error);
        });
    }
}

export function getBookedDates(date) {
    return function (dispatch, getState) {
        let obj = {
            productId: getState().rentProductDetail._id,
            month: date.month() + 1,
            year: date.year()
        }
        let url = '/api/om/calendar/calendar/' + obj.productId + '/' + obj.month + '/' + obj.year;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            response.data.productAvailability.expressDates = response.data.productAvailability.expressDates.map((date) => {
                return moment(date);
            });
            response.data.bookedDates = response.data.bookedDates.map((date) => {
                return moment(date);
            });
            dispatch({
                type: 'FETCH_BOOKABLE_STATUS',
                payload: response.data
            })
        }).catch(function (error) {
            alert('Could not fetch bookable status');
            console.log(error);
        });
    }
}

export function getDeliveryDates(date, isSixDay) {
    return function (dispatch, getState) {
        let productId = getState().rentProductDetail._id;
        let url = '/api/om/calendar/booking/frontend/isBookable?productId=' + productId + '&date=' + date + '&isSixDay=' + isSixDay;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch({
                type: 'FETCH_DELIVERY_DATES',
                payload: response.data.occassionDateResponse
            });
        }).catch(function (error) {
            alert('Could not fetch delivery dates');
            console.log(error);
        });
    }
}

export function getPricingOfRentalCart(cart, discountCode = '') {
    return function (dispatch, getState) {
        dispatch({
            type: 'FETCH_RENTAL_PRODUCT',
            payload: null
        });
        let cartObject = {
            "discountCode": discountCode,
            "cartLines": cart,
            "userId": getState().customerDetail.email
        }
        let url = '/api/pricing/coupons/backend/get/';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: cartObject,
            responseType: 'json'
        }).then(function (response) {
            dispatch({
                type: 'FETCH_RENT_PRICING',
                payload: response.data
            });
            if (response.data.pricing.discountApplied) {
                alert('Discount Applied');
            } else {
                alert('Invalid Discount Code');
            }
        }).catch(function (error) {
            alert('Could not fetch pricing');
            console.log(error);
        });
    }
}

export function addItemToCart(product, discountCode) {
    return function (dispatch, getState) {
        let cart = getState().rentalPricing ? Object.keys(getState().rentalPricing.pricing.linePricing) : [];
        let cartArray = getState().rentalPricing ? Object.keys(getState().rentalPricing.pricing.linePricing).map((item) => {
            let cartObj = getState().rentalPricing.pricing.linePricing[item];
            let cartItem = {
                id: cartObj.lineId,
                isSevenDay: cartObj.sixDay,
                occassionDate: cartObj.occasionDate,
                productId: cartObj.productId,
                type: cartObj.type
            }
            return cartItem;
        }) : [];
        if (cart.indexOf(product.id) == -1) {
            cartArray.push(product);
        }
        dispatch(getPricingOfRentalCart(cartArray, discountCode));
        alert('Product added to cart');
    }
}

export function removeItemFromCart(id, discountCode) {
    return function (dispatch, getState) {
        let cart = getState().rentalPricing ? Object.keys(getState().rentalPricing.pricing.linePricing) : [];
        let cartArray = Object.keys(getState().rentalPricing.pricing.linePricing).map((item) => {
            let cartObj = getState().rentalPricing.pricing.linePricing[item];
            let cartItem = {
                id: cartObj.lineId,
                isSevenDay: cartObj.sixDay,
                occassionDate: cartObj.occasionDate,
                productId: cartObj.productId,
                type: cartObj.type
            }
            return cartItem;
        });
        if (cart.indexOf(id) !== -1) {
            cartArray = cartArray.filter(e => e.id !== id);
        }
        dispatch(getPricingOfRentalCart(cartArray, discountCode));
        alert('Product removed from cart');
    }
}

export function applyDiscount(discountCode) {
    return function (dispatch, getState) {
        let cart = getState().rentalPricing ? Object.keys(getState().rentalPricing.pricing.linePricing) : [];
        let cartArray = getState().rentalPricing ? Object.keys(getState().rentalPricing.pricing.linePricing).map((item) => {
            let cartObj = getState().rentalPricing.pricing.linePricing[item];
            let cartItem = {
                id: cartObj.lineId,
                isSevenDay: cartObj.sixDay,
                occassionDate: cartObj.occasionDate,
                productId: cartObj.productId,
                type: cartObj.type
            }
            return cartItem;
        }) : [];
        dispatch(getPricingOfRentalCart(cartArray, discountCode));
    }
}

export function placeOrder(orderObject) {
    return function (dispatch) {
        let url = '/api/om/orders/backend/initiate';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: orderObject,
            responseType: 'json'
        }).then(function (response) {
            dispatch({
                type: 'FETCH_RENT_PRICING',
                payload: null
            });
            browserHistory.push('/rent?orderId=' + response.data.order.frontendOrderId);
        }).catch(function (error) {
            alert('Could not initiate order');
            console.log(error);
        });
    }
}

export function confirmPayment(confirmPaymentObject) {
    return function (dispatch) {
        let url = '/api/om/orders/backend/payment/confirm/';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: confirmPaymentObject,
            responseType: 'json'
        }).then(function (response) {
            alert('Payment has been recorded');
            browserHistory.push('/customer');
        }).catch(function (error) {
            alert('Could not confirm payment');
            console.log(error);
        });
    }
}

