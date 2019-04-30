import clientConfig from '../../config';
import axios from 'axios';


export function getScannedLook(sku) {
    let filter = {
        where: {
            sku: sku
        }
    };
    let url = clientConfig.targetURL + '/catalogv2/catalogv2/Looks?filter=' + JSON.stringify(filter);
    return function (dispatch) {
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch({
                type: 'FETCH_SCANNED_SKU',
                payload: response.data[0]
            })
        }).catch(function (error) {
            console.log(error);
        });
    };
}

export function clearScannedLook() {
    return function (dispatch) {
        dispatch({
            type: 'FETCH_SCANNED_SKU',
            payload: null
        });
    }
}

export function saveScannedLocation(sku, location, reason) {
    if (sku && location && reason) {
        let url = '/scan/saveScan';
        let token = localStorage.getItem('token');
        return function (dispatch) {
            return axios({
                url: url,
                timeout: 20000,
                method: 'post',
                data: {
                    sku: sku,
                    location: location,
                    reason: reason
                },
                headers: {
                    Authorization: 'JWT ' + token,
                },
                responseType: 'json'
            }).then(function (response) {
                alert('Product has been scanned!');
            }).catch(function (error) {
                console.log(error);
            });
        };
    } else {
        alert('Please fill all the details!');
    }
}

export function getAllLogsBySKU(sku) {
    return function (dispatch) {
        let token = localStorage.getItem('token');
        if (token) {
            if (sku) {
                let url = '/scan/getAllLogsBySKU?sku=' + sku;
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
                        type: 'FETCH_SCAN_LOGS',
                        payload: response.data
                    })
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
}

export function getLogsByLocation(location) {
    let url = '';
    if (location) {
        let filter = {
            where: {
                location: location
            }
        };
        url = clientConfig.targetURL + '/catalogv2/catalogv2/Looks?filter=' + JSON.stringify(filter);
    } else {
        url = clientConfig.targetURL + '/catalogv2/catalogv2/Looks';
    }
    return function (dispatch) {
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch({
                type: 'FETCH_LOCATION_LOGS',
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    };
}







