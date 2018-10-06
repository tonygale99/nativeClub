import React, { Component } from 'react';

import Swipeout from 'react-native-swipeout';
import {

  StyleSheet,

  View,
  Button,
  Text,
  FlatList,
  TouchableOpacity,

    AsyncStorage,
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
    this.state ={currentItem:this.props.item,selectedItems:this.props.selectedItems , backgroundColor:'white'}

  }
  selectItem(hey){


    this.props.parentFlatList.addItem(hey);
  //  alert("selected items:" +JSON.stringify(this.props.selectedItems));
    let contains=false;
    for(var i = 0; i < this.state.selectedItems.length; i++) {
        if(this.state.selectedItems[i]._id == hey._id)
            contains= true;
    }


    if(contains){
      this.setState({backgroundColor:'yellow'});
    ///  alert('press backgroundColor: '+this.state.backgroundColor);
    }else{
      this.setState({backgroundColor:'white'});
      //  alert('unselect press backgroundColor: '+this.state.backgroundColor);
    }



  }
  render(){


    return (


        <TouchableOpacity  style={{ backgroundColor: this.state.backgroundColor, height: 100, flexDirection: 'row', alignItems:'center', justifyContent: 'center',margin:5,padding:5 }}
            onPress={() =>{this.selectItem(this.state.currentItem)}} >
        <View style={{

                flex: 1,

                flexDirection:'row',

                }}>


              <Image
                   style={{width: 100, height: 100}}
                   source={{uri: this.props.item.imageUrl }}
              />

          <View  style={{

                                flex: 1,

                                flexDirection:'column',

                                height: 100

                            }}>
            <Text style={{  padding: 10,   fontSize: 16  }} >
              {this.props.item.name}  {this.props.item.defaultPrice}
            </Text>
          </View>
        </View>

        </TouchableOpacity>
    );
  }
}



class Services extends React.Component {
  constructor(props) {
   super(props);
   //this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  // this.state = {  data: []};
  //alert(JSON.stringify(this.props.navigation.state.params));
  let targetUrl=this.props.navigation.state.params.data;

//default value
  let clubId=configConstants.CLUBID;
  let tableNum='1A';
  if(targetUrl){


      let params =targetUrl.split("/");
      for(var i=0;i<params.length; i++){
        if(params[i]=='club')
          clubId=params[i+1];
        if(params[i]=='tableNum')
          tableNum=params[i+1];
      }
  }

  this.state = {selected: [],data: [],memberId:null,phone:null,name:null,clubId:clubId,tableNum:tableNum};
 }


  addItem= (hey) => {


      this.state.data.map((item)=>{
        if (item._id === hey._id) {
          item.check = !item.check;
          // hardcode to 1
          item.qty=1;
          if (item.check === true) {

            this.state.selected.push(item);
          // alert('select:' + item.name)
          //    return true;

          } else if (item.check === false) {

            const i = this.state.selected.indexOf(item)

            if (1 != -1) {

              this.state.selected.splice(i, 1)

            ///  alert('unselect:' + item.name)

            ///  return false;

            }

          }
        }


      });

    }
      isItemSelected =(hey)=>{
        this.state.data.map((item)=>{
          if (item._id === hey._id) {
            item.check = !item.check;
            // hardcode to 1
            //  alert('item '+JSON.stringify(hey)+' selected:' +item.check);
              return item.check;
            }
          });

      }




  _submitOrder(){

  //  Actions.MyCart({items:this.state.selected});



 fetch(configConstants.RESTAPI+'/order/club/'+this.state.clubId+'/tableNum/'+this.state.tableNum, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      action:'addItem',
      member:this.state.memberId,
      orderItems: this.state.selected,
    }),

  })
  .then(
    /*(response) => response.json())
  .then((responseJson) => {*/
    (responseJson) => {
    //  alert(responseJson);
    let params={ items:this.state.selected,memberId:this.state.memberId,phone:this.state.phone,name:this.state.name}
      Actions.MyCart(params);
       //this.setState({ data: responseJson});
      })
  .catch((error) => {
        console.error('add to cart err:'+error);
  });
  }


async  componentDidMount(){

  // let orderId=this.props.navigation.state.params._id;
  //alert(JSON.stringify(this.props.navigation));
  let member= await AsyncStorage.getItem('member');

  let parsedMember=JSON.parse(member);

  this.setState({memberId:parsedMember.memberId,phone:parsedMember.phone,name:parsedMember.name});

  //alert(parsedMember.memberId);
  let uri=configConstants.RESTAPI+'/service/club/'+configConstants.CLUBID+'/tableNum/'+this.state.tableNum;

   fetch(configConstants.RESTAPI+'/service/club/'+configConstants.CLUBID+'/tableNum/'+this.state.tableNum, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

  })
  .then((response) => response.json())
  .then((responseJson) => {
    //  alert(JSON.stringify(responseJson));
       this.setState({ data: responseJson});
      })
  .catch((error) => {
        console.error(error);
  });
}



  render() {
     const flatListData=this.state.data;
    return (
      <View  style={styles.container}>
        <FlatList
        data={flatListData}

          extraData={this.state.selected}

          keyExtractor={item => item._id}//{this._keyExtractor}
            style={styles.listview}
          renderItem={({item,index})=>{
             return (
              <FlatListItem item={item} index={index} parentFlatList ={this} selectedItems={this.state.selected} >
              </FlatListItem>);

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

 }



})

export default Services;
