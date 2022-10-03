//import liraries
import React, {useEffect,useState,useRef,useLayoutEffect } from 'react';
import { View, Text, StyleSheet,Dimensions,TextInput,Alert,TouchableOpacity } from 'react-native';
import MapView, {MAP_TYPES, Polygon,Marker,PROVIDER_GOOGLE} from 'react-native-maps';
import { calculateArea,findCenter,newCoordinates } from '../utils/helper';
import {useDispatch,useSelector} from'react-redux'
import {permissionHandle} from '../redux/actions/location'
import {getListdata,saveData} from '../redux/actions/area'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import Modal from "react-native-modal";
// import { TouchableOpacity } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// create a component
let lat=0;
let lon=0;
let check=0
const MapScreen = ({navigation}) => {

    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const locdata = useSelector(state=>state.location)
    const storedata = useSelector(state=>state.auth)
    const listdata = useSelector(state=>state.area)
    // const {item} = route.params;
    console.log(check,'check');






    const tokyoRegion = {
        latitude: 35.6762,
        longitude: 139.6503,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      const goToLoc = () => {
        //Animate the user to new region. Complete this animation in 3 seconds
        mapRef.current.animateToRegion(center,3 * 1000);
      };
    

    const [areaname, setareaname] = useState('');
    const [SF, setSF] = useState('');
    const [center, setcenter] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    
    });
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
        useLayoutEffect(() => {
            navigation.setOptions({
              // title: "ok",
            
    
              headerRight: () => {
                return (
                    <View style={{
                        flexDirection:'row',
                        // backgroundColor:'red',
                        width:windowWidth/3.4,
                        justifyContent:'space-around',
                        
                    }}>
    
    <TouchableOpacity
                        onPress={() => {
                            console.log(mystate.coordinates)
                            // navigation.navigate('ListScreen')
                            listiconclick();
                        }}
                        style={{
                            // backgroundColor: '#0A5DCF',
                            padding: 5,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 10,
                        }}>
                            {/* <Text style={{color: 'white'}}>list</Text> */}
                            <Entypo name="list" size={30} color="#0A5DCF" />
                        </TouchableOpacity>
    
                        <TouchableOpacity
                        onPress={() => {
                            console.log(mystate.coordinates)
                            // navigation.navigate('ListScreen')
                            // listiconclick();
                            finish()
    
                        }}
                        style={{
                            // backgroundColor: '#0A5DCF',
                            padding: 5,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 10,
                        }}>
                            {/* <Text style={{color: 'white'}}>list</Text> */}
                            <Ionicons name="md-checkmark-done-circle" size={30} color="#0A5DCF" />
                        </TouchableOpacity>
    
    
                        <TouchableOpacity
                        onPress={() => {
                            console.log(mystate.coordinates,'mystate')
                            // navigation.navigate('ListScreen')
                            // listiconclick();
                            deleteLastMarker()
    
                        }}
                        style={{
                            // backgroundColor: '#0A5DCF',
                            padding: 5,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 10,
                        }}>
                            {/* <Text style={{color: 'white'}}>list</Text> */}
                            <AntDesign 
                            style={{
                            }} name="delete" size={22} color="#0A5DCF"/>
                        </TouchableOpacity>
    
    
    
    
    
    
    
                        
                    </View>
                );
              },
            })
          }, [mystate])
    

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
        console.log(centerf,'centerll');
        // console.log(findCenter(mystate.coordinates), "center");
        // saveData(`${storedata.email}list`,areaname,calculateArea(mystate.coordinates),findCenter(mystate.coordinates),mystate.coordinates)
        if(areaname!=='' && areaf!==0 && centerf!==0){
            let temp = {
                areaname:areaname,
                sf:areaf,
                // center:findCenter(mystate.coordinates),
                coordinates:mystate.coordinates,
                center:{
                    latitude: centerf.latitude,
                    longitude: centerf.longitude,
                    latitudeDelta: center.latitudeDelta,
                    longitudeDelta: center.longitudeDelta,
                }
            }
            dispatch(saveData(`${storedata.email}list`,temp));
            setareaname('');
            setSF('');
            setcenter({
                latitude: locdata.location?.latitude,
                longitude: locdata.location?.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            });
            setMyState({markers: [],
                coordinates: []});
            toggleModal();
            navigation.navigate('ListScreen');
        }else{
            Alert.alert('Please enter Area name and SF');
        }

    }


    const deleteLastMarker = () => {
        let {coordinates } = mystate;
        // if (coordinates.length > 3){
        //   setMyState({
        //     points: points.filter(
        //       element => points.indexOf(element) != points.length - 1),
        //     poly: poly.filter(
        //       element => poly.indexOf(element) != poly.length - 1)
        //   })}
        // else if (points.length === 2) {
        //   setState({
        //     points: points.filter(
        //       element => points.indexOf(element) != points.length - 1),
        //     poly: poly.filter(
        //       element => poly.indexOf(element) != poly.length - 1),
        //     polygon: false,
        //     lineOrPolygon: 'Use Polygon',
        //     showMarks: false
        //   })
        // }
        // else {
        //   setState({
        //     points: points.filter(
        //       element => points.indexOf(element) != points.length - 1),
        //     poly: poly.filter(
        //       element => poly.indexOf(element) != poly.length - 1),
        //     polygon: false,
        //     lineOrPolygon: 'Use Polygon'
        //   })
        // }

        setMyState({
            ...mystate,
            coordinates: coordinates.filter(
                element => coordinates.indexOf(element) != coordinates.length - 1),
        })
        console.log(mystate.coordinates,'deleteFF');

      }


    const listiconclick = () => {
        dispatch(getListdata(`${storedata.email}list`))
        navigation.navigate('ListScreen');
    }

    const finish = () => {
        console.log(mystate.coordinates);
        toggleModal();
    }

    const changeCoordinate = (e, index) => {
        let newCoords = newCoordinates(mystate.coordinates, e, index)
        // setState({
        //   poly: newCoords
        // })
        setMyState({
            coordinates: newCoords
        })

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
        // if(check===1){
        //     setareaname('');
        //     setSF('');
        //     setMyState({markers: [],
        //         coordinates: []})
        //         return;

        // }
        // else if(listdata.itemdata && check===0){
        console.log(listdata.itemdata.coordinates.length,'length');
            if(!listdata.itemdata.coordinates.length>0){

                  // latitude: check===0 ? lat : locdata.location?.latitude,
                            // longitude: check===0 ? lon : locdata.location?.longitude,
                setcenter({
                    latitude: locdata.location?.latitude,
                    longitude: locdata.location?.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,

                    // latitude: 37.38343539873273, 
                    // latitudeDelta: 0.0039127213591854115,
                    //  longitude: -122.0776586048305, 
                    //  longitudeDelta: 0.004151724278926849
                });
                console.log('this')

                setTimeout(() => {

                mapRef.current.animateToRegion({
                    latitude: locdata.location.latitude,
                    longitude: locdata.location.longitude,
                    // latitude: 40.7128,
                    // longitude: -74.0060,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,


                    // latitude: 37.38343539873273, 
                    // latitudeDelta: 0.0039127213591854115,
                    //  longitude: -122.0776586048305, 
                    //  longitudeDelta: 0.004151724278926849

                },1);
                }, 1);


            }
            else{
                console.log('that')

                console.log(listdata.itemdata,"itemdataff");
                lat = listdata.itemdata.coordinates[0]?.latitude;
                lon = listdata.itemdata.coordinates[0]?.longitude;
                setareaname(listdata.itemdata.areaname)
                setSF(listdata.itemdata.sf)
                setcenter(listdata.itemdata.center)

                setTimeout(()=>{
                mapRef.current.animateToRegion(listdata.itemdata.center,1);
            },1 )

                setMyState({
                    ...mystate,
                    coordinates:listdata.itemdata.coordinates
                })             
            }



            // goToLoc();     

        // }

        return () => {
            // cleanup
            setareaname('');
            setSF('');
            setcenter({
                latitude: 0,
                longitude: 0,
            });
            setMyState({markers: [],
                coordinates: []})

        }
    },[listdata.itemdata])

    if(listdata.loading || locdata.loading){
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
    else{
    return (
        <View style={styles.container}>
                            <MapView
                        ref={mapRef}
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        mapType={MAP_TYPES.HYBRID}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        moveOnMarkerPress={false}
                        onRegionChangeComplete={(region) => {
                            console.log(region,'regionff-');
                            setcenter({
                                // latitude:region.latitude,
                                // longitude:region.longitude,
                                ...center,
                                latitudeDelta:region.latitudeDelta,
                                longitudeDelta:region.longitudeDelta
                            })
                        }}
                        region={{
                            // latitude: 38.539259979358434,
                            // longitude: 37.35132858157158,
                            // latitude: center.latitude,
                            // longitude: center.longitude,
                            // latitude: locdata.location?.latitude,
                            // longitude: locdata.location?.longitude,
                            // latitude: listdata.itemdata  ? listdata.itemdata.coordinates[0].latitude : locdata.location?.latitude,
                            // longitude: listdata.itemdata  ? listdata.itemdata.coordinates[0].longitude : locdata.location?.longitude,
                            // latitude: mystate.coordinates[0] ? lat : locdata.location?.latitude,
                            // longitude: mystate.coordinates[0] ? lon : locdata.location?.longitude,
                            // latitude: check===0 ? lat : locdata.location?.latitude,
                            // longitude: check===0 ? lon : locdata.location?.longitude,
                            latitude: locdata.location?.latitude,
                            longitude: locdata.location?.longitude,
                            latitudeDelta:0.006, 
                            // 0.01922,
                            longitudeDelta:5 
                            // 0.001421,
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
                                // let newCoordinates = mystate.coordinates.map((coordinate) => {
                                //     if (coordinate.name === marker.name) {
                                //         return {
                                //             ...coordinate,
                                //             latitude: e.nativeEvent.coordinate.latitude,
                                //             longitude: e.nativeEvent.coordinate.longitude,
                                //         };
                                //     }
                                //     return coordinate;
                                // }
                                // );
                                // setMyState({coordinates: newCoordinates})





                                changeCoordinate(e, index)




                            
                            }}
                            onDragEnd={(e) => {
                                // onDragEvent(e,marker)
                                // let newCoordinates = mystate.coordinates.map((coordinate) => {
                                //     if (coordinate.name === marker.name) {
                                //         return {
                                //             ...coordinate,
                                            
                                //             latitude: e.nativeEvent.coordinate.latitude,
                                //             longitude: e.nativeEvent.coordinate.longitude,
                                //         };
                                //     }
                                //     return coordinate;
                                // }
                                // );
                                // setMyState({coordinates: newCoordinates})
                            
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

{/* 
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
                        <Text style={{color: 'white'}}>list</Text> 
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


                    <TouchableOpacity
                    onPress={() => {
                        console.log(mystate.coordinates)
                        // save()
                        // finish()
                        goToLoc()
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

                            
                            }}>Tokyo</Text>
                    </TouchableOpacity> 

                    <TouchableOpacity
                    onPress={() => {
                        console.log(mystate.coordinates)
                        // save()
                        // finish()
                        deleteLastMarker()
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

                            
                            }}>Delete</Text>
                    </TouchableOpacity>


                </View>
  */}


{
    areaname && SF &&

                <View style={styles.BottomBtnContainer}>
                    <Text style={styles.areaNameText}>
                        <Text style={[styles.areaNameText,{
                            color: '#0A5DCF',
                            fontSize:20,
                            fontWeight:'bold'
                        }]}>Area: </Text>
                        {areaname}</Text>




                    <Text style={styles.sfText}>
                    <Text style={[styles.areaNameText,{
                            color: '#0A5DCF',
                            fontSize:20,
                            fontWeight:'bold'
                        }]}>SF: </Text>
                        {SF}</Text>
                </View>



}
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
                }
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
        height: windowHeight/4.5,
        borderRadius: 10,
        padding: 10,
    
        justifyContent: 'center',
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
        backgroundColor: '#0A5DCF',
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
        alignSelf:'flex-end',

    },
    BottomBtnContainer:{
        position:'absolute',
        bottom:0,
    
        // right:10,
        width:windowWidth,
        backgroundColor:'rgba(0,0,0,0.8)',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:15,
        paddingRight:15
    }
});

//make this component available to the app
export default MapScreen;
