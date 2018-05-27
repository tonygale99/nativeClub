import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {

  StyleSheet,

  View,
  Button,
  Text,

  TouchableOpacity,
  TouchableHighlight,



} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';

import { SwipeListView } from 'react-native-swipe-list-view';

class OrderDetils extends React.Component {
  constructor(props) {
   super(props);
   this.state = { services :props.item, tableNum:props.tableNum,selectedService:[]};
 }
 addToCart(item){
  this.state.selectedService.push(item);

 }
 removeFromcart(item){
   let index=this.state.selectedService.indexof(item);
   this.state.selectedService.splice(index, 1);

 }
 submitOrder(){

    fetch(configConstants.RESTAPI+'/order/club/5a79432a7245eaad9987187d/tableNum/'+this.state.tableNum, {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body:this.state.selectedService

   })
   .then((response) => response.json())
   .then((responseJson) => {
         Actions.OrderSummury({item:JSON.stringify(responseJson)});
       })
   .catch((error) => {
         console.error(error);
   });
 }
 render() {


   return (

     <SwipeListView
           useFlatList
           data={this.state.services}
           renderItem={ (data, rowMap) => (
             <TouchableHighlight onPress={this.removeFromCart.bind(this)}>
               <View style={styles.rowFront}>
                   <Text> {data.name} </Text>
               </View>
              </TouchableHighlight>
           )}
           renderHiddenItem={ (data, rowMap) => (
             <TouchableOpacity onPress={this.addToCart.bind(this)}>
               <View style={styles.rowBack}>
                   <Text>Left</Text>
                   <Text>Right</Text>
               </View>
               </TouchableOpacity>
           )}
           leftOpenValue={75}
           rightOpenValue={-75}
       />



     );


 }
}


export default OrderDetils;
