import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Account,
  AccountEdit,

  APPLaporan,
  APPMasterData,
  APPProduksi,
  APPMasterDataProduk,
  APPMasterDataKaryawan,
  APPProduksiData,
  APPProduksiLine,
  AppLaporanKaryawan,
  APPLaporanProduksi,
  APPLaporanLine,
  Register1,
  Register2,
  Pengaturan,
  GetStarted,
  MasterKelas,
  MasterKursus,
  MasterInfo,
  Solat,
  SolatAdd,
  SolatData,
  Kursus,
  KursusAdd,
  KursusData,
  MasterUser,
  InfoDetail,
  HistoryDetail,
  MapData,

} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />



      <Stack.Screen name="APPLaporan" component={APPLaporan} options={{ headerShown: false }} />
      <Stack.Screen name="APPMasterData" component={APPMasterData} options={{ headerShown: false }} />
      <Stack.Screen name="APPProduksi" component={APPProduksi} options={{ headerShown: false }} />

      <Stack.Screen name="APPMasterDataProduk" component={APPMasterDataProduk} options={{ headerShown: false }} />
      <Stack.Screen name="APPMasterDataKaryawan" component={APPMasterDataKaryawan} options={{ headerShown: false }} />

      <Stack.Screen name="APPProduksiData" component={APPProduksiData} options={{ headerShown: false }} />
      <Stack.Screen name="APPProduksiLine" component={APPProduksiLine} options={{ headerShown: false }} />
      <Stack.Screen name="AppLaporanKaryawan" component={AppLaporanKaryawan} options={{ headerShown: false }} />
      <Stack.Screen name="APPLaporanProduksi" component={APPLaporanProduksi} options={{ headerShown: false }} />
      <Stack.Screen name="APPLaporanLine" component={APPLaporanLine} options={{ headerShown: false }} />

      <Stack.Screen name="Register1" component={Register1} options={{ headerShown: false }} />
      <Stack.Screen name="Register2" component={Register2} options={{ headerShown: false }} />
      <Stack.Screen name="Pengaturan" component={Pengaturan} options={{ headerShown: false }} />

      <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
      <Stack.Screen name="MasterKelas" component={MasterKelas} options={{ headerShown: false }} />
      <Stack.Screen name="MasterKursus" component={MasterKursus} options={{ headerShown: false }} />
      <Stack.Screen name="MasterInfo" component={MasterInfo} options={{ headerShown: false }} />

      <Stack.Screen name="Solat" component={Solat} options={{ headerShown: false }} />
      <Stack.Screen name="SolatAdd" component={SolatAdd} options={{ headerShown: false }} />
      <Stack.Screen name="SolatData" component={SolatData} options={{ headerShown: false }} />

      <Stack.Screen name="Kursus" component={Kursus} options={{ headerShown: false }} />
      <Stack.Screen name="KursusAdd" component={KursusAdd} options={{ headerShown: false }} />
      <Stack.Screen name="KursusData" component={KursusData} options={{ headerShown: false }} />

      <Stack.Screen name="MasterUser" component={MasterUser} options={{ headerShown: false }} />
      <Stack.Screen name="InfoDetail" component={InfoDetail} options={{ headerShown: false }} />
      <Stack.Screen name="HistoryDetail" component={HistoryDetail} options={{ headerShown: false }} />
      <Stack.Screen name="MapData" component={MapData} options={{ headerShown: false }} />








      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          // headerTitle: 'Detail',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />





      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,

        }}
      />
      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: false,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: '#000',
        }}
      />










      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />






    </Stack.Navigator>
  );
}
