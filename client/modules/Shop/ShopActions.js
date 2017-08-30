import axios from 'axios';

export function getShopOrderListByDate(startDate, endDate) {
    return function(dispatch) {
        if (startDate && endDate) {
            let url = '/api/shop-service/backend/getOrdersbyDateRange/' + startDate + '/' + endDate;
            return axios({
                url: url,
                timeout: 20000,
                method: 'get',
                responseType: 'json'
            }).then(function(response) {
                dispatch({
                    type: 'FETCH_SHOP_ORDERS',
                    payload: response.data
                })
            }).catch(function(error) {
                console.log(error);
            })
        }
    }
}

