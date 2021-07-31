import fetchMock from 'fetch-mock';

import * as Actions from './RegistrationActions';
import RegistrationReducer from '../reducers/RegistrationReducer';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test Registration Action Creators', () => {
  it('should return the initial state', () => {
    expect(RegistrationReducer(undefined, {})).toEqual({
      isRequestForRegistration: false,
      registrationError: null,
    });
  });

  it('should create action: Registration success', () => {
    const expectedAction = {
      type: 'REGISTRATION_SUCCESS',
      registrationError: null,
    };
    expect(Actions.registerSuccess()).toEqual(expectedAction);
  });

  it('should create action: Registration failure', () => {
    const expectedAction = {
      type: 'REGISTRATION_FAILURE',
      registrationError: 'Registration failed',
    };
    expect(Actions.registerFailure('Registration failed')).toEqual(
      expectedAction,
    );
  });

  it('should create action: Registration start loading', () => {
    const expectedAction = {
      type: 'LOADING',
      isRequestForRegistration: true,
    };
    expect(Actions.requestRegistration()).toEqual(expectedAction);
  });

  it('should create action: Registration stop loading', () => {
    const expectedAction = {
      type: 'LOADING',
      isRequestForRegistration: false,
    };
    expect(Actions.stopLoading()).toEqual(expectedAction);
  });
});

describe('Test Registration (Server API)', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should pass to register for a user', async () => {
    fetchMock.postOnce('http://localhost:3001' + '/users', {
      access_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2dvbnRvLmNvbSIsImF1ZCI6Im5vZGVqcy1qd3QtYXV0aCIsImV4cCI6MTYyNzIxODY4MSwic2NvcGUiOiJmdWxsX2FjY2VzcyIsInN1YiI6ImxhbGFsYW5kfGdvbnRvIiwianRpIjoiR0VGWkxGUVJvY3VNYlFsZiIsImFsZyI6IkhTMjU2IiwiaWF0IjoxNjI3MjE1MDgxfQ.aQiTNQHCxSC6PPSDL0b-ug_WtTq7l1hr4vehnCxNhks',
      id_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IlBwayIsImlkIjoxMSwiaWF0IjoxNjI3MjE1MDgxLCJleHAiOjE2MjcyMzMwODF9.BNedsJe9tNlr_xvVIq8eeokp04mS4W1q96v5pe3sOKg',
    });

    const expectedActions = [
      {type: 'LOADING', isRequestForRegistration: true},
      {type: 'LOADING', isRequestForRegistration: false},
      {type: 'REGISTRATION_SUCCESS', registrationError: null},
    ];
    const response = await Actions.registerUser(
      'testusername1',
      'testpassword1',
    );
    const store = mockStore({});
    return store.dispatch(response).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should fail to register a user (invalid url)', async () => {
    fetchMock.postOnce('invalid url' + '/users', null);
    const response = await Actions.registerWithUrl(
      'invalid url/users',
      'testusername2',
      'testpassword2',
    );
    const expectedActions = [
      {type: 'LOADING', isRequestForRegistration: true},
      {
        type: 'REGISTRATION_FAILURE',
        registrationError: 'Registration failed',
      },
    ];
    const store = mockStore({});
    return store.dispatch(response).then(d => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should fail to register a user (no access_token found)', async () => {
    fetchMock.postOnce('http://localhost:3031' + '/users', {});
    const response = await Actions.registerWithUrl(
      'http://localhost:3031' + '/users',
      'testusername2',
      'testpassword2',
    );
    const expectedActions = [
      {type: 'LOADING', isRequestForRegistration: true},
      {type: 'LOADING', isRequestForRegistration: false},
      {
        type: 'REGISTRATION_FAILURE',
        registrationError: 'Registration failed',
      },
    ];
    const store = mockStore({});
    return store.dispatch(response).then(d => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
