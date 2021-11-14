import Head from 'next/head';
import { useContext, useEffect } from 'react';
import AuthContext from '../context/auth/authContext';
import Header from './Header';

const Layout = ({ children }) => {
    
    const { userAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        userAuthenticated();
    }, [])


    return ( 
        <>
            <Head>
                <title>NodeSend</title>
                <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
            </Head>
            
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto">
                    <Header />
                    <main className="mt-20">
                        {children}  
                    </main>
                </div>
            </div>
        </>
     );
}
 
export default Layout;
