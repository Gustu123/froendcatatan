import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Button, View, TouchableOpacity, Text, Dimensions, useWindowDimensions, TextInput, FlatList, ScrollView, Image } from 'react-native';
import { Icon } from "@rneui/themed";
import DatePicker from "react-native-date-picker";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation } from "@react-navigation/native"
import Navbar from "../components/Navbar"
import moment from "moment";
import { allbudget } from "../services/anggaran";

const dummyData = [
  {
    name: 'Tabungan 1',
    budget: 10000,
    pemakaian: -120000,
    date: '10/10/2023',
    sisa: '20%',
    uang: 20000,
    Image: '../assets/img/logo.png',
  },
  {
    name: 'Tabungan 1',
    budget: 10000,
    pemakaian: -120000,
    date: '10/10/2023',
    sisa: '20%',
    uang: 20000,
    Image: '../assets/img/logo.png',
  },
  {
    name: 'Tabungan 1',
    budget: 10000,
    pemakaian: -120000,
    date: '10/10/2023',
    sisa: '20%',
    uang: 20000,
    Image: '../assets/img/logo.png',
  },
  {
    name: 'Tabungan 1',
    budget: 10000,
    pemakaian: -120000,
    date: '10/10/2023',
    sisa: '20%',
    uang: 20000,
    Image: '../assets/img/logo.png',
  },
  {
    name: 'Tabungan 1',
    budget: 10000,
    pemakaian: -120000,
    date: '10/10/2023',
    sisa: '20%',
    uang: 20000,
    Image: '../assets/img/logo.png',
  },
  {
    name: 'Tabungan 1',
    budget: 10000,
    pemakaian: -120000,
    date: '10/10/2023',
    sisa: '20%',
    uang: 20000,
    Image: '../assets/img/logo.png',
  },
  {
    name: 'Tabungan 1',
    budget: 10000,
    pemakaian: -120000,
    date: '10/10/2023',
    sisa: '20%',
    uang: 20000,
    Image: '../assets/img/logo.png',
  },
  {
    name: 'Tabungan 1',
    budget: 10000,
    pemakaian: -120000,
    date: '10/10/2023',
    sisa: '20%',
    uang: 20000,
    Image: '../assets/img/logo.png',
  },
]
//const modalizeRef = useRef(null)
//const showBs = () => {
//   modalizeRef.current?.open()
//    }

const FirstRoute = (props) => {

  const { data } = props
  const onClickButton = () => {
    alert('Mohon Hubungi Pemilik Dengan Mengirim Pesan Lewat BUKUKASGUS@gmail.com!!');

  };

  const navigati = useNavigation()
  const navigateDetail = (id) =>{
    navigati.navigate("Deskripsianggaran",{id})
}
  const tambah = () => {
    navigati.navigate('TambahAnggaran')
  }
  const edit = () => {
    navigati.navigate('TambahAnggaran')
  }
  const hapus = () => {
    navigati.navigate('TambahAnggaran')
  }

  return (
    <View style={styles.home}>
      <View >
        <Text style={{ color: 'black', fontSize: 16 }}>
          Total: {data.totalbudget}
        </Text>
      </View>
      <View style={styles.scrol}>
        <ScrollView>
          <FlatList
            data={data.budgets}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={()=>navigateDetail(item.id)} style={{ borderWidth: 2, borderColor: 'black', backgroundColor: 'white', marginVertical: 5, paddingHorizontal: 10, paddingVertical: 9, paddingTop: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 3 }}>
                  <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View>
                      <Image
                        source={{ uri: "" }}
                        style={{ width: 40, height: 40, }}
                      />
                    </View>
                    <View style={{ marginLeft: 3 }}>
                      <Text style={{ color: 'black', fontSize: 16 }}>
                        {item.name}
                      </Text>
                      <Text style={{ color: 'black', fontSize: 16 }}>
                        Budget: Rp. {item.amount}
                      </Text>
                      <Text style={{ color: 'black', fontSize: 16 }}>
                        Rp. {""}
                      </Text>
                      <TouchableOpacity
                        onPress={() => onClickButton()}
                        style={{ flexDirection: 'row', }}
                      >
                        <Icon
                          name='left'
                          type='antdesign'
                          size={20}
                          color='black'
                        />
                        <Text style={{ color: 'black' }}>Button</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <Text style={{ color: 'black', fontSize: 16 }}>
                      {""}
                    </Text>
                    <Text style={{ color: 'black', fontSize: 16, marginTop: 30 }}>
                      Rp.
                      {""}
                    </Text>
                    <Text style={{ color: 'black', fontSize: 16 }}>
                      {item.expride_date}
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
      </View>
      <View style={styles.fixToText1}>
        <TouchableOpacity
          onPress={tambah}
          style={styles.upload}
        >
          <Text style={styles.uploadtext}>Tambah</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={hapus}
          style={styles.upload}
        >
          <Text style={styles.uploadtext}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View >
  )
};

