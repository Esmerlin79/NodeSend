import { useFormik } from "formik";
import Layout from "../components/Layout";
import * as Yup from 'yup';


const Login = () => {

  const formik = useFormik({
    initialValues: {
        email: '',
        password: ''
    },
    validationSchema: Yup.object({
        email: Yup.string().email('El email no es valido').required('El email es obligatorio'),
        password: Yup.string().required('El password no puede ir vacio')
    }),
    onSubmit: value => {
        console.log(value)
    }
})

  return ( 
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
            <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Iniciar Sesion</h2>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form 
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-black text-sm font-bold mb-2">Email</label>
                            <input 
                                type="email"
                                className="shadow appearance-none boder rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                placeholder="Email de usuario"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                             {formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ): null}

                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-black text-sm font-bold mb-2">Password</label>
                            <input 
                                type="password"
                                className="shadow appearance-none boder rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                placeholder="Password de usuario"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ): null}

                        </div>

                        <input 
                            type="submit"
                            className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                            value="Iniciar Sesion"
                        />

                    </form>
                </div>
            </div>
        </div>
    </Layout>
   );
}
 

export default Login;