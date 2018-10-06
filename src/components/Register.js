import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {

  StyleSheet,

  View,

  Text,

  TouchableOpacity,
  Switch,
  TextInput,
  Button,
  Platform,
  AsyncStorage,
} from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';
import configConstants from './../config/configConstants';


class MemberForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: '', clubMemberId:'', phone:'',memberId:null,token:this.props.token};
  }

    registerMember () {

       fetch(configConstants.RESTAPI+'/member/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        phone: this.state.phone,
        clubMemberId: this.state.clubMemberId,
        club:configConstants.CLUBID,
        os:Platform.OS,
        token:this.state.token
      }),


      })
      .then((response) => response.json())
      .then(async (responseJson) => {
          //  alert(JSON.stringify(responseJson));
           let member={memberId:responseJson._id, name:this.state.name,isDepart:false, clubMemberId:this.state.clubMemberId,phone:this.state.phone};
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

    render(){
      return(<View style={style.container}>
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

        <TouchableOpacity style={style.button} onPress={()=>{ this.registerMember();}} >
          <Text  style={style.buttonText}>Register</Text>
        </TouchableOpacity>

      </View>
    );
    }
}

class DepartmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '',  phone:'',memberId:null,token:this.props.token};
  }
  registerDept () {

     fetch(configConstants.RESTAPI+'/department/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name:this.state.name,
      phone: this.state.phone,

      club:configConstants.CLUBID,
      os:Platform.OS,
      token:this.state.token
    }),


    })
    .then((response) => response.json())
    .then(async (responseJson) => {
        //  alert(JSON.stringify(responseJson));
         let member={memberId:responseJson._id, name:this.state.name,isDepart:true,clubId:configConstants.CLUBID, phone:this.state.phone};
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
  render(){
    return(
      <View >
        <Text style={style.title}> name :</Text>
        <TextInput style={style.inputBox}

              underlineColorAndroid='rgba(0,0,0,0)'



              placeholderTextColor = "#ffffff"

              selectionColor="#fff"


          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />

        <Text style={style.title}> Phone :</Text>
        <TextInput
         style={style.inputBox}

            underlineColorAndroid='rgba(0,0,0,0)'



            placeholderTextColor = "#ffffff"

            selectionColor="#fff"


          onChangeText={(phone) => this.setState({phone})}
          value={this.state.phone   }
        />

        <TouchableOpacity style={style.button} onPress={()=>{ this.registerDept();}} >
          <Text  style={style.buttonText}>Register Department</Text>
        </TouchableOpacity>

    </View>
      );
  }
}
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {token:this.props.navigation.state.params.token, os:this.props.navigation.state.params.phoneNum,isDept:false};
  }




  render() {

    const deptForm =  <DepartmentForm      token={this.state.token}      os={this.state.os}      />;
    const membForm = <MemberForm    token={this.state.token}    os={this.state.os}    />;
    let custForm;
    let switchText;
    if(this.state.isDept){
      custForm = deptForm;
      switchText ='Department';
    }else{
        custForm = membForm;
        switchText='Member';
    }

    return (
        <View style={style.container}>
        <Text >{switchText}</Text>
        <Switch
              value={this.state.isDept}
              onValueChange={(val) => {

                this.setState({ isDept: val});
                }
              }
              disabled={false}
              activeText={'Member'}
              inActiveText={'Department'}
              circleSize={30}
              barHeight={1}
              circleBorderWidth={3}
              backgroundActive={'green'}
              tintColor={'red'}
              circleActiveColor={'#30a566'}
              circleInActiveColor={'#000000'}
              changeValueImmediately={true}

              changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
              innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
              outerCircleStyle={{}} // style for outer animated circle
              renderActiveText={true}
              renderInActiveText={true}
              switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
              switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
              switchWidthMultiplier={2} // multipled by the `circleSize` prop to calculate total width of the Switch
            />
          {custForm}
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
