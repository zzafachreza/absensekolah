import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import { MyButton, MyGap, MyHeader, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import { Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import RNFS from 'react-native-fs';


export default function Pengaturan({ navigation }) {

    const [user, setUser] = useState({});

    useEffect(() => {
        getData('user').then(res => {
            setUser(res)
        })
    }, [])


    const MYTombol = ({ icon, name, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress} style={{
                flexDirection: 'row',
                padding: 12,
                marginVertical: 5,
                // borderBottomWidth: 1,
                // borderBottomColor: colors.border,
            }}>
                <Icon type='ionicon' name={icon} size={20} color={colors.primary} />
                <Text style={{
                    left: 10,
                    flex: 1,
                    fontFamily: fonts.primary[400],
                    fontSize: windowWidth / 25,
                    color: colors.primary
                }}>{name}</Text>
                <Icon type='ionicon' name='chevron-forward' color={colors.primary} />
            </TouchableOpacity>
        )
    }

    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Splash' }],
                    });
                }
            }
        ])
    };


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader judul="SETTING" />

            <View style={{
                flex: 1,
                padding: 20,
            }}>


                <MYTombol icon="person" name="Profile" onPress={() => navigation.navigate('Account')} />
                <MYTombol icon="create" name="Change Profile" onPress={() => navigation.navigate('AccountEdit', user)} />
                <MYTombol icon="time" name="History" onPress={() => navigation.navigate('AccountEdit')} />

                <MYTombol icon="home" name="Class" onPress={() => navigation.navigate('MasterKelas', {
                    judul: 'Class'
                })} />
                <MYTombol icon="library" name="Course" onPress={() => navigation.navigate('MasterKursus', {
                    judul: 'Course'
                })} />
                <MYTombol icon="megaphone" name="Information" onPress={() => navigation.navigate('MasterInfo', {
                    judul: 'Information'
                })} />

                <View style={{
                    marginVertical: 20,
                    borderTopWidth: 1,
                    borderColor: colors.border
                }} />
                <MYTombol icon="help-circle" name="Help" onPress={() => navigation.navigate('AccountEdit')} />
                <MYTombol icon="log-out" name="Logout" onPress={btnKeluar} />


            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})