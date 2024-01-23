import {CheckBox, Icon} from "@rneui/themed";
import React, {useEffect, useState} from "react";
import {StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import Navbar from "../components/Navbar"
import {getUser} from "../services/user";
import {downloadExcel} from "../services/laporan";

const Laporan = () => {

    const [isChecked, setIsChecked] = useState(0)
    const [openn, setOpenn] = useState(false)
    const [value, setValue] = useState(1);
    const [items, setItems] = useState([
        {label: 'Laporan Uang Keluar', value: 1},
        {label: 'Laporan Uang Masuk', value: 0},
    ]);

    const [user, setUser] = useState({})

    const doDownload = async () => {
        if (isChecked == 0) {
            //download pdf

        } else {
            //download excel
            await downloadExcel()
                .then(()=>{
                    ToastAndroid.show("Berhasil download laporan", 1000)
                })
        }
    }

    const getUserData = async () => {
        try {
            const res = await getUser()
            setUser(res.user)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <Navbar
                title="Laporan"
                hasicon={false}
            />
            <View style={styles.container}>
                <View>
                    <Text style={styles.judul}>Data Laporan</Text>
                    <Icon
                        name="book"
                        type="antdesign"
                        size={300}
                        color={'black'}
                        style={styles.icon}
                    />
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styles.text}>Nama User Name:</Text>
                    <Text style={styles.textt}>{user.name}</Text>
                </View>
                <View style={styles.laporann}>
                    <Text style={styles.text}>Laporan:</Text>
                    <DropDownPicker
                        open={openn}
                        value={value}
                        items={items}
                        setOpen={setOpenn}
                        setValue={setValue}
                        setItems={setItems}
                        style={styles.input3}
                    >
                    </DropDownPicker>
                </View>
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.text}>Format Laporan:</Text>
            </View>
            <View style={styles.laporan}>
                <CheckBox
                    size={24}
                    checkedColor={'red'}
                    checked={isChecked == 0}
                    onPress={() => setIsChecked(0)}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon={'circle-o'}
                />
                <Text style={styles.text1}>PDF</Text>
                <CheckBox
                    size={24}
                    checkedColor={'red'}
                    checked={isChecked == 1}
                    onPress={() => setIsChecked(1)}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon={'circle-o'}
                />
                <Text style={styles.text1}>EXCEL</Text>
            </View>
            <View style={styles.tombol}>
                <TouchableOpacity
                    onPress={doDownload}
                    style={styles.upload}
                >
                    <Text style={styles.uploadtext}>Download</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Laporan

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
    },
    icon: {
        paddingsTop: 2,
        justifyContent: 'center',
    },
    judul: {
        textAlign: 'center',
        color: 'black',
        fontFamily: 'times new roman',
        fontSize: 40,
        marginTop: 50
    },
    text: {
        color: 'black',
        fontFamily: 'times new roman',
        fontSize: 30,
    },
    textt: {
        color: 'black',
        fontFamily: 'times new roman',
        fontSize: 20,
    },
    text1: {
        color: 'black',
        fontFamily: 'times new roman',
        alignSelf: 'center',
        fontSize: 20,
    },
    laporan: {
        flexDirection: 'row',
    },
    laporann: {
        flexDirection: 'row',
        paddingTop: 20
    },
    input3: {
        width: 260,
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
    tombol: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});
