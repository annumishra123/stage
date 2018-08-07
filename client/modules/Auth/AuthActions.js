import * as ActionTypes from './constants';
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import axios from 'axios';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${(process.env.PORT || 8000)}`) : '';

export function requestLogin(creds) {
  return {
    type: ActionTypes.REQUEST_LOGIN,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

export function loginSuccess(user) {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: user.token,
    role: user.role,
    email: user.email,
    name: user.name,
    owner: user.owner
  };
}

export function loginFailure(message) {
  return {
    type: ActionTypes.LOGIN_FALIURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

export function requestLogout() {
  return {
    type: ActionTypes.REQUEST_LOGOUT,
    isAuthenticated: false,
    isFetching: false,
    role: '',
    email: '',
    name: '',
    owner: ''
  }
}

export function requestCheckToken() {
  return {
    type: ActionTypes.REQUEST_CHECK_TOKEN,
    isFetching: true,
    isAuthenticated: false,
  };
}

export function tokenValid(user) {
  return {
    type: ActionTypes.TOKEN_VALID,
    isFetching: false,
    isAuthenticated: true,
    role: user.role,
    email: user.email,
    name: user.name,
    owner: user.owner
  };
}

export function tokenInvalid() {
  return {
    type: ActionTypes.TOKEN_INVALID,
    isFetching: false,
    isAuthenticated: false,
  };
}

export function checkToken(sToken) {
  return (dispatch) => {
    const token = typeof window === 'undefined' ? sToken : localStorage.getItem('token');

    if (!token) {
      return Promise.resolve(dispatch(tokenInvalid()));
    }

    //   dispatch(requestCheckToken());
    return fetch(`${baseURL}/auth/me`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: new Headers({
        'Authorization': `JWT ${token}`,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          dispatch(tokenInvalid());
          return Promise.reject();
        }
        return response.json();
      })
      .then((response) => {
        const { user } = response;

        if (!user.ok) {
          dispatch(tokenInvalid());
          return Promise.reject();
        }
        user.token = token;
        dispatch(loginSuccess(user));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function loginUser(creds) {
  return (dispatch) => {
    dispatch(requestLogin(creds));
    return fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(creds),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        const { user, message } = response;
        if (!user.ok) {
          dispatch(loginFailure(message));
          alert('Please enter correct credentials.');
          return Promise.reject(message);
        }
        localStorage.setItem('token', user.token);
        dispatch(loginSuccess(user));
        browserHistory.push('/menu');
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function logoutUser() {
  return function (dispatch) {
    localStorage.removeItem('token');
    browserHistory.push('/');
    dispatch(requestLogout());
  }
}

export function changePassword(password) {
  return function (dispatch) {
    let url = '/auth/changepassword';
    let token = localStorage.getItem('token');
    if (token) {
      return axios({
        url: url,
        timeout: 20000,
        method: 'post',
        data: {
          "password": password
        },
        headers: {
          Authorization: 'JWT ' + token
        },
        responseType: 'json'
      }).then(function (response) {
        if (response.data.status == 'SUCCESS') {
          alert('Password has been changed');
          browserHistory.push('/menu');
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
}

export function createUser(user) {
  return function (dispatch) {
    let url = '/auth/createuser';
    let token = localStorage.getItem('token');
    if (token) {
      return axios({
        url: url,
        method: 'POST',
        data: user,
        headers:{
          Authorization: 'JWT ' + token,
        },
      }).then(function (response) {
        alert('User Created');
      }).catch(function (error) {
        alert('User Not Created');
      });
    }
  }
}