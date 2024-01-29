import React from "react";
import {Icon} from "@rneui/themed";
import {Button, Text, TextInput, StyleSheet, View, TouchableOpacity} from "react-native";
import {useState} from "react";
import {useNavigation, useRoute} from "@react-navigation/native"
import CustomButton from "../components/CustomButtom";
import * as yup from 'yup'
import {Formik} from 'formik';
import {login} from "../services/auth";
import {useDispatch} from "react-redux";
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updatepassword} from "../services/user";

const Ubahpassword = () => {
    const nav = useNavigation()
    const route = useRoute()

    const {userId, isForgot = false} = route.params

    const [isShowPass, setIsShowPass] = useState(false)
    const [isShowConf, setIsShowConf] = useState(false)

    const onChangePass = async (data) => {
        try {
            const body = {
                oldPassword: isForgot ? null : data.oldPassword,
                newPassword: data.newPassword,
                userId: userId
            }
            console.log(body)
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
                    nav.goBack()
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
            .min(8)
            .max(16)
            .required("Password tidak boleh kosong"),
        newPassword: yup.string()
            .min(8)
            .max(16)
            .required("Password baru tidak boleh kosong"),
    })

    const schemaForgot = yup.object().shape({
        newPassword: yup.string()
            .min(8)
            .max(16)
            .required("Password baru tidak boleh kosong"),
    })

    return (
        <View style={style.container}>
            <Text style={styles.inputj}>
                {
                    isForgot
                        ? 'Lupa Password'
                        : 'Silahkan Ubah Password'
                }
            </Text>
            <Formik
                initialValues={initValues}
                validationSchema={isForgot ? schemaForgot : schema}
                onSubmit={onChangePass}
            >
                {
                    ({
                         handleChange,
                         handleSubmit,
                         values,
                         errors,
                         touched
                     }) => (
                        <>
                            <View>
                                {
                                    !isForgot &&
                                    <>
                                        <Text style={style.inputm}>Password Lama:</Text>
                                        <TextInput
                                            onChangeText={handleChange('oldPassword')}
                                            placeholder='Masukan password lama'
                                            value={values.oldPassword}
                                            style={styles.input}
                                            placeholderTextColor={'gray'}
                                            secureTextEntry={!isShowConf}
                                        />
                                        {
                                            errors.oldPassword && touched.oldPassword ?
                                                <Text style={{color: 'red'}}>{errors.oldPassword}</Text>
                                                :
                                                null
                                        }
                                        <Icon
                                            name={!isShowConf ? "eye-slash" : "eye"}
                                            type="font-awesome"
                                            size={25}
                                            containerStyle={styles.iconn}
                                            onPress={() => {
                                                setIsShowConf(!isShowConf)
                                            }}
                                        />
                                    </>
                                }
                                <Text style={style.inputp}>Password Baru</Text>
                                <View style={style.inputContainer}>
                                    <TextInput
                                        onChangeText={handleChange('newPassword')}
                                        placeholder='Masukan password baru'
                                        value={values.newPassword}
                                        style={styles.input}
                                        placeholderTextColor={'gray'}
                                        secureTextEntry={!isShowPass}
                                    />
                                    {
                                        errors.newPassword && touched.newPassword ?
                                            <Text style={{color: 'red'}}>{errors.newPassword}</Text>
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
                                title="Ubah Password"
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
