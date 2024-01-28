import React, { useState, useRef, useEffect, useCallback } from "react";
import {
    StyleSheet,
    Button,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    useWindowDimensions,
    TextInput,
    FlatList,
    ScrollView,
    Image, ToastAndroid
} from 'react-native';
import { Icon } from "@rneui/themed";
import DatePicker from "react-native-date-picker";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Modalize } from "react-native-modalize";
import Navbar from "../components/Navbar"
import moment from "moment";
import { alldebt, deleteDebt } from "../services/utang";

const FirstRoute = (props) => {
    const { data, refresh } = props
    const modalizeRef = useRef(null)
    const selectedIdRef = useRef(0)
    const showBs = () => {
        modalizeRef.current?.open()
    }

    const hideBs = () => {
        modalizeRef.current?.close()
    }

    const onClickButton = () => {
        alert('Mohon Hubungi Pemilik Dengan Mengirim Pesan Lewat BUKUKASGUS@gmail.com!!');
    };


    const navigati = useNavigation()
    const tambah = () => {
        navigati.navigate('TambahUtang')
    }

    const navigateDetail = () => {
        navigati.navigate("Deskripsiutang", {
            id: selectedIdRef.current
        })
    }

    const doDelete = () => {
        deleteDebt(selectedIdRef.current)
            .then(() => {
                ToastAndroid.show("Berhasil hapus data", 1000)
                hideBs()
                refresh()
            })
    }

    return (
        <View style={styles.home}>
            <View>
                <Text style={{ color: 'black', fontSize: 16 }}>
                    Total: Rp.{data?.totalDebts?.toLocaleString()}
                </Text>
            </View>
            <View style={styles.scrol}>
                <ScrollView>
                    <FlatList
                        data={data.debt}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        showBs()
                                        selectedIdRef.current = item.id
                                    }}
                                    style={{
                                        borderWidth: 2,
                                        borderColor: 'black',
                                        backgroundColor: 'white',
                                        marginVertical: 5,
                                        paddingHorizontal: 10,
                                        paddingVertical: 9,
                                        paddingTop: 2,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        margin: 3
                                    }}>
                                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                        <View style={{ marginLeft: 3 }}>
                                            <Text style={{ color: 'black', fontSize: 16 }}>
                                                {item.name}
                                            </Text>
                                            <Text style={{ color: 'black', fontSize: 16 }}>
                                                {""}
                                            </Text>
                                            <Text style={{ color: 'black', fontSize: 16, marginTop: -25 }}>
                                                Rp. {item?.amount?.toLocaleString()}
                                            </Text>
                                            <Text style={{ color: 'black', fontSize: 16 }}>
                                                {item.due_date}
                                            </Text>
                                        </View>
                                    </View>
                                    {/* <View>

                                    </View> */}
                                </TouchableOpacity>
                            )
                        }}
                        ListEmptyComponent={() => (
                            <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>Maff Data Kosong</Text>
                        )}
                    />
                </ScrollView>
            </View>
            <TouchableOpacity
                style={styles.fab}
                onPress={tambah}
            >
                <Icon
                    name="plus"
                    type="material-community"
                    size={32}
                    color={'white'}
                />
            </TouchableOpacity>

            <Modalize
                ref={modalizeRef}
                adjustToContentHeight
            >
                <View style={{ padding: 16 }}>
                    <Text style={{ color: 'black' }}>Pilih Aksi:</Text>
                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        <TouchableOpacity
                            onPress={navigateDetail}
                            style={styles.upload}
                        >
                            <Text style={{ color: 'black' }}>Detail</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={doDelete}
                            style={styles.upload}
                        >
                            <Text style={{ color: 'black' }}>Hapus</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modalize>
        </View>
    )
};

