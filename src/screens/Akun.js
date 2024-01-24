import {CheckBox, Icon} from "@rneui/themed";
import React, {useEffect, useState, useRef} from "react";
import {Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from '@react-navigation/native'
import Navbar from "../components/Navbar";
import Custumbuttom from "../components/CustomButtom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";
import {actionLogout} from "../redux/actions/authAction";
import {getUser} from "../services/user";

const Akun = () => {
    const nav = useNavigation()
    const dispatch = useDispatch();

    const [user, setUser] = useState({})

    const getUserData = async () => {
        try {
            const res = await getUser()
            setUser(res.user)
        } catch (e) {
            console.log(e)
        }
    }

    const doLogout = () => {
        AsyncStorage.setItem("token", "").then(() => {
            dispatch(actionLogout())
        })
    }

    const navigateChangePass = () => {
        nav.navigate("Ubahpassword", {
            userId: user.id
        })
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <View style={{flex: 1}}>
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
                <View style={{marginTop: 5}}>
                    <Text style={styles.text}>Username:</Text>
                    <Text style={styles.textt}>{user.username}</Text>
                </View>
                <View style={{marginTop: 5}}></View>
                <Text style={styles.text}>Nama:</Text>
                <Text style={styles.textt}>{user.name}</Text>
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.text}>Email:</Text>
                <Text style={styles.textt}>{user.email}</Text>
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.text}>No. Hp:</Text>
                <Text style={styles.textt}>{user.phone}</Text>
            </View>
            <View style={styles.containers}>
                <TouchableOpacity
                    onPress={doLogout}
                    style={styles.upload}
                >
                    <Text style={styles.uploadtext}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={navigateChangePass}
                    style={styles.upload}
                >
                    <Text style={styles.uploadtext}>Ubah Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Akun

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
        borderRadius: 20
    },
    uploadtext: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
    },
});
