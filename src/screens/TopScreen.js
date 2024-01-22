import React from "react";
import { Button, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"

const TopScreen = () => {
    const navigati = useNavigation()
    const onLoginPress = () => {
        navigati.navigate('LoginScreen')
    }

    const onRegisterPress = () => {
        navigati.navigate('RegisterScreen')
    }
    

    return (
        <View>
            <View style={style.greenBg}>
                <Text style={style.textd}>Selamat Datang!</Text>
                <Image
                    source={require('../assets/img/logo.png')}
                    style={{ width: 200, height: 200, }}
                />
                <Text style={style.textc}>Catatan Keuangan</Text>
            </View>
            <View style={style.containers}>
                <TouchableOpacity
                    onPress={onLoginPress}
                    style={style.upload}
                >
                    <Text style={style.uploadtext}>MASUK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onRegisterPress}
                    style={style.upload}
                >
                    <Text style={style.uploadtext}>REGISTER</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default TopScreen

const style = StyleSheet.create({
    class: {
        marginLeft: 10
    },
    greenBg: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#69a84f',
        height: 450
    },
    masuk: {
        position: 'relative',
        width: 40,
        padding: 1000
    },
    textd: {
        fontWeight: 'bold',
        fontSize: 40,
        color: 'white'
    },
    textc: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: -20,
        color: 'white',
        fontFamily: 'times new roman'
    },
    containers: {
        paddingTop: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    upload: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 12,
        width: 150,
        height: 50,
        alignSelf: 'center',
        marginVertical: 8
    },
    uploadtext: {
        justifyContent: 'center',
        color: 'black',
        fontWeight: '800'
    },
})

