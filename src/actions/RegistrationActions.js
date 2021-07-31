import {BASE_URL} from '../common/Constants';

export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';
export const LOADING = 'LOADING';

export function registerSuccess() {
  return {
    type: REGISTRATION_SUCCESS,
    registrationError: null,
  };
}

export function registerFailure(error) {
  return {
    type: REGISTRATION_FAILURE,
    registrationError: error,
  };
}

export function requestRegistration() {
  return {
    type: LOADING,
    isRequestForRegistration: true,
  };
}

export function stopLoading() {
  return {
    type: LOADING,
    isRequestForRegistration: false,
  };
}

export function registerUser(username, password) {
  let url = BASE_URL + '/users';
  return registerWithUrl(url, username, password);
}

export function registerWithUrl(url, username, password) {
  return async dispatch => {
    dispatch(requestRegistration());
    let body = JSON.stringify({
      username: username,
      password: password,
    });
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(url, {method: 'POST', headers: headers, body: body})
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch(stopLoading());
        if (data && data.access_token) {
          dispatch(registerSuccess());
        } else {
          dispatch(registerFailure('Registration failed'));
        }
      })
      .catch(error => {
        dispatch(registerFailure('Registration failed'));
      });
  };
}
