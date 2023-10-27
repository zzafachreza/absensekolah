import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking, PermissionsAndroid } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import { MyHeader } from '../../components';
import { launchCamera } from 'react-native-image-picker';


const MySolat = ({ judul, desc, onPress, done }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{
                backgroundColor: done > 0 ? colors.secondary : colors.white,
                padding: 20,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.primary,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Image source={require('../../assets/jam.png')} style={{
                    width: 50,
                    height: 50,
                }} />
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        color: done > 0 ? colors.white : colors.primary,
                        fontSize: 22,
                    }}>{judul}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        color: done > 0 ? colors.white : colors.primary,
                        fontSize: 15,
                    }}>{desc}</Text>
                </View>
                {done == 0 && <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    justifyContent: 'space-around'
                }}>
                    <Icon type='ionicon' name='location' color={colors.placeholder} size={20} />
                    <View style={{
                        marginHorizontal: 10,
                    }} />
                    <Icon type='ionicon' name='camera' color={colors.placeholder} size={20} />
                </View>}

                {done > 0 && <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    justifyContent: 'space-around'
                }}>
                    <Icon type='ionicon' name='checkmark-circle' color={colors.white} size={20} />
                    <View style={{
                        marginHorizontal: 10,
                    }} />
                    <Icon type='ionicon' name='time' color={colors.white} size={20} />
                </View>}
            </View>
        </TouchableWithoutFeedback>
    )
}


export default function Solat({ navigation, route }) {

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };


    const [kirim, setKirim] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
        nama_solat: 'SUBUH',
        foto_solat: 'https://zavalabs.com/nogambar.jpg'
    })

    const [user, setUser] = useState({});
    const [done, setDone] = useState({
        SUBUH: 0,
        ZUHUR: 0,
        ASHAR: 0,
        MAGHRIB: 0,
        ISYA: 0,
    })


    useEffect(() => {

        requestCameraPermission();
        __getTransaction();

    }, [])


    const __getTransaction = () => {
        getData('user').then(res => {
            setUser(res);
            setKirim({
                ...kirim,
                fid_user: res.id
            });

            axios.post(apiURL + 'solat', {
                fid_user: res.id
            }).then(rr => {
                console.log(rr.data); setDone(rr.data)
            })
        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,

        }}>
            <MyHeader judul="PRAYERS" onPress={() => navigation.goBack()} />


            <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: 20,
                margin: 10,
                color: colors.primary,
            }}>{moment().format('dddd, DD MMMM YYYY')}</Text>

            <View style={{
                flex: 1,
                padding: 20,
                justifyContent: 'space-around'
            }}>
                <MySolat done={done.SUBUH} judul="SUBUH" desc="05.00 - 06.00 WIB" onPress={() => {
                    launchCamera({
                        includeBase64: true,
                        quality: 1,
                        mediaType: "photo",
                        maxWidth: 200,
                        maxHeight: 200
                    }, response => {


                        axios.post(apiURL + 'solat_add', {
                            ...kirim,
                            nama_solat: 'SUBUH',
                            foto_solat: `data:${response.type};base64, ${response.base64}`,
                        }).then(res => {
                            console.log(res.data);
                            __getTransaction();
                        })
                    });
                }} />
                <MySolat done={done.ZUHUR} judul="ZUHUR" desc="12.30 - 13.15 WIB" onPress={() => {
                    launchCamera({
                        includeBase64: true,
                        quality: 1,
                        mediaType: "photo",
                        maxWidth: 200,
                        maxHeight: 200
                    }, response => {


                        axios.post(apiURL + 'solat_add', {
                            ...kirim,
                            nama_solat: 'ZUHUR',
                            foto_solat: `data:${response.type};base64, ${response.base64}`,
                        }).then(res => {
                            console.log(res.data);
                            __getTransaction();
                        })
                    });
                }} />
                <MySolat done={done.ASHAR} judul="ASHAR" desc="15.30 - 16.00 WIB" onPress={() => {
                    launchCamera({
                        includeBase64: true,
                        quality: 1,
                        mediaType: "photo",
                        maxWidth: 200,
                        maxHeight: 200
                    }, response => {


                        axios.post(apiURL + 'solat_add', {
                            ...kirim,
                            nama_solat: 'ASHAR',
                            foto_solat: `data:${response.type};base64, ${response.base64}`,
                        }).then(res => {
                            console.log(res.data);
                            __getTransaction();
                        })
                    });
                }} />
                <MySolat done={done.MAGHRIB} judul="MAGHRIB" desc="18.15 - 18.45 WIB" onPress={() => {
                    launchCamera({
                        includeBase64: true,
                        quality: 1,
                        mediaType: "photo",
                        maxWidth: 200,
                        maxHeight: 200
                    }, response => {


                        axios.post(apiURL + 'solat_add', {
                            ...kirim,
                            nama_solat: 'MAGHRIB',
                            foto_solat: `data:${response.type};base64, ${response.base64}`,
                        }).then(res => {
                            console.log(res.data)
                            __getTransaction();
                        })
                    });
                }} />
                <MySolat done={done.ISYA} judul="ISYA" desc="19.30 - 21.10 WIB" onPress={() => {
                    launchCamera({
                        includeBase64: true,
                        quality: 1,
                        mediaType: "photo",
                        maxWidth: 200,
                        maxHeight: 200
                    }, response => {


                        axios.post(apiURL + 'solat_add', {
                            ...kirim,
                            nama_solat: 'ISYA',
                            foto_solat: `data:${response.type};base64, ${response.base64}`,
                        }).then(res => {
                            console.log(res.data);
                            __getTransaction();
                        })
                    });
                }} />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})