import axios from 'axios';
import clientConfig from '../../config';
import moment from 'moment';
import CryptoJS from 'crypto-js';


export function createRawMaterial(rawMaterial) {
    return function (dispatch) {
        debugger;
        let url = 'http://localhost:8000/managematerial/creatematerial';
        let token = localStorage.getItem('token');
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: rawMaterial,
            responseType: 'json',
            headers: {
                Authorization: 'JWT ' + token,
              },
        }).then(function (response) {
            alert('Raw Material Created');
        }).catch(function (error) {
            alert('Raw Material Not Created');
        });
    }
}

export function getAllRawMaterial(rawMaterial) {
    return function (dispatch) {
        let url = 'localhost:8000/managematerial/getrawmaterials';
        let token = localStorage.getItem('token');
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

export function createOutfit(outfit) {
    return function (dispatch) {
        let url = clientConfig.targetURL + '/managematerial/createoutfit';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: outfit,
            responseType: 'json'
        }).then(function (response) {
            alert('Outfit Created');
        }).catch(function (error) {
            alert('Outfit Not Created');
        });
    }
}

export function getAllOutfits(outfit) {
    return function (dispatch) {
        let url = clientConfig.targetURL + '/managematerial/getoutfits';
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch({
                type: 'FETCH_ALL_OUTFITS',
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function deleteOutfit(title) {
    return function (dispatch) {
        let url = clientConfig.targetURL + '/managematerial/deleteoutfit' + title;
        return axios({
            url: url,
            timeout: 20000,
            method: 'delete',
            responseType: 'json'
        }).then(function (response) {
            dispatch(getAllOutfits());
            alert('Outfit has been deleted');
        }).catch(function (error) {
            console.log(error);
        });
    }
}