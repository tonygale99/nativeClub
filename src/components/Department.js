import React, { Component } from "react";

import {

  StyleSheet,

  Text,

  TouchableOpacity,

  View,

  Clipboard,

  Platform,
FlatList,
  ScrollView

} from "react-native";



import { StackNavigator } from "react-navigation";

//import { registerKilledListener, registerAppListener } from "./../utils/Listener";
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType, NotificationActionType, NotificationActionOption, NotificationCategoryOption} from "react-native-fcm";




class FlatListItem extends Component{

  constructor(props){
    super(props);

    this.state ={currentItem:this.props.item, backgroundColor:'white'}

  }
  selectItem(hey){


  //  this.props.parentFlatList.addItem(hey);
  //  alert("selected items:" +JSON.stringify(this.props.selectedItems));
  //  let contains=false;


  //  if(contains){
      this.setState({backgroundColor:'yellow'});
    ///  alert('press backgroundColor: '+this.state.backgroundColor);
  //  }else{
  //    this.setState({backgroundColor:'white'});
      //  alert('unselect press backgroundColor: '+this.state.backgroundColor);
  //  }



  }
  render(){


    return (



        <View style={{

                flex: 1,

                flexDirection:'row',

                }}>
                <TouchableOpacity  style={{ backgroundColor: this.state.backgroundColor, height: 100, flexDirection: 'row', alignItems:'center', justifyContent: 'center',margin:5,padding:5 }}
                    onPress={() =>{this.selectItem(this.state.currentItem)}} >

                <Text style={{  padding: 10,   fontSize: 26, color:'blue' }} >
                  {this.props.item.name}
                </Text>
                </TouchableOpacity>

        </View>


    );
  }
}


class Department extends React.Component {

  constructor(props) {

    super(props);
    //alert("props:"+JSON.stringify(this.props.navigation.state.params));
    this.state = {

      token: this.props.navigation.state.params.token,
      department: this.props.navigation.state.params.name,
      clubId:this.props.navigation.state.params.clubId,
      tokenCopyFeedback: "",
      orderItems:[],
      addedItem:null
    };

  }

componentDidUnMount(){
  let topic= this.state.clubId+'-'+this.state.name;
  FCM.unSubscribeToTopic(topic);
  this.registerKilledListener();
}

 componentDidMount() {

   let topic= this.state.clubId+'-'+this.state.department;

   FCM.subscribeToTopic(topic);

    this.registerAppListener();


    FCM.getInitialNotification().then(notif => {

      this.setState({

        initNotif: notif

      });

      if (notif && notif.targetScreen === "detail") {

        setTimeout(() => {

          this.props.navigation.navigate("Detail");

        }, 500);

      }

    });



    try {

      let result =  FCM.requestPermissions({

        badge: false,

        sound: true,

        alert: true

      });

    } catch (e) {
      alert(e);
      console.error(e);

    }



    FCM.getFCMToken().then(token => {

      console.log("TOKEN (getFCMToken)", token);

      this.setState({ token: token || "" });

    });



    if (Platform.OS === "ios") {

      FCM.getAPNSToken().then(token => {

        console.log("APNS TOKEN (getFCMToken)", token);

      });

    }




  }

  registerKilledListener(){

    // these callback will be triggered even when app is killed

    FCM.on(FCMEvent.Notification, notif => {

      AsyncStorage.setItem('lastNotification', JSON.stringify(notif));

      if(notif.opened_from_tray){

        setTimeout(()=>{

          if(notif._actionIdentifier === 'reply'){

            if(AppState.currentState !== 'background'){

              console.log('User replied '+ JSON.stringify(notif._userText))

              alert('User replied '+ JSON.stringify(notif._userText));

            } else {

              AsyncStorage.setItem('lastMessage', JSON.stringify(notif._userText));

            }

          }

          if(notif._actionIdentifier === 'view'){

            alert("User clicked View in App");

          }

          if(notif._actionIdentifier === 'dismiss'){

            alert("User clicked Dismiss");

          }

        }, 1000)

      }

    });

  }

   registerAppListener(){
 //alert("topic:"+JSON.stringify(this.state));
    FCM.on(FCMEvent.Notification, (notif)=> {

    //  console.log("Notification", notif);
    //  alert("Message: "+JSON.stringify(notif));

    setTimeout(()=>{

          this.addItem(notif);

        }, 500);



    });


  }

  addItem (hey) {

    // alert(JSON.stringify(hey));
    if(!this.isItemSelected (hey)){
      //  this.state.orderItems.push(hey);
        this.setState({orderItems:[...this.state.orderItems, hey]});
        this.refreshFlatList(hey);
    }




    }

    isItemSelected =(hey)=>{
      alert(hey.google.message_id);
      for(var i = 0; i < this.state.orderItems.length; i++) {
          if(this.state.orderItems[i].google.message_id==hey.google.message_id)
            return true;
          if(this.state.orderItems[i]._id == hey._id)
              return true;
      }

       return false;

    }

    refreshFlatList =(hey) => {
      this.setState((prevState) => {

             return {

               addedItem:hey

             };

         });

    }
  render() {

    let { token, tokenCopyFeedback } = this.state;



    const flatListData=this.state.orderItems;
//alert(JSON.stringify(this.state.orderItems));
  //if(!flatListData === undefined || flatListData.length == 0){
     return (
       <View  style={styles.container}>
         <FlatList
         data={flatListData}

           extraData={this.state.orderItems}

           keyExtractor={item => item._id}//{this._keyExtractor}
             style={styles.listview}
           renderItem={({item,index})=>{
          //   alert(JSON.stringify(this.state.orderItems));
              return (
               <FlatListItem item={item} index={index} parentFlatList ={this}  >
               </FlatListItem>);

           }}

         />



       </View>
     );
//   }

  }





}





const styles = StyleSheet.create({

  container: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#F5FCFF"

  },

  welcome: {

    fontSize: 20,

    textAlign: "center",

    margin: 10

  },

  instructions: {

    textAlign: "center",

    color: "#333333",

    marginBottom: 2

  },

  feedback: {

    textAlign: "center",

    color: "#996633",

    marginBottom: 3

  },

  button: {

    backgroundColor: "teal",

    paddingHorizontal: 20,

    paddingVertical: 15,

    marginVertical: 10,

    borderRadius: 10

  },

  buttonText: {

    color: "white",

    backgroundColor: "transparent"

  },
  listview: {

    flex: 1,

  }


});
export default Department;
