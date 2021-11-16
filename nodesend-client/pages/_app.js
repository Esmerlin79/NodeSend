import AppState from "../context/app/appState";
import AuthState from "../context/auth/authState";


const MyApp = ({ Component, pageProps }) => {

    return ( 
        <AuthState>
            <AppState> 
                 <Component {...pageProps} />
            </AppState>
        </AuthState>
     );
}
 
export default MyApp;