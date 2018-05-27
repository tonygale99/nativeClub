import React from 'react';

import {
    AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
}from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';

import configConstants from './../config/configConstants';



class MyProfile extends React.Component {

  constructor(props) {
   super(props);
  // alert(JSON.stringify(this.props.navigation.state.params));
   this.state = {name:this.props.navigation.state.params.name,phone:this.props.navigation.state.params.phone,memberId:this.props.navigation.state.params.memberId};
   }
   componentWillMount(){

    // let orderId=this.props.navigation.state.params._id;
     //alert(JSON.stringify(this.props.navigation));
    // let member= await AsyncStorage.getItem('member');

    // let parsedMember=JSON.parse(member);
  //  let memberId=this.props.navigation.state.params.memberId;
    //let items=this.props.navigation.state.params.items;
  //  let phoneNum =this.props.navigation.state.params.phoneNum;
    //let name= this.props.navigation.state.params.name;

  // this.setState({memberId:memberId,phone:phoneNum,name:name});
   /*

       fetch(configConstants.RESTAPI+'/order/member/'+memberId, {
         method: 'GET',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },


       })
       .then((response) => response.json())
       .then((responseJson) => {
        // alert(JSON.stringify( responseJson));
        //  this.setState({ });
           })
       .catch((error) => {
             console.error(error);
       });
*/


   }

   render(){
      return(

        <View>
          <View>
          <Text>
            name: {this.state.name}
          </Text>
          <Text>
            phone:{this.state.phone}
          </Text>
          </View>


          <TouchableOpacity style={style.button} onPress={()=>{ Actions.home();}} >
            <Text  style={style.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.button} onPress={()=>{ Actions.myCart();}} >
            <Text  style={style.buttonText}>View Cart</Text>
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
export default MyProfile;
