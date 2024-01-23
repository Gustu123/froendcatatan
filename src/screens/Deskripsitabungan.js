import React, { useEffect, useState, useRef } from "react";
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native'
import Navbar from "../components/Navbarr";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { actionLogout } from "../redux/actions/authAction";
import { detailtransaction } from "../services/transaksi";
import { baseUrl } from "../services/baseApi";

const Deskripsitabungan = () => {
    const navigati = useNavigation();

    const route = useRoute()
    const { id } = route.params

    const dispatch = useDispatch();
    const onLoginPress = () => {
        AsyncStorage.setItem("token", "").then(() => {
            dispatch(actionLogout())
        })
    }

    const [deskripsis, setDeskripsis] = useState({})
    const allDeskripsi = async () => {
        const deskripsis = await detailtransaction(id)
        setDeskripsis(deskripsis)
    }

    useEffect(() => {
        allDeskripsi()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Navbar
                title="Deskripsi"
                hasicon={false}
            />
            <View style={styles.container}>
                <View>
                    <Image
                        source={{ uri: `${baseUrl}${deskripsis?.receipt}` }}
                        style={{ width: 200, height: 200, }}
                    />

                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={styles.text}>Name:</Text>
                    <Text style={styles.textt}>Ida Bagus Putu Suartha Wibawa</Text>
                </View>
                <View style={{ marginTop: 5 }}></View>
                <Text style={styles.text}>Total Tabungan:</Text>
                <Text style={styles.textt}>Gustune23@gmail.com:</Text>
            </View>
            <View style={styles.containers}>
                <TouchableOpacity
                    onPress={onLoginPress}
                    style={styles.upload}
                >
                    <Text style={styles.uploadtext}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Deskripsitabungan

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
    },
    icon: {
        paddingsTop: 2,
        justifyContent: 'center',
    },
    text: {
        color: 'black',
        fontFamily: 'times new roman',
        fontSize: 30,
    },
    textt: {
        color: 'black',
        fontFamily: 'times new roman',
        fontSize: 20,
    },
    input3: {
        width: 200,
        marginLeft: 10,
        color: 'black'
    },
    containers: {
        paddingTop: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    upload: {
        paddingHorizontal: 16,
        justifyContent: 'center',
        margin: 10,
        paddingVertical: 15,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'black',
        width: 160,
        marginVertical: 8
    },
    uploadtext: {
        justifyContent: 'center',
        color: 'black',
    },
});
