import axios from 'axios';
import clientConfig from '../../config';
import moment from 'moment';
import CryptoJS from 'crypto-js';


export function createRawMaterial(rawMaterial) {
    return function (dispatch) {
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
            dispatch(getAllRawMaterial());
        }).catch(function (error) {
            alert('Raw Material Not Created');
        });
    }
}

export function getAllRawMaterial(rawMaterial) {
    return function (dispatch) {
        let url = 'http://localhost:8000/managematerial/getrawmaterials';
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

export function deleteRawMaterial(_id) {
    return function (dispatch) {
        let url = 'http://localhost:8000/managematerial/deletematerial?_id=' + _id;
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
            dispatch(getAllRawMaterial());
            alert('Raw Material has been deleted');
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function createOutfit(outfit) {
    return function (dispatch) {
        debugger;
        let url = 'http://localhost:8000/managematerial/createoutfit';
        let token = localStorage.getItem('token');
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: outfit,
            responseType: 'json',
            headers: {
                Authorization: 'JWT ' + token,
            },
        }).then(function (response) {
            alert('Outfit Created');
            dispatch(getAllOutfits());
        }).catch(function (error) {
            alert('Outfit Not Created');
        });
    }
}

export function getAllOutfits(outfit) {
    return function (dispatch) {
        let url = 'http://localhost:8000/managematerial/getoutfits';
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
                type: 'FETCH_ALL_OUTFITS',
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function deleteOutfit(_id) {
    return function (dispatch) {
        let url = 'http://localhost:8000/managematerial/deleteoutfit?_id=' + _id;
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
            dispatch(getAllOutfits());
            alert('Outfit has been deleted');
        }).catch(function (error) {
            console.log(error);
        });
    }
}