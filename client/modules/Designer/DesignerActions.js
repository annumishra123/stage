import clientConfig from '../../config';
import axios from 'axios';
import moment from 'moment';

export function getDesignerInventory(owner) {
    return function(dispatch) {
        let loopbackFilter = {
            where: {
                designer: owner,
            },
        };
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/Looks?filter=' + JSON.stringify(loopbackFilter);
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
    return function(dispatch) {
        let loopbackFilter = {
            where: {
                and: [{
                    owner: owner
                }, {
                    dispatchDateUTC: {
                        between: [startDate, endDate]
                    }
                }, {
                    isCancelled: false
                }]
            }
        };
        let url = '/api/revshare/api/orderlinelogs?filter=' + JSON.stringify(loopbackFilter);
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
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
    return function(dispatch) {
        let loopbackFilter = {
            where: {
                and: [{
                    owner: owner
                }, {
                    dispatchDateUTC: {
                        gt: moment().unix() * 1000
                    }
                }, {
                    isCancelled: false
                }]
            }
        };
        let url = '/api/revshare/api/orderlinelogs?filter=' + JSON.stringify(loopbackFilter);
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
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
    return function(dispatch) {
        let loopbackFilter = {
            where: {
                and: [{
                    owner: owner
                }, {
                    dispatchDateUTC: {
                        between: [startDate, endDate]
                    }
                }, {
                    isCancelled: true
                }]
            }
        };
        let url = '/api/revshare/api/orderlinelogs?filter=' + JSON.stringify(loopbackFilter);
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
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
    return function(dispatch) {
        let url = '/api/revshare/api/owners/';
        axios({
            url,
            timeout: 20000,
            method: 'put',
            responseType: 'json',
            data: owner
        }).then((response) => {
            dispatch(getOwners());
            alert('Owner information has been saved.');
        }).catch((error) => {
            console.log(error);
        });
    };
}

export function getOwners() {
    return function(dispatch) {
        let url = '/api/revshare/api/owners/';
        axios({
            url,
            timeout: 20000,
            method: 'get',
            responseType: 'json',
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
