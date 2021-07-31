import {
  LOADING,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
} from '../actions/RegistrationActions';

export const initialState = {
  isRequestForRegistration: false,
  registrationError: null,
};

const RegistrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      state = Object.assign({}, state, {
        isRequestForRegistration: action.isRequestForRegistration,
      });
      return state;

    case REGISTRATION_SUCCESS:
      state = Object.assign({}, state, {
        isRequestForRegistration: false,
        registrationError: null,
      });
      return state;

    case REGISTRATION_FAILURE:
      state = Object.assign({}, state, {
        isRequestForRegistration: false,
        registrationError: action.registrationError,
      });
      return state;

    default:
      return state;
  }
};

export default RegistrationReducer;
