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
            axios.post(apiURL + 'solat_riwayat', {
                fid_user: uu.id
            }).then(res => {
                console.log(res.data);
                setData(res.data)
            });
        })


    }, []);

    const __renderItem = ({ item }) => {
        return (
            <View style={{
                marginVertical: 10,
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                borderColor: colors.primary
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600], fontSize: 14, color: colors.primary
                }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')}</Text>
                <View style={{
                    marginVertical: 10,
                    width: windowWidth / 2,
                    borderBottomWidth: 3,
                    borderBottomColor: colors.primary
                }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border }}>
                    <Text style={{ fontFamily: fonts.secondary[600], fontSize: 14, color: colors.primary, flex: 1 }}>
                        SUBUH
                    </Text>
                    <Icon type='ionicon'
                        name={item.SUBUH > 0 ? 'checkmark-circle' : 'close-circle'}
                        size={20}
                        color={item.SUBUH > 0 ? colors.primary : colors.danger} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border }}>
                    <Text style={{ fontFamily: fonts.secondary[600], fontSize: 14, color: colors.primary, flex: 1 }}>
                        ZUHUR
                    </Text>
                    <Icon type='ionicon'
                        name={item.ZUHUR > 0 ? 'checkmark-circle' : 'close-circle'}
                        size={20}
                        color={item.ZUHUR > 0 ? colors.primary : colors.danger} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border }}>
                    <Text style={{ fontFamily: fonts.secondary[600], fontSize: 14, color: colors.primary, flex: 1 }}>
                        ASHAR
                    </Text>
                    <Icon type='ionicon'
                        name={item.ASHAR > 0 ? 'checkmark-circle' : 'close-circle'}
                        size={20}
                        color={item.ASHAR > 0 ? colors.primary : colors.danger} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border }}>
                    <Text style={{ fontFamily: fonts.secondary[600], fontSize: 14, color: colors.primary, flex: 1 }}>
                        MAGHRIB
                    </Text>
                    <Icon type='ionicon'
                        name={item.MAGHRIB > 0 ? 'checkmark-circle' : 'close-circle'}
                        size={20}
                        color={item.MAGHRIB > 0 ? colors.primary : colors.danger} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border }}>
                    <Text style={{ fontFamily: fonts.secondary[600], fontSize: 14, color: colors.primary, flex: 1 }}>
                        ISYA
                    </Text>
                    <Icon type='ionicon'
                        name={item.ISYA > 0 ? 'checkmark-circle' : 'close-circle'}
                        size={20}
                        color={item.ISYA > 0 ? colors.primary : colors.danger} />
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
            }}>Attendance Prayer</Text>

            <FlatList data={data} renderItem={__renderItem} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})