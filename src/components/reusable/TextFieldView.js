import React, {Component} from 'react';
import {View, TextInput, Text, TouchableOpacity, Image} from 'react-native';

export default class TextFieldView extends Component {
  constructor(props) {
    super(props);
  }
  renderShowHideButton() {
    const {showHideButtonStyle} = styles;
    const {isSecureTextVisible} = this.props;
    const icon =
      isSecureTextVisible === true
        ? require('./../img/unmask.png')
        : require('./../img/mask.png');
    if (this.props.isSecureTextField) {
      return (
        <TouchableOpacity
          onPress={this.props.onPasswordShowHideButtonPress}
          style={showHideButtonStyle}
          testID={this.props.passwordShowHideTestID}
          accessibilityRole={'button'}
          accessibilityLabel={this.props.passwordShowHideTestID}
          accessible={true}>
          <Image source={icon} resizeMode="contain" />
        </TouchableOpacity>
      );
    }
  }
  render() {
    const {container, labelStyle, textStyle, errorLabelStyle} = styles;
    const {label, text, textInputTestID} = this.props;
    const error = this.props.error();

    return (
      <View style={container}>
        <View style={labelStyle.container}>
          <Text style={labelStyle.text}>{label}</Text>
        </View>
        <View style={textStyle.container}>
          <TextInput
            testID={textInputTestID}
            style={textStyle.text}
            secureTextEntry={
              this.props.isSecure
                ? this.props.isSecureTextVisible
                  ? false
                  : true
                : false
            }
            onChangeText={this.props.onChangeText}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
            {text}
          </TextInput>
          {this.renderShowHideButton()}
        </View>
        {error !== null && error !== undefined ? (
          <View style={errorLabelStyle.container}>
            <Text style={errorLabelStyle.text}>{error}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  labelStyle: {
    container: {
      alignSelf: 'stretch',
    },
    text: {fontSize: 15},
  },
  textStyle: {
    container: {
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#00000090',
      borderRadius: 4,
      marginTop: 5,
      padding: 5,
      flexDirection: 'row',
    },
    text: {fontSize: 22, flex: 1},
  },
  errorLabelStyle: {
    container: {
      alignSelf: 'stretch',
      marginTop: 5,
    },
    text: {fontSize: 11, color: 'red'},
  },
  showHideButtonStyle: {
    flex: 1.2,
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 5,
  },
};
