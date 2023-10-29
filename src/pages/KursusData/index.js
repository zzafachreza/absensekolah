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
import { MyButton, MyGap, MyHeader, MyPicker } from '../../components';

export default function ({ navigation, route }) {

    const [user, setUser] = useState({});
    const [data, setData] = useState([]);

    useEffect(() => {
        getData('user').then(uu => {
            setUser(uu);
            axios.post(apiURL + 'hadir_riwayat', {
                fid_user: uu.id
            }).then(res => {
                console.log(res.data);
                setData(res.data)
            });
        })


    }, []);

    const __renderItem = ({ item, index }) => {
        return (
            <View style={{
                padding: 5,
                borderRadius: 10,

            }}>

                {index == 0 &&
                    <>
                        <Text style={{
                            marginTop: 20,
                            fontFamily: fonts.secondary[600], fontSize: 14, color: colors.primary
                        }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')}</Text>
                        <View style={{
                            marginVertical: 10,
                            width: windowWidth / 2,
                            borderBottomWidth: 3,
                            borderBottomColor: colors.primary
                        }} />
                    </>}


                {index > 0 && data[index - 1].tanggal !== item.tanggal &&
                    <>
                        <Text style={{
                            marginTop: 20,
                            fontFamily: fonts.secondary[600], fontSize: 14, color: colors.primary
                        }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')}</Text>
                        <View style={{
                            marginVertical: 10,
                            width: windowWidth / 2,
                            borderBottomWidth: 3,
                            borderBottomColor: colors.primary
                        }} />
                    </>}
                <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{ fontFamily: fonts.secondary[800], fontSize: 14, color: colors.primary, flex: 1 }}>
                            {item.kode_kursus}
                        </Text>
                        <Text style={{ fontFamily: fonts.secondary[600], fontSize: 14, color: colors.primary, flex: 1 }}>
                            {item.nama_kursus}
                        </Text>
                    </View>
                    <Text style={{ fontFamily: fonts.secondary[800], fontSize: 14, color: colors.primary, flex: 1 }}>
                        {item.jam}
                    </Text>
                    <Icon type='ionicon'
                        name='checkmark-circle'
                        size={20}
                        color={colors.primary} />
                </View>

            </View>
        )
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <MyHeader onPress={() => navigation.goBack()} judul="HISTORY PRAYER" />
            <Text style={{
                fontFamily: fonts.secondary[800],
                fontSize: 15,
                margin: 10,
                color: colors.primary,
            }}>Attendance Course</Text>

            <FlatList data={data} renderItem={__renderItem} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})