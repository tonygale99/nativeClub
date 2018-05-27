'use strict';



//var React = require('react-native');
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {

  StyleSheet,

  View,

  Text,

  TouchableOpacity,

  VibrationIOS,

  Vibration,
  Linking,


} from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';

import Camera from 'react-native-camera';


class QRCodeScreen extends React.Component {






  constructor(props) {
   super(props);
   this.state = {scanning: true,
   cameraType: Camera.constants.Type.back};
 }





  _onBarCodeRead (result)  {

    Vibration.vibrate();
    this.setState({scanning: false});
    Actions.Services(result.data);




    //return;




  }


  render() {



    if(this.state.scanning) {








    return (

      <Camera onBarCodeRead={this._onBarCodeRead.bind(this)} style={styles.camera} type={this.state.cameraType} >

        <View style={styles.rectangleContainer}>

          <View style={styles.rectangle}/>

        </View>



      </Camera>

    );
  }else{
    return (<View  style={styles.container}>
        <Text style={styles.welcome}>
        Barcode Scanner
        </Text>
        <Text style={styles.instructions}>
        Double tap R on your keyboard to reload,{'\n'}
        </Text>
    </View>);
    }


  }

}






const styles = StyleSheet.create({



  camera: {

    height: 568,

    alignItems: 'center',

  },



  rectangleContainer: {

    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: 'transparent',

  },



  rectangle: {

    height: 250,

    width: 250,

    borderWidth: 2,

    borderColor: '#00FF00',

    backgroundColor: 'transparent',

  },



  cancelButton: {

    flexDirection: 'row',

    justifyContent: 'center',

    backgroundColor: 'white',

    borderRadius: 3,

    padding: 15,

    width: 100,

    bottom: 10,

  },

  cancelButtonText: {

    fontSize: 17,

    fontWeight: '500',

    color: '#0097CE',

  },

});



export default  QRCodeScreen;
