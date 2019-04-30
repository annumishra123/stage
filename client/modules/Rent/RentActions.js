import axios from 'axios';
import clientConfig from '../../config';
import { browserHistory } from 'react-router';
import moment from 'moment';
import { getCustomerDetail } from '../Customer/CustomerActions';

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

export function getOrdersByPhoneNumber(phoneNumber) {
    return function (dispatch) {
        let mobileRegex = /^\d{10}$/;
        let isValid = mobileRegex.test(phoneNumber);
        if (isValid) {
            let url = '/api/myaccount/profile/backend/get/phonenumber/?phoneNumber=' + phoneNumber;
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                responseType: 'json'
            }).then(function (response) {
                let customer = response.data;
                if (customer) {
                    dispatch(getOrdersByUserId(customer.email));
                } else {
                    alert('Customer not found.');
                }
            }).catch(function (error) {
                alert('Customer not found.');
                console.log(error);
            });
        } else {
            alert('Enter a valid mobile number');
        }
    }
}

export function getOrdersByLookNumber(looknumber) {
    return function (dispatch) {
        if (looknumber) {
            let url = '/api/inventory-manager/getOrderLinesForSku?looknumber=' + looknumber.toUpperCase();
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                responseType: 'json'
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_RENT_ORDERS',
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
            let url = '/api/om/orders/backend/view/' + id + '/';
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                responseType: 'json'
            }).then(function (response) {
                dispatch(getMeasurementStatus(response.data.id));
                dispatch({
                    type: 'FETCH_RENT_ORDER_DETAIL',
                    payload: response.data
                });
                dispatch(getCustomerDetail(response.data.userId));
            }).catch(function (error) {
                alert('Could not fetch order detail');
                console.log(error);
            });
        }
    }
}

export function getMeasurementStatus(orderId) {
    return function (dispatch) {
        let url = '/api/om/orders/anonymous/measurement/match/' + orderId;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch({
                type: 'FETCH_MEASUREMENT_STATUS',
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
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
    return function (dispatch, getState) {
        let url = '/api/om/orders/backend/payment/confirm/?modifier=' + getState().auth.email;
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

export function getAllCoupons(page, size) {
    return function (dispatch) {
        let url = '/api/pricing/coupons/backend/getAll/coupons/?page=' + page + '&int=' + size;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch({
                type: 'FETCH_ALL_COUPONS',
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function createCoupon(couponObject, page, size) {
    if (couponObject.configs && couponObject.couponText && couponObject.type) {
        return function (dispatch) {
            let url = '/api/pricing/coupons/backend/create/coupon/';
            return axios({
                url: url,
                timeout: 20000,
                method: 'post',
                data: couponObject,
                responseType: 'json'
            }).then(function (response) {
                dispatch(getAllCoupons(page, size));
                alert('Coupon has been created');
            }).catch(function (error) {
                console.log(error);
            });
        }
    } else {
        alert('Enter valid coupon data');
    }
}

export function deleteCoupon(couponName, page, size) {
    return function (dispatch) {
        let url = '/api/pricing/coupons/backend/delete/coupon/' + couponName;
        return axios({
            url: url,
            timeout: 20000,
            method: 'delete',
            responseType: 'json'
        }).then(function (response) {
            dispatch(getAllCoupons(page, size));
            alert('Coupon has been deleted');
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function approveRefund(data) {
    return function (dispatch) {
        let url = '/refund/sendRefundEmail';
        let token = localStorage.getItem('token');
        if (token && data.phoneNumber) {
            return axios({
                url: url,
                timeout: 20000,
                method: 'post',
                data: data,
                responseType: 'json',
                headers: {
                    Authorization: 'JWT ' + token
                },
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_REFUND_LOGS',
                    payload: response.data
                })
            }).catch(function (error) {
                alert('Something went wrong');
            });
        }
    }
}

export function getRefundLogsByOrderId(orderId) {
    return function (dispatch) {
        let token = localStorage.getItem('token');
        if (token) {
            if (orderId) {
                let url = '/refund/getByOrderId?orderId=' + orderId;
                return axios({
                    url: url,
                    timeout: 20000,
                    method: 'get',
                    responseType: 'json',
                    headers: {
                        Authorization: 'JWT ' + token
                    },
                }).then(function (response) {
                    dispatch({
                        type: 'FETCH_REFUND_LOGS',
                        payload: response.data
                    })
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
}

export function getAllUnprocessedRefunds(refunded) {
    return function (dispatch) {
        let url = '/refund/getAllUnprocessedRefunds?refunded=' + refunded;
        let token = localStorage.getItem('token');
        if (token) {
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                responseType: 'json',
                headers: {
                    Authorization: 'JWT ' + token,
                },
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_REFUND_LOGS',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function markRefunded(_id) {
    return function (dispatch) {
        let url = '/refund/markRefunded?refundLogId=' + _id;
        let token = localStorage.getItem('token');
        if (token) {
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                responseType: 'json',
                headers: {
                    Authorization: 'JWT ' + token,
                },
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_REFUND_LOGS',
                    payload: response.data
                })
            }).catch(function (error) {
                alert('Something went wrong');
            });
        }
    }
}

export function getRefundsByUserId(customerId) {
    return function (dispatch) {
        let url = '/refund/getRefundsByUserId?customerId=' + customerId;
        let token = localStorage.getItem('token');
        if (token) {
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                responseType: 'json',
                headers: {
                    Authorization: 'JWT ' + token,
                },
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_CUSTOMER_REFUND_LOGS',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function customerFeedback(customerFeedBackObject) {
    return function (dispatch) {
        let url = clientConfig.targetURL + '/api/cart/api/UserInfos';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: customerFeedBackObject,
            responseType: 'json'
        }).then(function (response) {
            alert('Feedback Saved!');
        }).catch(function (error) {
            alert('Feedback Required');
        });
    }
}
