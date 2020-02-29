import axios from 'axios';
import clientConfig from '../../config';

export function getOrderlinesForDelivery(data) {
    return function(dispatch) {
        if (startDate && endDate && dateParam) {
            let url = '/api/om/orders/backend/get/orderlines/delivery';
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_ORDERLINES_FOR_DELIVERY',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function getRefundConfirmedOrderlines(data) {
    return function(dispatch) {
        if (startDate && endDate && dateParam) {
            let url = '/api/om/orders/backend/get/orderlines/refundconfirmed';
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_REFUND_CONFIRMED_ORDERLINES',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function getReceivedOrderlines(data) {
    return function(dispatch) {
        if (startDate && endDate && dateParam) {
            let url = '/api/om/orders/backend/get/orderlines/received';
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_RECEIVED_ORDERLINES',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function getOrderLinesToBeReceived(data) {
    return function(dispatch) {
        if (startDate && endDate && dateParam) {
            let url = '/api/om/orders/backend/get/orderlines/receive';
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_ORDERLINES_TO_BE_RECEIVED',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function getQC3FailOrderlines(data) {
    return function(dispatch) {
        if (startDate && endDate && dateParam) {
            let url = '/api/om/orders/backend/get/orderlines/qc3fail';
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_QC3_FAIL_ORDERLINES',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function getPickupOrderLines(data) {
    return function(dispatch) {
        if (startDate && endDate && dateParam) {
            let url = '/api/om/orders/backend/get/orderlines/pickup';
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_PICKEDUP_ORDERLINES',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function getToBePickedOrderlines(data) {
    return function(dispatch) {
        if (startDate && endDate && dateParam) {
            let url = '/api/om/orders/backend/get/orderlines/outpickup';
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_ORDERLINES_TO_BE_PICKED',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function getOutForDeliveryOrderlines(data) {
    return function(dispatch) {
        if (startDate && endDate && dateParam) {
            let url = '/api/om/orders/backend/get/orderlines/outdelivery';
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_OUT_FOR_DELIVERY_ORDERLINES',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function markQC3Damage(data) {
    return function(dispatch) {
        if (startDate && endDate && dateParam) {
            let url = '/api/om/orders/backend/process/refund/calculate';
            return axios({
                url: url,
                timeout: 20000,
                method: 'post',
                data: data,
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function approveRefund(data) {
    return function(dispatch) {
        if (startDate && endDate && dateParam) {
            let url = '/api/om/orders/backend/process/refund/approve';
            return axios({
                url: url,
                timeout: 20000,
                method: 'post',
                data: data,
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function markQC3(data) {
    return function(dispatch) {
        if (startDate && endDate && dateParam) {
            let url = '/api/om/orders/backend/process/qc3';
            return axios({
                url: url,
                timeout: 20000,
                method: 'post',
                data: data,
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function markReceived(data) {
    return function(dispatch) {
        if (startDate && endDate && dateParam) {
            let url = '/api/om/orders/backend/process/logistics/receive';
            return axios({
                url: url,
                timeout: 20000,
                method: 'post',
                data: data,
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function markDispatched(data) {
    return function(dispatch) {
        if (startDate && endDate && dateParam) {
            let url = '/api/om/orders/backend/process/logistics/dispatch';
            return axios({
                url: url,
                timeout: 20000,
                method: 'post',
                data: data,
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function markDelivered(data) {
    return function(dispatch) {
        if (startDate && endDate && dateParam) {
            let url = '/api/om/orders/backend/process/logistics/deliver';
            return axios({
                url: url,
                timeout: 20000,
                method: 'post',
                data: data,
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function assignRunnerToOrderlinesDelivery(data) {
    return function(dispatch) {
        if (startDate && endDate && dateParam) {
            let url = '/api/om/orders/backend/process/assignRunner/delivery';
            return axios({
                url: url,
                timeout: 20000,
                method: 'post',
                data: data,
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function assignRunnerToOrderlinesPickup(data) {
    return function(dispatch) {
        if (startDate && endDate && dateParam) {
            let url = '/api/om/orders/backend/process/assignRunner/pickup';
            return axios({
                url: url,
                timeout: 20000,
                method: 'post',
                data: data,
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function generateWayBills(data) {
    return function(dispatch) {
        if (startDate && endDate && dateParam) {
            let url = clientConfig.targetURL + '/shipping/awb/generatewaybills';
            return axios({
                url: url,
                timeout: 20000,
                method: 'post',
                data: data,
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function approveRefund(data) {
    return function (dispatch) {
        let url = '/refund/create';
        let token = localStorage.getItem('token');
        if (token && data) {
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
                alert(JSON.parse(response.data.message).message);
            }).catch(function (error) {
                alert('Something went wrong!');
            });
        } else {
            alert('Refund link was not sent!');
        }
    }
}



