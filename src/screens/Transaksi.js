import React, {useState, useRef, useEffect, useCallback} from "react";
import {
    StyleSheet,
    Button,
    View,
    TouchableOpacity,
    Text,
    useWindowDimensions,
    Dimensions,
    TextInput,
    FlatList,
    ScrollView,
    Image
} from 'react-native';
import {Icon} from "@rneui/themed";
import DatePicker from "react-native-date-picker";
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Modalize} from "react-native-modalize";
import moment from "moment";
import Navbar from "../components/Navbar"
import {useFocusEffect, useNavigation} from "@react-navigation/native"
import {alltransaction, transaction} from "../services/transaksi";

const FirstRoute = (props) => {

    const {data} = props
    const modalizeRef = useRef(null)
    const showBs = () => {
        modalizeRef.current?.open()
    }

    const hideBs = () => {
        modalizeRef.current?.close()
    }

    const navigati = useNavigation()
    const navigateDetail = (id) => {
        navigati.navigate("Deskripsitransaksi", {id})
    }
    const keluar = () => {
        navigati.navigate('UangKeluar')
    }
    const masuk = () => {
        navigati.navigate('UangMasuk')
    }
    const onClickButton = () => {
        alert('Mohon Hubungi Pemilik Dengan Mengirim Pesan Lewat BUKUKASGUS@gmail.com!!');
    };

    return (
        <View style={styles.home}>
            <View>
                <Text style={{color: 'black', fontSize: 16}}>
                    Total Pemasukan: Rp.{data.totalCashIn}
                </Text>
                <Text style={{color: 'black', fontSize: 16}}>
                    Total Pengeluaran: Rp.{data.totalCashOut}
                </Text>
            </View>
            <View style={{flex: 1}}>
                <ScrollView>
                    <FlatList
                        data={data.transactions}
                        scrollEnabled={false}
                        keyExtractor={(item, index) => index}
                        renderItem={({item, index}) => {
                            return (
                                <TouchableOpacity onPress={() => navigateDetail(item.id)} style={{
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
                                    margin: 2,
                                }}>
                                    <View style={{flexDirection: 'row',}}>
                                        {/* <View>
                                            <Image
                                                source={item.Image}
                                                style={{width: 40, height: 40,}}
                                            />
                                        </View> */}
                                        <View style={{marginLeft: 3}}>
                                            <Text style={{color: 'black', fontSize: 16}}>
                                                {item.name}
                                            </Text>
                                            <Text style={{color: 'black', fontSize: 16}}>
                                                {item.deskripsi}
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{color: 'black', fontSize: 16}}>
                                        {item.cash_out ?? '-'}Rp. {item.amount}
                                        </Text>
                                        <Text style={{color: 'black', fontSize: 16}}>
                                            {item.created_at}
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
                <TouchableOpacity
                    style={styles.fab}
                    onPress={showBs}
                >
                    <Icon
                        name="plus"
                        type="material-community"
                        size={32}
                        color={'white'}
                    />
                </TouchableOpacity>
            </View>

            <Modalize
                ref={modalizeRef}
                adjustToContentHeight
            >
                <View style={styles.fixToText1}>
                    <Text style={styles.uploadtext}>Silahkan Masukan Data Uang:</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={keluar}
                            style={styles.upload}
                        >
                            <Text style={styles.uploadtext}>Uang Keluar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={masuk}
                            style={styles.upload}
                        >
                            <Text style={styles.uploadtext}>Uang Masuk</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modalize>
        </View>
    )
};

const SecondRoute = (props) => {

    const {data} = props
    const modalizeRef = useRef(null)
    const showBs = () => {
        modalizeRef.current?.open()
    }

    const hideBs = () => {
        modalizeRef.current?.close()
    }

    const navigati = useNavigation()
    const navigateDetail = (id) => {
        navigati.navigate("Deskripsitransaksi", {id})
    }
    const keluar = () => {
        navigati.navigate('UangKeluar')
    }
    const masuk = () => {
        navigati.navigate('UangMasuk')
    }
    const onClickButton = () => {
        alert('Mohon Hubungi Pemilik Dengan Mengirim Pesan Lewat BUKUKASGUS@gmail.com!!');
    };

    return (
        <View style={styles.home}>
            <View>
                <Text style={{color: 'black', fontSize: 16}}>
                    Total Pemasukan: Rp.{data.totalCashIn}
                </Text>
                <Text style={{color: 'black', fontSize: 16}}>
                    Total Pengeluaran: Rp.{data.totalCashOut}
                </Text>
            </View>
            <View style={{flex: 1}}>
                {/* <ScrollView> */}
                <FlatList
                    data={data.transactions}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => {
                        return (
                            <TouchableOpacity onPress={() => navigateDetail(item.id)} style={{
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
                                margin: 2,
                            }}>
                                <View style={{flexDirection: 'row',}}>
                                    {/* <View>
                                        <Image
                                            source={item.Image}
                                            style={{width: 40, height: 40,}}
                                        />
                                    </View> */}
                                    <View style={{marginLeft: 3}}>
                                        <Text style={{color: 'black', fontSize: 16}}>
                                            {item.name}
                                        </Text>
                                        <Text style={{color: 'black', fontSize: 16}}>
                                            {item.deskripsi}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{color: 'black', fontSize: 16}}>
                                        Rp. {item.amount}
                                    </Text>
                                    <Text style={{color: 'black', fontSize: 16}}>
                                        {moment(item.created_at).format("YYYY-MM-DD")}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    ListEmptyComponent={() => (
                        <Text style={{color: 'black'}}>Maff Data sedang di proses</Text>
                    )}
                />
                {/* </ScrollView> */}
            </View>
            <TouchableOpacity
                style={styles.fab}
                onPress={showBs}
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
                <View style={styles.fixToText1}>
                    <Text style={styles.uploadtext}>Silahkan Masukan Data Uang:</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={keluar}
                            style={styles.upload}
                        >
                            <Text style={styles.uploadtext}>Uang Keluar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={masuk}
                            style={styles.upload}
                        >
                            <Text style={styles.uploadtext}>Uang Masuk</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modalize>
        </View>
    )
}

const renderTabBar = (props) => {
    return (
        <TabBar
            {...props}
            style={{backgroundColor: '#6AA84F'}}
            renderLabel={({route, focused, color}) => (
                <View style={[styles.tabbar, {backgroundColor: focused ? 'yellow' : 'gray'}]}>
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

const Transaksi = () => {
    const layout = useWindowDimensions()

    const [date, setDate] = useState(new Date())
    const [isDateOpen, setIsDateOpen] = useState(false)
    const [search, setSearch] = useState("")

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'HARIAN'},
        {key: 'second', title: 'BULANAN'},
    ]);

    const [transactions, setTransactions] = useState([])
    const allTransaction = async () => {
        const params = (index == 0)
            ? {
                day: date.getDate(),
                search: search
            }
            : {
                month: date.getMonth() + 1,
                search: search
            }
        const budgets = await alltransaction(params)

        setTransactions(budgets)
        console.log(date.getMonth(), date.getDate())
    }

    useFocusEffect(
        useCallback(() => {
            allTransaction()
        }, [index, date])
    )

    return (
        <View style={styles.bg}>
            <Navbar
                title="Transaksi"
                hasicon={true}
                search={search}
                onSearchChange={(value) => setSearch(value)}
                onSearchSubmit={() => {
                    allTransaction()
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
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{index, routes}}
                renderScene={({route}) => {
                    switch (route.key) {
                        case "first":
                            return <FirstRoute data={transactions}/>;
                        case "second":
                            return <SecondRoute data={transactions}/>;
                    }
                }}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
            />
        </View>
    )
};

export default Transaksi;

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
        paddingTop: 10,

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
    home: {
        flex: 1,
        backgroundColor: '#eeeee4',
        paddingTop: 3,
    },
    scrol: {
        height: 710,
    },
    fixToText1: {
        flexDirection: 'col',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    fixToText11: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: -130,
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
        width: 150,
        marginVertical: 8
    },
    uploadtext: {
        justifyContent: 'center',
        color: 'black',
    },
});
