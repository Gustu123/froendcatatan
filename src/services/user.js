import {get, post} from "./baseService"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const updatepassword = (data) => {
    return post('update-password', data)
}

export const getUser = async () => {
    const id = await AsyncStorage.getItem("user_id")
    return get(`user/${id}`)
}
