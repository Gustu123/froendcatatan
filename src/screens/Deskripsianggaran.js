import { CheckBox, Icon } from "@rneui/themed";
import React, { useEffect, useState, useRef } from "react";
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native'
import Navbar from "../components/Navbarr";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { actionLogout } from "../redux/actions/authAction";
import { detailtransaction } from "../services/transaksi";
import { baseUrl } from "../services/baseApi";
import { detailbudget } from "../services/anggaran";

const Deskripsianggaran = () => {
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
        const deskripsis = await detailbudget(id)
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
                    <Text style={styles.textt}>{deskripsis.name}</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={styles.text}>Amount:</Text>
                    <Text style={styles.textt}>{deskripsis.amount}</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={styles.text}>Batas Anggaran:</Text>
                    <Text style={{ color: 'black', fontSize: 16 }}>
                        {deskripsis.expride_date}
                    </Text>
                </View>
            </View>
            <View style={styles.containers}>
                <TouchableOpacity
                    onPress={onLoginPress}
                    style={styles.upload}
                >
                    <Text style={styles.uploadtext}>Kembali</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Deskripsianggaran

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
