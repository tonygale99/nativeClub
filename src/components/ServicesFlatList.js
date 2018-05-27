import React, { Component } from 'react';

import Swipeout from 'react-native-swipeout';
import {

  StyleSheet,
  ListView,
  View,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,



} from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';





class Services extends React.Component {
  constructor(props) {
   super(props);
   //this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  // this.state = {  data: []};

  this.state = {selected: [],data: [],sectionID: null,rowID: null,};
 }
  //_keyExtractor = (item, index) => item.id;

  addItem= (hey) => {
    // updater functions are preferred for transactional updates

  //  this.setState((state) => {

      this.state.data.map((item)=>{
        if (item._id === hey._id) {
          item.check = !item.check;
          // hardcode to 1
          item.qty=1;
          if (item.check === true) {

            this.state.selected.push(item);

            console.log('selected:' + item.givenName);

          } else if (item.check === false) {

            const i = this.state.selected.indexOf(item)

            if (1 != -1) {

              this.state.selected.splice(i, 1)

              console.log('unselect:' + item.name)

              return this.state.selected;

            }

          }
        }

      //  alert('select:'+JSON.stringify(this.state.selected));
      });

      // copy the map rather than modifying state.
    //  const selected = new Map(state.selected);

    //  selected.set(id, !selected.get(id)); // toggle

    //this.state.selected.has(id) ? selected.delete(id, !selected.get(id)) : selected.set(id, !selected.get(id));

      //alert('select:'+JSON.stringify(selected));
    //  return {selected};
  //  });
  }

  _submitOrder(){

  //  Actions.MyCart({items:this.state.selected});

  fetch('http://192.168.116.1:4000/order/club/5a79432a7245eaad9987187d/tableNum/1A', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      action:'addItem',
      member:'5a9a04b90b59541bffb77e0b',
      orderItems: this.state.selected,
    }),

  })
  .then(
    /*(response) => response.json())
  .then((responseJson) => {*/
    (responseJson) => {
  //    alert(responseJson);
      Actions.MyCart(responseJson);
       //this.setState({ data: responseJson});
      })
  .catch((error) => {
        console.error(error);
  });
  }

componentDidMount(){

  fetch('http://192.168.116.1:4000/service/club/5a79432a7245eaad9987187d/tableNum/1A', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

  })
  .then((response) => response.json())
  .then((responseJson) => {

       this.setState({ data: responseJson});
      })
  .catch((error) => {
        console.error(error);
  });
}



  render() {

    return (
      <View  style={styles.container}>
        <FlatList
        data={this.state.data}

          extraData={this.state.selected}

          keyExtractor={item => item._id}//{this._keyExtractor}
            style={styles.listview}
          renderItem={({item,index})=>{

            return(<FlastListItem item ={item} index ={index}>);
          }}

        />


        <Button title='Review Order ' onPress={()=>{this._submitOrder();}}>
            <View>
            <Text >
              Review Order
            </Text>
            </View>


        </Button>
      </View>
    );
  }












}


const styles = StyleSheet.create( {


  container: {

   backgroundColor: '#f2f2f2',

   flex: 1,

 },

 listview: {

   flex: 1,

 },

 li: {

   backgroundColor: '#fff',

   borderBottomColor: '#eee',

   borderColor: 'transparent',

   borderWidth: 1,

   paddingLeft: 16,

   paddingTop: 14,

   paddingBottom: 16,

 },

 liContainer: {

   flex: 2,

 },

 liText: {

   color: '#333',

   fontSize: 16,

 },

 navbar: {

   alignItems: 'center',

   backgroundColor: '#fff',

   borderBottomColor: '#eee',

   borderColor: 'transparent',

   borderWidth: 1,

   justifyContent: 'center',

   height: 44,

 },

 navbarTitle: {

   color: '#444',

   fontSize: 16,

   fontWeight: "500",

 },

 statusbar: {

   backgroundColor: '#fff',

   height: 22,

 }
})

export default Services;
