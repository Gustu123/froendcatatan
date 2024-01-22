import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import CustomButton from "../components/CustomButtom";
import moment from "moment";
import DatePicker from "react-native-date-picker";
import { CheckBox, Icon } from "@rneui/themed";
import * as yup from 'yup'
import { Formik } from 'formik';
import Navbar from "../components/Navbarr";
import { useNavigation } from '@react-navigation/native';
import { debt } from "../services/utang";
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UangKeluar = () => {

    const initValues = {
        amount: 0,
        name: '',
        due_date: '',
    }
    const schema = yup.object().shape({
        amount: yup.string()
            .required("Nominal Uang Keluar tidak boleh kosong"),
        name: yup.string()
            .required("Deskripsi tidak boleh kosong"),
        due_date: yup.string()
            .required("Tgl Masuk tidak boleh kosong"),
    })
    const navigati = useNavigation()

    const doRegis = async (data) => {
        try {
            const user_id = await AsyncStorage.getItem('user_id')
            const body = {
                name: data.name,
                amount: amount,
                due_date: data.due_date,
                user_id: JSON.parse(user_id)
            }
            await debt(body)
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
    const onSubmit = () => {
        navigati.navigate('UangKeluar')
    }
    const onLoginPress = () => {
        navigati.goBack()
    }

    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [amount, setAmount] = useState(null)

    const [date, setDate] = useState(new Date())
    const [isDateOpen, setIsDateOpen] = useState(false)


    return (
        <View style={styles.bg}>
            <Navbar
                title="Tambah Utang"
                hasicon={false}
            />
            <View style={styles.container}>
                <View style={styles.col1}>
                    <Text style={styles.title}>
                        Total: {amount}
                    </Text>
                </View>
            </View>
            <View style={{ backgroundColor: 'white', flex: 1 }}>
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
                            setFieldValue,
                            values,
                            errors,
                            touched
                        }) => (
                            <>
                                <View style={styles.col}>
                                    <Text style={styles.inputp}>Jumlah Utang:</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(value) => {
                                            setAmount(value)
                                            handleChange('amount')
                                        }}
                                        value={values.amount}
                                        placeholder='masukan nominal'
                                        placeholderTextColor={'gray'}
                                        keyboardType="numeric"
                                    />
                                    {
                                        errors.amount && touched.amount ?
                                            <Text style={{ color: 'red', marginLeft: 7 }}>{errors.amount}</Text>
                                            :
                                            null
                                    }
                                </View>
                                <View style={styles.col}>
                                    <Text style={styles.inputp}>Nama Utang:</Text>
                                    <TextInput
                                        style={styles.inputtbg}
                                        onChangeText={handleChange('name')}
                                        value={values.name}
                                        placeholder='masukan utang'
                                        placeholderTextColor={'gray'}
                                    />
                                    {
                                        errors.name && touched.name ?
                                            <Text style={{ color: 'red', marginLeft: 7 }}>{errors.name}</Text>
                                            :
                                            null
                                    }
                                </View>
                                <Text style={styles.inputp}>Tanggal Masuk:</Text>
                                <View>
                                    <DatePicker
                                        modal
                                        open={isDateOpen}
                                        date={date}
                                        mode="date"
                                        onConfirm={(date) => {
                                            setIsDateOpen(false)
                                            setDate(date)
                                            setFieldValue("due_date", moment(date).format("YYYY-MM-DD"))
                                        }}
                                        onCancel={() => {
                                            setIsDateOpen(false)
                                        }}
                                    />
                                    <TouchableOpacity
                                        style={styles.coldate}
                                        onPress={() => setIsDateOpen(true)}
                                    >
                                        <TextInput
                                            placeholder='Write your email'
                                            value={moment(date).format("DD/MM/YYYY")}
                                            style={styles.inputdate}
                                            placeholderTextColor={'gray'}
                                            editable={false}
                                        />
                                        <Icon
                                            name="date"
                                            type="fontisto"
                                            size={35}
                                            style={styles.icon}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.fixToText1}>
                                    <CustomButton
                                        title="Kembali"
                                        onPress={(onLoginPress)}
                                    />
                                    <CustomButton
                                        title="Simpan"
                                        onPress={(handleSubmit)}
                                    />
                                </View>
                            </>
                        )
                    }
                </Formik>
            </View>
        </View >


    )
}
export default UangKeluar;

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        height: 150,
        backgroundColor: '#6AA84F',
    },
    col: {
        margin: 2,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    fixToText1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 420,
    },
    fixToText2: {
        flexDirection: 'col',
        justifyContent: 'flex-start',
    },
    colt: {
        flexDirection: 'row',
        justifyContent: 'space-arround'
    },
    container: {
        marginHorizontal: 16,
    },
    colmd: {
        flexDirection: 'row',
    },
    coldate: {
        flexDirection: 'row',
    },
    label: {
        color: 'black',
        alignSelf: 'center',
    },
    checkbox: {
        alignSelf: 'center',
    },
    col1: {
    },
    col2: {
        flexDirection: 'row',
        margin: 2,
    },
    title: {
        marginVertical: 5,
        fontSize: 15,
        fontFamily: 'times new roman',
        color: 'white'

    },
    inputp: {
        color: 'black',
        marginLeft: 9,
        paddingTop: 10,
    },
    input1: {
        marginLeft: 160,
        color: 'black',
        paddingTop: 10,
    },
    input: {
        borderWidth: 1,
        padding: 8,
        marginLeft: 7,
        width: 200,
        color: 'black'
    },
    inputtbg: {
        borderWidth: 1,
        padding: 8,
        marginLeft: 7,
        width: 390,
        color: 'black'
    },
    inputdate: {
        borderWidth: 1,
        padding: 8,
        marginLeft: 10,
        alignSelf: 'center',
        width: 100,
        color: 'black'
    },
    icon: {
        alignSelf: 'center',
        margin: 10
    },
    input2: {
        width: 150,
        marginLeft: 20,
        color: 'black'
    },
    input3: {
        width: 200,
        marginLeft: 10,
        color: 'black'
    },
    inputdeskripsi: {
        borderWidth: 1,
        padding: 8,
        marginLeft: 7,
        width: 390,
        color: 'black'
    },
    upload: {
        paddingHorizontal: 16,
        justifyContent: 'center',
        margin: 10,
        paddingVertical: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 12,
        width: 100,
        marginVertical: 8
    },
    uploadtext: {
        justifyContent: 'center',
        color: 'black',
    },
});

