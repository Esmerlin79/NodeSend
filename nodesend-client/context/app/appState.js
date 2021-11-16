import { useReducer } from 'react';
import axiosClient from '../../config/axios';
import { types } from '../../types/types';
import AppContext from './appContext';
import appReducer from './appReducer';

const AppState = ({ children }) => {
    
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

    const [state, dispatch] = useReducer(appReducer, initialState);

    const showAlert = message => {
        dispatch({
            type: types.SHOW_ALERT,
            payload: message
        })
        setTimeout( () => {
            dispatch({
                type: types.HIDE_ALERT,
            })
        }, 3000)
    }

    const uploadFile = async ( formData, originalNameFile ) => {
        
        dispatch({
            type: types.UPLOAD_FILE,
        })

       try {
            const response = await axiosClient.post('/api/archivos/', formData);
            console.log(response.data)

            const file = {
                nombre: response.data.archivo,
                nombre_original: originalNameFile
            }

            dispatch({
                type: types.UPLOAD_FILE_SUCCESS,
                payload: file
            })
            
       } catch (error) {
           console.log(error);
           dispatch({
            type: types.UPLOAD_FILE_ERROR,
            payload: error.response.data.msg
         })
       }
    }

    const createLink = async () => {
        try {
            const data = {
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
            }

            const response = await axiosClient.post('/api/enlaces/', data);
            dispatch({
                type: types.CREATE_LINK_SUCCESS,
                payload: response.data.url
            })
        } catch (error) {
            console.log(error);
        }
    }

    const cleanState = () => {
        dispatch({
            type: types.CLEAN_STATE
        })
    }

    return (
      <AppContext.Provider value={{
         message_file: state.message_file,
         nombre: state.nombre,
         nombre_original: state.nombre_original,
         loading: state.loading,
         descargas: state.descargas,
         password: state.password,
         autor: state.autor,
         url: state.url,
         uploadFile,
         createLink,
         showAlert,
         cleanState
      }}>
          {children}
      </AppContext.Provider>
    )
}

export default AppState
