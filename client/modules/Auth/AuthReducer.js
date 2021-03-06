import * as ActionTypes from './constants';

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  loaded: false,
  role: '',
  message: '',
  email: '',
  owner: '',
  name: ''
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_CHECK_TOKEN:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        isFetching: action.isFetching,
        loaded: false,
      };
    case ActionTypes.TOKEN_VALID:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        isFetching: action.isFetching,
        loaded: true,
        role: action.role,
        email: action.email,
        owner: action.owner,
        name: action.name
      };
    case ActionTypes.TOKEN_INVALID:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        isFetching: action.isFetching,
        loaded: true,
      };
    case ActionTypes.REQUEST_LOGIN:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        isFetching: action.isFetching,
        user: action.creds,
        message: '',
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isFetching: false,
        message: '',
        role: action.role,
        email: action.email,
        owner: action.owner,
        name: action.name
      };
    case ActionTypes.LOGIN_FALIURE:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false,
        message: action.message,
      };
    case ActionTypes.REQUEST_LOGOUT:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        isFetching: action.isFetching,
        message: '',
        role: action.role,
        email: action.email,
        owner: action.owner,
        name: action.name
      };
    default:
      return state;
  }
};

export function allUsers(state = null, action) {
  switch (action.type) {
      case 'FETCH_ALL_USERS':
          return action.payload;
          break;
  }
  return state;
}


