import React, { useState, useCallback } from 'react';
import { View, useWindowDimensions, Button, Text, StyleSheet, Dimensions, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { useRoute } from '@react-navigation/native';
import { Icon } from "@rneui/themed";
import { lineData, pieData, pieData2 } from '../data/dummy_data/Data';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Navbar from "../components/Navbar";
import { allanggaran, allbudget } from "../services/anggaran";
import { alldashboard } from '../services/dashboard';

const SecondRoute = (props) => {
  const { data } = props
  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 1, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0,
    useShadowColorFromDataset: false
  }
  const screenWidth = Dimensions.get('window').width

  return (
    <View style={{ flex: 1, backgroundColor: ' white', marginTop: 20 }}>
      <LineChart
        data={lineData}
        width={screenWidth}
        height={300}
        chartConfig={chartConfig}
      />
    </View>
  )
};

const FirstRoute = (props) => {
  const { data } = props

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  }
  const screenWidth = Dimensions.get('window').width

  const persentase = [
    {
      name: "Uang Masuk",
      population: data?.persentaseIn ?? 0,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Uang Keluar",
      population: data?.persentaseOut ?? 0,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
  },
  ]

  return (
    <View style={{ flex: 1, backgroundColor: ' white' }}>
      <PieChart
        data={persentase}
        width={screenWidth}
        height={300}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"white"}
        paddingLeft={"15"}
      />

    </View>
  )

};

const renderScene = SceneMap({
  first: SecondRoute,
  second: FirstRoute,
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

const Dashboard = (props) => {

  const { data } = props
  const { initialIndex } = useRoute()
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Diagram' },
    { key: 'second', title: 'Char Bar' },
  ]);

  const [date, setDate] = React.useState(new Date())
  const [isDateOpen, setIsDateOpen] = React.useState(false)

  React.useEffect(() => {
    setIndex(initialIndex)
  }, [initialIndex])

  const navigati = useNavigation()


  const Laporan = () => {
    navigati.navigate('Laporan')
  }
  const [budgets, setBudgets] = useState([])
  const allBudget = async () => {
    const budgets = await allbudget()
    setBudgets(budgets)
  }

  const [dashboards, setDashboards] = useState({})
  const allDashboard = async () => {
    const dashboards = await alldashboard()
    setDashboards(dashboards)
  }

  useFocusEffect(
    useCallback(() => {
      allBudget()
      allDashboard()
    }, [index])
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.bg}>
        <Navbar
          title="Dashboard"
          hasicon={false}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#6AA84F'
          }}
        >
        </View>
        <View style={styles.container}>
          <View style={styles.col1}>
            <Text style={styles.judul}>Selamat datang pada Aplikasi Catatanku</Text>
          </View>
        </View>
      </View>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={({ route }) => {
          switch (route.key) {
            case "first":
              return <FirstRoute data={dashboards} />;
            case "second":
              return <SecondRoute data={dashboards} />;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      <View style={{ backgroundColor: '#f9f6f2', flex: 1 }}>
        <View style={{ height: 250, backgroundColor: '#fffff', borderWidth: 2, marginTop: 15, borderColor: 'black', }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5, }}>
            <Text style={{ color: 'black', fontSize: 16, fontFamily: 'times new roman' }}>
              Data Anggaran
            </Text>
            <Text style={{ color: 'black', fontSize: 16, fontFamily: 'times new roman' }}>
              Total: Rp.{budgets.totalbudget}
            </Text>
          </View>
          <ScrollView>
            <FlatList
              data={budgets.budgets}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ borderWidth: 2, borderColor: 'black', backgroundColor: 'white', marginVertical: 5, paddingHorizontal: 10, paddingVertical: 9, paddingTop: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 3 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View>
                        <Image
                          source={item.Image}
                          style={{ width: 40, height: 40, }}
                        />
                      </View>
                      <View>
                        <Text style={{ color: 'black', fontSize: 16, fontFamily: 'times new roman' }}>
                          {item.name}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={{ color: 'black', fontSize: 16, fontFamily: 'times new roman' }}>
                        Rp.
                        {item.amount}
                      </Text>
                    </View>
                  </View>
                )
              }}
              ListEmptyComponent={() => (
                <Text style={{ color: 'black', fontFamily: 'times new roman' }}>Kosong Bos</Text>
              )}
            />
          </ScrollView>
        </View>
        <View>
          <Text style={{ color: 'black', fontSize: 16, margin: 2, fontFamily: 'times new roman' }}>Silahkan Downdload Laporan:</Text>
          <TouchableOpacity
            onPress={Laporan}
            style={styles.upload}
          >
            <Text style={styles.uploadtext}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  judul: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
  bg: {
    height: 100,
    backgroundColor: '#69a84f',
  },
  container: {
    marginHorizontal: 16,
  },
  col1: {
    paddingTop: 2,
  },
  upload: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    margin: 2,
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

export default Dashboard
