import { useReducer } from "react";
import axiosClient from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";
import { types } from "../../types/types";
import AuthContext from "./authContext";
import authReducer from "./authReducer";


const AuthState = ({ children }) => {
    
    const currentToken = typeof window !== 'undefined' ? localStorage.getItem('token') : "" ;

    const initialState = {
        token: currentToken || "",
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

    const login = async credentialsJSON => {
        try {
            const response = await axiosClient.post('/api/auth/', credentialsJSON);
            localStorage.setItem('token', response.data.token);

            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: response.data.token,
            })
            cleanAlert();

        } catch (error) {
            console.log(error.response)
            dispatch({
                type: types.LOGIN_ERROR,
                payload: error.response.data.msg
            })
            cleanAlert();
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({
            type: types.LOGOUT
        })
    }

    const userAuthenticated = async () => {
        try {

            tokenAuth(state.token);

            const response = await axiosClient.get('/api/auth/');

            const user = {
                nombre: response.data.nombre,
                email: response.data.email,
                id: response.data.id,
            }
             if( response.data.email ) {
                dispatch({
                    type: types.USER_AUTHENTICATED,
                    payload: user
                })
             } else {
                dispatch({
                    type: types.USER_AUTHENTICATED,
                    payload: null
                })
             }

        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <AuthContext.Provider value={{
            token: state.token,
            authenticated: state.authenticated,
            user: state.user,
            message: state.message,
            registerUser,
            login,
            logout,
            userAuthenticated
        }}>
            { children }
        </AuthContext.Provider>
    );
}
 
export default AuthState;