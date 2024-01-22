import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, useWindowDimensions, Dimensions, ScrollView } from 'react-native';
import CustomButton from "../components/CustomButtom";
import moment from "moment";
import DatePicker from "react-native-date-picker";
import { CheckBox, Icon } from "@rneui/themed";
import * as yup from 'yup'
import { Formik } from 'formik';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import DropDownPicker from 'react-native-dropdown-picker';
import Navbar from "../components/Navbarr";
import { allwallet, wallet } from "../services/tabungan";


const FirstRoute = () => {
    const initValues = {
        uangkeluar: '',
        deskripsi: '',
    }

    const [wallets, setWallets] = useState([])
    const allWallet = async () => {
        let datawallet = [{
            label:"",
            value:""
        }]
        const wallets = await   allwallet()
        
        wallets.forEach((item) => {
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

    const schema = yup.object().shape({
        uangkeluar: yup.string()
            .required("Nominal Uang Keluar tidak boleh kosong"),
        deskripsi: yup.string()
            .required("Deskripsi tidak boleh kosong"),
        tglmsk: yup.string()
            .required("Tgl Masuk tidak boleh kosong"),
    })

    const onSubmit = () => {
        navigati.navigate('UangKeluar')
    }
    const onLoginPress = () => {
        navigati.goBack()
    }

    const [isChecked, setIsChecked] = useState(0)

    const [openn, setOpenn] = useState(false)
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Pear', value: 'pear' },
    ]);

    const [date, setDate] = useState(new Date())
    const [isDateOpen, setIsDateOpen] = useState(false)
    return (
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
                                            onChangeText={handleChange('uangkeluar')}
                                            value={values.uangkeluar}
                                            placeholder='masukan nominal'
                                            placeholderTextColor={'gray'}
                                            keyboardType="numeric"
                                        />
                                        {
                                            errors.uangkeluar && touched.uangkeluar ?
                                                <Text style={{ color: 'red' }}>{errors.uangkeluar}</Text>
                                                :
                                                null
                                        }
                                    </View>
                                    <View style={styles.col}>
                                        <Text style={styles.inputp}>Name:</Text>
                                        <TextInput
                                            style={styles.inputt}
                                            onChangeText={handleChange('uangkeluar')}
                                            value={values.uangkeluar}
                                            placeholder='masukan nama uang keluar'
                                            placeholderTextColor={'gray'}
                                        />
                                        {
                                            errors.uangkeluar && touched.uangkeluar ?
                                                <Text style={{ color: 'red' }}>{errors.uangkeluar}</Text>
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
                                                onPress={() => setIsChecked(1)}
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
                                                onPress={() => setIsChecked(2)}
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
                                                onPress={() => setIsChecked(3)}
                                                checkedIcon='dot-circle-o'
                                                uncheckedIcon={'circle-o'}
                                            />
                                            <Text style={styles.label}>
                                                Hutang
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.colt1}>
                                        <Text style={styles.inputpp}>Tujuan:</Text>
                                        <Text style={styles.inputppp}>Jenis Anggaran:</Text>
                                    </View>
                                    <View style={styles.colmdd}>
                                        <View>
                                            <DropDownPicker
                                                open={openn}
                                                value={value}
                                                items={items}
                                                setOpen={setOpenn}
                                                setValue={setValue}
                                                setItems={setItems}
                                                placeholder={'Choose a fruit.'}
                                                style={styles.input3}
                                            />
                                        </View>
                                        <View>
                                            <DropDownPicker
                                                open={openn}
                                                value={value}
                                                items={items}
                                                setOpen={setOpenn}
                                                setValue={setValue}
                                                setItems={setItems}
                                                placeholder={'Choose a fruit.'}
                                                style={styles.inputt3}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.col}>
                                        <Text style={styles.inputp}>Tabungan:</Text>
                                        <DropDownPicker
                                            open={openn}
                                            value={value}
                                            items={wallets}
                                            setOpen={setOpenn}
                                            setValue={setValue}
                                            setItems={setItems}
                                            placeholder={'Choose a fruit.'}
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
};

const SecondRoute = () => {
    const initValues = {
        uangkeluar: '',
        deskripsi: '',
    }
    const schema = yup.object().shape({
        uangkeluar: yup.string()
            .required("Nominal Uang Keluar tidak boleh kosong"),
        deskripsi: yup.string()
            .required("Deskripsi tidak boleh kosong"),
        tglmsk: yup.string()
            .required("Tgl Masuk tidak boleh kosong"),
    })

    const onSubmit = () => {
        navigati.navigate('UangKeluar')
    }
    const onLoginPress = () => {
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
    return (
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
                                            onChangeText={handleChange('uangkeluar')}
                                            value={values.uangkeluar}
                                            placeholder='masukan nominal'
                                            placeholderTextColor={'gray'}
                                            keyboardType="numeric"
                                        />
                                        {
                                            errors.uangkeluar && touched.uangkeluar ?
                                                <Text style={{ color: 'red' }}>{errors.uangkeluar}</Text>
                                                :
                                                null
                                        }
                                    </View>
                                    <View style={styles.col}>
                                        <Text style={styles.inputp}>Name:</Text>
                                        <TextInput
                                            style={styles.inputt}
                                            onChangeText={handleChange('uangkeluar')}
                                            value={values.uangkeluar}
                                            placeholder='masukan nama uang keluar'
                                            placeholderTextColor={'gray'}
                                        />
                                        {
                                            errors.uangkeluar && touched.uangkeluar ?
                                                <Text style={{ color: 'red' }}>{errors.uangkeluar}</Text>
                                                :
                                                null
                                        }
                                    </View>
                                    <View style={styles.col}>
                                        <Text style={styles.inputp}>Tabungan:</Text>
                                        <DropDownPicker
                                            open={openn}
                                            value={value}
                                            items={items}
                                            setOpen={setOpenn}
                                            setValue={setValue}
                                            setItems={setItems}
                                            placeholder={'Choose a fruit.'}
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
                                    <View style={styles.fixToText2}>
                                        <Text style={styles.inputp}>
                                            Bukti Pengeluaran:
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => onClickButton()}
                                            style={styles.upload}
                                        >
                                            <Text style={styles.uploadtext}>Upload</Text>
                                        </TouchableOpacity>
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

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute
})
const renderTabBar = (props) => {
    return (
        <TabBar
            {...props}
            style={{ backgroundColor: '#6AA84F' }}
            renderLabel={({ route, focused, color }) => (
                <View style={[styles.tabbar, { backgroundColor: focused ? 'yellow' : 'gray' }]}>
                    <Text style={styles.tabtitle}>
                        {route.title}
                    </Text>
                </View>
            )}
            renderIndicator={(props) => {
                <></>
            }}
        />
    )
}
const UangKeluar = () => {
    const layout = useWindowDimensions()

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Uang Keluar' },
        { key: 'second', title: 'Uang Masuk' },
    ]);

    return (
        <View style={styles.bg}>
            <Navbar
                title="Transaksi"
                hasicon={false}
            />
            <View style={styles.container}>
                <View style={styles.col1}>
                    <Text style={styles.title}>
                        Total:
                    </Text>
                </View>
            </View>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
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
        marginHorizontal: 16,
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

