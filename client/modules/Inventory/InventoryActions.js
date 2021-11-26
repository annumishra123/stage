import clientConfig from '../../config';
import axios from 'axios';

export function fetchShopCatalog(filterParam) {
    return function (dispatch) {
        let url = '';
        if (filterParam) {
            url = `${clientConfig.targetURL}/catalogv2/catalogv2/SaleProducts/filter?variants=true&${filterParam}`;
        } else {
            let loopbackFilter = {
                where: {
                    approved: false
                },
                order: 'uploadtime ASC'
            };
            url = clientConfig.targetURL + '/catalogv2/catalogv2/SaleProducts?filter=' + JSON.stringify(loopbackFilter);
        }
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            let payloadData = response.data;
            if (filterParam) {
                payloadData = response.data.docs;
            }
            dispatch({
                type: 'FETCH_SHOP_CATALOG',
                payload: payloadData
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

export function updateShopProduct(product, user) {
    return function (dispatch) {
        let url = `${clientConfig.targetURL}/catalogv2/catalogv2/SaleProducts/update/backend?id=${product.id}&user=${user}`,
            formData = new FormData();
        if (product.hasOwnProperty("name")) {
            formData.append('name', product.name);
        }
        if (product.hasOwnProperty("description")) {
            formData.append('description', product.description);
        }
        if (product.hasOwnProperty("originalretailprice")) {
            formData.append('originalretailprice', product.originalretailprice);
        }
        if (product.hasOwnProperty("gender")) {
            formData.append('gender', product.gender);
        }
        if (product.hasOwnProperty("status")) {
            formData.append('status', product.status);
        }
        if (product.hasOwnProperty("size")) {
            formData.append('size', product.size);
        }
        if (product.hasOwnProperty("seller")) {
            formData.append('seller', product.seller);
        }
        if (product.hasOwnProperty("condition")) {
            formData.append('condition', product.condition);
        }
        if (product.hasOwnProperty("saleprice")) {
            formData.append('saleprice', product.saleprice);
        }
        if (product.hasOwnProperty("sequence")) {
            formData.append('sequence', product.sequence);
        }
        if (product.hasOwnProperty("color")) {
            formData.append('color', product.color);
        }
        if (product.hasOwnProperty("categories")) {
            formData.append('categories', product.categories);
        }
        if (product.hasOwnProperty("subcategories")) {
            formData.append('subcategories', product.subcategories);
        }
        if (product.hasOwnProperty("tags")) {
            formData.append('tags', product.tags);
        }
        if (product.hasOwnProperty("quantity")) {
            formData.append('quantity', product.quantity);
        }
        if (product.hasOwnProperty("notes")) {
            formData.append('notes', product.notes);
        }
        if (product.hasOwnProperty("brand")) {
            formData.append('brand', product.brand);
        }
        if (product.hasOwnProperty("approved")) {
            formData.append('approved', product.approved);
        }
        if (product.hasOwnProperty("shippingsize")) {
            formData.append('shippingsize', product.shippingsize);
        }
        if (product.hasOwnProperty("image1")) {
            formData.append('image1', product.image1);
        }
        if (product.hasOwnProperty("image2")) {
            formData.append('image2', product.image2);
        }
        if (product.hasOwnProperty("image3")) {
            formData.append('image3', product.image3);
        }
        if (product.hasOwnProperty("image4")) {
            formData.append('image4', product.image4);
        }
        if (product.hasOwnProperty("video")) {
            formData.append('video', product.video);
        }
        return axios({
            url: url,
            method: 'post',
            responseType: 'json',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
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

export function uploadShopCSV(shopFiles, fileName) {
    let url = clientConfig.targetURL + '/catalogv2/catalogv2/SaleProducts/importCSV';
    var file = new FormData();
    file.append('file', shopFiles[0], fileName);
    return function (dispatch) {
        return axios({
            method: 'POST',
            url: url,
            data: file,
        }).then(function (response) {
            dispatch(fetchUpdateLogs());
            alert('Document Uploaded');
        }).catch(function (error) {
            console.log(error);
        });
    };
}

export function uploadCSV(files, fileName) {
    let url = clientConfig.targetURL + '/catalogv2/catalogv2/Looks/importCSV';
    var file = new FormData();
    file.append('file', files[0], fileName);
    return function (dispatch) {
        return axios({
            method: 'POST',
            url: url,
            data: file,
        }).then(function (response) {
            dispatch(fetchUpdateLogs());
            alert('Document Uploaded');
        }).catch(function (error) {
            console.log(error);
        });
    };
}

export function uploadAccessoryCSV(accessoryFiles, fileName) {
    let url = clientConfig.targetURL + '/catalogv2/catalogv2/Accessories/importCSV';
    var file = new FormData();
    file.append('file', accessoryFiles[0], fileName);
    return function (dispatch) {
        return axios({
            method: 'POST',
            url: url,
            data: file,
        }).then(function (response) {
            dispatch(fetchUpdateLogs());
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

export function approveProduct(param) {
    return function (dispatch) {
        let url = `${clientConfig.targetURL}/catalogv2/catalogv2/SaleProducts/approve`;
        return axios({
            url: url,
            method: 'post',
            responseType: 'json',
            data: param
        }).then((response) => {
            console.log(response.data);
            alert("The product has been updated!");
            dispatch(fetchShopCatalog())
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
            responseType: 'json',
            headers: {
                "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
            }
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
            responseType: 'json',
            headers: {
                "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
            }
        }).then((response) => {
            alert('Quantity has been updated');
            dispatch(fetchShopStock());
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function reconcileAll() {
    return function (dispatch) {
        let url = '/api/inventory-manager/reconcile';
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json',
            headers: {
                "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
            }
        }).then((response) => {
            alert('All quantities reconciled');
        }).catch((error) => {
            alert('Not able to reconcile');
        });
    }
}

export function fetchUpdateLogs() {
    return function (dispatch) {
        let filter = {
            order: 'date desc',
            limit: 100
        };
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/UploadLogs?filter=' + JSON.stringify(filter);
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_UPLOAD_LOGS',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function downloadCSV(fileName) {
    return function (dispatch) {
        let url = '/download/catalogsheet?filename=' + fileName;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'blob'
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName.split('/')[2]);
            document.body.appendChild(link);
            link.click();
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function setQCStatus(qcObject) {
    return function (dispatch) {
        let url = '/api/om/orders/backend/update/qualityCheckStatus?user=' + qcObject.user + '&status=' + qcObject.status + '&looknumber=' + qcObject.looknumber + '&sku=' + qcObject.sku + '&frontendOrderId=' + qcObject.frontendOrderId;
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            headers: {
                "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
            }
        }).then(function (response) {
            alert('Changed QC Status');
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function getLastQCStatus(looknumber) {
    return function (dispatch) {
        dispatch({
            type: 'FETCH_QC_STATUS',
            payload: null
        })
        let url = '/api/om/orders/backend/get/qualityCheckStatusByLookNumber?lookNumber=' + looknumber;
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
                type: 'FETCH_QC_STATUS',
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function fetchFilterData(param) {
    return function (dispatch) {
        if (param == '') {
            param = 'approved=false';
        }
        let url = `${clientConfig.targetURL}/catalogv2/catalogv2/SaleProducts/filter?variants=true&${param}`;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_SHOP_CATALOG',
                payload: response.data.docs
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function fetchEntireShopCatalog(param) {
    return function (dispatch) {
        if (param == undefined || param == '') {
            param = 'variants=true';
        } else {
            param = param + '&variants=true';
        }
        let url = `${clientConfig.targetURL}/catalogv2/catalogv2/SaleProducts/filter${param}`;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_ENTIRE_SHOP_CATALOG',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}