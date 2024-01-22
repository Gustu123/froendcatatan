import React from "react";
import { Icon } from "@rneui/themed";
import { Button, Text, TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native"
import CustomButton from "../components/CustomButtom";
import * as yup from 'yup'
import { Formik } from 'formik';
import { login } from "../services/auth";
import { useDispatch } from "react-redux";
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updatepassword } from "../services/ubahpass";

const Ubahpassword = () => {
    const dispatch = useDispatch()
    const navigati = useNavigation()
    const [name, setName] = useState('');
    const [isShowPass, setIsShowPass] = useState(false)
    const [isShowPasss, setIsShowPasss] = useState(false)
    const [password, setPassword] = useState('')
    
    const onMasukPress = async (data) => {
        try {
            const user_id = await AsyncStorage.getItem('user_id')
            const body = {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
                userId: JSON.parse(user_id)
            }
            await updatepassword(body)
                .then(() => {
                    Alert.alert(
                        'Konfirmasi',
                        'Data berhasil dismpan',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'OK',
                                onPress: () => console.log('OK pressed'),
                            },
                        ],
                    );
                    navigati.goBack()
                })

        } catch (err) {
            console.log(`error : ${err}`)
        }

    }
    const initValues = {
        oldPassword: '',
        newPassword: ''
    }

    const schema = yup.object().shape({
        oldPassword: yup.string()
        .min('8')
        .required("Password tidak boleh kosong"),
        newPassword: yup.string()
            .min('8')
            .required("Password tidak boleh kosong"),
    })
    return (
        <View style={style.container}>
            <Text style={styles.inputj}>Silahkan Ubah Password</Text>
            <Formik
                initialValues={initValues}
                validationSchema={schema}
                onSubmit={onMasukPress}
            >
                {
                    ({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched
                    }) => (
                        <>
                            <View>
                                <Text style={style.inputm}>Password Lama:</Text>
                                <TextInput
                                    onChangeText={handleChange('oldPassword')}
                                    placeholder='Masukan Passwordlama'
                                    value={values.oldPassword}
                                    style={styles.input}
                                    placeholderTextColor={'gray'}
                                    secureTextEntry={!isShowPasss}
                                />
                                {
                                    errors.oldPassword && touched.oldPassword ?
                                        <Text style={{ color: 'red' }}>{errors.oldPassword}</Text>
                                        :
                                        null
                                }
                                <Icon
                                        name={!isShowPasss ? "eye-slash" : "eye"}
                                        type="font-awesome"
                                        size={25}
                                        containerStyle={styles.iconn}
                                        onPress={() => {
                                            setIsShowPasss(!isShowPasss)
                                        }}
                                    />
                                <Text style={style.inputp}>Password Baru</Text>
                                <View style={style.inputContainer}>
                                    <TextInput
                                        onChangeText={handleChange('newPassword')}
                                        placeholder='Masukan Passwordbaru'
                                        value={values.newPassword}
                                        style={styles.input}
                                        placeholderTextColor={'gray'}
                                        secureTextEntry={!isShowPass}
                                    />
                                    {
                                        errors.newPassword && touched.newPassword?
                                            <Text style={{ color: 'red' }}>{errors.newPassword}</Text>
                                            :
                                            null
                                    }
                                    <Icon
                                        name={!isShowPass ? "eye-slash" : "eye"}
                                        type="font-awesome"
                                        size={25}
                                        containerStyle={styles.icon}
                                        onPress={() => {
                                            setIsShowPass(!isShowPass)
                                        }}
                                    />
                                </View>
                            </View>
                            <CustomButton
                                title="simpan"
                                onPress={handleSubmit}
                            />
                        </>
                    )
                }
            </Formik>
        </View>
    )
}

export default Ubahpassword
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 10,
        color: 'black'
    },
    icon: {
        position: 'absolute',
        right: 20
    },
    iconn: {
        position: 'absolute',
        right: 20,
        paddingTop: 37
    },
    inputj: {
        color: 'black',
        textAlign: 'center',
        fontSize: 25,
        paddingTop: 200,
        fontWeight: 'bold'
    },

})
const style = StyleSheet.create({
    input: {
        color: 'black'
    },
    inputp: {
        color: 'black',
        paddingTop: 20
    },
    inputm: {
        color: 'black',
        paddingTop: 10
    },
    inputi: {
        color: 'black',
        left: 245
    },
    inputContainer: {
        position: 'relative',
        justifyContent: 'center'
    },
    container: {
        justifyContent: 'center',
        width: 350,
        left: 30,
        paddingTop: 50
    },
    inputContainer1: {
        position: 'relative',
        justifyContent: 'center'
    },

})
