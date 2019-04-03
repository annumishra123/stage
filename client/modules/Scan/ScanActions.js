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

export function saveScannedLocation(sku) {
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
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    };
}



