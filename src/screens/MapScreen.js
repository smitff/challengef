//import liraries
import React, {useEffect,useState } from 'react';
import { View, Text, StyleSheet,Dimensions,TextInput,Alert,TouchableOpacity } from 'react-native';
import MapView, {MAP_TYPES, Polygon,Marker,PROVIDER_GOOGLE} from 'react-native-maps';
import { calculateArea,findCenter } from '../utils/helper';
import {useDispatch,useSelector} from'react-redux'
import {permissionHandle} from '../redux/actions/location'
import {getListdata,saveData} from '../redux/actions/area'
import Entypo from 'react-native-vector-icons/Entypo'
import Modal from "react-native-modal";
// import { TouchableOpacity } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// create a component
let lat=0;
let lon=0;
const MapScreen = ({navigation,route}) => {

    const dispatch = useDispatch();
    const locdata = useSelector(state=>state.location)
    const storedata = useSelector(state=>state.auth)
    const listdata = useSelector(state=>state.area)
    const {check} = route.params;
    // const {item} = route.params;
    console.log(check,'check');
    

    const [areaname, setareaname] = useState('');
    const [SF, setSF] = useState('');
    const [mystate, setMyState] = React.useState(    
        {markers: [],
        coordinates: [
            // {latitude: null, longitude: null},   
        //   { name: 'Burger', latitude: 28.539259979358434, longitude: 77.35132858157158, },
        //   { name: 'Pizza', latitude: 28.539259979358434, longitude: 77.35132858157158,  },
        //   { name: 'Soup', latitude: 28.539259979358434, longitude: 77.35132858157158, },
        //   { name: 'Sushi', latitude: 37.7834153, longitude: -122.4527787,},
        //   { name: 'Curry', latitude: 37.7948105, longitude: -122.4596065,  },
        ]})
        const [isModalVisible, setModalVisible] = useState(false);

        const toggleModal = () => {

            setModalVisible(!isModalVisible);
          };
    const save = () => {
        console.log(mystate.coordinates);
        // toggleModal();
        // navigation.navigate('ListScreen');
        // console.log(calculateArea(mystate.coordinates));
        let areaf = calculateArea(mystate.coordinates);
        let centerf = findCenter(mystate.coordinates);

        // console.log(findCenter(mystate.coordinates), "center");
        // saveData(`${storedata.email}list`,areaname,calculateArea(mystate.coordinates),findCenter(mystate.coordinates),mystate.coordinates)
        if(areaname!=='' && areaf!==0){
            let temp = {
                areaname:areaname,
                sf:areaf,
                // center:findCenter(mystate.coordinates),
                coordinates:mystate.coordinates
            }
            dispatch(saveData(`${storedata.email}list`,temp));
            setareaname('');
            setSF('');
            setMyState({markers: [],
                coordinates: []});
            toggleModal();
            navigation.navigate('ListScreen');
        }else{
            Alert.alert('Please enter Area name and SF');
        }

    }

    const listiconclick = () => {
        dispatch(getListdata(`${storedata.email}list`))
        navigation.navigate('ListScreen');
    }

    const finish = () => {
        console.log(mystate.coordinates);
        toggleModal();
    }

    // const onDragEvent = (e,marker) => {
    //     let newCoordinates = mystate.coordinates.map((coordinate) => {
    //         if (coordinate.name === marker.name) {
    //             return {
    //                 ...coordinate,
                    
    //                 latitude: e.nativeEvent.coordinate.latitude,
    //                 longitude: e.nativeEvent.coordinate.longitude,
    //             };
    //         }
    //         return coordinate;
    //     }
    //     );
    //     setMyState({coordinates: newCoordinates})
    
    // }


    // useEffect(() => {
    //     dispatch(getListdata(`${storedata.email}list`))
    //     // listiconclick();
    // }, [])


    useEffect(() => {
        if(check===1){
            setareaname('');
            setSF('');
            setMyState({markers: [],
                coordinates: []})
                return;

        }
        else if(listdata.itemdata && check===0){
            console.log(listdata.itemdata,"itemdataff");
            lat = listdata.itemdata.coordinates[0]?.latitude;
            lon = listdata.itemdata.coordinates[0]?.longitude;
            setareaname(listdata.itemdata.areaname)
            setSF(listdata.itemdata.sf)
            setMyState({
                ...mystate,
                coordinates:listdata.itemdata.coordinates
            })                  

        }

        return () => {
            // cleanup
            setareaname('');
            setSF('');
            setMyState({markers: [],
                coordinates: []})

        }



    },[listdata.itemdata])

    if(listdata.loading){
        return(
            <View style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center',
            }}>
                <Text>Loading...</Text>
            </View>
        )
    }
    
    return (
        <View style={styles.container}>
                            <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        mapType={MAP_TYPES.HYBRID}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        region={{
                            // latitude: 38.539259979358434,
                            // longitude: 37.35132858157158,
                            // latitude: locdata.location?.latitude,
                            // longitude: locdata.location?.longitude,
                            // latitude: listdata.itemdata  ? listdata.itemdata.coordinates[0].latitude : locdata.location?.latitude,
                            // longitude: listdata.itemdata  ? listdata.itemdata.coordinates[0].longitude : locdata.location?.longitude,
                            // latitude: mystate.coordinates[0] ? lat : locdata.location?.latitude,
                            // longitude: mystate.coordinates[0] ? lon : locdata.location?.longitude,
                            latitude: check===0 ? lat : locdata.location?.latitude,
                            longitude: check===0 ? lon : locdata.location?.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onPoiClick={(e) => {
                            console.log(e.nativeEvent.coordinate)
                            let l = {name: new Date() ,latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude, }
                            setMyState({
                                ...mystate,
                                coordinates: [...mystate.coordinates, l]
                            })
                        }}
                        onPress={(e) => {
                            console.log(e.nativeEvent.coordinate)
                            let l = {name: new Date() ,latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude, }
                            setMyState({
                                ...mystate,
                                coordinates: [...mystate.coordinates, l]
                            })
                        }}
                >

                        {
                            mystate.coordinates.length>0 && 
                            <Polygon
                            coordinates={mystate?.coordinates}
                            fillColor="rgba(0,232,237,0.4)"
                            strokeWidth={1}
                            strokeColor="#81D4FA"
                            >   
                            </Polygon>
                        }
                    { 
                    // mystate.coordinates.length>0 &&
                        mystate.coordinates?.map((marker,index) => (
                            <Marker
                            fillColor="#E0F7FA"
                            strokeWidth={1}
                            strokeColor="#81D4FA"
                            draggable
                            key={index}
                            coordinate={{
                                latitude: marker?.latitude,
                                longitude: marker?.longitude,
                            }}
                            onDrag={(e) => {
                                // onDragEvent(e,marker)
                                let newCoordinates = mystate.coordinates.map((coordinate) => {
                                    if (coordinate.name === marker.name) {
                                        return {
                                            ...coordinate,
                                            latitude: e.nativeEvent.coordinate.latitude,
                                            longitude: e.nativeEvent.coordinate.longitude,
                                        };
                                    }
                                    return coordinate;
                                }
                                );
                                setMyState({coordinates: newCoordinates})
                            
                            }}
                            onDragEnd={(e) => {
                                // onDragEvent(e,marker)
                                let newCoordinates = mystate.coordinates.map((coordinate) => {
                                    if (coordinate.name === marker.name) {
                                        return {
                                            ...coordinate,
                                            
                                            latitude: e.nativeEvent.coordinate.latitude,
                                            longitude: e.nativeEvent.coordinate.longitude,
                                        };
                                    }
                                    return coordinate;
                                }
                                );
                                setMyState({coordinates: newCoordinates})
                            
                            }}
                            >
                                                                <View
                                
                                {...marker}
                                style={{
                                    backgroundColor: '#81D4FA',
                                    width:15,
                                    height:15,
                                    borderRadius:7.5,
                                }}>
                                    
                                </View>
                            </Marker>
                        ))
                    }
                </MapView>


                <View style={{
                    position:'absolute',
                    right:10,
                    flexDirection:'row',
                    marginTop: 10,

                }}>
                                        <TouchableOpacity
                    onPress={() => {
                        console.log(mystate.coordinates)
                        // navigation.navigate('ListScreen')
                        listiconclick();
                    }}
                    style={{
                        backgroundColor: 'cyan',
                        padding: 5,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 10,
                    }}>
                        {/* <Text style={{color: 'white'}}>list</Text> */}
                        <Entypo name="list" size={20} color="white" />
                    </TouchableOpacity>




                    <TouchableOpacity
                    onPress={() => {
                        console.log(mystate.coordinates)
                        // save()
                        finish()
                    }}
                    style={{
                        backgroundColor: 'cyan',
                        padding: 10,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // margin: 10,
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 20,
                            fontWeight: 'bold',

                            
                            }}>Finish</Text>
                    </TouchableOpacity>


                </View>



                <View style={styles.BottomBtnContainer}>
                    <Text style={styles.areaNameText}>{areaname}</Text>
                    <Text style={styles.sfText}>{SF}</Text>
                </View>

                <View>
                        <Modal 
                        backdropColor='transparent'
                        backdropOpacity={1}
                        isVisible={isModalVisible} 
                        onBackdropPress={toggleModal}
                        onBackButtonPress={toggleModal}
                        style={{ justifyContent: 'center', alignItems: 'center',}}
                        >
                            <View style={styles.modalInnerContainer}>
                        <TextInput
                        autoCapitalize="none"
                        style={styles.areaTextInput}
                        onChangeText={e => setareaname(e)}
                        value={areaname}
                        keyboardType="default"
                        placeholder="Area name"
                        placeholderTextColor="#A9A9A9"
                    />

                    <TouchableOpacity
                    onPress={() => {    
                        console.log(mystate.coordinates)
                        save()
                    }}
                    style={styles.saveBtnContainer}>
                        <Text style={{color: 'white'}}>Save</Text>
                    </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: '100%',
        width: '100%',
    },
    modalInnerContainer: {
        backgroundColor: 'white',
        width: windowWidth-20,
        height: windowHeight/4,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'space-around',
    },
    areaTextInput:{
        paddingLeft: 24,
        paddingRight: 50,
        color: 'black',
        // fontFamily:"OpenSans-Regular",
        fontSize: 16,
        fontWeight: '400',
        backgroundColor: '#F2F2F2',
        borderRadius: 5,
        marginBottom: 24,
        height: 50,
    },
    saveBtnContainer:{
        backgroundColor: 'cyan',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    areaNameText:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        alignSelf:'flex-end',
    },
    sfText:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
    },
    BottomBtnContainer:{
        position:'absolute',
        bottom:10,
        right:10,
    }
});

//make this component available to the app
export default MapScreen;
