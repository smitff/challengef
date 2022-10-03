//import liraries

import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,TouchableOpacity,FlatList,Image,ImageBackground,SafeAreaView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
// create a component
import {useDispatch,useSelector} from'react-redux'
import {deleteData,getListdata,itemClick,createPolygon} from '../redux/actions/area'
const ListScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const listdata = useSelector(state=>state.area)
    const storedata = useSelector(state=>state.auth)

    // const _keyExtractor = (item, index) => item.coordinates[0].name;
    const _keyExtractor = (item, index) => index


    const _renderItem = ({item, index}) => {
        return (
        <View style={styles.itemview}>    
            <TouchableOpacity style={styles.itemBtn}
            onPress={() => {
                dispatch(itemClick(item));
                // navigation.navigate('MapScreen',{item:item});
            }}
            >
                <Text style={{
                    color:'#000',
                    fontSize:16,
                    fontWeight:'bold'
                }}>{item.areaname}</Text>
                <Text style={{
                    color:'#000',
                    fontSize:16,
                }}>{item.sf}</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.deleteBtn}
            onPress={()=>{
                // let newData = listdata.listdata.filter((item) => item.areaname !== item.areaname);
                // setData(newData);
                // console.log("delete");
                dispatch(deleteData(`${storedata.email}list`,index));
            }}>
                <AntDesign 
                style={{
                }} name="delete" size={22} color="#000000"/>
            </TouchableOpacity>
        </View>
    
        )
      };
    
      const _flatListItemSeparator = () => {
        return(
            <View style={{
                height:30
            }}>
            </View>
        )
      }





    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                flex:1,
                width:'100%',
                paddingHorizontal:20,
            }}>
            <TouchableOpacity
            style={styles.createBtn}
            onPress={() => {
                console.log('pressed')
                // navigation.navigate('MapScreen');
                dispatch(createPolygon());
            }}
            >
                <Text style={styles.text}>Create</Text>
            </TouchableOpacity>
            <View style={{
                flex:1,
            }}>
                <FlatList
                style={{
                    marginTop: 24,
                }}
                data={listdata?.listdata}
                showsVerticalScrollIndicator={false}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
                ItemSeparatorComponent={_flatListItemSeparator}
                showsHorizontalScrollIndicator={false}
                />
            </View>
            </View>
        
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"white",
    },
    createBtn:{
        backgroundColor:'black',
        justifyContent:'center',
        alignItems:'center',
        height:50,
        borderRadius:10,
        marginTop:10
    },
    text:{
        color:'white',
        fontSize:20,
        fontWeight:'bold'
    },
    itemview:{
        flexDirection:"row",
        height:60,
        flex:1,
        backgroundColor:'#F2F2F2',
        borderRadius:10,
    },
    itemBtn:{
        paddingHorizontal:10,
        justifyContent:'center',    
        flex:0.9,
    },
    deleteBtn:{
        justifyContent:'center',
        alignItems:'center',
    }

});

//make this component available to the app
export default ListScreen;
