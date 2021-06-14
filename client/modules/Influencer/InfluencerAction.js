import clientConfig from '../../config';
import axios from 'axios';

export function fetchAllSpotlightInfluencers() {
    return function (dispatch) {
        let url = `/api/myaccount/profile/frontend/influencer/spotlight`;
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
                type: 'FETCH_SPOTLIGHT_INFLUENCERS',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function fetchAllInfluencers() {
    return function (dispatch) {
        let url = `/api/myaccount/profile/frontend/influencers`;
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
                type: 'FETCH_ALL_INFLUENCERS',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function fetchInfluencerCarousel() {
    return function (dispatch) {
        let loopbackFilter = {
            where: {
                status: true
            }
        };
        let url = `${clientConfig.targetURL}/catalogv2/catalogv2/ShopInfluencerCarousels?filter=${JSON.stringify(loopbackFilter)}`;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_INFLUENCERS_CAROUSEL',
                payload: response.data
            });
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
                type: 'FETCH_ALL_SELLERS',
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function createUpdateInfluencer(param) {
    return function (dispatch) {
        let url = `/api/myaccount/profile/backend/influencer/`;
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: param,
            headers: {
                "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
            }
        }).then((response) => {
            console.log(response.data);
            dispatch(fetchAllInfluencers());
            alert(`Successfully ${param.influencer ? 'created' : 'deleted'} influencer`);
        }).catch((error) => {
            console.log(error);
            alert('Fails to create influencers');
        });
    }
}

export function createBanner(param) {
    return function (dispatch) {
        let cloudinaryUrl = `${clientConfig.targetURL}/catalogv2/catalogv2/SaleProducts/upload/cloudinary`,
            formData = new FormData();
        formData.append('image', param.image);
        return axios({
            url: cloudinaryUrl,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response);
            let imageUrl = response.data.length != 0 && response.data.map(i => Object.values(i)).toString() || "";
            let url = `${clientConfig.targetURL}/catalogv2/catalogv2/ShopInfluencerCarousels`,
                influencerRawData = {
                    title: param.title,
                    link: param.link,
                    image: imageUrl,
                    status: param.status
                };
            return axios({
                url: url,
                timeout: 20000,
                method: 'post',
                responseType: 'json',
                data: influencerRawData,
            }).then((response) => {
                console.log(response.data);
                dispatch(fetchInfluencerCarousel());
            }).catch((error) => {
                console.log(error);
                alert('Influencer creation failed');
            });
        }).catch((error) => {
            console.log(error);
            alert('Image Upload Failed');
        });
    }
}

export function deleteBanner(id) {
    return function (dispatch) {
        let url = `${clientConfig.targetURL}/catalogv2/catalogv2/ShopInfluencerCarousels/${id}/replace`,
            updateData = {
                status: false
            };
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: updateData,
        }).then((response) => {
            console.log(response.data);
            dispatch(fetchInfluencerCarousel());
        }).catch((error) => {
            console.log(error);
            alert('Fails to create influencers');
        });
    }
}