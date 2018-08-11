import * as typ from '../../constants/actionTypes';

const user = (state = {
  loggingIn: false,
  loginError: '',
  registering: false,
  registerError: '',
  name: '',
  email: '',
  token: '',
}, action) => {
  switch (action.type) {
    case typ.USER_LOGGING_IN: {
      return {
        ...state,
        loggingIn: action.payload.loggingIn,
      };
    }
    case typ.USER_LOGIN_SUCCESS: {
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
      };
    }
    case typ.USER_LOGIN_ERROR_SET: {
      return {
        ...state,
        loginError: action.payload.error,
      };
    }
    case typ.USER_LOG_OUT: {
      return {
        ...state,
        token: '',
      };
    }
    default:
      return state;
  }
};

export default user;
