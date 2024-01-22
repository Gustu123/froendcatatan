import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, useWindowDimensions, Dimensions, ScrollView } from 'react-native';
import CustomButton from "../components/CustomButtom";
import * as yup from 'yup'
import { Formik } from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';
import Navbar from "../components/Navbarr"
import { transaction } from "../services/transaksi";
import { allwallet, wallet } from "../services/tabungan";
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UangMasuk = () => {

    const initValues = {
        amount: 0,
        name: '',
        deskripsi: '',
        user_id: 0,
        wallet_id: 0,
        purpose: 'null',
        cashOut: 0,
        purposeId: 0,

    }

    const schema = yup.object().shape({
        amount: yup.string()
            .required("Nominal Uang Keluar tidak boleh kosong"),
        deskripsi: yup.string()
            .required("Deskripsi tidak boleh kosong"),
        name: yup.string()
            .required("Name tidak boleh kosong"),
    })

    const navigati = useNavigation()
    const onSubmit = async (data) => {
        try {
            const user_id = await AsyncStorage.getItem('user_id')
            const body = {
                amount: amounts,
                name: data.name,
                deskripsi: data.deskripsi,
                wallet_id: data.wallet_id,
                purpose: data.purpose,
                cashOut: data.cashOut,
                purposeId: data.purposeId,
                user_id: JSON.parse(user_id),
                receipt:""
            }
            await transaction(body)
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
    const onLoginPress = () => {
        navigati.goBack()
    }

    const [amounts, setAmount] = useState(null)

    const [wallets, setWallets] = useState([])
    const [opentabungan, setOpenTabungan] = useState(false)
    const [wallet, setWallet] = useState(null)

    const allWallet = async () => {
        let datawallet = [{
            label: "",
            value: ""
        }]
        const wallets = await allwallet()

        wallets.wallets.forEach((item) => {
            datawallet = [
                ...datawallet,
                {
                    label: item.name,
                    value: item.id
                }
            ]
        });
        setWallets(datawallet)
    }
    useEffect(() => {
        allWallet()
    }, [])

    return (
        <View style={styles.bg}>
            <Navbar
                title="Transaksi"
                hasicon={false}
            />
            <View style={styles.container}>
                <View style={styles.col1}>
                    <Text style={styles.title}>
                        Silahkan Masukan Pemasukan
                    </Text>
                    <Text style={styles.title}>
                        Total: {amounts}
                    </Text>
                </View>
            </View>
            <Formik
                initialValues={initValues}
                validationSchema={schema}
                onSubmit={onSubmit}
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
                            <ScrollView>
                                <View style={{ flex: 1 }}>
                                    <View style={styles.col}>
                                        <Text style={styles.inputp}>Nilai Uang Masuk:</Text>
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
                                        <Text style={styles.inputp}>Name:</Text>
                                        <TextInput
                                            style={styles.inputt}
                                            onChangeText={handleChange('name')}
                                            value={values.uangkeluar}
                                            placeholder='masukan nama uang keluar'
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
                                        <Text style={styles.inputp}>Tabungan:</Text>
                                        <DropDownPicker
                                            open={opentabungan}
                                            value={wallet}
                                            items={wallets}
                                            setOpen={setOpenTabungan}
                                            setValue={setWallet}
                                            setItems={setWallets}
                                            onChangeValue={(value) => {
                                                setFieldValue("wallet_id", value)
                                            }}
                                            style={styles.input33}
                                        />
                                    </View>
                                    <View style={styles.col}>
                                        <Text style={styles.inputp}>Deskripsi:</Text>
                                        <TextInput
                                            style={styles.inputdeskripsi}
                                            onChangeText={handleChange('deskripsi')}
                                            value={values.deskripsi}
                                            placeholder='masukan deskripsi'
                                            placeholderTextColor={'gray'}
                                            numberOfLines={4}
                                            maxLength={40}
                                        />
                                        {
                                            errors.deskripsi && touched.deskripsi ?
                                                <Text style={{ color: 'red' }}>{errors.deskripsi}</Text>
                                                :
                                                null
                                        }
                                    </View>
                                </View>
                            </ScrollView>
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


    )
}
export default UangMasuk;

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        height: 150,

    },
    tabbar: {
        width: Dimensions.get('window').width / 2.5,
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 32,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
    },
    tabtitle: {
        color: 'black',
        fontSize: 16
    },
    col: {
        margin: 2,
        flex: 1
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
    },
    fixToText2: {
        flexDirection: 'col',
        justifyContent: 'flex-start',
    },
    colt: {
        flexDirection: 'row',
        justifyContent: 'space-arround'
    },
    colt1: {
        flexDirection: 'row',
    },
    container: {
        backgroundColor: '#6AA84F',
    },
    colmd: {
        flexDirection: 'row',
    },
    colmdd: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    colmd1: {
        flexDirection: 'row',
        marginLeft: -3,
    },
    coldate: {
        flexDirection: 'row',
    },
    label: {
        color: 'black',
        alignSelf: 'center',
        marginLeft: -20
    },
    col1: {
        paddingTop: 5,
    },
    col2: {
        flexDirection: 'row',
        margin: 2,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        color: 'white'
    },
    inputp: {
        color: 'black',
        marginLeft: 9,
        paddingTop: 10,
    },
    inputpp: {
        color: 'black',
        marginLeft: 9,
    },
    inputppp: {
        color: 'black',
        marginLeft: 170,
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
    inputt: {
        borderWidth: 1,
        padding: 8,
        marginLeft: 7,
        color: 'black',
        width: 390
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
        width: 170,
        marginLeft: 7,
        color: 'black'
    },
    input33: {
        width: 200,
        marginLeft: 7,
        color: 'black'
    },
    inputt3: {
        width: 170,
        marginLeft: 50,
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

