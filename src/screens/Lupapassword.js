import React from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import {useNavigation} from '@react-navigation/native'
import {Formik} from "formik";
import CustomButton from "../components/CustomButtom";
import * as yup from 'yup'
import {forgotPass} from "../services/auth";

const Lupapassword = () => {
    const nav = useNavigation();

    const initValues = {
        email: ""
    }

    const schema = yup.object().shape({
        email: yup.string().email("Format email tidak sesuai").required("Email tidak boleh kosong")
    })

    const onForgotPass = async (data) => {
        const res = await forgotPass(data)

        if (res) {
            nav.replace("ChangePassword", {
                userId: res.user.id
            })
        }
    }

    return (
        <View style={{flex: 1, justifyContent: "center", padding: 16}}>
            <Text style={{
                color: 'black',
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 16
            }}>Lupa Password</Text>
            <Formik
                initialValues={initValues}
                validationSchema={schema}
                onSubmit={onForgotPass}
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
                            <TextInput
                                onChangeText={handleChange('email')}
                                placeholder='masukan email pengguna'
                                value={values.email}
                                placeholderTextColor={'gray'}
                                style={{borderWidth: 1, padding: 8, color: 'black'}}
                            />
                            {
                                errors.email && touched.email ?
                                    <Text style={{color: 'red'}}>{errors.email}</Text>
                                    :
                                    null
                            }
                            <CustomButton
                                title="Submit"
                                onPress={handleSubmit}
                            />
                        </>
                    )
                }
            </Formik>
        </View>
    )
}
export default Lupapassword
