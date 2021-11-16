import { types } from "../../types/types";

const initialState = {
    message_file: null,
    nombre: '',
    nombre_original: '',
    loading: null,
    descargas: 1,
    password: '',
    autor: null,
    url: ''
}


export default (state = initialState, action) => {
    switch (action.type) {
        case types.UPLOAD_FILE: 
            return {
                ...state,
                loading: true
            }

        case types.UPLOAD_FILE_SUCCESS: 
            return {
                ...state,
                nombre: action.payload.nombre,
                nombre_original: action.payload.nombre_original,
                loading: null
            }
        
        case types.UPLOAD_FILE_ERROR: 
            return {
                ...state,
                message_file: action.payload,
                loading: null
            }

        case types.CREATE_LINK_SUCCESS:
            return {
                ...state,
                url: action.payload
            }

        case types.SHOW_ALERT: 
            return {
                ...state,
                message_file: action.payload
            }
            
        case types.HIDE_ALERT: 
            return {
                ...state,
                message_file: null
            }

        case types.CLEAN_STATE: 
            return {
                ...state,
                message_file: null,
                nombre: '',
                nombre_original: '',
                loading: null,
                descargas: 1,
                password: '',
                autor: null,
                url: ''
            }
        default:
            return state;
    }
}