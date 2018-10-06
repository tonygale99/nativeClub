import React, { Component } from 'react';


import {
    AsyncStorage,
  StyleSheet,
  FlatList,
  View,
  Button,
  Text,
  Alert,
  Image
} from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';
import SwipeOut from 'react-native-swipeout';
import configConstants from './../config/configConstants';

class FlatListItem extends Component{

  constructor(props){
    super(props);
    this.state ={deletedItem:null }
  }
  delteItemFromDB(deleteRow){
     fetch(configConstants.RESTAPI+'/orderItem/'+deleteRow._id, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }


    }).then((response) => response.json())
    .then((responseJson) => {
    //  alert(JSON.stringify( responseJson));
        Actions.OrderSummary(responseJson);
        })
    .catch((error) => {
          console.error(error);
    });
  }
  render(){
    const swipeOutSetting = {
        autoClose:true,
        onClose : (secId, rowId,direction) =>{
          this.setState({deletedItem:null});
        },
        onOpen : (secId, rowId,direction) =>{
          this.setState({deletedItem:this.props.item});
        },
        right : [
          {
            onPress : ()=>{
              const deleteRow=this.state.deletedItem;
              Alert.alert(
                  'Alert',
                  'Are you sure to delete?',
                  [
                    {text: 'No', onPress: () =>console.log('cansole pressed'), style: 'cancel'},
                    {text:'Yes', onPress: ()=>{
                      this.delteItemFromDB(deleteRow);
                      this.props.parentFlatList.RemoveItem(deleteRow);

                      this.props.parentFlatList.refreshFlatList(deleteRow);
                    }},
                  ],
                  {cancelable :true}

              );
            },
            text:'Delete',type:'delete'
          }
        ],
        rowId: this.props.index,
        sectionid: 1,

    };
    return (
      <SwipeOut {...swipeOutSetting}  style={{backgroundColor:'white', margin:5,padding:5 }}>

        <View style={{ flex: 1,

                            flexDirection:'row',

                            height: 100 ,margin:5,padding:5  }}>

              <Image
                   style={{width: 100, height: 100}}
                   source={{uri: this.props.item.service.imageUrl }}
              />

              <View  style={{

                                    flex: 1,

                                    flexDirection:'column',

                                    height: 100

                                }}>
              <Text style={{  padding: 10,   fontSize: 16,  }} >
                {this.props.item.service.name} {this.props.item.itemTotal}
              </Text>
          </View>
        </View>
      </SwipeOut>

    );
  }
}



class MyCart extends React.Component {
  constructor(props) {

  //  alert(JSON.stringify(props));
   super(props);


  this.state = {deleted: [],data: [],deletedItem:null,membrId:null,phoneNum:null,name:null};
  }

   refreshFlatList =(hey) => {
     this.setState((prevState) => {

            return {

              deletedItem:hey

            };

        });

   }

  RemoveItem= (hey) => {
    // updater functions are preferred for transactional updates

  //  this.setState((state) => {

      this.state.data.map((item)=>{

        if (item._id === hey._id) {
          item.check = !item.check;
          // hardcode to 1

          item.qty=1;

          if (item.check === true) {

        //    this.state.deleted.push(item);
            const i = this.state.data.indexOf(item);



              this.state.data.splice(i, 1);
            //  alert('delete:' + JSON.stringify(this.state.deleted));



          } else if (item.check === false) {

            const i = this.state.deleted.indexOf(item);

          //  if (1 != -1) {

              this.state.deleted.splice(i, 1);

            //  alert('unselect:' + item.name);

            //  return this.state.deleted;

          //  }

          }
        }

      //  alert('select:'+JSON.stringify(this.state.selected));
      });


  };

 _submitOrder(){
   let orderId=this.state.data[0].order;


    fetch(configConstants.RESTAPI+'/order/'+orderId, {
     method: 'put',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body:JSON.stringify({
       action:'PlaceOrder',
       deletedItems:this.state.deleted,

     }),

   }).then((response) => response.json())
   .then((responseJson) => {
     //alert(JSON.stringify( responseJson));
       Actions.OrderSummary(responseJson);
       })
   .catch((error) => {
         console.error(error);
   });


}



componentDidMount(){

// let orderId=this.props.navigation.state.params._id;
//alert(JSON.stringify(this.props.navigation.state.params));
let memberId=this.props.navigation.state.params.memberId;
//let items=this.props.navigation.state.params.items;
let phoneNum =this.props.navigation.state.params.phoneNum;
let name= this.props.navigation.state.params.name;
this.setState({memberId:memberId,phoneNum:phoneNum,name:name});







//let member= await AsyncStorage.getItem('member');

//let parsedMember=JSON.parse(member);


  //  this.setState({memberId:parsedMember.memberId,phone:parsedMember.phone,name:parsedMember.name});

          fetch(configConstants.RESTAPI+'/order/member/'+memberId, {
           method: 'GET',
           headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
           },


         })
         .then((response) => {

           if(response.json)
            return response.json();


          })
         .then(

           (responseJson) => {
             if(responseJson)
              this.setState({ data: responseJson.orderItems});
             })
         .catch((error) => {
            //   console.error(error);
         });



 }



   render() {
     const flatListData=this.state.data;
     if(flatListData === undefined || flatListData.length == 0){
        return (
          <View style={styles.container} >

          <Text > Your cart is empty</Text>
          <Button title='back home ' onPress={() =>{Actions.home();}}>
              <View>
              <Text >
                Back hone
              </Text>
              </View>


          </Button>

          </View>
        );

     }
     else{
       return (
         <View   style={styles.container}>
           <FlatList
           data={this.state.data}

             extraData={this.state.deleted}
               style={styles.listview}
             keyExtractor={item => item._id}//{this._keyExtractor}
             renderItem={({item,index})=>{
               //alert(JSON.stringify(item));
                return (
                  <FlatListItem item={item} index={index} parentFlatList ={this}/>
                );
             }}

           />


           <Button title='Submit Order ' onPress={()=>{this._submitOrder();}}>
               <View>
               <Text >
                 Submit Order
               </Text>
               </View>


           </Button>
         </View>
       );
     }
   }
}

const styles = {
  container: {

   backgroundColor: '#f2f2f2',

   flex: 1,

 },

 listview: {

   flex: 1,

 }

};
export default MyCart;
