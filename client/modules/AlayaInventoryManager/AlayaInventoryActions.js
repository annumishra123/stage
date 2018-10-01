import axios from 'axios';
import clientConfig from '../../config';
import moment from 'moment';
import CryptoJS from 'crypto-js';


export function createRawMaterial(rawMaterial) {
    return function (dispatch) {
        let url = clientConfig.targetURL + '/managematerial/creatematerial';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: rawMaterial,
            responseType: 'json'
        }).then(function (response) {
            alert('Raw Material Created');
        }).catch(function (error) {
            alert('Raw Material Not Created');
        });
    }
}

export function getAllRawMaterial(material) {
    return function (dispatch) {
        let url = clientConfig.targetURL + '/managematerial/getrawmaterials';
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch({
                type: 'FETCH_ALL_MATERIALS',
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function deleteRawMaterial(title) {
    return function (dispatch) {
        let url = clientConfig.targetURL + '/managematerial/deletematerial' + title;
        return axios({
            url: url,
            timeout: 20000,
            method: 'delete',
            responseType: 'json'
        }).then(function (response) {
            dispatch(getAllRawMaterial());
            alert('Raw Material has been deleted');
        }).catch(function (error) {
            console.log(error);
        });
    }
}