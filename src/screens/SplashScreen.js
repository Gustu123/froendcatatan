import React, {useEffect} from "react";
import {Button, Image, StyleSheet, Text, View, TouchableOpacity,} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {addToken} from "../redux/actions/authAction";
import {useDispatch} from "react-redux";
import {addUsername} from "../redux/actions/userAction";


const SplashScreen = () => {
    const dispatch = useDispatch()
    const nav = useNavigation()
    const checkLoggedUser = async () => {
        const token = await AsyncStorage.getItem("token")
        const username = await AsyncStorage.getItem("name")
        console.log(token)

        if (token == null) {
            nav.reset({
                index: 0,
                routes: [{name: 'TopScreen'}]
            })
        } else {
            dispatch(addToken(token))
            dispatch(addUsername(username))
        }

    }

    useEffect(() => {
        checkLoggedUser()
    }, [])
    return (
        <View>
            <Text>Tunggu</Text>
        </View>
    )
}
export default SplashScreen
