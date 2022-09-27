import {
    REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAILURE,
    LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT
  } from '../constants/constants'

const INITIAL_STATE = {
	loading: false,
    message:null,
    error:null,
    email:null,
    
};

const auth = (state=INITIAL_STATE,action) =>{
    switch(action.type){
        case REGISTER_REQUEST:
            return {
                ...state,
                loading:true,
                message:null,
                error:null,
                email:null,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading:false,
                message:'Register success',
                error:null,
                email:action.payload,
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                loading:false,
                message:null,
                error:action.payload,
                email:null,
            }
        case LOGIN_REQUEST:
            return {
                ...state,
                loading:true,
                message:null,
                error:null,
                email:null,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading:false,
                message:'Login success',
                error:null,
                email:action.payload,
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loading:false,
                message:null,
                error:action.payload,
                email:null,
            }
        case LOGOUT:
            return {
                ...state,
                loading:false,
                message:null,
                error:null,
                email:null,
            }
        default:
            return state;

    }
}


export default auth;
































