import axios from 'axios';
import clientConfig from '../../config';

export function uploadWaybillCSV(file, user) {
    let url = clientConfig.targetURL + '/api/leads/backend/upload/waybills';
    let fileObj = new FormData();
    fileObj.append('file', file);
    return function (dispatch) {
        return axios({
            method: 'POST',
            url: url,
            data: fileObj,
            headers: {
                'user': user
            }
        }).then(function (response) {
            dispatch(getWaybills('', 0, 10));
            alert('Document Uploaded');
        }).catch(function (error) {
            console.log(error);
        });
    };
}

export function getWaybills(phoneNumber, pageNumber, pageSize) {
    let url = '/api/leads/backend/get/waybills?phoneNumber=' + phoneNumber + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize;
    return function (dispatch) {
        return axios({
            method: 'GET',
            url: url
        }).then(function (response) {
            dispatch({
                type: 'FETCH_WAYBILLS',
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    };
}