import axios from 'axios';
import clientConfig from '../../config';
import moment from 'moment';
import CryptoJS from 'crypto-js';

export function fetchInstagramFeeds() {
    return function (dispatch) {
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/Instagrams';
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_INSTAGRAM_FEEDS',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function createInstagramFeed(file, instagram) {
    return function (dispatch) {
        if (file && instagram.title && instagram.url && instagram.type) {
            let timestamp = moment().unix();
            let public_id = 'instashop/instagram-' + timestamp;
            let message = 'public_id=' + public_id + '&timestamp=' + timestamp + clientConfig.cloudinarySecret;
            var hash = CryptoJS.SHA1(message).toString(CryptoJS.enc.Hex);

            let cloudinaryData = {
                "api_key": clientConfig.cloudinaryKey,
                "timestamp": timestamp,
                "signature": hash,
                "public_id": public_id
            };

            let form_data = new FormData();
            for (var key in cloudinaryData) {
                form_data.append(key, cloudinaryData[key]);
            }
            form_data.append('file', file);

            return axios({
                url: clientConfig.cloudinaryURL,
                timeout: 20000,
                method: 'post',
                data: form_data,
                responseType: 'json'
            }).then((response) => {
                let url = clientConfig.targetURL + '/catalogv2/catalogv2/Instagrams';
                let data = {
                    "title": instagram.title,
                    "url": instagram.url,
                    "image": response.data.secure_url.replace(/v[0-9]+/i, 'f_auto,q_auto:best,fl_progressive'),
                    "type": instagram.type,
                    "createdTimestamp": moment().unix(),
                    "status": true
                };
                return axios({
                    url: url,
                    timeout: 20000,
                    method: 'post',
                    data: data,
                    responseType: 'json'
                }).then((response) => {
                    dispatch(fetchInstagramFeeds());
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                console.log(error);
                alert('Image did not upload');
            });
        } else {
            alert('Enter valid data');
        }
    }
}

export function deleteInstagramFeed(id) {
    return function (dispatch) {
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/Instagrams/' + id;
        return axios({
            url: url,
            timeout: 20000,
            method: 'delete',
            responseType: 'json'
        }).then((response) => {
            alert('Feed has been deleted');
            dispatch(fetchInstagramFeeds());
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function createStore(store) {
    return function (dispatch) {
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/DynamicCollections/';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: store,
            responseType: 'json'
        }).then(function (response) {
            dispatch(getAllStores());
            alert('Store Created');
        }).catch(function (error) {
            alert('Store Not Created');
        });
    }
}

export function getAllStores(store) {
    return function (dispatch) {
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/DynamicCollections';
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch({
                type: 'FETCH_ALL_STORES',
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function deleteStore(title) {
    return function (dispatch) {
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/DynamicCollections/' + title;
        return axios({
            url: url,
            timeout: 20000,
            method: 'delete',
            responseType: 'json'
        }).then(function (response) {
            dispatch(getAllStores());
            alert('Store has been deleted');
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function lookDeactivate(deactivateLook, lookStore) {
    return function (dispatch) {
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/DynamicCollections/unassignLookNumber?look=' + deactivateLook + '&store=' + lookStore;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            alert('Look Deactivated');
        }).catch(function (error) {
            alert('Look Not Deactivated');
        });
    }
}

export function fetchCmsConfig() {
    return function (dispatch) {
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/Configurations/getConfig';
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_CMS_CONFIG',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}
