import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

const LoadingView = props => {
  const {container, innerView, textStyle} = styles;
  return (
    <View style={container}>
      <View style={innerView}>
        <ActivityIndicator animating={true} size="large" color="black" />
        {props.text ? <Text style={textStyle}>{props.text}</Text> : null}
      </View>
    </View>
  );
};

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#00000050',
  },
  innerView: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  textStyle: {
    marginTop: 20,
    color: '#00000090',
    fontSize: 30,
  },
};

export default LoadingView;
