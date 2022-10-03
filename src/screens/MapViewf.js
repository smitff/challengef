import React,{useState,useEffect} from 'react';
import MapView,{Polygon,Polyline,PROVIDER_GOOGLE,Marker,MAP_TYPES} from 'react-native-maps';
import { Alert } from 'react-native';
import { TouchableOpacity, StyleSheet, Text, View, Platform,SafeAreaView } from 'react-native';
import { calculateArea, 
    calculatePerimeter, 
    findCenter, 
    newCoordinates, 
    findMinRadius,
    findMaxRadius,
    getPlacesInPolygon } from '../utils/helper';



    const MapViewf = () => {
        
        const [state, setState] = useState({
            points: [
                // {latitude:28.539259979358434, longitude:77.35132858157158 },
            ], poly: [
                // {latitude:28.539259979358434 , longitude:77.35132858157158 },
            ], polygon: false, showMarks: true,
            // region: props.initialLocation,
            lineOrPolygon: 'Use Polygon',
            clearMapOrEndRoute: 'Clear Map',
            radius: 0
        })

        const [territoryInfo, setTerritoryInfo] = useState({
            area: 0,
            perimeter: 0,
            center: {
                latitude: 0,
                longitude: 0
            }
        })

        const resetState = () => {
            setState({
              points: [], polygon: false, poly: [], showMarks: false,
              lineOrPolygon: 'Use Polygon',
            })
            setTerritoryInfo({area: 0, perimeter: 0, center: {latitude: 0, longitude: 0}})
          }

        
        const   calculateTerritoryInfo = () => {
            let area = calculateArea(state.poly)
            let perimeter = calculatePerimeter(state.poly)
            let center = findCenter(state.poly)
            let maxRadius = findMaxRadius(state.poly)
            setState({
              radius: maxRadius
            })
            return {area: _.round(area, 2), 
                    perimeter: _.round(perimeter, 2), 
                    center: center}
          }

          const addPoints = (e) => {
            console.log('addPoints',e.nativeEvent.coordinate)
            let l = {name: new Date() ,latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude, }
            setState({
                ...state,
              showMarks: true,
            //   points: [...state.points, {latlng: e.nativeEvent.coordinate}],
            //   poly: [...state.poly, e.nativeEvent.coordinate]

                points: [...state.points, l],
                poly: [...state.poly, l],
                polygon:true

            //   setMyState({
            //       ...mystate,
            //       coordinates: [...mystate.coordinates, l]
            //   })



            })
          }
         

          const clear = async () => {
            resetState()
          }


          const togglePolygon = () => {
            if (state.poly.length === 0) {
              return
            }
            
            if (state.polygon){
              setState({
                polygon: !state.polygon,
                lineOrPolygon: 'Use Polygon'
              })
            }
            else {
              let territoryInfo = calculateTerritoryInfo()
              setTerritoryInfo({
                area: territoryInfo.area, 
                perimeter: territoryInfo.perimeter, 
                center: territoryInfo.center})
              
              setState({
                polygon: !state.polygon,
                lineOrPolygon: 'Use Lines'
              })
            }
          }
          
          const deleteLastMarker = () => {
            let { poly, points } = state;
            if (poly.length > 3){
              setState({
                points: points.filter(
                  element => points.indexOf(element) != points.length - 1),
                poly: poly.filter(
                  element => poly.indexOf(element) != poly.length - 1)
              })}
            else if (points.length === 2) {
              setState({
                points: points.filter(
                  element => points.indexOf(element) != points.length - 1),
                poly: poly.filter(
                  element => poly.indexOf(element) != poly.length - 1),
                polygon: false,
                lineOrPolygon: 'Use Polygon',
                showMarks: false
              })
            }
            else {
              setState({
                points: points.filter(
                  element => points.indexOf(element) != points.length - 1),
                poly: poly.filter(
                  element => poly.indexOf(element) != poly.length - 1),
                polygon: false,
                lineOrPolygon: 'Use Polygon'
              })
            }
          }

          const changeCoordinate = (e, index) => {
            let newCoords = newCoordinates(state.poly, e, index)
            setState({
              poly: newCoords
            })
          }
        
          const newTerritoryInfo = () => {
            if (!state.polygon) {
              return
            }
            let territoryInfo = calculateTerritoryInfo()
            setTerritoryInfo({
              area: territoryInfo.area, 
              perimeter: territoryInfo.perimeter, 
              center: territoryInfo.center})
          }


          const   onPressPolygon = () => {
            Alert.alert('Takeover', `Take over this area for ${_.round(territoryInfo.area * .45)} steps?`, [{ 
              text: 'Conquer', onPress: () => {
                getPlacesInPolygon(
                  territoryInfo.center, 
                  state.radius,
                  state.poly)
                //trackUser()
              }
           }, { 
              text: 'Not yet', onPress: () => {
                return },
                style: 'cancel' } ])
          }
        

        return (
            <SafeAreaView style={{
                flex: 1,
            }}>
                    <MapView style={{
                                height: '100%',
                                width: '100%',
                    }}
        //   style = {styles.mapStyle}
        //   customMapStyle = {customStyle2}
          provider = {PROVIDER_GOOGLE}
          initialRegion = {state.region}
          onRegionChangeComplete = {
            region => {setState({region}) }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onPoiClick = {(e) => {
            // state.polygon ?
            // console.log('pressed') :
            addPoints(e)}
          }
          onPress = {(e) => {
            // state.polygon ?
            // console.log('pressed') :
            addPoints(e)}
          }
        >
        {state.showMarks ? 
         state.polygon && state.poly.length>0 ?
        <Polygon
          coordinates={state.poly}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          tappable= {true}
          onPress = {() => onPressPolygon()}
          fillColor="#0000FF"
          fillOpacity={0.35} /> :
        <Polyline 
            coordinates={state.poly}
            strokeWidth={3}
            strokeColor="red"/> :
            <></>
        }

        {
        state.points?.map((point, index) => (
          <Marker 
            key={index} 
            draggable={true}
            opacity={0.5}
            onDrag={(e) => 
              // changeCoordinate(e, index)
              {}
            }
            onDragEnd={(e) => 
              // newTerritoryInfo()
              changeCoordinate(e, index)
            
            }
            pinColor='green'
            coordinate={{
              latitude: point?.latitude,
              longitude: point?.longitude,
          }}
            // coordinate={point.latlng}
            >

          </Marker> ))}
        </MapView>
        
        <View 
        // style = {styles.buttonContainer}
        >
          <TouchableOpacity
            onPress={() => togglePolygon()}
            // style={
            //   [styles.button,
            //    styles.bubble]}
                >
            <Text style = {{color: 'white', fontSize: 12}}>
              {state.lineOrPolygon}
            </Text>
          </TouchableOpacity> 
          
          <TouchableOpacity
            onPress={() => clear()}
            // style={
            //   [styles.button,
            //    styles.bubble]} 
               >
            <Text style = {{color: 'white', fontSize: 12}}>
              Clear
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteLastMarker()}
            // style={
            //   [styles.button,
            //    styles.bubble]} 
               >
            <Text style = {{color: 'white', fontSize: 12}}>
              Delete Marker
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* <View style={{backgroundColor: 'black'}} id= "Debug Text">
          <Text style={{color: 'white'}}> Debug </Text>
          <Text style={{color: 'white'}}> TerritoryArea: {props.territoryInfo.area} </Text>
          <Text style={{color: 'white'}}> TerritoryCenterLatitude: {_.round(props.territoryInfo.center.latitude, 3)} </Text>
          <Text style={{color: 'white'}}> TerritoryCenterLongitude: {_.round(props.territoryInfo.center.longitude, 3)} </Text>
          <Text style={{color: 'white'}}> TerritoryPerimeter: {props.territoryInfo.perimeter}</Text>
        </View> */}

            </SafeAreaView>
        );
    };
    
    // define your styles
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#2c3e50',
        },
    });
    
    export default MapViewf;
    