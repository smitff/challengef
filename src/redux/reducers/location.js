import {
    LOCATION_REQUEST,LOCATION_SUCCESS,LOCATION_FAILURE
  } from '../constants/constants'

const INITIAL_STATE = {
	loading: false,
    message:null,
    error:null,
    location:null  
};


const auth = (state=INITIAL_STATE,action) =>{
    switch(action.type){
        case LOCATION_REQUEST:
            return {
                ...state,
                loading:true,
                message:null,
                error:null,
                location:null,
            }
        case LOCATION_SUCCESS:
            return {
                ...state,
                loading:false,
                message:'Location success',
                error:null,
                location:action.payload,
            }
        case LOCATION_FAILURE:
            return {
                ...state,
                loading:false,
                message:null,
                location:action.payload,
                error:null,
            }

         default:
            return state;

    }
}


export default auth;


