import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      container,
      clickableStyle,
      textStyle,
      enabledTextColor,
      enabledBackgroundColor,
      disabledTextColor,
      disabledBackgroundColor,
    } = styles;
    const {title, isDisabled} = this.props;

    return (
      <View
        style={[
          container,
          isDisabled ? disabledBackgroundColor : enabledBackgroundColor,
        ]}>
        <TouchableOpacity
          disabled={isDisabled}
          style={[clickableStyle]}
          onPress={this.props.onPress}>
          <Text
            style={[
              textStyle,
              isDisabled ? disabledTextColor : enabledTextColor,
            ]}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clickableStyle: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: 'black',
  },
  enabledTextColor: {
    color: 'white',
  },
  enabledBackgroundColor: {
    backgroundColor: '#005493',
  },
  disabledTextColor: {
    color: 'white',
  },
  disabledBackgroundColor: {
    backgroundColor: '#00000050',
  },
};
