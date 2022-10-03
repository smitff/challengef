import NavigationService from '../../navigations/NavigationService'
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import RNLocation from 'react-native-location';
import { 

    GET_LISTDATA_REQUEST,GET_LISTDATA_SUCCESS,GET_LISTDATA_FAILURE,
    SAVE_DATA_REQUEST,SAVE_DATA_SUCCESS,SAVE_DATA_FAILURE,
    DELETE_DATA_REQUEST,DELETE_DATA_SUCCESS,DELETE_DATA_FAILURE,
    GET_ITEMDATA_REQUEST,GET_ITEMDATA_SUCCESS,GET_ITEMDATA_FAILURE,
    CREATE_POLYGON_REQUEST,CREATE_POLYGON_SUCCESS,CREATE_POLYGON_FAILURE
 } from '../constants/constants';

export const getListdata = (key) => {
    //  const navigation = useNavigation();

    return async (dispatch) => {
        try {
            dispatch({type:GET_LISTDATA_REQUEST});
            const jsonValue = await AsyncStorage.getItem(key);
            if(jsonValue !== null) {
                dispatch({
                    type:GET_LISTDATA_SUCCESS,
                    payload:JSON.parse(jsonValue)
                });
                NavigationService.navigate('ListScreen');
                // navigation.navigate('ListScreen');
            }
            else{
                dispatch({
                    type:GET_LISTDATA_FAILURE,
                    payload:'No data found'
                });
            }
        }catch(error) {
            dispatch({
                type:GET_LISTDATA_FAILURE,
                payload:error
            });   
        }
    } 
}

export const saveData = (key,data) => {
    return async (dispatch) => {
        try {
            dispatch({type:SAVE_DATA_REQUEST});
            const jsonValue = await AsyncStorage.getItem(key);
            if(jsonValue !== null) {
                let temp = JSON.parse(jsonValue);
                temp.push(data);
                await AsyncStorage.setItem(key,JSON.stringify(temp));
                dispatch({
                    type:SAVE_DATA_SUCCESS,
                    payload:temp
                });
            }
            
            else{
                let temp = [];
                temp.push(data);
                await AsyncStorage.setItem(key,JSON.stringify(temp));
                dispatch({
                    type:SAVE_DATA_SUCCESS,
                    payload:temp
                });
            }
        }catch(error) {
            dispatch({
                type:SAVE_DATA_FAILURE,
                payload:error
            });   
        }
    } 
}


export const deleteData = (key,index) => {
    return async (dispatch) => {
        try {
            dispatch({type:DELETE_DATA_REQUEST});
            const jsonValue = await AsyncStorage.getItem(key);
            if(jsonValue !== null) {
                let temp = JSON.parse(jsonValue);
                // let index = temp.indexOf(data);
                temp.splice(index,1);
                await AsyncStorage.setItem(key,JSON.stringify(temp));
                dispatch({
                    type:DELETE_DATA_SUCCESS,
                    payload:temp
                });
            }
            else{
                dispatch({
                    type:DELETE_DATA_FAILURE,
                    payload:'No data found'
                });
            }
        }catch(error) {
            dispatch({
                type:DELETE_DATA_FAILURE,
                payload:error
            });   
        }
    } 
}

export const itemClick = (item) => {
    return async (dispatch) => {
        try {
            dispatch({type:GET_ITEMDATA_REQUEST});
            dispatch({
                type:GET_ITEMDATA_SUCCESS,
                payload:item
            });
            NavigationService.navigate('MapScreen');
        }catch(error) {
            dispatch({
                type:GET_ITEMDATA_FAILURE,
                payload:error
            });   
        }
    } 
}

export const createPolygon = () => {
    return async (dispatch) => {
        try {
            dispatch({type:CREATE_POLYGON_REQUEST});
            dispatch({
                type:CREATE_POLYGON_SUCCESS,
                // payload:item
            });
            NavigationService.navigate('MapScreen');
        }catch(error) {
            dispatch({
                type:CREATE_POLYGON_FAILURE,
                payload:error
            });   
        }
    } 
}


