const SecondRoute = (props) => {

  const { data } = props
  const onClickButton = () => {
    alert('Mohon Hubungi Pemilik Dengan Mengirim Pesan Lewat BUKUKASGUS@gmail.com!!');

  };

  const navigati = useNavigation()
  const navigateDetail = (id) =>{
      navigati.navigate("Deskripsianggaran",{id})
  }
  const tambah = () => {
    navigati.navigate('TambahAnggaran')
  }
  const edit = () => {
    navigati.navigate('TambahAnggaran')
  }
  const hapus = () => {
    navigati.navigate('TambahAnggaran')
  }

  return (
    <View style={styles.home}>
      <View >
        <Text style={{ color: 'black', fontSize: 16 }}>
          Total: {data.totalbudget}
        </Text>
      </View>
      <View style={styles.scrol}>
        <ScrollView>
          <FlatList
            data={data.budgets}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={()=>navigateDetail(item.id)} style={{ borderWidth: 2, borderColor: 'black', backgroundColor: 'white', marginVertical: 5, paddingHorizontal: 10, paddingVertical: 9, paddingTop: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 3 }}>
                  <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View>
                      <Image
                        source={{ uri: "" }}
                        style={{ width: 40, height: 40, }}
                      />
                    </View>
                    <View style={{ marginLeft: 3 }}>
                      <Text style={{ color: 'black', fontSize: 16 }}>
                        {item.name}
                      </Text>
                      <Text style={{ color: 'black', fontSize: 16 }}>
                        Budget: Rp. {item.amount}
                      </Text>
                      <Text style={{ color: 'black', fontSize: 16 }}>
                        Rp. {""}
                      </Text>
                      <TouchableOpacity
                        onPress={() => onClickButton()}
                        style={{ flexDirection: 'row', }}
                      >
                        <Icon
                          name='left'
                          type='antdesign'
                          size={20}
                          color='black'
                        />
                        <Text style={{ color: 'black' }}>Button</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <Text style={{ color: 'black', fontSize: 16 }}>
                      {""}
                    </Text>
                    <Text style={{ color: 'black', fontSize: 16, marginTop: 30 }}>
                      Rp.
                      {""}
                    </Text>
                    <Text style={{ color: 'black', fontSize: 16 }}>
                      {item.expride_date}
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
      </View>
      <View style={styles.fixToText1}>
        <TouchableOpacity
          onPress={tambah}
          style={styles.upload}
        >
          <Text style={styles.uploadtext}>Tambah</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={hapus}
          style={styles.upload}
        >
          <Text style={styles.uploadtext}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View >
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
const Anggaran = () => {
  const layout = useWindowDimensions()

  const [date, setDate] = useState(new Date())
  const [isDateOpen, setIsDateOpen] = useState(false)
  const [search, setSearch] = useState("")

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'BULANAN' },
    { key: 'second', title: 'TAHUNAN' },
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
  useEffect(() => {
    allBudget()
  }, [index, date])

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
        navigationState={{ index, routes }}
        renderScene={({ route }) => {
          switch (route.key) {
            case "first":
              return <FirstRoute data={budgets} />;
            case "second":
              return <SecondRoute data={budgets} />;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
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
    height: 610,
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
  upload: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    margin: 10,
    alignItems: 'center',
    width: 180,
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20
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