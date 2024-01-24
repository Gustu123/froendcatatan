const { default: AsyncStroge } = require("@react-native-async-storage/async-storage");
const { default: axios }= require("axios");

export const baseUrl = "http://192.168.70.92:8000/"

const BaseClient = axios.create({
    baseURL: `${baseUrl}api/`
})

BaseClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStroge.getItem("token")

        if (token){
            console.log(`current acces token : ${token}`)
            config.headers.Authorization = `Bearer ${token}`
        }
        config.headers.Accept = 'application/json'
        config.headers["Content-Type"] = 'multipart/form-data'
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

BaseClient.interceptors.response.use(
    (response) => {
        console.log(
            `URL:${JSON.stringify(response.config.url, null, 2)} ${JSON.stringify(response.config.params, null, 2)}\nResponse`,
            JSON.stringify(response.data, null, 2)
        );
        return response;
    }
)

export default BaseClient
