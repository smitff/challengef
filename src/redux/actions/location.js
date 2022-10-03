import NavigationService from '../../navigations/NavigationService'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import RNLocation from 'react-native-location';
import { LOCATION_FAILURE, LOCATION_REQUEST, LOCATION_SUCCESS } from '../constants/constants';

import { getListdata,createPolygon } from './area';
export const permissionHandle =  () => {

    return async (dispatch) => {


    console.log('here')

    
    let permission = await RNLocation.checkPermission({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'coarse' // or 'fine'
      }
    });
 
    console.log('here2')
    console.log(permission)

    if (!permission) {
      dispatch({
        type: LOCATION_REQUEST,
      
      });
      permission = await RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "coarse",
          rationale: {
            title: "We need to access your location",
            message: "We use your location to show where you are on the map",
            buttonPositive: "OK",
            buttonNegative: "Cancel"
          }
        }
      });
      console.log(permission)
      if (permission) {
      location = await RNLocation.getLatestLocation({timeout: 100})
      console.log(location, location.longitude, location.latitude, 
            location.timestamp)
      dispatch({
        type: LOCATION_SUCCESS,
        payload: location
      });
      
      // NavigationService.replace('MapScreen');
      dispatch(createPolygon())
      }
      else{
        console.log('else')
        dispatch({
          type: LOCATION_FAILURE,
          payload: {
            accuracy: 2000, 
            altitude: 0,
             altitudeAccuracy: 0, course: 0, courseAccuracy: 0, fromMockProvider: false, latitude: 37.42342342342342, longitude: -122.08395287867832, speed: 0, speedAccuracy: 0, 
             timestamp: 1664012366862}

             
          
        });

        // NavigationService.replace('MapScreen',{
        //   check:1
        // });
      dispatch(createPolygon())

      }
 } else {


     console.log("Here 7")
     location = await RNLocation.getLatestLocation({timeout: 100})
     console.log(location, location.longitude, location.latitude,   
                 location.timestamp)
                 dispatch({
                  type: LOCATION_SUCCESS,
                  payload: location
                });
      dispatch(createPolygon())

      // NavigationService.replace('MapScreen');


      // NavigationService.navigate('MapScreen');
      // dispatch(getListdata(`${storedata.email}list`))
  
      // NavigationService.navigate('ListScreen');

    
 
  }
 

}
}
