import {createStackNavigator} from 'react-navigation-stack';

import RegistrationScreen from './screens/RegistrationScreen';
export const RegisterScreenAppStack = createStackNavigator({
  RegistrationScreen: {
    screen: RegistrationScreen,
  },
});

import {createSwitchNavigator} from 'react-navigation';
const Nav = createSwitchNavigator(
  {
    RegistrationScreen: RegisterScreenAppStack,
  },
  {
    initialRoutename: 'Root',
  },
);

import {createAppContainer} from 'react-navigation';
export default createAppContainer(Nav);
