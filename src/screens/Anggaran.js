import React, {useState, useRef, useEffect, useCallback} from "react";
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
import {Icon} from "@rneui/themed";
import DatePicker from "react-native-date-picker";
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useFocusEffect, useNavigation} from "@react-navigation/native"
import Navbar from "../components/Navbar"
import moment from "moment";
import {allbudget, deleteBudget} from "../services/anggaran";
import {Modalize} from "react-native-modalize";
import {deleteDebt} from "../services/utang";

const FirstRoute = (props) => {
    const {data, onDelete} = props
    const modalizeRef = useRef(null)
    const selectedIdRef = useRef(0)
    const onClickButton = () => {
        alert('Mohon Hubungi Pemilik Dengan Mengirim Pesan Lewat BUKUKASGUS@gmail.com!!');

    };

    const navigati = useNavigation()
    const navigateDetail = () => {
        navigati.navigate("Deskripsianggaran", {
            id: selectedIdRef.current
        })
    }

    const doDelete = () => {
        onDelete(selectedIdRef.current)
        modalizeRef.current?.close()
    };

    return (
        <View style={styles.home}>
            <View>
                <Text style={{color: 'black', fontSize: 16}}>
                    Total: Rp.{data?.totalbudget?.toLocaleString()}
                </Text>
            </View>
            <View style={styles.scrol}>
                <ScrollView>
                    <FlatList
                        data={data.budgets}
                        keyExtractor={(item, index) => index}
                        renderItem={({item, index}) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        modalizeRef.current?.open()
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
                                    <View style={{flexDirection: 'row'}}>
                                        {/* <View>
                                            <Image
                                                source={{uri: ""}}
                                                style={{width: 40, height: 40,}}
                                            />
                                        </View> */}
                                        <View style={{marginLeft: 3}}>
                                            <Text style={{color: 'black', fontSize: 16}}>
                                                {item.name}
                                            </Text>
                                            <Text style={{color: 'black', fontSize: 16}}>
                                                Budget: Rp. {item?.amount?.toLocaleString()}
                                            </Text>
                                            {/* <Text style={{color: 'black', fontSize: 16}}>
                                                Rp. {""}
                                            </Text> */}
                                        </View>
                                    </View>
                                    <View>
                                        {/* <Text style={{color: 'black', fontSize: 16}}>
                                            {""}
                                        </Text>
                                        <Text style={{color: 'black', fontSize: 16, marginTop: 30}}>
                                            Rp.
                                            {""}
                                        </Text> */}
                                        <Text style={{color: 'black', fontSize: 16, marginTop: 50}}>
                                            {item.expride_date}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        ListEmptyComponent={() => (
                            <Text style={{color: 'black', fontSize: 20, textAlign: 'center'}}>Maff Data Kosong</Text>
                        )}
                    />
                </ScrollView>
            </View>
            {/*<View style={styles.fixToText1}>*/}
            {/*    <TouchableOpacity*/}
            {/*        onPress={tambah}*/}
            {/*        style={styles.upload}*/}
            {/*    >*/}
            {/*        <Text style={styles.uploadtext}>Tambah</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*    <TouchableOpacity*/}
            {/*        onPress={hapus}*/}
            {/*        style={styles.upload}*/}
            {/*    >*/}
            {/*        <Text style={styles.uploadtext}>Hapus</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
            <Modalize
                ref={modalizeRef}
                adjustToContentHeight
            >
                <View style={{padding: 16}}>
                    <Text style={{color: 'black'}}>Pilih Aksi:</Text>
                    <View style={{flexDirection: 'row', marginTop: 8}}>
                        <TouchableOpacity
                            onPress={navigateDetail}
                            style={styles.upload}
                        >
                            <Text style={{color: 'black'}}>Detail</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={doDelete}
                            style={styles.upload}
                        >
                            <Text style={{color: 'black'}}>Hapus</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modalize>
        </View>
    )
};

const SecondRoute = (props) => {
    const {data, onDelete} = props
    const modalizeRef = useRef(null)
    const selectedIdRef = useRef(0)
    const onClickButton = () => {
        alert('Mohon Hubungi Pemilik Dengan Mengirim Pesan Lewat BUKUKASGUS@gmail.com!!');

    };

    const navigati = useNavigation()
    const navigateDetail = () => {
        navigati.navigate("Deskripsianggaran", {
            id: selectedIdRef.current
        })
    }

    const doDelete = () => {
        onDelete(selectedIdRef.current)
        modalizeRef.current?.close()
    };

    return (
        <View style={styles.home}>
            <View>
                <Text style={{color: 'black', fontSize: 16}}>
                    Total: Rp.{data?.totalbudget?.toLocaleString()}
                </Text>
            </View>
            <View style={styles.scrol}>
                <ScrollView>
                    <FlatList
                        data={data.budgets}
                        keyExtractor={(item, index) => index}
                        renderItem={({item, index}) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        modalizeRef.current?.open()
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
                                    <View style={{flexDirection: 'row',}}>
                                        {/* <View>
                                            <Image
                                                source={{uri: ""}}
                                                style={{width: 40, height: 40,}}
                                            />
                                        </View> */}
                                        <View style={{marginLeft: 3}}>
                                            <Text style={{color: 'black', fontSize: 16}}>
                                                {item.name}
                                            </Text>
                                            <Text style={{color: 'black', fontSize: 16}}>
                                                Budget: Rp. {item?.amount?.toLocaleString()}
                                            </Text>
                                            {/* <Text style={{color: 'black', fontSize: 16}}>
                                                Rp. {""}
                                            </Text> */}
                                        </View>
                                    </View>
                                    <View>
                                        {/* <Text style={{color: 'black', fontSize: 16}}>
                                            {""}
                                        </Text>
                                        <Text style={{color: 'black', fontSize: 16, marginTop: 30}}>
                                            Rp.
                                            {""}
                                        </Text> */}
                                        <Text style={{color: 'black', fontSize: 16, marginTop: 50}}>
                                            {item.expride_date}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        ListEmptyComponent={() => (
                            <Text style={{color: 'black', fontSize: 20, textAlign: 'center'}}>Maff Data Kosong</Text>
                        )}
                    />
                </ScrollView>
            </View>
            {/*<View style={styles.fixToText1}>*/}
            {/*    <TouchableOpacity*/}
            {/*        onPress={tambah}*/}
            {/*        style={styles.upload}*/}
            {/*    >*/}
            {/*        <Text style={styles.uploadtext}>Tambah</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*    <TouchableOpacity*/}
            {/*        onPress={hapus}*/}
            {/*        style={styles.upload}*/}
            {/*    >*/}
            {/*        <Text style={styles.uploadtext}>Hapus</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
            <Modalize
                ref={modalizeRef}
                adjustToContentHeight
            >
                <View style={{padding: 16}}>
                    <Text style={{color: 'black'}}>Pilih Aksi:</Text>
                    <View style={{flexDirection: 'row', marginTop: 8}}>
                        <TouchableOpacity
                            onPress={navigateDetail}
                            style={styles.upload}
                        >
                            <Text style={{color: 'black'}}>Detail</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={doDelete}
                            style={styles.upload}
                        >
                            <Text style={{color: 'black'}}>Hapus</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modalize>
        </View>
    )
};

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
const Anggaran = () => {
    const layout = useWindowDimensions()
    const nav = useNavigation()

    const [date, setDate] = useState(new Date())
    const [isDateOpen, setIsDateOpen] = useState(false)
    const [search, setSearch] = useState("")

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'BULANAN'},
        {key: 'second', title: 'TAHUNAN'},
    ]);

    const [budgets, setBudgets] = useState([])
    const allBudget = async () => {
        const params = (index == 0)
            ? {
                month: date.getMonth() + 1,
                search: search
            }
            : {
                year: date.getFullYear(),
                search: search
            }
        const budgets = await allbudget(params)

        setBudgets(budgets)
        console.log(date.getFullYear(), date.getMonth())
    }

    const tambah = () => {
        nav.navigate('TambahAnggaran')
    }

    const doDelete = (id) => {
        deleteBudget(id)
            .then(() => {
                ToastAndroid.show("Berhasil hapus data", 1000)
                allBudget()
            })
    }

    useFocusEffect(
        useCallback(() => {
            allBudget()
        }, [index, date])
    )

    return (
        <View style={styles.bg}>
            <Navbar
                title="Anggaran"
                hasicon={true}
                search={search}
                onSearchChange={(value) => setSearch(value)}
                onSearchSubmit={() => {
                    allBudget()
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
                navigationState={{index, routes}}
                renderScene={({route}) => {
                    switch (route.key) {
                        case "first":
                            return <FirstRoute
                                data={budgets}
                                onDelete={(id) => {
                                    doDelete(id)
                                }}
                            />;
                        case "second":
                            return <SecondRoute
                                data={budgets}
                                onDelete={(id) => {
                                    doDelete(id)
                                }}
                            />
                    }
                }}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
            />
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
        </View>
    )
};

export default Anggaran;

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
        // height: 610,
        flex: 1,
        backgroundColor: '#cccccc',
        paddingTop: 3,
    },
    scrol: {
        height: 580,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        color: 'white'
    },

    fixToText1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
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
    // upload: {
    //     paddingHorizontal: 16,
    //     justifyContent: 'center',
    //     margin: 10,
    //     alignItems: 'center',
    //     width: 180,
    //     backgroundColor: '#3498db',
    //     paddingVertical: 10,
    //     paddingHorizontal: 15,
    //     borderRadius: 20
    // },
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
