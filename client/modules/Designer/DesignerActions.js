import clientConfig from '../../config';
import axios from 'axios';
import moment from 'moment';

export function getDesignerInventory(owner) {
    return function (dispatch) {
        let loopbackFilter = {
            where: {
                owner: owner
            },
        };
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/Looks?filter=' + encodeURIComponent(JSON.stringify(loopbackFilter));
        return axios({
            url,
            timeout: 20000,
            method: 'get',
            responseType: 'json',
        }).then((response) => {
            dispatch({
                type: 'FETCH_DESIGNER_INVENTORY',
                payload: response.data,
            });
        }).catch((error) => {
            console.log(error);
        });
    };
}

export function getCompletedOrders(owner, startDate, endDate) {
    return function (dispatch) {
        let loopbackFilter = {
            where: {
                and: [{
                    owner: owner
                }, {
                    pickupDateUTC: {
                        between: [startDate, endDate]
                    }
                }, {
                    isCancelled: false
                }, {
                    softBook: false
                }]
            }
        };
        let url = '/api/revshare/api/orderlinelogs?filter=' + encodeURIComponent(JSON.stringify(loopbackFilter));
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json',
            headers: {
                "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
            }
        }).then((response) => {
            dispatch({
                type: 'FETCH_COMPLETED_DESIGNER_ORDERS',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function getPendingOrders(owner) {
    return function (dispatch) {
        let loopbackFilter = {
            where: {
                and: [{
                    owner: owner
                }, {
                    pickupDateUTC: {
                        gt: moment().unix() * 1000
                    }
                }, {
                    isCancelled: false
                }]
            }
        };
        let url = '/api/revshare/api/orderlinelogs?filter=' + encodeURIComponent(JSON.stringify(loopbackFilter));
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json',
            headers: {
                "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
            }
        }).then((response) => {
            dispatch({
                type: 'FETCH_PENDING_DESIGNER_ORDERS',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function getCancelledOrders(owner, startDate, endDate) {
    return function (dispatch) {
        let loopbackFilter = {
            where: {
                and: [{
                    owner: owner
                }, {
                    pickupDateUTC: {
                        gt: moment().unix() * 1000
                    }
                }, {
                    isCancelled: true
                }]
            }
        };
        let url = '/api/revshare/api/orderlinelogs?filter=' + encodeURIComponent(JSON.stringify(loopbackFilter));
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json',
            headers: {
                "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
            }
        }).then((response) => {
            dispatch({
                type: 'FETCH_CANCELLED_DESIGNER_ORDERS',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function createOwner(owner) {
    console.log(owner)
    return function (dispatch) {
        let url = '/api/revshare/api/owners/';
        axios({
            url,
            timeout: 20000,
            method: 'put',
            responseType: 'json',
            data: owner,
            headers: {
                "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
            }
        }).then((response) => {
            dispatch(getOwners());
            alert('Owner information has been saved.');
        }).catch((error) => {
            console.log(error);
        });
    };
}

export function getOwners() {
    return function (dispatch) {
        let url = '/api/revshare/api/owners/';
        axios({
            url,
            timeout: 20000,
            method: 'get',
            responseType: 'json',
            headers: {
                "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
            }
        }).then((response) => {
            dispatch({
                type: 'FETCH_REVSHARES',
                payload: response.data,
            });
        }).catch((error) => {
            console.log(error);
        });
    };
}

export function getOwnerShare(owner) {
    return function (dispatch) {
        let loopbackFilter = {
            where: {
                ownername: owner
            }
        };
        let url = '/api/revshare/api/owners/?filter=' + encodeURIComponent(JSON.stringify(loopbackFilter));
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json',
            headers: {
                "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
            }
        }).then((response) => {
            dispatch({
                type: 'FETCH_DESIGNER_SHARE',
                payload: response.data[0]
            })
        }).catch((error) => {
            console.log(error);
        });
    };
}

export function downloadInvoice(url) {
    return axios({
        url: url,
        timeout: 20000,
        method: 'get',
        headers: {
            "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null,
            'Content-Disposition': "attachment; filename=template.xlsx",
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        },
        responseType: 'arraybuffer'
    }).then((response) => {
        console.log(response);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'invoice.xlsx');
        document.body.appendChild(link);
        link.click();
    }).catch((error) => {
        console.log(error);
    });
}
