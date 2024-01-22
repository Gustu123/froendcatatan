import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import CustomButton from "../components/CustomButtom";
import moment from "moment";
import DatePicker from "react-native-date-picker";
import { CheckBox, Icon } from "@rneui/themed";
import * as yup from 'yup'
import { Formik } from 'formik';
import Navbar from "../components/Navbarr";
import { budget } from "../services/anggaran";
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const TambahAnggaran = () => {

    const inputArr = [
        {
            type: "text",
            id: 1,
            value: ""
        }
    ];
    const navigati = useNavigation()

    const [inputs, setInputs] = useState(inputArr)

    const initValues = {
        amount: 0,
        name: '',
        details: [],
        expride_date: '',
    }
    const schema = yup.object().shape({
        amount: yup.string()
            .required("Nominal Uang Keluar tidak boleh kosong"),
        name: yup.string()
            .required("Deskripsi tidak boleh kosong"),
        // details: yup.string()
        //     .required("Deskripsi tidak boleh kosong"),
        expride_date: yup.string()
            .required("Tgl Masuk tidak boleh kosong"),
    })

    const doRegis = async (data) => {

        try {
            const user_id = await AsyncStorage.getItem('user_id')
            const body = {
                name: data.name,
                amount: amount,
                expride_date: data.expride_date,
                user_id: JSON.parse(user_id),
                details: data.details.map(item => {
                    return {
                        name: item
                    }
                })
            }
            console.log(body)
            await budget(body)
                .then(() => {
                    Alert.alert(
                        'Konfirmasi',
                        'Data Berhasil Disimpan',
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

    const onLoginPress = () => {
        navigati.navigate('LoginScreen')
    }
    const anggaran = () => {
        navigati.goBack()
    }

    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);

    const [openn, setOpenn] = useState(false)
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Pear', value: 'pear' },
    ]);

    const [date, setDate] = useState(new Date())
    const [isDateOpen, setIsDateOpen] = useState(false)
    const [amount, setAmount] = useState(null)

    const addInput = () => {
        setInputs(val => {
            return [
                ...val,
                {
                    type: "text",
                    value: ""
                }
            ]
        })
    }


    return (
        <View style={styles.bg}>
            <Navbar
                title="Tambah Anggaran"
                hasicon={false}
                onPress={(anggaran)}

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
                                <View style={styles.scrol}>
                                    <ScrollView>
                                        <View style={styles.col}>
                                            <Text style={styles.inputp}>Jumlah Tabungan:</Text>
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
                                                    <Text style={{ color: 'red' }}>{errors.amount}</Text>
                                                    :
                                                    null
                                            }
                                        </View>
                                        <View style={styles.col}>
                                            <Text style={styles.inputp}>Nama Anggaran:</Text>
                                            <TextInput
                                                style={styles.inputtbg}
                                                onChangeText={handleChange('name')}
                                                value={values.name}
                                                placeholder='masukan nominal'
                                                placeholderTextColor={'gray'}
                                            />
                                            {
                                                errors.name && touched.name ?
                                                    <Text style={{ color: 'red' }}>{errors.name}</Text>
                                                    :
                                                    null
                                            }
                                        </View>
                                        <View style={styles.col}>
                                            <Text style={styles.inputp}>Jenis Anggaran:</Text>
                                            {
                                                inputs.map((item, index) => (
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <TextInput
                                                            placeholder='Tambah Jenis Anggaran'
                                                            onChangeText={handleChange(`details[${index}]`)}
                                                            value={values.details[index]}
                                                            style={styles.inputt}
                                                            placeholderTextColor={'gray'}
                                                        />
                                                        {
                                                            index == 0
                                                                ? <Icon
                                                                    name='plus'
                                                                    type='material-community'
                                                                    size={24}
                                                                    onPress={addInput}
                                                                    style={{ marginLeft: 24 }}
                                                                />
                                                                : <></>
                                                        }
                                                    </View>
                                                ))
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
                                                    setFieldValue("expride_date", moment(date).format("YYYY-MM-DD"))
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
                                    </ScrollView>
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
export default TambahAnggaran;

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#6AA84F',
    },
    scrol: {
        height: 570,
    },
    col: {
        margin: 2,
    },
    col11: {
        flexDirection: 'row'
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
        paddingTop: 100
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
        margin: 10,
        padding: 8,
        marginLeft: 7,
        width: 200,
        color: 'black'
    },
    inputt: {
        borderWidth: 1,
        margin: 10,
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
    inputtbgg: {
        borderWidth: 1,
        padding: 8,
        marginRight: 7,
        width: 300,
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
        marginLeft: 4,
        alignSelf: 'center',
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

