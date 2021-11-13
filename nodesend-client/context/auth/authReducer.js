import { types } from "../../types/types";

const initialState = {
    token: '',
    authenticated: null,
    user: null,
    message: null
}

export default (state = initialState, action) => {
    switch ( action.type ) {
        case types.REGISTER_SUCCESS: 
            return {
                ...state,
                message: action.payload
            }
            
        case types.REGISTER_ERROR: 
            return {
                ...state,
                message: action.payload
            }

        case types.CLEAN_ALERT: 
            return {
                ...state,
                message: null
            }

        default:
            return state;
    }
}