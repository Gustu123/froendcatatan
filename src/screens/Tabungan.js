import React, {useState, useEffect, useCallback, useRef} from "react";
import {FlatList, StyleSheet, ScrollView, Text, View, TouchableOpacity, ToastAndroid} from "react-native";
import {useFocusEffect, useNavigation} from "@react-navigation/native"
import Navbar from "../components/Navbar";
import {allwallet, deleteWallet} from "../services/tabungan";
import {Modalize} from "react-native-modalize";

const Tabungan = (props) => {

    const {data} = props
    const navigati = useNavigation()

    const modalizeRef = useRef(null)
    const [index, setIndex] = React.useState(0);
    const [wallets, setWallets] = useState([])
    const [selectedId, setSelectedId] = useState(0)
    const allWallet = async () => {
        const wallets = await allwallet()
        setWallets(wallets.wallets)
    }

    const onTambah = () => {
        navigati.navigate('TambahTabungan')
    }
    const doDelete = () => {
        deleteWallet(selectedId)
            .then(() => {
                ToastAndroid.show("Berhasil hapus data", 1000)
                modalizeRef.current?.close()
                allWallet()
            })
    }

    const navigateDetail = () => {
        navigati.navigate("Deskripsitabungan", {
            id: selectedId
        })
    }

    useFocusEffect(
        useCallback(() => {
            allWallet()
        }, [])
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
                        renderItem={({item, index}) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedId(item.id)
                                        modalizeRef.current?.open()
                                    }}
                                    style={{
                                        borderWidth: 2,
                                        borderColor: 'black',
                                        backgroundColor: 'white',
                                        marginVertical: 5,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                    <View style={{
                                        backgroundColor: 'white',
                                        marginVertical: 4,
                                        paddingHorizontal: 10,
                                        paddingVertical: 5
                                    }}>
                                        <Text style={{color: 'black', fontSize: 16}}>
                                            {item.name}
                                        </Text>
                                        <Text style={{color: 'black', fontSize: 16}}>
                                            Rp. {item?.total_amount?.toLocaleString()}
                                        </Text>
                                        <Text style={{color: 'black', fontSize: 16}}>
                                            {""}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        ListEmptyComponent={() => (
                            <Text style={{color: 'black'}}>Maff Data sedang di proses</Text>
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
                    {/*<TouchableOpacity*/}
                    {/*    onPress={doDelete}*/}
                    {/*    style={styles.upload}*/}
                    {/*>*/}
                    {/*    <Text style={styles.uploadtext}>Hapus</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            </View>

            <Modalize
                ref={modalizeRef}
                adjustToContentHeight
            >
                <View style={{padding: 16}}>
                    <Text style={styles.uploadtext}>Pilih Aksi:</Text>
                    <View style={{flexDirection: 'row', marginTop: 8}}>
                        <TouchableOpacity
                            onPress={navigateDetail}
                            style={styles.upload}
                        >
                            <Text style={styles.uploadtext}>Detail</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={doDelete}
                            style={styles.upload}
                        >
                            <Text style={styles.uploadtext}>Hapus</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modalize>
        </View>
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
