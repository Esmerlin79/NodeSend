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
        case types.LOGIN_ERROR:
            return {
                ...state,
                message: action.payload
            }

         case types.LOGIN_SUCCESS: 
            return {
                ...state,
                token: action.payload,
                authenticated: true
            }

        case types.USER_AUTHENTICATED: 
            return {
                ...state,
                user: action.payload,
                authenticated: action.payload ? true : null
            }

        case types.LOGOUT: 
            return {
                token: '',
                authenticated: null,
                user: null,
                message: null
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