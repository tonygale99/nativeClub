import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {

  StyleSheet,

  View,

  Text,

  TouchableOpacity,

  TextInput,
  Button,
  AsyncStorage,
} from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';

import configConstants from './../config/configConstants';
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', clubMemberId:'', phone:'',memberId:null};
  }



  register () {

     fetch(configConstants.RESTAPI+'/member/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      phone: this.state.phone,
      clubMemberId: this.state.clubMemberId,
      club:'5b00a78e6f1ba44104740768'
    }),


    })
    .then((response) => response.json())
    .then(async (responseJson) => {
        //  alert(JSON.stringify(responseJson));
         let member={memberId:responseJson._id, name:this.state.name, clubMemberId:this.state.clubMemberId,phone:this.state.phone};
           let memberObj=JSON.stringify(member);
      //    alert('registing:'+memberObj);
             try {

               await AsyncStorage.setItem('member', memberObj);


              } catch (error) {
                alert('cannot regist user:'+error);
              }

              Actions.home();

    }
    //  this.saveToStorage(memberObj);
        )
    .catch((error) => {
          console.error(error);
    });
  }

  render() {


    return (
      <View style={style.container}>
        <Text style={style.title}> name :</Text>
        <TextInput style={style.inputBox}

              underlineColorAndroid='rgba(0,0,0,0)'



              placeholderTextColor = "#ffffff"

              selectionColor="#fff"


          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />
        <Text style={style.title}> memberId :</Text>
        <TextInput
         style={style.inputBox}

            underlineColorAndroid='rgba(0,0,0,0)'



            placeholderTextColor = "#ffffff"

            selectionColor="#fff"


          onChangeText={(clubMemberId) => this.setState({clubMemberId})}
          value={this.state.clubMemberId}
        />
        <Text style={style.title}> Phone :</Text>
        <TextInput
         style={style.inputBox}

            underlineColorAndroid='rgba(0,0,0,0)'



            placeholderTextColor = "#ffffff"

            selectionColor="#fff"


          onChangeText={(phone) => this.setState({phone})}
          value={this.state.phone
          }
        />

        <TouchableOpacity style={style.button} onPress={()=>{ this.register();}} >
          <Text  style={style.buttonText}>Register</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const style = StyleSheet.create({
  container : {

    flexGrow: 1,

    justifyContent:'center',

    alignItems: 'center'

  },



  inputBox: {

    width:300,

    backgroundColor:'rgba(255, 255,255,0.2)',

    borderRadius: 25,

    paddingHorizontal:16,

    fontSize:16,

    color:'#000000',

    marginVertical: 5

  },

  button: {

    width:300,

    backgroundColor:'#0b35ff',

     borderRadius: 25,

      marginVertical: 5,

      paddingVertical: 13

  },

  buttonText: {

    fontSize:16,

    fontWeight:'500',

    color:'#ffffff',

    textAlign:'center'

  },
  title: {
    fontSize: 18,
    marginBottom: 5
  },

});

export default Register;
