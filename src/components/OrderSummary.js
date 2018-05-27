import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {

  StyleSheet,
    AsyncStorage,
  View,
  Button,
  Text,

  TouchableOpacity,

  FlatList,
  Image

} from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';

import configConstants from './../config/configConstants';

class FlatListItem extends Component{

  constructor(props){
    super(props);
    this.state ={currentItem:this.props.item,selectedItems:this.props.selectedItems , backgroundColor:'white'}

  }

  render(){


    return (



        <View style={{

                flex: 1,

                flexDirection:'row',
                backgroundColor: 'white',  height: 100 ,margin:5,padding:5
                }}>


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
              {this.props.item.service.name}  {this.props.item.itemTotal}
              </Text>
            </View>
        </View>


    );
  }
}



class OrderSummary extends React.Component {
  constructor(props) {

    super(props);

  this.state = {order: '',data: []};

  }

  componentDidMount(){
    //  alert('placed order:'+JSON.stringify(this.props.navigation.state.params.data));
    let orderId=this.props.navigation.state.params.data;

    fetch(configConstants.RESTAPI+'/order/'+orderId, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },


    })
    .then((response) => response.json())
    .then((responseJson) => {
    //  alert(JSON.stringify( responseJson));
       this.setState({ data: responseJson.orderItems});
       this.setState({ order: responseJson});
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

      //  extraData={this.state.deleted}

        keyExtractor={item => item._id}//{this._keyExtractor}
        renderItem={({item,index})=>{

          return (
            <FlatListItem item={item} index={index} parentFlatList ={this}  >
            </FlatListItem>
                    );
        }}

      />
      <Text  style={{
        flex: 1,

        textAlign: 'right',
      }}>Total: &nbsp;&nbsp;{this.state.order.orderTotal} </Text>
      <Button title='Back Home ' onPress={()=>{Actions.home();}}>
          <View>
          <Text >
          Back Home
          </Text>
          </View>


      </Button>
     </View>
    );
  }
}
const styles = {
  container: {

   backgroundColor: '#f2f2f2',

   flex: 1,

 }

};
export default OrderSummary;
