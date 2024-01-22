import React, { useState,useEffect, useCallback  } from "react";
import { FlatList, StyleSheet, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import Navbar from "../components/Navbar";
import { allwallet } from "../services/tabungan";

const Tabungan = ( props ) => { 

    const { data } = props 
    const navigati = useNavigation()
    const onLoginPress = () => {
        navigati.navigate('LoginScreen')
    }
    const onTambah = () => {
        navigati.navigate('TambahTabungan')
    }
    const Edit = () => {
        navigati.navigate('TambahTabungan')
    }

    const onRegisterPress = () => {
        navigati.navigate('RegisterScreen')
    }
    // const dummyData = [
    //     {
    //         name: 'Tabungan 1',
    //         balance: 10000,
    //         date: '10/10/2023'
    //     },
    //     {
    //         name: 'Tabungan 2',
    //         balance: 10000,
    //         date: '10/10/2023'
    //     },
    //     {
    //         name: 'Tabungan 3',
    //         balance: 10000,
    //         date: '10/10/2023'
    //     },
    //     {
    //         name: 'Tabungan 1',
    //         balance: 10000,
    //         date: '10/10/2023'
    //     },
    //     {
    //         name: 'Tabungan 2',
    //         balance: 10000,
    //         date: '10/10/2023'
    //     },
    //     {
    //         name: 'Tabungan 3',
    //         balance: 10000,
    //         date: '10/10/2023'
    //     },
    //     {
    //         name: 'Tabungan 1',
    //         balance: 10000,
    //         date: '10/10/2023'
    //     },
    //     {
    //         name: 'Tabungan 2',
    //         balance: 10000,
    //         date: '10/10/2023'
    //     },
    //     {
    //         name: 'Tabungan 3',
    //         balance: 10000,
    //         date: '10/10/2023'
    //     },
    //     {
    //         name: 'Tabungan 3',
    //         balance: 10000,
    //         date: '10/10/2023'
    //     },
    //     {
    //         name: 'Tabungan 1',
    //         balance: 10000,
    //         date: '10/10/2023'
    //     },
    //     {
    //         name: 'Tabungan 2',
    //         balance: 10000,
    //         date: '10/10/2023'
    //     },
    //     {
    //         name: 'Tabungan 3',
    //         balance: 10000,
    //         date: '10/10/2023'
    //     },
    //     {
    //         name: 'Tabungan 3',
    //         balance: 10000,
    //         date: '10/10/2023'
    //     },
    //     {
    //         name: 'Tabungan 1',
    //         balance: 10000,
    //         date: '10/10/2023'
    //     },
    //     {
    //         name: 'Tabungan 2',
    //         balance: 10000,
    //         date: '10/10/2023'
    //     },
    //     {
    //         name: 'Tabungan 3',
    //         balance: 10000,
    //         date: '10/10/2023'
    //     },

    // ]

    const [index, setIndex] = React.useState(0);
    
    const [wallets, setWallets] = useState([])
    const allWallet = async () => {
        const wallets = await allwallet()
        setWallets(wallets.wallets)
    }

    const navigateDetail = (id) =>{
        navigati.navigate("Deskripsitabungan",{id})
    }

    // useEffect(() => {
    //     allWallet()
    // }, [index])

    useFocusEffect(
        useCallback(()=>{
            allWallet()
        },[index])
    )

    return (
        <View style={styles.home}>
            <Navbar
                title="Tabungan"
                hasicon={true}
            />
            <View style={styles.scrol}>
                <ScrollView>
                    <FlatList
                        data={wallets}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={()=>navigateDetail(item.id)} style={{ borderWidth: 2, borderColor: 'black', backgroundColor: 'white', marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: 'white', marginVertical: 4, paddingHorizontal: 10, paddingVertical: 5 }}>
                                        <Text style={{ color: 'black', fontSize: 16 }}>
                                            {item.name}
                                        </Text>
                                        <Text style={{ color: 'black', fontSize: 16 }}>
                                            Rp. {item.total_amount}
                                        </Text>
                                        <Text style={{ color: 'black', fontSize: 16 }}>
                                            {""}
                                        </Text>
                                    </View>

                                </TouchableOpacity>
                            )
                        }}
                        ListEmptyComponent={() => (
                            <Text style={{ color: 'black' }}>Maff Data sedang di proses</Text>
                        )}
                    />
                </ScrollView>
                <View style={styles.fixToText1}>
                    <TouchableOpacity
                        onPress={onTambah}
                        style={styles.upload}
                    >
                        <Text style={styles.uploadtext}>Tambah</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={Edit}
                        style={styles.upload}
                    >
                        <Text style={styles.uploadtext}>Hapus</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

export default Tabungan

const styles = StyleSheet.create({
    home: {
        flex: 1,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        color: 'white'
    },
    scrol: {
        flex: 1
    },
    fixToText1: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'white'
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        borderWidth: 1,
        padding: 8,
        color: 'black'
    },
    inputp: {
        paddingTop: 10,
        padding: 8,
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
})