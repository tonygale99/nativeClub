import React from 'react';

import {

  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  AsyncStorage,
  TouchableOpacity,
}from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';




class Home extends React.Component {

  constructor(props) {
   super(props);

   this.state = {memberId:null,phone:null,tableNum:null};

 }




  getProfile(){


      fetch('http://192.168.116.1:4000/member/phone/1234567890', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

      })
      .then((response) => response.json())
      .then((responseJson) => {
            Actions.myProfile({profile:JSON.stringify(responseJson)});
          })
      .catch((error) => {
            console.error(error);
      });

  }

  // load the account info
  async  componentWillMount(){

      try{
            let member= await AsyncStorage.getItem('member');

            let parsedMember=JSON.parse(member);
          //  alert(JSON.stringify(parsedMember));
          this.setState({memberId:parsedMember.memberId,phone:parsedMember.phone,name:parsedMember.name});



      }
      catch(error){
        console.log("member not found");
      }
  }

  render (){
  //  alert(this.state.memberId);
    if(this.state.memberId){
      return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.button} title=' Scan to Order' onPress={() =>{Actions.QRCodeScreen();}} >
        <Image style={styles.homeIcon}
          source ={require('./../../asset/image/food.jpg')} />
          <Text style={styles.instructions}>Scan to Order</Text>
        </TouchableOpacity>



          <TouchableOpacity style={styles.button} title=' my cart' onPress={() =>{Actions.MyCart(this.state);}}>
            <Image style={styles.homeIcon}
              source ={require('./../../asset/image/cart.jpg')} />
            <Text style={styles.instructions}>View Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} title=' Profile' onPress={() =>{Actions.myProfile(this.state);}}>
            <Image style={styles.homeIcon}
              source ={require('./../../asset/image/profile.jpg')} />
            <Text style={styles.instructions}>Profile</Text>
          </TouchableOpacity>

        </View>);
    }else{
       return (
     <View style={styles.container}>
      <TouchableOpacity onPress={ () =>{Actions.Register();}}>
        <Text>Please rigister first</Text>
      </TouchableOpacity>
        </View>);
    }
  }

}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1E1E1',
  },
  button: {
    flex: 1,

    margin:5,
    backgroundColor: '#F5FCFF',
    height:40,
    width: 300,
    flexDirection: 'row',

    alignItems: 'center'

  },
  instructions: {
    fontSize: 20,
    textAlign: 'right',
    color: '#333333',
    marginBottom: 5,
  },
  homeIcon: {


    height:40,
    width:40,

    margin:5,


  },
});



export default Home;