const SecondRoute = (props) => {

    const { data, refresh } = props
    const modalizeRef = useRef(null)
    const selectedIdRef = useRef(0)
    const showBs = () => {
        modalizeRef.current?.open()
    }

    const hideBs = () => {
        modalizeRef.current?.close()
    }

    const onClickButton = () => {
        alert('Mohon Hubungi Pemilik Dengan Mengirim Pesan Lewat BUKUKASGUS@gmail.com!!');
    };

    const navigati = useNavigation()
    const tambah = () => {
        navigati.navigate('TambahUtang')
    }

    const navigateDetail = () => {
        navigati.navigate("Deskripsiutang", {
            id: selectedIdRef.current
        })
    }

    const doDelete = () => {
        deleteDebt(selectedIdRef.current)
            .then(() => {
                ToastAndroid.show("Berhasil hapus data", 1000)
                hideBs()
                refresh()
            })
    }

    return (
        <View style={styles.home}>
            <View>
                <Text style={{ color: 'black', fontSize: 16 }}>
                    Total: Rp.{data?.totalDebts?.toLocaleString()}
                </Text>
            </View>
            <View style={styles.scrol}>
                <ScrollView>
                    <FlatList
                        data={data.debt}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        showBs()
                                        selectedIdRef.current = item.id
                                    }}
                                    style={{
                                        borderWidth: 2,
                                        borderColor: 'black',
                                        backgroundColor: 'white',
                                        marginVertical: 5,
                                        paddingHorizontal: 10,
                                        paddingVertical: 9,
                                        paddingTop: 2,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        margin: 3
                                    }}>
                                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                        <View style={{ marginLeft: 3 }}>
                                            <Text style={{ color: 'black', fontSize: 16 }}>
                                                {item.name}
                                            </Text>
                                            <Text style={{ color: 'black', fontSize: 16 }}>
                                                {""}
                                            </Text>
                                            <Text style={{ color: 'black', fontSize: 16, marginTop: -25 }}>
                                                Rp. {item?.amount?.toLocaleString()}
                                            </Text>
                                            <Text style={{ color: 'black', fontSize: 16 }}>
                                                {item.due_date}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        ListEmptyComponent={() => (
                            <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>Maff Data Kosong</Text>
                        )}
                    />
                </ScrollView>
            </View>
            <TouchableOpacity
                style={styles.fab}
                onPress={tambah}
            >
                <Icon
                    name="plus"
                    type="material-community"
                    size={32}
                    color={'white'}
                />
            </TouchableOpacity>

            <Modalize
                ref={modalizeRef}
                adjustToContentHeight
            >
                <View style={{ padding: 16 }}>
                    <Text style={{ color: 'black' }}>Pilih Aksi:</Text>
                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        <TouchableOpacity
                            onPress={navigateDetail}
                            style={styles.upload}
                        >
                            <Text style={{ color: 'black' }}>Detail</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={doDelete}
                            style={styles.upload}
                        >
                            <Text style={{ color: 'black' }}>Hapus</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modalize>
        </View>
    )
};

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

const Utang = () => {
    const layout = useWindowDimensions()

    const [date, setDate] = useState(new Date())
    const [isDateOpen, setIsDateOpen] = useState(false)
    const [search, setSearch] = useState("")

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'BULANAN' },
        { key: 'second', title: 'TAHUNAN' },
    ]);

    const [debts, setDebts] = useState([])
    const allDebt = async () => {
        const params = (index == 0)
            ? {
                month: date.getMonth() + 1,
                search: search
            }
            : {
                year: date.getFullYear(),
                search: search
            }
        const debts = await alldebt(params)

        setDebts(debts)
        console.log(date.getFullYear(), date.getMonth())
    }

    useFocusEffect(
        useCallback(() => {
            allDebt()
        }, [index, date])
    )

    return (
        <View style={styles.bg}>
            <Navbar
                title="Utang"
                hasicon={true}
                search={search}
                onSearchChange={(value) => setSearch(value)}
                onSearchSubmit={() => {
                    allDebt()
                }}
            />
            <View style={styles.container}>
                <View style={styles.col1}>
                    <DatePicker
                        modal
                        open={isDateOpen}
                        date={date}
                        mode={"date"}
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
                            Style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={({ route }) => {
                    switch (route.key) {
                        case "first":
                            return <FirstRoute
                                data={debts}
                                refresh={() => {
                                    allDebt()
                                }} />;
                        case "second":
                            return <SecondRoute
                                data={debts}
                                refresh={() => {
                                    allDebt()
                                }} />;
                    }
                }}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    )
};

export default Utang;

const styles = StyleSheet.create({
    fab: {
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute',
        bottom: 16,
        right: 16,
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green'
    },
    bg: {
        flex: 1,
        height: 150,
        backgroundColor: '#6AA84F',
    },
    container: {
        marginHorizontal: 16,
    },
    col1: {
        paddingTop: 20,
    },
    col11: {
        flexDirection: 'row',
        justifyContent: 'space-arround'
    },
    coldate: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        color: 'white'
    },
    icon: {
        alignSelf: 'center',
    },
    inputdate: {
        borderWidth: 3,
        padding: 3,
        marginRight: 9,
        alignSelf: 'center',
        width: 85,
        color: 'black'
    },
    fixToText: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    home: {
        flex: 1,
        backgroundColor: '#cccccc',
        paddingTop: 3,
    },
    icon: {
        position: 'absolute',
        right: 20
    },
    fab: {
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute',
        bottom: 16,
        right: 16,
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green'
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        color: 'white'
    },
    scrol: {
        height: 700,
    },
    fixToText1: {
        flexDirection: 'col',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
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
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
    },
    uploadtextt: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
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
});
