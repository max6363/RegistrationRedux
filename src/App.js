import React, {Component} from 'react';
import {View, AppState, Text, TextInput} from 'react-native';

import Navigator from './components/Navigator';
import {isTablet} from 'react-native-device-info';

import store from './store';
import {Provider} from 'react-redux';

global.isTablet = isTablet();

export default class App extends Component {
  constructor(props) {
    super(props);

    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.maxFontSizeMultiplier = 1;
    Text.defaultProps.minimumFontScale = 1;

    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.maxFontSizeMultiplier = 1;
    TextInput.defaultProps.minimumFontScale = 1;
  }

  state = {
    appState: AppState.currentState,
  };

  componentDidMount() {
    console.log('App.js => componentDidMount called');
  }

  componentWillUnmount() {
    console.log('App.js => componentWillUnmount called');
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <View style={styles.navigator}>
            <Navigator />
          </View>
        </View>
      </Provider>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navigator: {
    flex: 1,
  },
};
