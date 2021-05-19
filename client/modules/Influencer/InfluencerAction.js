import clientConfig from '../../config';
import axios from 'axios';

export function fetchAllInfluencers() {
    return function (dispatch) {
        let loopbackFilter = {
            where: {
                status: true
            }
        };
        let url = clientConfig.targetURL + '/catalogv2/catalogv2/ShopInfluencerCarousels?filter=' + JSON.stringify(loopbackFilter);
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then((response) => {
            dispatch({
                type: 'FETCH_INFLUENCERS',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}