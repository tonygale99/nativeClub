import React from 'react';

import {

  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Platform,
  AsyncStorage,
  TouchableOpacity,
  Clipboard,
  ScrollView
}from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';


import FCM, { FCMEvent, NotificationActionType } from "react-native-fcm";



import { registerKilledListener, registerAppListener } from "./../utils/Listener";

import firebaseClient from "./../config/FirebaseClient";

registerKilledListener();
class Home extends React.Component {

  constructor(props) {
   super(props);

   this.state = {memberId:null,phone:null,tableNum:null,isDepart:false, token: "",department:"",

      tokenCopyFeedback: ""};

 }



// regist Listeners

async componentDidMount() {

// load the account info
  try{
        let member= await AsyncStorage.getItem('member');

        let parsedMember=JSON.parse(member);
      //  alert(JSON.stringify(parsedMember));
      if(!parsedMember.isDepart){

          this.setState({memberId:parsedMember.memberId,phone:parsedMember.phone,name:parsedMember.name,isDepart:parsedMember.isDepart, token:parsedMember.token});
      }
      else {
        this.setState({memberId:parsedMember.memberId,phone:parsedMember.phone,name:parsedMember.name,clubId:parsedMember.clubId,isDepart:true, token:parsedMember.token,department :'kitchen'});
      }
    //  alert(JSON.stringify(this.state));
  }
  catch(error){
    console.log("member not found");

  }

// regist token
   registerAppListener(this.props.navigation);

   FCM.getInitialNotification().then(notif => {
      this.setState({
        initNotif: notif
      });

  /*   if (notif && notif.targetScreen === "detail") {
        setTimeout(() => {
          this.props.navigation.navigate("Detail");
       }, 500);
     } */
    });

   try {
     let result = await FCM.requestPermissions({
       badge: false,
       sound: true,
       alert: true
      });

   } catch (e) {
      console.error(e);
    }


   FCM.getFCMToken().then(token => {
  //   alert("token is: "+token);
     console.log("TOKEN (getFCMToken)", token);
     if(this.state.memberId && token !=this.state.token){
       try{
           updateMemberToken(token);
       }catch ( e){
         console.log(e);
       }

     }

     this.setState({ token: token || "" });

   });



   if (Platform.OS === "ios") {

     FCM.getAPNSToken().then(token => {
       if(this.state.memberId && token !=this.state.token){
         try {
             updateMemberToken(token);
         }catch ( e){
           console.log(e);
         }

       }
       console.log("APNS TOKEN (getFCMToken)", token);
       this.setState({ token: token || "" });
     });

   }
  // console.warn('token:'+token);



   // topic example

   // FCM.subscribeToTopic('sometopic')

   // FCM.unsubscribeFromTopic('sometopic')

 }

 updateMemberToken(token){
   let path='/updateToken/member/'+this.state.memberId;
   if(this.state.isDepart){
      path='/updateToken/dept/'+this.state.memberId;
   }

   fetch(configConstants.RESTAPI+path+this.state.memberId, {
     method: 'put',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body:JSON.stringify({
        FCMToken:token,
        deviceOs:Platform.OS
     }),

   })
   .then((response) => response.json())
   .then((responseJson) => {
         Actions.myProfile({profile:JSON.stringify(responseJson)});
       })
   .catch((error) => {
         console.error(error);
   });
 }

 showLocalNotification() {

   FCM.presentLocalNotification({

     id: new Date().valueOf().toString(), // (optional for instant notification)

     title: "Test Notification with action", // as FCM payload

     body: "Force touch to reply", // as FCM payload (required)

     sound: "bell.mp3", // "default" or filename

     priority: "high", // as FCM payload

     click_action: "com.myapp.MyCategory", // as FCM payload - this is used as category identifier on iOS.

     badge: 10, // as FCM payload IOS only, set 0 to clear badges

     number: 10, // Android only

     ticker: "My Notification Ticker", // Android only

     auto_cancel: true, // Android only (default true)

     large_icon:

       "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg", // Android only

     icon: "ic_launcher", // as FCM payload, you can relace this with custom icon you put in mipmap

     big_text: "Show when notification is expanded", // Android only

     sub_text: "This is a subText", // Android only

     color: "red", // Android only

     vibrate: 300, // Android only default: 300, no vibration if you pass 0

     wake_screen: true, // Android only, wake up screen when notification arrives

     group: "group", // Android only

     picture:

       "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png", // Android only bigPicture style

     ongoing: true, // Android only

     my_custom_data: "my_custom_field_value", // extra data you want to throw

     lights: true, // Android only, LED blinking (default false)

     show_in_foreground: true // notification when app is in foreground (local & remote)

   });

 }

 sendRemoteData(token) {

   let body = {

     to: token,

     data: {

       title: "Simple FCM Client",

       body: "This is a notification with only DATA.",

       sound: "default"

     },

     priority: "normal"

   };



   firebaseClient.send(JSON.stringify(body), "data");

 }

 showLocalNotificationWithAction() {

   FCM.presentLocalNotification({

     title: "Test Notification with action",

     body: "Force touch to reply",

     priority: "high",

     show_in_foreground: true,

     click_action: "com.myidentifi.fcm.text", // for ios

     android_actions: JSON.stringify([

       {

         id: "view",

         title: "view"

       },

       {

         id: "dismiss",

         title: "dismiss"

       }

     ]) // for android, take syntax similar to ios's. only buttons are supported

   });

 }


  render (){

  let { token, tokenCopyFeedback } = this.state;
//  alert("is depart:"+JSON.stringify(this.state));
    if(this.state.isDepart){
        return (

      <View style={styles.container}>
       <TouchableOpacity onPress={ () =>{Actions.Dept(this.state);}}>
         <Text>go to department</Text>
       </TouchableOpacity>
         </View>);


    }
    else if(this.state.memberId){
      return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.button} title=' Scan to Order' onPress={() =>{Actions.QRCodeScreen();}} >
        <Image style={styles.homeIcon}
          source ={require('./../../asset/image/food.jpg')} />
          <Text style={styles.instructions}>Scan to Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} title='test service' onPress={() =>{Actions.Services(this.state);}}>
          <Image style={styles.homeIcon}
            source ={require('./../../asset/image/cart.jpg')} />
          <Text style={styles.instructions}>View Cart</Text>
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
      <TouchableOpacity onPress={ () =>{Actions.Register(this.state);}}>
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
