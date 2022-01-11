import clientConfig from '../../config';
import axios from 'axios';

export function fetchBrands() {
    return function (dispatch) {
        return axios({
            url: `${clientConfig.contentServiceURL}/contentv1/Brands`,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_BRANDS',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function updateBrands(param) {
    return function (dispatch) {
        return axios({
            url: `${clientConfig.contentServiceURL}/contentv1/Brands/removeAndUpdateAll`,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: param
        }).then((response) => {
            dispatch(fetchBrands());
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function getAllSellers() {
    return function (dispatch) {
        let url = `/api/myaccount/profile/backend/get/sellers`;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json',
            headers: {
                "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
            }
        }).then(function (response) {
            dispatch({
                type: 'FETCH_SELLERS',
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    }
}