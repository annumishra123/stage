import clientConfig from '../../config';
import axios from 'axios';

export function fetchAllSpotlightInfluencers() {
    return function (dispatch) {
        // let loopbackFilter = {
        //     where: {
        //         status: true
        //     }
        // };
        // let url = clientConfig.targetURL + '/catalogv2/catalogv2/ShopInfluencerCarousels?filter=' + JSON.stringify(loopbackFilter);
        let url = `${clientConfig.targetURL}/api/myaccount/profile/frontend/influencer/spotlight`;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
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
        let url = `${clientConfig.targetURL}/api/myaccount/profile/frontend/influencers`;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
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