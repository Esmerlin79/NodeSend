import Link from 'next/link';
import React, { useContext } from 'react';
import AppContext from '../context/app/appContext';
import AuthContext from '../context/auth/authContext';
import { useRouter } from 'next/router';


const Header = () => {

    const router = useRouter();

    const { user, logout } = useContext(AuthContext);

    const { cleanState } = useContext(AppContext);

    const redirect = () => {
        router.push('/');
        cleanState();
    }

    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <img 
                className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.svg" 
                onClick={ () => redirect() }
            />
            
            <div>
                { user !== null ? (
                    <div className="flex items-center">
                        <p className="mr-2">Hola {user.nombre}</p>
                        <button 
                            className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                            onClick={ logout }
                        >
                            Cerrar Sesion
                        </button>
                    </div>
                ) : (
                    <>
                        <Link href="/login">
                            <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Iniciar Sesion</a>
                        </Link>
                        <Link href="/create-account">
                            <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Crear Cuenta</a>
                        </Link>
                    </>
                )}
            </div>
        </header>
     );
}
 
export default Header;