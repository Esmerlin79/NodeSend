import { useReducer } from "react";
import axiosClient from "../../config/axios";
import { types } from "../../types/types";
import AuthContext from "./authContext";
import authReducer from "./authReducer";


const AuthState = ({ children }) => {
    
    const initialState = {
        token: '',
        authenticated: null,
        user: null,
        message: null
    }

    const [ state, dispatch ] = useReducer(authReducer, initialState);

    const cleanAlert = () => {
        setTimeout( () => {
            dispatch({
                type: types.CLEAN_ALERT,
            })
        }, 3000)
    }

    const registerUser = async userJSON => {

        try {
            const response = await axiosClient.post('/api/usuarios/', userJSON);
            dispatch({
                type: types.REGISTER_SUCCESS,
                payload: response.data.msg
            })
            cleanAlert();

        } catch (error) {
            console.log(error)
            dispatch({
                type: types.REGISTER_ERROR,
                payload: error.response.data.msg
            })
            cleanAlert();
        }
    }

    const userAuthenticated = name => {
        dispatch({
            type: types.USER_AUTHENTICATED,
            payload: name
        })
    }
    
    return (
        <AuthContext.Provider value={{
            token: state.token,
            authenticated: state.authenticated,
            user: state.user,
            message: state.message,
            registerUser,
            userAuthenticated
        }}>
            { children }
        </AuthContext.Provider>
    );
}
 
export default AuthState;