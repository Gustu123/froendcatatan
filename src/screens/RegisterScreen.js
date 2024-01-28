import { Icon } from "@rneui/themed";
import { ScrollView, Text, TextInput, StyleSheet, View, Alert, } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native"
import * as yup from 'yup'
import { Formik } from 'formik';
import CustomButton from "../components/CustomButtom";
import { register } from "../services/auth";

const RegisterScreen = () => {

    const navigati = useNavigation()
    const [nape, setNape] = useState('');
    // const [number, onChangeNumber] = React.useState('');
    const [isShowPass, setIsShowPass] = useState(false)
    const [password, setPassword] = useState('')
    const [gmail, setGmail] = useState('');
    const onDaftarPress = () => {

    }
    const doRegis = async (dataa) => {
        try {
            const body = {
                name: dataa.name,
                username: dataa.username,
                phone: dataa.phone,
                password: dataa.password,
                email: dataa.email
            }
            await register(body)
                .then(() => {
                    Alert.alert(
                        'Konfirmasi',
                        'Data berhasil disimpan',
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
        name: '',
        username: '',
        phone: '',
        password: '',
        email: ''
    }

    const schema = yup.object().shape({
        name: yup.string()
            .required("Nama pengguna tidak boleh kosong"),
        username: yup.string()
            .required("Username pengguna tidak boleh kosong"),
        phone: yup.string()
            .min(8)
            .required("Nomor telepohone tidak boleh kosong"),
        password: yup.string()
            .min(8)
            .required("Password tidak boleh kosong"),
        email: yup.string()
            .email()
            .required("Gmail tidak boleh kosong"),
    })
    return (
        <View style={{ paddingTop: 30 }}>
            <ScrollView>
                <Text style={styles.inputj}>Daftar</Text>
                <View style={style.container}>
                    <Text style={style.inputp}>Nama Pengguna</Text>
                    <Formik
                        initialValues={initValues}
                        validationSchema={schema}
                        onSubmit={doRegis}
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
                                    <TextInput
                                        onChangeText={handleChange('name')}
                                        placeholder='masukan nama pengguna'
                                        value={values.name}
                                        placeholderTextColor={'gray'}
                                        style={{ borderWidth: 1, padding: 8, color: 'black' }}
                                        multiline={false}
                                    />
                                    {
                                        errors.name && touched.name ?
                                            <Text style={{ color: 'red' }}>{errors.name}</Text>
                                            :
                                            null
                                    }
                                    <Text style={style.inputt}>Username</Text>
                                    <TextInput
                                        onChangeText={handleChange('username')}
                                        value={values.username}
                                        style={{ borderWidth: 1, padding: 8, color: 'black' }}
                                        placeholderTextColor={'gray'}
                                        placeholder="masukan nomor username"
                                    />
                                    {
                                        errors.username && touched.username ?
                                            <Text style={{ color: 'red' }}>{errors.username}</Text>
                                            :
                                            null
                                    }
                                    <Text style={style.inputt}>Nomor Telepon</Text>
                                    <TextInput
                                        onChangeText={handleChange('phone')}
                                        value={values.phone}
                                        style={{ borderWidth: 1, padding: 8, color: 'black' }}
                                        placeholderTextColor={'gray'}
                                        placeholder="masukan nomor telephone"
                                        keyboardType="numeric"
                                    />
                                    {
                                        errors.phone && touched.phone ?
                                            <Text style={{ color: 'red' }}>{errors.phone}</Text>
                                            :
                                            null
                                    }
                                    <Text style={style.inputpk}>Kata Sandi</Text>
                                    <View style={style.inputContainer}>
                                        <TextInput
                                            onChangeText={handleChange('password')}
                                            placeholder='masukan kata sandi'
                                            value={values.password}
                                            style={styles.input}
                                            placeholderTextColor={'gray'}
                                            secureTextEntry={!isShowPass}
                                        />
                                        {
                                            errors.password && touched.password ?
                                                <Text style={{ color: 'red' }}>{errors.password}</Text>
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
                                    <Text style={style.inputg}>Masukan Gmail</Text>
                                    <TextInput
                                        onChangeText={handleChange('email')}
                                        placeholder='masukan gmali'
                                        value={values.email}
                                        placeholderTextColor={'gray'}
                                        style={{ borderWidth: 1, padding: 8, color: 'black' }}
                                        multiline={false}
                                    />
                                    {
                                        errors.email && touched.email ?
                                            <Text style={{ color: 'red' }}>{errors.email}</Text>
                                            :
                                            null
                                    }
                                    <CustomButton title="Daftar"
                                        onPress={handleSubmit}></CustomButton>
                                </>
                            )
                        }
                    </Formik>
                </View>
            </ScrollView>
        </View>
    )
}

export default RegisterScreen
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
        paddingTop: 100,
        fontWeight: 'bold'
    }
})
const style = StyleSheet.create({
    input: {
        color: 'black'
    },
    inputp: {
        color: 'black',
        paddingTop: 10
    },
    inputt: {
        color: 'black',
        paddingTop: 15
    },
    inputpk: {
        color: 'black',
        paddingTop: 15
    },
    inputg: {
        color: 'black',
        paddingTop: 15
    },
    inputContainer: {
        position: 'relative',
        justifyContent: 'center'
    },
    container: {
        justifyContent: 'center',
        width: 350,
        left: 30
    }
})