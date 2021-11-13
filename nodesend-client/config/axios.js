import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.backendUrl
});


export default axiosClient;