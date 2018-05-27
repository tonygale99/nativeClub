/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';

import {

  Router,
  Scene,
} from 'react-native-router-flux'

import Home from './src/components/Home';
import MyCart from './src/components/MyCart';
import MyProfile from './src/components/MyProfile';
import OrderDetails from './src/components/OrderDetails';
import QRCodeScreen from './src/components/QRCodeScreen';
import Services from './src/components/Services';

import Register from './src/components/Register';

import OrderSummary from './src/components/OrderSummary';





export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key='root'>
            <Scene key='home' component={Home} title='Home' > </Scene>
            <Scene key='MyCart' component={MyCart} title='MyCart'> </Scene>
            <Scene key='myProfile' component={MyProfile} title='MyProfile'> </Scene>
            <Scene key='QRCodeScreen' component={QRCodeScreen} title='QRCodeScreen'> </Scene>
            <Scene key='Services' component={Services} title='Services'> </Scene>
            <Scene key='OrderDetails' component={OrderDetails} title='OrderDetails'> </Scene>
            <Scene key='Register' component={Register} title='Register'> </Scene>
            
            <Scene key='OrderSummary' component={OrderSummary} title='OrderSummary'> </Scene>
        </Scene>
      </Router>
    );
  }
}
