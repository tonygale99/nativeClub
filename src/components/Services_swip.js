import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {

  StyleSheet,
  ListView,
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

class Services extends React.Component {
  constructor(props) {
   super(props);
   this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

   this.state = { listViewData: this.ds.cloneWithRows(this.props.data), tableNum:props.tableNum,selectedService:[]};
 }

 addToCart(item){
   alert('Add:'+item);
  this.state.selectedService.push(item);

 }
 //removeFromCart(item){
//   let index=this.state.selectedService.indexof(item);
//   this.state.selectedService.splice(index, 1);

 //}
submitOrder(){
  Actions.MyCart({items:this.state.selectedService, tableNum:this.state.tableNum});
}

closeRow(rowKey,rowMap ) {
alert('close: '+rowMap[rowKey]);
		if (rowMap[rowKey]) {

			rowMap[rowKey].closeRow();
      let index=this.state.selectedService.indexof(rowMap[rowKey]);
      alert(index);
      if(index) this.state.selectedService.splice(index, 1);

		}

	}



	deleteRow(rowMap, rowKey) {

		this.closeRow(rowMap, rowKey);

		const newData = [...this.state.listViewData];

		const prevIndex = this.state.listViewData.findIndex(item => item.key === rowKey);

		newData.splice(prevIndex, 1);

		this.setState({listViewData: newData});

	}



	onRowDidOpen = (rowKey, rowMap) => {

	//alert('Add:'+JSON.stringify(rowMap[rowKey]));

		this.state.selectedService.push(rowMap[rowKey]);

	}
 render() {


   return (
     <View style={styles.container}>

     <SwipeListView

           dataSource={this.state.listViewData}
           renderRow={(data) => this.renderRow(data)}
                       renderHiddenRow={(secId, rowId, rowMap) => this.renderHiddenRow(secId, rowId, rowMap)}
                       rightOpenValue={-75}
                       recalculateHiddenLayout
                       previewFirstRow
                       closeOnRowPress ={false}
                       closeOnScroll={false}
                       disableRightSwipe={true}

                       closeOnRowBeginSwipe={false}
                       onRowDidOpen={(rowKey, rowMap) => this.onRowDidOpen(rowKey, rowMap)}
                       onRowDidClose={(rowKey, rowMap) => this.closeRow(rowKey, rowMap)}
       />

          <TouchableOpacity onPress ={() =>{this.submitOrder();}}>
              <Text>Review the cart</Text>
            </TouchableOpacity>
        </View>




     );


 }

 renderRow(data) {
        console.log('data', data);
        return (
            <TouchableHighlight
                onPress={()=>{console.log('data', data);}}
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <Text> {`${data.name}`} </Text>
                        <Text> {`${data.description}`} </Text>
                        <Text> ${`${data.defaultPrice}`} </Text>
                    </View>

                </View>
            </TouchableHighlight>
        );
    }

    renderHiddenRow(secId, rowId, rowMap) {
        return (
        <View style={styles.rowBack}>

            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={()=>{console.log('remove cart');}}
            >
                <Text style={styles.backTextWhite}>Selected</Text>
            </TouchableOpacity>
        </View>
        );
    }


}

const styles = {
  search: {
    flexDirection: 'row',
    padding: 10,
    height: 60,
    backgroundColor: 'white'
  },
  button: {
    marginTop: 0,
    height: 30,
    flexGrow: 0.3
  },
    container: {
    padding: 0,
    paddingTop: 45
    },
    rowFront: {
        //alignItems: 'center',
    flex: 1,
    padding: 10,
        backgroundColor: 'white',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        justifyContent: 'center',
        //height: 100,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0
    },
    controls: {
        alignItems: 'center',
        marginBottom: 30
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 10,
        width: 100,
    }
};

export default Servicesswip;
