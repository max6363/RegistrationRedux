import reducer from './RegistrationReducer';

import {
  LOADING,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
} from '../actions/RegistrationActions';
import {expect} from '@jest/globals';

describe('Test RegistrationReducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isRequestForRegistration: false,
      registrationError: null,
    });
  });

  it('should handle REGISTRATION_SUCCESS', () => {
    expect(reducer([], {type: REGISTRATION_SUCCESS})).toEqual({
      isRequestForRegistration: false,
      registrationError: null,
    });
  });

  it('should handle REGISTRATION_FAILURE', () => {
    expect(
      reducer([], {
        type: REGISTRATION_FAILURE,
        registrationError: 'registration failed',
      }),
    ).toEqual({
      isRequestForRegistration: false,
      registrationError: 'registration failed',
    });
  });

  it('should handle LOADING (true)', () => {
    expect(
      reducer([], {type: LOADING, isRequestForRegistration: true}),
    ).toEqual({
      isRequestForRegistration: true,
    });
  });

  it('should handle LOADING (false)', () => {
    expect(
      reducer([], {type: LOADING, isRequestForRegistration: false}),
    ).toEqual({
      isRequestForRegistration: false,
    });
  });
});
