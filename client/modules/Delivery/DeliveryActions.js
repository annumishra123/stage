import axios from 'axios';

export function getOrderListByDate(dateParam, startDate, endDate) {
    return function(dispatch) {
        if (startDate && endDate && dateParam) {
            let url = '/api/om/orders/backend/orderlines/';
            return axios({
                url: url,
                timeout: 20000,
                method: 'post',
                data: {
                    "dateParam": dateParam,
                    "endDate": endDate,
                    "startDate": startDate
                },
                responseType: 'json'
            }).then(function(response) {
                dispatch({
                    type: 'FETCH_DELIVERY_ORDERS',
                    payload: response.data
                })
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
}

export function changeDeliveryStatus(deliveryObject) {
    return function(dispatch) {
        let url = '/api/om/orders/backend/logistics/';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            data: deliveryObject,
            responseType: 'json'
        }).then(function(response) {
            alert('Delivery status has been changed');
        }).catch(function(error) {
            console.log(error);
        });
    }
}