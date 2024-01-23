import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import TopScreen from '../screens/TopScreen';
import LoginScreen from '../screens/LoginScreen';
import Lupapassword from '../screens/Lupapassword';
import RegisterScreen from '../screens/RegisterScreen';
import Dashboard from '../screens/Dashboard';
import Tabungan from '../screens/Tabungan';
import TambahTabungan from '../screens/TambahTabungan';
import Transaksi from '../screens/Transaksi';
import Deskripsitransaksi from '../screens/Deskripsitransaki';
import UangKeluar from '../screens/UangKeluar';
import UangMasuk from '../screens/UangMasuk';
import Akun from '../screens/Akun';
import Ubahpassword from '../screens/Ubahpassword';
import Laporan from '../screens/Laporan';
import Anggaran from '../screens/Anggaran';
import TambahAnggaran from '../screens/TambahAnggaran';
import Utang from '../screens/Utang';
import TambahUtang from '../screens/TambahUtang';
import MainDrawer from './MainDrawer';
import Navbar from '../components/Navbar';
import SplashScreen from '../screens/SplashScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch,useSelector } from "react-redux";
import { addToken } from '../redux/actions/authAction';
import Deskripsianggaran from '../screens/Deskripsianggaran';
import Deskripsitabungan from '../screens/Deskripsitabungan';
import Deskripsiutang from '../screens/Deskripsiutang';

const Stack = createStackNavigator();

const MainNavigation = () => {

    const dispatch = useDispatch()
    const accesToken = useSelector(state => state.authReducer.accesToken)

    const checkLoggedUser = async () => {
        const token = await AsyncStorage.getItem("token")

        if (token != "") {
            dispatch(addToken(token))
        }
    }

    // useEffect(() => {
    //     checkLoggedUser()
    // }, [])

    return (
        <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>

            {
                accesToken == ""
                    ? <>
                        <Stack.Screen name='SplashScreen' component={SplashScreen}></Stack.Screen>
                        <Stack.Screen name='TopScreen' component={TopScreen}></Stack.Screen>
                        <Stack.Screen name='LoginScreen' component={LoginScreen}></Stack.Screen>
                        <Stack.Screen name='Lupapassword' component={Lupapassword}></Stack.Screen>
                        <Stack.Screen name='RegisterScreen' component={RegisterScreen}></Stack.Screen>
                        <Stack.Screen name='ChangePassword' component={Ubahpassword}></Stack.Screen>
                    </>
                    : <>
                        <Stack.Screen name='Drawer' component={MainDrawer}></Stack.Screen>
                        <Stack.Screen name='Dashboard' component={Dashboard}></Stack.Screen>
                        <Stack.Screen name='Tabungan' component={Tabungan}></Stack.Screen>
                        <Stack.Screen name='Deskripsitabungan' component={Deskripsitabungan}></Stack.Screen>
                        <Stack.Screen name='TambahTabungan' component={TambahTabungan}></Stack.Screen>
                        <Stack.Screen name='Transaksi' component={Transaksi}></Stack.Screen>
                        <Stack.Screen name='Deskripsitransaksi' component={Deskripsitransaksi}></Stack.Screen>
                        <Stack.Screen name='UangKeluar' component={UangKeluar}></Stack.Screen>
                        <Stack.Screen name='UangMasuk' component={UangMasuk}></Stack.Screen>
                        <Stack.Screen name='Akun' component={Akun}></Stack.Screen>
                        <Stack.Screen name='Ubahpassword' component={Ubahpassword}></Stack.Screen>
                        <Stack.Screen name='Laporan' component={Laporan}></Stack.Screen>
                        <Stack.Screen name='Anggaran' component={Anggaran}></Stack.Screen>
                        <Stack.Screen name='Deskripsianggaran' component={Deskripsianggaran}></Stack.Screen>
                        <Stack.Screen name='TambahAnggaran' component={TambahAnggaran}></Stack.Screen>
                        <Stack.Screen name='Utang' component={Utang}></Stack.Screen>
                        <Stack.Screen name='Deskripsiutang' component={Deskripsiutang}></Stack.Screen>
                        <Stack.Screen name='TambahUtang' component={TambahUtang}></Stack.Screen>
                        <Stack.Screen name='Navbar' component={Navbar}></Stack.Screen>
                    </>
            }

        </Stack.Navigator>
    )
}
export default MainNavigation
