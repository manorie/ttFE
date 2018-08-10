import { post } from 'axios';
import * as typ from '../../constants/actionTypes';

const onUserLogout = () => (dispatch) => {
  dispatch({
    type: typ.USER_LOG_OUT,
  });
};

const onUserLogin = ({ email, password }) => (dispatch) => {
  dispatch({
    type: typ.USER_LOGIN_ERROR_SET,
    payload: {
      error: '',
    },
  });

  dispatch({
    type: typ.USER_LOGGING_IN,
    payload: {
      loggingIn: true,
    },
  });

  post('http://localhost:9123/login', {
    email,
    password,
  })
    .then((resp) => {
      dispatch({
        type: typ.USER_LOGIN_SUCCESS,
        payload: {
          name: resp.data.name,
          email: resp.data.email,
          token: resp.data.token,
        },
      });
    })
    .catch((error) => {
      const {
        response: {
          data: {
            message,
          },
        },
      } = error;

      dispatch({
        type: typ.USER_LOGIN_ERROR_SET,
        payload: {
          error: message,
        },
      });
    })
    .finally(() => {
      dispatch({
        type: typ.USER_LOGGING_IN,
        payload: {
          loggingIn: false,
        },
      });
    });
};

module.exports = {
  onUserLogin,
  onUserLogout,
};
