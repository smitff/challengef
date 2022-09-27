//import liraries
import React, { useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import NavigationService from './src/navigations/NavigationService'
import ListScreen from './src/screens/ListScreen';
import MapScreen from './src/screens/MapScreen';
import { View, Text, StyleSheet,TouchableOpacity,FlatList,Image,ImageBackground,SafeAreaView } from 'react-native';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import RNLocation from 'react-native-location';
import { Provider } from 'react-redux';
import {store,persistor} from './src/redux/store'
import {useDispatch,useSelector} from'react-redux'
import {permissionHandle} from './src/redux/actions/location'
import SplashScreen from './src/screens/SplashScreen';

const Stack = createNativeStackNavigator();
RNLocation.configure({
  distanceFilter: 5.0
 })

// create a component
const App = () => {






//   const permissionHandle = async () => {

//     console.log('here')
 
 
//     let permission = await RNLocation.checkPermission({
//       ios: 'whenInUse', // or 'always'
//       android: {
//         detail: 'coarse' // or 'fine'
//       }
//     });
 
//     console.log('here2')
//     console.log(permission)

//     if (!permission) {
//       permission = await RNLocation.requestPermission({
//         ios: "whenInUse",
//         android: {
//           detail: "coarse",
//           rationale: {
//             title: "We need to access your location",
//             message: "We use your location to show where you are on the map",
//             buttonPositive: "OK",
//             buttonNegative: "Cancel"
//           }
//         }
//       });
//       console.log(permission, 'permission00')
//       location = await RNLocation.getLatestLocation({timeout: 100})
//       console.log(location, location.longitude, location.latitude, 
//             location.timestamp)
//  } else {
//      console.log("Here 7")
//      location = await RNLocation.getLatestLocation({timeout: 100})
//      console.log(location, location.longitude, location.latitude,   
//                  location.timestamp)
    
 
//   }
//   }













  return (
    <Provider store={store}>
      <NavigationContainer ref={ref => NavigationService.setTopLevelNavigator(ref)}>
          <Stack.Navigator initialRouteName='Register'>
            {/* <Stack.Screen 
            name="Splash" 
            component={Splash}
            options={{
              headerShown: false,
            }}
            /> */}

<Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
            />

  <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
            />

            
  <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
            />          

            <Stack.Screen
 name="ListScreen"
 options={({navigation}) => ({
   title: 'ROOFLINK',
   headerTintColor: '#000000',
   headerTitleAlign: 'center',
   headerStyle:{
     backgroundColor: "white",
   },
   headerTitleStyle: {
    //  fontFamily: 'Montserrat',
     fontSize: 22, 
     fontWeight: '600',
     color:'#2F2F2F',
     marginLeft:-50
   },

   headerLeft: () => {
     return (
       <TouchableOpacity
       style={{
         // marginLeft:2
       }}
       onPress={() => navigation.goBack()}>
         <Image
           source={require('./src/assets/images/backh.png')}
           style={{
             height: 24,
             width: 12,
             color: 'black',
             marginTop: 2,
           }}
         />
       </TouchableOpacity>
     );
   },
 })}

            component={ListScreen}
         
            />

          <Stack.Screen
            // name="MapScreen"
            // component={MapScreen}
            // options={{
            //   headerShown: false,
            // }}

            name="MapScreen"
            options={({navigation}) => ({
              title: 'ROOFLINK',
              headerTintColor: '#000000',
              headerTitleAlign: 'center',
              headerStyle:{
                backgroundColor: "white",
              },
              headerTitleStyle: {
                // fontFamily: 'Montserrat',
                fontSize: 22, 
                fontWeight: '600',
                color:'#2F2F2F',
                marginLeft:-50
              },

              headerLeft: () => {
                return (
                  <TouchableOpacity
                  style={{
                    // marginLeft:2
                  }}
                  onPress={() => navigation.goBack()}>
                    <Image
                      source={require('./src/assets/images/backh.png')}
                      style={{
                        height: 24,
                        width: 12,
                        color: 'black',
                        marginTop: 2,
                      }}
                    />
                  </TouchableOpacity>
                );
              },
            })}
            component={MapScreen}
          />











                  </Stack.Navigator>
        </NavigationContainer>
      </Provider>
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

//make this component available to the app
export default App;
