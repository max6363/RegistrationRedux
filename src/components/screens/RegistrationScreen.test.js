import React from 'react';
import {shallow} from 'enzyme';

import configureStore from 'redux-mock-store';

import {
  RegistrationScreen,
  mapStateToProps,
  mapDispatchToProps,
} from './RegistrationScreen';

describe('Registration Screen Tests', () => {
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore();
  });

  it('can test Registration Page (without loading)', () => {
    const onRegisterUserMock = jest.fn();

    wrapper = shallow(
      <RegistrationScreen
        store={store}
        registerUser={onRegisterUserMock}
        isRequestForRegistration={false}
      />,
    ).dive();

    const debug = wrapper.debug();
    expect(debug).toMatchSnapshot();
  });

  it('can test Registration Page (with loading)', () => {
    const onRegisterUserMock = jest.fn();

    wrapper = shallow(
      <RegistrationScreen
        store={store}
        registerUser={onRegisterUserMock}
        isRequestForRegistration={true}
      />,
    ).dive();

    const debug = wrapper.debug();
    expect(debug).toMatchSnapshot();
  });

  it('can test mapStateTopProps', () => {
    const initialStateObj = {
      RegistrationReducer: {
        isRequestForRegistration: false,
        registrationError: null,
      },
    };
    expect(mapStateToProps(initialStateObj).isRequestForRegistration).toEqual(
      false,
    );
    expect(mapStateToProps(initialStateObj).registrationError).toEqual(null);
  });

  it('can test mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    mapDispatchToProps(mockDispatch).requestRegistration();
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: 'LOADING',
      isRequestForRegistration: true,
    });
  });

  it('can test text change (match values)', () => {
    const screen = <RegistrationScreen store={store} />;
    wrapper = shallow(screen);

    const tfUsername = wrapper
      .find('TextFieldView')
      .at(0)
      .dive()
      .find('TextInput');
    tfUsername.simulate('focus', '');
    tfUsername.simulate('changeText', 'testUsername');
    expect(wrapper.state().username.value).toEqual('testUsername');
    tfUsername.simulate('blur', '');

    const tfPassword = wrapper
      .find('TextFieldView')
      .at(1)
      .dive()
      .find('TextInput');
    tfPassword.simulate('focus', '');
    tfPassword.simulate('changeText', 'my-secret-password');
    expect(wrapper.state().password.value).toEqual('my-secret-password');
    tfPassword.simulate('blur', '');

    const tfConfirmPassword = wrapper
      .find('TextFieldView')
      .at(2)
      .dive()
      .find('TextInput');
    tfConfirmPassword.simulate('focus', '');
    tfConfirmPassword.simulate('changeText', 'my-secret-password');
    expect(wrapper.state().confirmPassword.value).toEqual('my-secret-password');
  });

  it('can test text change (errors)', () => {
    const screen = <RegistrationScreen store={store} />;
    wrapper = shallow(screen);

    const tfUsername = wrapper
      .find('TextFieldView')
      .at(0)
      .dive()
      .find('TextInput');
    tfUsername.simulate('changeText', 'testUsername');
    expect(wrapper.state().username.value).toEqual('testUsername');

    tfUsername.simulate('changeText', '');
    tfUsername.simulate('blur', '');

    const tfPassword = wrapper
      .find('TextFieldView')
      .at(1)
      .dive()
      .find('TextInput');
    tfPassword.simulate('changeText', 'my-secret-password-1');
    expect(wrapper.state().password.value).toEqual('my-secret-password-1');

    tfPassword.simulate('changeText', '');
    tfPassword.simulate('blur', '');

    const tfConfirmPassword = wrapper
      .find('TextFieldView')
      .at(2)
      .dive()
      .find('TextInput');
    tfConfirmPassword.simulate('changeText', 'my-secret-password-2');
    expect(wrapper.state().confirmPassword.value).toEqual(
      'my-secret-password-2',
    );
    tfConfirmPassword.simulate('blur', '');
  });
});
