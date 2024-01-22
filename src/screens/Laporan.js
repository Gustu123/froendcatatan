import { CheckBox, Icon } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import Navbar from "../components/Navbar"

const Laporan = () => {

    const [isChecked, setIsChecked] = useState(0)
    const [openn, setOpenn] = useState(false)
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Pear', value: 'pear' },
    ]);

    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                <View style={{ marginTop: 5 }}>
                    <Text style={styles.text}>Nama User Name:</Text>
                    <Text style={styles.textt}>Ida Bagus Putu Suartha Wibawa</Text>
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
                        placeholder={'Laporan Keuangan'}
                    >
                    </DropDownPicker>
                </View>
            </View>
            <View style={{ marginTop: 5 }}>
                <Text style={styles.text}>Format Laporan:</Text>
            </View>
            <View style={styles.laporan}>
                <CheckBox
                    size={24}
                    checkedColor={'red'}
                    checked={isChecked == 1}
                    onPress={() => setIsChecked(1)}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon={'circle-o'}
                />
                <Text style={styles.text1}>PDF</Text>
                <CheckBox
                    size={24}
                    checkedColor={'red'}
                    checked={isChecked == 2}
                    onPress={() => setIsChecked(2)}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon={'circle-o'}
                />
                <Text style={styles.text1}>EXCEL</Text>
            </View>
            <View style={styles.tombol}>
                <TouchableOpacity
                    onPress={() => onClickButton()}
                    style={styles.upload}
                >
                    <Text style={styles.uploadtext}>Upload</Text>
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