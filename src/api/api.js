import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'http://localhost:7002',
    headers:{
        "Content-Type":"application/json"
    }
})


export default axiosInstance