import React from 'react';
import Layout from "../components/Layout";
import Link from 'next/link';
import Dropzone from '../components/Dropzone';
import { useContext } from "react";
import AppContext from "../context/app/appContext";
import Alert from "../components/Alert";


const Home = () => {

    const { message_file, url } = useContext(AppContext);

    return ( 
      <Layout>
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
          { url ? (
            <>
              <p className="text-center text-2xl mt-10">
                <span className="font-bold text-red-700 text-3xl uppercase">Tu URL es:</span> {`${process.env.frontendURL}/enlaces/${url}`}
              </p>
              <button 
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10"
                  onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)}
                  onCl
              >Copiar Enlace</button>
            </>
          ) : (
            <>
               { message_file && <Alert message={message_file}/>}

                <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                  <Dropzone />
                  
                  <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                    <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Compartir archivos de forma sencilla y privada</h2>
                    <p className="text-lg leading-loose">
                      <span className="text-red-500 font-bold">ReactNodeSend</span> te permite compartir archivos con cifrado de extremo a extremo y un archivo que es eliminado despues de ser descargado. Asi que puedes mantener lo que compartes en privado y asegurarte de que tus cosas no permanezcan en linea para siempre.
                    </p>
                    <Link href="/create-account">
                      <a className="text-red-500 font-bold text-lg hover:text-red-700">Crea una cuenta para mayores beneficios</a>
                    </Link>

                  </div>

                </div>
            </>
          )}
        </div>
      </Layout>
    );
}
 

export default Home;