import {
    GET_LISTDATA_REQUEST,GET_LISTDATA_SUCCESS,GET_LISTDATA_FAILURE,
    SAVE_DATA_REQUEST,SAVE_DATA_SUCCESS,SAVE_DATA_FAILURE,
    DELETE_DATA_REQUEST,DELETE_DATA_SUCCESS,DELETE_DATA_FAILURE,
    GET_ITEMDATA_REQUEST,GET_ITEMDATA_SUCCESS,GET_ITEMDATA_FAILURE
  } from '../constants/constants'

const INITIAL_STATE = {
	loading: false,
    message:null,
    error:null,
    email:null,
    listdata:[],
    itemdata:{
        areaname:"",
        sf:0,
        // center:findCenter(mystate.coordinates),
        coordinates:[]
    }

};


const area = (state=INITIAL_STATE,action) =>{
    switch(action.type){
        case GET_LISTDATA_REQUEST:
            return {
                ...state,
                loading:true,
                message:null,
                error:null,
                listdata:[],
            }
        case GET_LISTDATA_SUCCESS:
            return {
                ...state,
                loading:false,
                message:'Data found',
                error:null,
                listdata:action.payload,
            }
        case GET_LISTDATA_FAILURE:
            return {
                ...state,
                loading:false,
                message:null,
                error:action.payload,
                listdata:[],
            }
        case SAVE_DATA_REQUEST:
            return {
                ...state,
                loading:true,
                message:null,
                error:null,
                // listdata:[]
            }
        case SAVE_DATA_SUCCESS:
            return {
                ...state,
                loading:false,
                message:'Data saved',
                error:null,
                listdata:action.payload,
            }
        case SAVE_DATA_FAILURE:
            return {
                ...state,
                loading:false,
                message:null,
                error:action.payload,
                // listdata:[]
            }
        case DELETE_DATA_REQUEST:
            return {
                ...state,
                loading:true,
                message:null,
                error:null,
                // listdata:[]
            }
        case DELETE_DATA_SUCCESS:
            return {
                ...state,
                loading:false,
                message:'Data deleted',
                error:null,
                listdata:action.payload,
            }
        case DELETE_DATA_FAILURE:
            return {
                ...state,
                loading:false,
                message:null,
                error:action.payload,
                // listdata:[]
            }
        case GET_ITEMDATA_REQUEST:
            return {
                ...state,
                loading:true,
                message:null,
                error:null,
            }
        case GET_ITEMDATA_SUCCESS:
            return {
                ...state,
                loading:false,
                message:'Data found',
                error:null,
                itemdata:action.payload
            }
        case GET_ITEMDATA_FAILURE:
            return {
                ...state,
                loading:false,
                message:null,
                error:action.payload,
            }


        default:
            return state;

    }
}

export default area;