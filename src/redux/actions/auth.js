import NavigationService from '../../navigations/NavigationService'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAILURE,
    LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT
} from '../constants/constants'
import { Alert } from 'react-native';
import {getListdata} from './area'
import {permissionHandle} from './location'

export const register = (email,password) => {
    return async (dispatch) => {
        try {
            dispatch({
                type:REGISTER_REQUEST});

                const jsonValue = await AsyncStorage.getItem(email)
                if(jsonValue!==null){
                    dispatch({
                        type:REGISTER_FAILURE,
                        payload:'Email already exist'
                    })
                    Alert.alert('Error','Email already exist');
                }
                else{
                    // const jsonValue = JSON.stringify(password)
                    await AsyncStorage.setItem(email,password);
                    dispatch({
                        type:REGISTER_SUCCESS,
                        payload:email
                    });
                    // NavigationService.navigate('SplashScreen');
                    dispatch(permissionHandle())
                }
        }catch(error) {
            dispatch({
                type:REGISTER_FAILURE,
                payload:error
            });   
        }
    } 
}

export const login = (email,password) => {
    return async (dispatch) => {
        try {
            dispatch({type:LOGIN_REQUEST});
            const jsonValue = await AsyncStorage.getItem(email)
            if(jsonValue === null) {
                //User not exiet
                dispatch({
                    type:LOGIN_FAILURE,
                    payload:'User not exist'
                });
                Alert.alert('Error','User not exist');
            }
            else if(jsonValue !== password) {
                //Password not match
                dispatch({
                    type:LOGIN_FAILURE,
                    payload:'Password not match'
                });
                Alert.alert('Error','Password not match');
            }
            else {
                dispatch({
                    type:LOGIN_SUCCESS,
                    payload:email
                });
                // dispatch(getListdata(`${storedata.email}list`))
                // NavigationService.navigate('SplashScreen');
                dispatch(permissionHandle())

            }
        }catch(error) {
            dispatch({type:LOGIN_FAILURE});
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        try {
            dispatch({type:LOGOUT});
            NavigationService.navigate('LoginScreen');
        }catch(error) {
            console.log(error);
        }
    }
}




// const storeData = async (value) => {
//     try {
//       const jsonValue = JSON.stringify(value)
//       await AsyncStorage.setItem('@storage_Key', jsonValue)
//     } catch (e) {
//       // saving error
//     }
//   }


// const getData = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('@storage_Key')
//       return jsonValue != null ? JSON.parse(jsonValue) : null;
//     } catch(e) {
//       // error reading value
//     }
//   }
  


















