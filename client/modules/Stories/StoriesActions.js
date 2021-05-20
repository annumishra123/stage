import clientConfig from '../../config';
import axios from 'axios';

export function fetchStories() {
    return function (dispatch) {
        let loopbackFilter = {
            where: {
                status: true
            }
        };
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/ShopStories?filter=' + JSON.stringify(loopbackFilter);
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_STORIES',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function fetchShopCatalog(param) {
    return function (dispatch) {
        let url = `${clientConfig.targetURL}/catalogv2/catalogv2/SaleProducts/filter`;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_SHOP_CATALOG',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function fetchFilterData(param) {
    return function (dispatch) {
        let url = `${clientConfig.targetURL}/catalogv2/catalogv2/SaleProducts/filter${param}`;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_SHOP_CATALOG',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function createNewStore(param) {
    return function (dispatch) {
        let url = `${clientConfig.targetURL}/catalogv2/catalogv2/ShopDynamicCollections`,
            storeRawData = {
                skus: param.skuList,
                title: param.title
            }
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: storeRawData
        }).then((response) => {
            console.log(response.data);
            dispatch(createStories(param));
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function createStories(param) {
    return function (dispatch) {
        let url = `${clientConfig.targetURL}/catalogv2/catalogv2/ShopStories`,
            storiesRawData = {
                title: param.title,
                type: param.type,
                link: param.link,
                image: param.image,
                status: param.status
            }
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: storiesRawData,
        }).then((response) => {
            console.log(response.data);
            dispatch(fetchStories());
        }).catch((error) => {
            console.log(error);
            alert('Story Not Created');
        });
    }
}

export function getAllStores() {
    return function (dispatch) {
        let url = `${clientConfig.targetURL}/catalogv2/catalogv2/ShopDynamicCollections`;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch({
                type: 'FETCH_STORES',
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function getAllSellers() {
    return function (dispatch) {
        let url = `${clientConfig.targetURL}/api/myaccount/profile/backend/get/sellers`;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzU3NDg5NDUsInVzZXJfbmFtZSI6ImJhY2tlbmRhZG1pbkBzdGFnZTMuY28iLCJhdXRob3JpdGllcyI6WyJST0xFX0FOT05ZTU9VUyIsIlJPTEVfVVNFUiIsIlJPTEVfQURNSU4iXSwianRpIjoiMjczZjU3YmItOGQ2Ny00MDRlLWI3NDMtMDI4ZGE4N2I2MmMyIiwiY2xpZW50X2lkIjoiZWRnZSIsInNjb3BlIjpbInBhc3N3b3JkIl19.ELO4jXM8ydQzTyKT87MJBk5NwnKAulLqSfN-i2-LweY'
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

export function deactivateStory(id) {
    return function (dispatch) {
        let url = `${clientConfig.targetURL}/catalogv2/catalogv2/ShopStories/${id}/replace`,
            storiesRawData = {
                status: false
            }
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: storiesRawData,
        }).then((response) => {
            console.log(response.data);
            dispatch(fetchStories());
        }).catch((error) => {
            console.log(error);
            alert('Story fails to disable');
        });
    }
}