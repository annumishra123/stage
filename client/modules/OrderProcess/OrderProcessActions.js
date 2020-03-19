import axios from 'axios';
import clientConfig from '../../config';

export function getOrderlinesForNCRDelivery(data) {
    return function (dispatch) {
        if (data) {
            let url = `/api/om/orders/backend/get/orderlines/delivery?location=ncr&daysBeforeDeliveryDate=${data.daysBeforeDeliveryDate}&pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`;
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                console.log(response);
                dispatch({
                    type: 'FETCH_ORDERLINES_FOR_NCR_DELIVERY',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function getOrderLinesForNCRPickup(data) {
    return function (dispatch) {
        if (data) {
            let url = `/api/om/orders/backend/get/orderlines/pickup?location=ncr&daysBeforePickupDate=${data.daysBeforePickupDate}&pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`;
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
                    type: 'FETCH_ORDERLINES_FOR_NCR_PICKUP',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function getOrderlinesForOutstationDelivery(data) {
    return function (dispatch) {
        if (data) {
            let url = `/api/om/orders/backend/get/orderlines/delivery?location=non_ncr&daysBeforeDeliveryDate=${data.daysBeforeDeliveryDate}&pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`;
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                console.log(response);
                dispatch({
                    type: 'FETCH_ORDERLINES_FOR_OUTSTATION_DELIVERY',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function getOrderLinesForOutstationPickup(data) {
    return function (dispatch) {
        if (data) {
            let url = `/api/om/orders/backend/get/orderlines/pickup?location=non_ncr&daysBeforePickupDate=${data.daysBeforePickupDate}&pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`;
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
                    type: 'FETCH_ORDERLINES_FOR_OUTSTATION_PICKUP',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function getOrderLinesToBeDispatched(data) {
    return function (dispatch) {
        if (data) {
            let url = `/api/om/orders/backend/get/orderlines/dispatch?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`;
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
                    type: 'FETCH_ORDERLINES_TO_BE_DISPATCHED',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function getOrderLinesToBeReceived(data) {
    return function (dispatch) {
        if (data) {
            let url = `/api/om/orders/backend/get/orderlines/receive?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`;
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

export function getRefundConfirmedOrderlines(data) {
    return function (dispatch) {
        if (data) {
            let url = `/api/om/orders/backend/get/orderlines/refundconfirmed?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`;
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
    return function (dispatch) {
        if (data) {
            let url = `/api/om/orders/backend/get/orderlines/received?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`;
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

export function getQC3FailOrderlines(data) {
    return function (dispatch) {
        if (data) {
            let url = `/api/om/orders/backend/get/orderlines/qc3fail?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`;
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

export function getToBePickedOrderlines(data) {
    return function (dispatch) {
        if (data) {
            let url = `/api/om/orders/backend/get/orderlines/outpickup?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}&runnerId=${data.runnerId}`;
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
    return function (dispatch) {
        if (data) {
            let url = `/api/om/orders/backend/get/orderlines/outdelivery?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}&runnerId=${data.runnerId}`;
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
    return function (dispatch) {
        if (data) {
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
                dispatch(getQC3FailOrderlines({
                    pageNumber: 0,
                    pageSize: 0
                }));
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function approveRefund(data) {
    return function (dispatch) {
        if (data) {
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
                dispatch(getRefundConfirmedOrderlines({
                    pageNumber: 0,
                    pageSize: 0
                }));
                alert(response.data.message);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function markQC3(data) {
    return function (dispatch) {
        if (data) {
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
                dispatch(getReceivedOrderlines({
                    pageNumber: 0,
                    pageSize: 0
                }));
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function markReceived(data) {
    return function (dispatch) {
        if (data) {
            let url = `/api/om/orders/backend/process/logistics/receive?orderlineId=${data.orderlineId}&user=${data.user}`;
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
                dispatch(getOrderLinesToBeReceived({
                    pageNumber: 0,
                    pageSize: 0
                }));
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function markDispatched(data) {
    return function (dispatch) {
        if (data) {
            let url = `/api/om/orders/backend/process/logistics/dispatch?orderlineId=${data.orderlineId}&user=${data.user}`;
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
                dispatch(getOrderLinesToBeDispatched({
                    pageNumber: 0,
                    pageSize: 0
                }));
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function markDelivered(data, obj) {
    return function (dispatch) {
        if (data) {
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
                dispatch(getOutForDeliveryOrderlines(obj));
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function markPicked(data, obj) {
    return function (dispatch) {
        if (data) {
            let url = '/api/om/orders/backend/process/logistics/picked';
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
                dispatch(getToBePickedOrderlines(obj));
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function assignRunnerToOrderlinesDelivery(data) {
    return function (dispatch) {
        if (data) {
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
                let delivery = {
                    pageNumber: 0,
                    pageSize: 0,
                    daysBeforeDeliveryDate: clientConfig.daysBeforeDeliveryOrPickup
                }
                dispatch(getOrderlinesForNCRDelivery(delivery));
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function assignRunnerToOrderlinesPickup(data) {
    return function (dispatch) {
        if (data) {
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
                let obj = {
                    pageNumber: 0,
                    pageSize: 0,
                    daysBeforePickupDate: clientConfig.daysBeforeDeliveryOrPickup
                };
                dispatch(getOrderLinesForNCRPickup(obj));
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function generateWayBills(data) {
    return function (dispatch) {
        if (data) {
            let url = clientConfig.targetURL + '/shipping/awb/generatewaybills';
            return axios({
                url: url,
                timeout: 20000,
                method: 'post',
                data: data,
                responseType: 'json'
            }).then(function (response) {
                console.log(response);
                let delivery = {
                    pageNumber: 0,
                    pageSize: 0,
                    daysBeforeDeliveryDate: clientConfig.daysBeforeDeliveryOrPickup
                };
                let pickup = {
                    pageNumber: 0,
                    pageSize: 0,
                    daysBeforePickupDate: clientConfig.daysBeforeDeliveryOrPickup
                };
                dispatch(getOrderlinesForOutstationDelivery(delivery));
                dispatch(getOrderLinesForOutstationPickup(pickup));
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}

export function getAllRunners() {
    return function (dispatch) {
        let url = '/auth/getrunners';
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
                    type: 'FETCH_ALL_RUNNERS',
                    payload: response.data
                });
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}



export function getRentOrderListByDateV2(dateParam, startDate, endDate) {
    return function (dispatch) {
        if (startDate && endDate && dateParam) {
            let url = '/api/om/orders/backend/orderlines/v2';
            return axios({
                url: url,
                timeout: 20000,
                method: 'post',
                data: {
                    "dateParam": dateParam,
                    "endDate": endDate,
                    "startDate": startDate
                },
                headers: {
                    "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
                },
                responseType: 'json'
            }).then(function (response) {
                dispatch({
                    type: 'FETCH_RENT_DELIVERY_ORDERS_V2',
                    payload: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}