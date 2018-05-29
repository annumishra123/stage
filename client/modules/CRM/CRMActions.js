import { browserHistory } from 'react-router';
import axios from 'axios';

export function getTasksByContext(context, sortBy, pageNumber, pageSize) {
    return function (dispatch) {
        let url = '/api/leads/backend/get?context=' + context + '&sortBy=' + sortBy + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch({
                type: 'FETCH_TASKS',
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function getTaskById(id) {
    return function (dispatch) {
        let url = '/api/leads/backend/tasks/open?id=' + id;
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch({
                type: 'FETCH_TASK_DETAIL',
                payload: response.data
            });
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function updateCallbackRequest(requestObject) {
    return function (dispatch) {
        let url = '/api/leads/backend/update';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: requestObject
        }).then(function (response) {
            dispatch({
                type: 'FETCH_TASK_DETAIL',
                payload: response.data
            });
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function createInboundTask(taskObject) {
    return function (dispatch) {
        let url = '/api/leads/backend/inbound/add/';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: taskObject
        }).then(function (response) {
            browserHistory.push('/crm/tasks');
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function getAllContexts() {
    return function (dispatch) {
        let url = '/api/leads/contexts?size=1000';
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch({
                type: 'FETCH_ALL_CONTEXTS',
                payload: response.data._embedded.contexts
            })
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function createContext(contextObject) {
    return function (dispatch) {
        let url = '/api/leads/backend/context/add/';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: contextObject
        }).then(function (response) {
            dispatch(getAllContexts());
            alert('Context has been created');
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function getAllDispositions() {
    return function (dispatch) {
        let url = '/api/leads/dispositions?size=1000';
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        }).then(function (response) {
            dispatch({
                type: 'FETCH_ALL_DISPOSITIONS',
                payload: response.data._embedded.dispositions
            })
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function createDisposition(dispositionObject) {
    return function (dispatch) {
        let url = '/api/leads/backend/dispositions/add/';
        return axios({
            url: url,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: dispositionObject
        }).then(function (response) {
            dispatch(getAllDispositions());
            alert('Disposition has been created');
        }).catch(function (error) {
            console.log(error);
        });
    }
}