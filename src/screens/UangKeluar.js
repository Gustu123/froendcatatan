import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, useWindowDimensions, Dimensions, ScrollView } from 'react-native';
import CustomButton from "../components/CustomButtom";
import moment from "moment";
import DatePicker from "react-native-date-picker";
import { Modalize } from "react-native-modalize";
import { CheckBox, Icon } from "@rneui/themed";
import * as yup from 'yup'
import { Formik } from 'formik';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import DropDownPicker from 'react-native-dropdown-picker';
import Navbar from "../components/Navbarr";
import { transaction } from "../services/transaksi";
import { allwallet, wallet } from "../services/tabungan";
import { allbudget } from '../services/anggaran';
import { alldebt } from '../services/utang';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';



const UangKeluar = () => {
    const initValues = {
        amount: 0,
        name: '',
        deskripsi: '',
        wallet_id: 0,
        purpose: '',
        cashOut: 1,
        purposeId: 0,
    }
    const modalizeRef = useRef(null)
    const showBs = () => {
        modalizeRef.current?.open()
    }

    const hideBs = () => {
        modalizeRef.current?.close()
    }
    const keluar = () => {
        navigati.navigate('UangKeluar')
    }
    const masuk = () => {
        navigati.navigate('UangMasuk')
    }




    const allBudget = async () => {
        let databudget = [{
            label: "",
            value: ""
        }]
        const budgets = await allbudget()

        budgets.budgets.forEach((item) => {
            databudget = [
                ...databudget,
                {
                    label: item.name,
                    value: item.id
                }
            ]
        });
        setBudgets(databudget)
        setTujuans(budgets.budgets)
    }
    const allDebt = async () => {
        let datadebt = [{
            label: "",
            value: ""
        }]
        const debts = await alldebt()

        debts.debt.forEach((item) => {
            datadebt = [
                ...datadebt,
                {
                    label: item.name,
                    value: item.id
                }
            ]
        });
        setDebts(datadebt)
    }
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
        allBudget()
        allDebt()
    }, [])


    const setAnggaranItem = () => {
        const detail = tujuans.find(it => it.id == budget)?.details

        let dataanggaran = [{
            label: "",
            value: ""
        }]

        detail?.forEach(item => {
            dataanggaran = [
                ...dataanggaran,
                {
                    label: item.name,
                    value: item.id
                }
            ]
        })
        setBudgetDetails(dataanggaran)
    }
    console.log(budget)

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
                receipt: imagePicked
            }
            const form = new FormData()
            form.append('amount', amounts)
            form.append('name', data.name)
            form.append('deskripsi', data.deskripsi)
            form.append('wallet_id', data.wallet_id)
            form.append('purpose', data.purpose)
            form.append('cashOut', data.cashOut)
            form.append('purposeId', data.purposeId)
            form.append('user_id', JSON.parse(user_id))
            form.append('receipt', imagePicked)

            await transaction(form)
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

    const [imagePicked, setImagePicked] = useState("")
    const [isChecked, setIsChecked] = useState(0)
    const [budgets, setBudgets] = useState([])
    const [tujuans, setTujuans] = useState([])
    const [budgetdetails, setBudgetDetails] = useState([])
    const [debts, setDebts] = useState([])
    const [wallets, setWallets] = useState([])

    const [opentujuan, setOpenTujuan] = useState(false)
    const [openjenis, setOpenJenis] = useState(false)
    const [opentabungan, setOpenTabungan] = useState(false)
    const [openutang, setOpenUtang] = useState(false)
    const [amounts, setAmount] = useState(null)

    const [budget, setBudget] = useState(null)
    const [budgetdetail, setBudgetDetail] = useState(null)
    const [debt, setDebt] = useState(null)
    const [wallet, setWallet] = useState(null)
    // const [value, setValue] = useState(null);
    // const [items, setItems] = useState([
    //     { label: 'Apple', value: 'apple' },
    //     { label: 'Banana', value: 'banana' },
    //     { label: 'Pear', value: 'pear' },
    // ]);

    const openCameraPicker = async () => {
        const result = await launchCamera({
            quality: 0.2,
            includeBase64: true,
            mediaType: "photo",
        })
        const img  ={
            uri: result.assets[0].uri,
            type:  'image/jpg',
            name: 'image.jpg'
        }
        setImagePicked(img)
    }
    const openGalleryPicker = async () => {
        const result = await launchImageLibrary({
            quality: 0.2,
            includeBase64: true,
            mediaType: "photo",
        })
        const img  ={
            uri: result.assets[0].uri,
            type:  'image/jpg',
            name: 'image.jpg'
        }
        setImagePicked(img)
    }
    return (
        <View style={styles.bg}>
            <Navbar
                title="Transaksi"
                hasicon={false}
            />
            <View style={styles.container}>
                <View style={styles.col1}>
                    <Text style={styles.title}>
                        Silahkan Masukan Pengeluaran
                    </Text>
                    <Text style={styles.title}>
                        Total: {amounts}
                    </Text>
                </View>
            </View>
            <View style={{ backgroundColor: 'white', flex: 1 }}>

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
                                            <Text style={styles.inputp}>Nilai Uang Keluar</Text>
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
                                                value={values.name}
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
                                        <View style={styles.colt}>
                                            <Text style={styles.inputp}>Tujuan Uang Keluar:</Text>
                                        </View>
                                        <View style={styles.colmd}>
                                            <View style={styles.colmd1}>
                                                <CheckBox
                                                    size={24}
                                                    checkedColor={'red'}
                                                    checked={isChecked == 1}
                                                    onPress={() => {
                                                        setIsChecked(1)
                                                        setFieldValue("purpose", null)
                                                    }}
                                                    checkedIcon='dot-circle-o'
                                                    uncheckedIcon={'circle-o'}
                                                />
                                                <Text style={styles.label}>
                                                    Tidak Ada
                                                </Text>
                                                <CheckBox
                                                    size={24}
                                                    checkedColor={'red'}
                                                    checked={isChecked == 2}
                                                    onPress={() => {
                                                        setIsChecked(2)
                                                        setFieldValue("purpose", "budget")
                                                    }}
                                                    checkedIcon='dot-circle-o'
                                                    uncheckedIcon={'circle-o'}
                                                />
                                                <Text style={styles.label}>
                                                    Anggaran
                                                </Text>
                                                <CheckBox
                                                    size={24}
                                                    checkedColor={'red'}
                                                    checked={isChecked == 3}
                                                    onPress={() => {
                                                        setIsChecked(3)
                                                        setFieldValue("purpose", "debt")
                                                    }}
                                                    checkedIcon='dot-circle-o'
                                                    uncheckedIcon={'circle-o'}
                                                />
                                                <Text style={styles.label}>
                                                    Hutang
                                                </Text>
                                            </View>
                                        </View>

                                        {
                                            isChecked == 2
                                                ? <View>
                                                    <View style={styles.colt1}>
                                                        <Text style={styles.inputpp}>Tujuan:</Text>
                                                        <Text style={styles.inputppp}>Jenis Anggaran:</Text>
                                                    </View>
                                                    <View style={styles.colmdd}>
                                                        <View>
                                                            <DropDownPicker
                                                                open={opentujuan}
                                                                value={budget}
                                                                items={budgets}
                                                                setOpen={setOpenTujuan}
                                                                setValue={setBudget}
                                                                setItems={setBudgets}
                                                                onChangeValue={(value) => {
                                                                    setAnggaranItem()
                                                                }}
                                                                style={styles.input3}
                                                            />
                                                        </View>
                                                        <View>
                                                            <DropDownPicker
                                                                open={openjenis}
                                                                value={budgetdetail}
                                                                items={budgetdetails}
                                                                setOpen={setOpenJenis}
                                                                setValue={setBudgetDetail}
                                                                setItems={setBudgetDetails}
                                                                onChangeValue={(value) => {
                                                                    setFieldValue("purposeId", value)
                                                                }}
                                                                style={styles.inputt3}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                                : isChecked == 3
                                                    ? <View>
                                                        <View style={styles.colt1}>
                                                            <Text style={styles.inputpp}>Hutang:</Text>
                                                        </View>
                                                        <View style={styles.colmdd}>
                                                            <View>
                                                                <DropDownPicker
                                                                    open={openutang}
                                                                    value={debt}
                                                                    items={debts}
                                                                    setOpen={setOpenUtang}
                                                                    setValue={setDebt}
                                                                    setItems={setDebts}
                                                                    onChangeValue={(value) => {
                                                                        setFieldValue("purposeId", value)
                                                                    }}
                                                                    style={styles.input3}
                                                                />
                                                            </View>
                                                        </View>
                                                    </View>
                                                    : <></>
                                        }

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
                                    <View style={styles.fixToText2}>
                                        <Text style={styles.inputp}>
                                            Bukti Pengeluaran:
                                        </Text>
                                        <TouchableOpacity
                                            onPress={showBs}
                                            style={styles.upload}
                                        >
                                            <Text style={styles.uploadtext}>Upload</Text>
                                        </TouchableOpacity>
                                        <Modalize
                                            ref={modalizeRef}
                                            adjustToContentHeight
                                        >
                                            <View style={styles.fixToText1}>
                                                <Text style={styles.uploadtext}>Silahkan Buka Kamer:</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableOpacity
                                                        onPress={openGalleryPicker}
                                                        style={styles.upload}
                                                    >
                                                        <Text style={styles.uploadtext}>Galeri</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={openCameraPicker}
                                                        style={styles.upload}
                                                    >
                                                        <Text style={styles.uploadtext}>Kamera</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </Modalize>
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
        justifyContent: 'space-arround',
    },
    colt1: {
        flexDirection: 'row',
    },
    container: {
        marginHorizontal: 16,
    },
    colmd: {
        flexDirection: 'row',
        flex: 1
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

