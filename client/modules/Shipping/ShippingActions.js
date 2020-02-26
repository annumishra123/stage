import axios from 'axios';
import clientConfig from '../../config';

export function uploadWaybillCSV(file, user) {
    let url = '/api/leads/backend/upload/waybills';
    let fileObj = new FormData();
    fileObj.append('file', file);
    return function (dispatch) {
        return axios({
            method: 'POST',
            url: url,
            data: fileObj,
            headers: {
                "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null,
                'user': user
            }
        }).then(function (response) {
            dispatch(getWaybills('', 0, 10));
            alert('Document Uploaded');
        }).catch(function (error) {
            console.log(error);
            alert('Error: ' + error.response.data.message);
        });
    };
}

export function getWaybills(phoneNumber, pageNumber, pageSize, waybillNumber) {
    let url = '/api/leads/backend/get/waybills?phoneNumber=' + phoneNumber + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&waybillNumber=' + waybillNumber;
    return function (dispatch) {
        return axios({
            method: 'GET',
            url: url,
            headers: {
                "Authorization": localStorage.getItem('token') ? 'JWT ' + localStorage.getItem('token') : null
            }
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