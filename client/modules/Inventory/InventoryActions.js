import clientConfig from '../../config';
import axios from 'axios';

export function fetchShopCatalog() {
    return function(dispatch) {
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/SaleProducts';
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

export function fetchRentCatalog() {
    return function(dispatch) {
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/Looks';
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_RENT_CATALOG',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function fetchAccessoryCatalog() {
    return function(dispatch) {
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/Accessories';
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_ACCESSORY_CATALOG',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function changeShopLookLocation(id, location) {
    return function(dispatch) {
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/SaleProducts/changelocation?id=' + id + '&location=' + location;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch(fetchShopCatalog());
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function changeRentLookLocation(id, location) {
    return function(dispatch) {
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/Looks/changelocation?id=' + id + '&location=' + location;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch(fetchRentCatalog());
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function changeRentAccessoryLocation(id, location) {
    return function(dispatch) {
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/Accessories/changelocation?id=' + id + '&location=' + location;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch(fetchAccessoryCatalog());
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function fetchShopStock() {
    return function(dispatch) {
        let url = '/api/inventory-manager/getInventoryStatus';
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_SHOP_STOCK',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function updateShopStock(id, sku, quantity) {
    return function(dispatch) {
        let url = '/api/inventory-manager/updateInventory';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: {
                productId: id,
                quantityDiff: quantity,
                sku: sku
            },
            responseType: 'json'
        }).then((response) => {
            alert('Quantity has been updated');
            dispatch(fetchShopStock());
        }).catch((error) => {
            console.log(error);
        });
    }
}