import React, { useState, useContext } from "react";
import Alert from "../../components/Alert";
import Layout from "../../components/Layout";
import axiosClient from "../../config/axios";
import AppContext from "../../context/app/appContext";

export async function getServerSideProps({ params: { enlace } }) {
    const response = await axiosClient.get(`/api/enlaces/${enlace}`);
    console.log(response)

    return {
        props: {
            enlace: response.data
        }
    }
}

export async function getServerSidePaths() {
    const enlaces = await axiosClient.get('/api/enlaces/');

    return {
        paths: enlaces.data.enlaces.map( enlace => ({
            params: { enlace: enlace.url }
        })),
        fallback: false
    }
}

const Enlace = ({ enlace }) => {

    const [hasPassword, setHasPassword] = useState(enlace.password);
    const [password, setPassword] = useState('');

    const { message_file, showAlert} = useContext(AppContext);

    const verifyPassword = async e => {
        e.preventDefault();
        
        try {

            const data = { password };
            const response = await axiosClient.post(`/api/enlaces/${enlace.enlace}`, data);
            enlace.archivo = response.data.archivo;
            setHasPassword(response.data.password);

        } catch (error) {
            showAlert(error.response.data.msg);

        }
    }

    return (
        <Layout>
            { hasPassword ? (
               <>
                 <p className="text-center">Este enlace esta protegido por un password, colocalo a continuacion</p>
                 { message_file && <Alert message={message_file} /> }
                 <div className="flex justify-center mt-5"> 
                    <div className="w-full max-w-lg">
                        <form 
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={ e => verifyPassword(e) }
                        >
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-black text-sm font-bold mb-2">Password</label>
                                <input 
                                    type="password"
                                    className="shadow appearance-none boder rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    placeholder="Password del enlace"
                                    value={password}
                                    onChange={ e => setPassword(e.target.value) }
                                />
                            </div>

                            <input 
                                type="submit"
                                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                                value="Validar password"
                            />

                        </form>
                    </div>
                 </div>
               </>
            ) : (
                <>
                    <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>
                    <div className="flex items-center justify-center mt-10">
                        <a 
                            href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`} 
                            className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                            download
                        >aqui</a>
                    </div>
                </>
            )}
        </Layout>
    )
}

export default Enlace
