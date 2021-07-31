import React, {Component} from 'react';
import {View, ScrollView, SafeAreaView, Alert} from 'react-native';
import Validation from '../../common/Validation';
import TextFieldView from './../reusable/TextFieldView';
import Button from '../reusable/Button';
import LoadingView from '../reusable/LoadingView';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as RegistrationActions from './../../actions/RegistrationActions';

export class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: {
        label: 'Username',
        key: 'username',
        isRequired: true,
        value: '',
        ignoreError: true,
      },
      password: {
        label: 'Password',
        key: 'password',
        isRequired: true,
        value: '',
        ignoreError: true,
        showPassword: false,
      },
      confirmPassword: {
        label: 'Confirm Password',
        key: 'password',
        isRequired: true,
        value: '',
        ignoreError: true,
      },
    };
  }

  static navigationOptions = ({}) => {
    return {
      headerTitle: 'Registration',
    };
  };

  renderUsernameField() {
    const username = this.state.username;
    return (
      <TextFieldView
        textInputTestID={'tfUsername'}
        label={username.label + '*'}
        text={username.value}
        error={() => {
          if (username.ignoreError) {
            return null;
          }
          return this.usernameValidationError();
        }}
        onChangeText={text => {
          this.setState(
            {
              username: {
                ...this.state.username,
                value: text,
                ignoreError: true,
              },
            },
            () => {},
          );
        }}
        onBlur={() => {
          this.setState(
            {
              username: {
                ...this.state.username,
                ignoreError: false,
              },
            },
            () => {},
          );
        }}
        onFocus={() => {
          this.setState(
            {
              username: {
                ...this.state.username,
                ignoreError: true,
              },
            },
            () => {},
          );
        }}
      />
    );
  }

  renderPasswordField() {
    const password = this.state.password;
    return (
      <TextFieldView
        textInputTestID={'tfPassword'}
        isSecure={true}
        isSecureTextVisible={password.showPassword}
        isSecureTextField={true}
        onPasswordShowHideButtonPress={() => {
          this.setState(
            {
              password: {
                ...this.state.password,
                showPassword: !password.showPassword,
              },
            },
            () => {},
          );
        }}
        label={password.label + '*'}
        text={password.value}
        error={() => {
          if (password.ignoreError) {
            return null;
          }
          return this.passwordValidationError();
        }}
        onChangeText={text => {
          this.setState(
            {
              password: {
                ...this.state.password,
                value: text,
                ignoreError: true,
              },
            },
            () => {},
          );
        }}
        onBlur={() => {
          this.setState(
            {
              password: {
                ...this.state.password,
                ignoreError: false,
              },
            },
            () => {},
          );
        }}
        onFocus={() => {
          this.setState(
            {
              password: {
                ...this.state.password,
                ignoreError: true,
              },
            },
            () => {},
          );
        }}
      />
    );
  }

  renderConfirmPasswordField() {
    const confirmPassword = this.state.confirmPassword;
    return (
      <TextFieldView
        textInputTestID={'tfConfirmPassword'}
        label={confirmPassword.label + '*'}
        text={confirmPassword.value}
        isSecure={true}
        error={() => {
          if (confirmPassword.ignoreError) {
            return null;
          }
          return this.confirmPasswordValidionError();
        }}
        onChangeText={text => {
          this.setState(
            {
              confirmPassword: {
                ...this.state.confirmPassword,
                value: text,
                ignoreError: true,
              },
            },
            () => {},
          );
        }}
        onBlur={() => {
          this.setState(
            {
              confirmPassword: {
                ...this.state.confirmPassword,
                ignoreError: false,
              },
            },
            () => {},
          );
        }}
        onFocus={() => {
          this.setState(
            {
              confirmPassword: {
                ...this.state.confirmPassword,
                ignoreError: true,
              },
            },
            () => {},
          );
        }}
      />
    );
  }

  renderSubmitButton() {
    const {submitStyle} = styles;
    const isDisabled = this.isFormValid() === false;
    const {username, password} = this.state;
    return (
      <View style={submitStyle.container}>
        <View style={submitStyle.button}>
          <Button
            title="Submit"
            isDisabled={isDisabled}
            onPress={async () => {
              await this.props.registerUser(username.value, password.value);
              if (this.props.registrationError) {
                Alert.alert('Error', 'User registration failed');
              } else {
                Alert.alert('Success', 'User registration success');
              }
            }}
          />
        </View>
      </View>
    );
  }

  usernameValidationError() {
    const {username} = this.state;
    if (Validation.isStringValid(username.value) === false) {
      return 'enter username';
    }
    return null;
  }

  passwordValidationError() {
    const {password} = this.state;
    if (Validation.isStringValid(password.value) === false) {
      return 'enter password';
    }
    return null;
  }
  confirmPasswordValidionError() {
    const {confirmPassword, password} = this.state;
    if (Validation.isStringValid(confirmPassword.value) === false) {
      return 'enter confirm password';
    }
    if (password.value !== confirmPassword.value) {
      return 'passwords do not match';
    }
    return null;
  }

  isFormValid() {
    if (
      this.usernameValidationError() ||
      this.passwordValidationError() ||
      this.confirmPasswordValidionError()
    ) {
      return false;
    }
    return true;
  }

  render() {
    const {container} = styles;
    const loading = this.props.isRequestForRegistration;
    return (
      <View style={container}>
        <SafeAreaView>
          <ScrollView>
            {this.renderUsernameField()}
            {this.renderPasswordField()}
            {this.renderConfirmPasswordField()}
            {this.renderSubmitButton()}
          </ScrollView>
        </SafeAreaView>
        {loading ? <LoadingView text="Please wait..." /> : null}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'white',
  },
  submitStyle: {
    container: {
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
    },
    button: {
      width: 150,
      height: 50,
      borderRadius: 25,
      overflow: 'hidden',
    },
  },
};

export function mapStateToProps(state) {
  return {
    isRequestForRegistration:
      state.RegistrationReducer.isRequestForRegistration,
    registrationError: state.RegistrationReducer.registrationError,
  };
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(RegistrationActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);
