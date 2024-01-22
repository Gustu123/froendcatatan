import { CheckBox, Icon } from "@rneui/themed";
import React, { useEffect, useState, useRef } from "react";
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native'
import Navbar from "../components/Navbar";
import Custumbuttom from "../components/CustomButtom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { actionLogout } from "../redux/actions/authAction";


const Lupapassword = () => {
    const navigati = useNavigation();
    const dispatch = useDispatch();
    const onLoginPress = () => {
        AsyncStorage.setItem("token", "").then(() => {
            dispatch(actionLogout())
        })
    }
    const onLoginPass = () => {
        navigati.navigate('Ubahpassword')
    }

    return (
        <View style={{ flex: 1 }}>
            <Navbar
                title="Akun"
                hasicon={false}
            />
            <View style={styles.container}>
                <View>
                    <Icon
                        name="user"
                        type="font-awesome"
                        size={300}
                        color={'black'}
                        style={styles.icon}
                    />
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={styles.text}>Username:</Text>
                    <Text style={styles.textt}>Gustu</Text>
                </View>
                <View style={{ marginTop: 5 }}></View>
                <Text style={styles.text}>Nama:</Text>
                <Text style={styles.textt}>Ida Bagus Putu Suartha Wibawa</Text>
            </View>
            <View style={{ marginTop: 5 }}>
                <Text style={styles.text}>Email:</Text>
                <Text style={styles.textt}>Gustune23@gmail.com:</Text>
            </View>
            <View style={{ marginTop: 5 }}>
                <Text style={styles.text}>No. Hp:</Text>
                <Text style={styles.textt}>01030180843</Text>
            </View>
            <View style={styles.containers}>
                <TouchableOpacity
                    onPress={onLoginPress}
                    style={styles.upload}
                >
                    <Text style={styles.uploadtext}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onLoginPass}
                    style={styles.upload}
                >
                    <Text style={styles.uploadtext}>Ubah Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Lupapassword

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
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    upload: {
        paddingHorizontal: 16,
        justifyContent: 'center',
        margin: 10,
        alignItems: 'center',
        width: 180,
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 20
    },
    uploadtext: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
    },
});