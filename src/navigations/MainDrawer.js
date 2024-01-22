import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/Dashboard';
import Tabungan from '../screens/Tabungan';
import Transaksi from '../screens/Transaksi';
import Akun from '../screens/Akun';
import Laporan from '../screens/Laporan';
import Anggaran from '../screens/Anggaran';
import Utang from '../screens/Utang';

const Drawer = createDrawerNavigator()

const MainDrawer = () => {
    return(
        <Drawer.Navigator initialRouteName='Dashboard'
        screenOptions={{headerShown: false}}>
            <Drawer.Screen
                name='Dashboard'
                component={Dashboard}
                options={{
                    drawerLabel: 'Dashboard'
                }}
            />
            <Drawer.Screen
                name='Tabungan'
                component={Tabungan}
                options={{
                    drawerLabel: 'Tabungan'
                }}
            />
            <Drawer.Screen
                name='Transaksi'
                component={Transaksi}
                options={{
                    drawerLabel: 'Transaksi'
                }}
            />
            <Drawer.Screen
                name='Akun'
                component={Akun}
                options={{
                    drawerLabel: 'Akun'
                }}
            />
            <Drawer.Screen
                name='Laporan'
                component={Laporan}
                options={{
                    drawerLabel: 'Laporan'
                }}
            />
            <Drawer.Screen
                name='Anggaran'
                component={Anggaran}
                options={{
                    drawerLabel: 'Anggaran'
                }}
            />
            <Drawer.Screen
                name='Utang'
                component={Utang}
                options={{
                    drawerLabel: 'Utang'
                }}
            />
        </Drawer.Navigator>
    )
}
export default MainDrawer