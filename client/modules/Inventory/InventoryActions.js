import clientConfig from '../../config';
import axios from 'axios';

export function fetchShopCatalog() {
    return function (dispatch) {
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

export function fetchShopProduct(id) {
    return function (dispatch) {
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/SaleProducts/' + id;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_SHOP_PRODUCT',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function clearShopProduct() {
    return function (dispatch) {
        dispatch({
            type: 'FETCH_SHOP_PRODUCT',
            payload: null
        });
    }
}

export function updateShopProduct(product) {
    return function (dispatch) {
        debugger;
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/SaleProducts/' + product.id + '/replace';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: product
        }).then((response) => {
            console.log(response.data)
            dispatch({
                type: 'FETCH_SHOP_PRODUCT',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function uploadCSV(files) {
    let url = clientConfig.targetURL + '/catalogv2/catalogv2/Looks/importCSV';
    var file = new FormData();
    file.append('file', files[0]);
    return function (dispatch) {
        return axios({
            method: 'POST',
            url: url,
            data:  file,
        }).then(function (response) {
            alert('Document Uploaded');
        }).catch(function (error) {
            console.log(error);
        });
    };
}

export function fetchRentCatalog() {
    return function (dispatch) {
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

export function fetchRentProduct(id) {
    return function (dispatch) {
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/Looks/' + id;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_RENT_PRODUCT',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function updateRentProduct(product) {
    return function (dispatch) {
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/Looks/' + product._id;
        delete product._id;
        return axios({
            url: url,
            timeout: 20000,
            method: 'patch',
            responseType: 'json',
            data: product
        }).then((response) => {
            dispatch({
                type: 'FETCH_RENT_PRODUCT',
                payload: response.data
            });
            alert('The product has been updated');
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function clearRentProduct() {
    return function (dispatch) {
        dispatch({
            type: 'FETCH_RENT_PRODUCT',
            payload: null
        });
    }
}


export function fetchAccessoryCatalog() {
    return function (dispatch) {
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

export function fetchAccessory(id) {
    return function (dispatch) {
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/Accessories/' + id;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_ACCESSORY',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function updateAccessory(product) {
    return function (dispatch) {
        debugger;
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/Accessories/' + product.id + '/replace';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: product
        }).then((response) => {
            console.log(response.data)
            dispatch({
                type: 'FETCH_ACCESSORY',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function clearAccessory() {
    return function (dispatch) {
        dispatch({
            type: 'FETCH_ACCESSORY',
            payload: null
        });
    }
}


export function changeShopLookLocation(id, location) {
    return function (dispatch) {
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
    return function (dispatch) {
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
    return function (dispatch) {
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
    return function (dispatch) {
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
    return function (dispatch) {
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