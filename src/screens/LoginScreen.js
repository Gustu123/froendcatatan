import React from "react";
import {Icon} from "@rneui/themed";
import {Button, Text, TextInput, StyleSheet, View, TouchableOpacity} from "react-native";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native"
import CustomButton from "../components/CustomButtom";
import * as yup from 'yup'
import {Formik} from 'formik';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {login} from "../services/auth";
import {useDispatch} from "react-redux";
import {addToken} from "../redux/actions/authAction";
import {addUsername} from "../redux/actions/userAction";

const LoginScreen = () => {
    const dispatch = useDispatch()
    const nav = useNavigation()
    const [name, setName] = useState('');
    const [isShowPass, setIsShowPass] = useState(false)
    const [password, setPassword] = useState('')
    const navigateForgot = () => {
        nav.navigate("Lupapassword")
    };
    const onMasukPress = async (data) => {
        try {
            const body = {
                username: data.username,
                password: data.password,
                device_name: 'samsung'
            }
            await login(body)
                .then((res) => {
                    AsyncStorage.setItem("token", res.token)
                    AsyncStorage.setItem("user_id", JSON.stringify(res.user_id))
                    dispatch(addUsername(res.username))
                    dispatch(addToken(res.token))
                })
        } catch (err) {
            console.log(`error : ${err}`)
        }

    }
    const initValues = {
        username: '',
        password: ''
    }

    const schema = yup.object().shape({
        username: yup.string()
            .required("Username tidak boleh kosong"),
        password: yup.string()
            .min('8')
            .required("Password tidak boleh kosong"),
    })
    return (
        <View style={style.container}>
            <Text style={styles.inputj}>Masuk</Text>
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
                                <Text style={style.inputm}>Username</Text>
                                <TextInput
                                    onChangeText={handleChange('username')}
                                    placeholder='Masukan Username'
                                    value={values.username}
                                    style={{borderWidth: 1, padding: 8, color: 'black'}}
                                    placeholderTextColor={'gray'}
                                    multiline={false}
                                />
                                {
                                    errors.username && touched.username ?
                                        <Text style={{color: 'red'}}>{errors.username}</Text>
                                        :
                                        null
                                }
                                <Text style={style.inputp}>Password</Text>
                                <View style={style.inputContainer}>
                                    <TextInput
                                        onChangeText={handleChange('password')}
                                        placeholder='Write your name'
                                        value={values.password}
                                        style={styles.input}
                                        placeholderTextColor={'gray'}
                                        secureTextEntry={!isShowPass}
                                    />
                                    {
                                        errors.password && touched.password ?
                                            <Text style={{color: 'red'}}>{errors.password}</Text>
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
                                <TouchableOpacity
                                    onPress={navigateForgot}
                                >
                                    <Text style={style.inputi}>Lupa Password?</Text>
                                </TouchableOpacity>
                            </View>
                            <CustomButton
                                title="submit"
                                onPress={handleSubmit}
                            />
                        </>
                    )
                }
            </Formik>
        </View>
    )
}

export default LoginScreen
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 8,
        color: 'black'
    },
    icon: {
        position: 'absolute',
        right: 20

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
        left: 30
    },
    inputContainer1: {
        position: 'relative',
        justifyContent: 'center'
    },

})
