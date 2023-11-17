import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData, webURL } from '../../utils/localStorage';
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
import { WebView } from 'react-native-webview';

export default function HistoryDetail({ navigation, route }) {
    const item = route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader judul="History Detail" onPress={(() => navigation.goBack())} />

            <View style={{
                flex: 1,
            }}>

                <ScrollView style={{
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: 22,
                        color: colors.primary,
                        textAlign: 'center',
                        marginVertical: 10,
                    }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 15,
                        color: colors.primary,
                        textAlign: 'center',
                        marginVertical: 10,
                    }}>{item.jam}</Text>
                    <View style={{
                        width: windowWidth / 2,
                        borderWidth: 2,
                        alignSelf: 'center',
                        marginVertical: 10
                    }} />
                    <Image source={{
                        uri: item.foto_solat !== undefined ? item.foto_solat : item.foto_hadir
                    }} style={{
                        width: windowWidth / 1.2,
                        height: windowHeight / 2,
                        alignSelf: 'center'
                    }} />
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: 20,
                        color: colors.black,
                        textAlign: 'center',
                        marginVertical: 5,
                    }}>{item.nama_solat !== undefined ? item.nama_solat : item.nama_kursus}</Text>

                    {item.nama_kursus !== undefined &&
                        <>
                            <Text style={{
                                fontFamily: fonts.secondary[800],
                                fontSize: 15,
                                color: colors.black,
                                textAlign: 'center',
                                marginVertical: 10,
                            }}>{item.kode_kursus}</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 20,
                                color: colors.black,
                                textAlign: 'center',
                                marginVertical: 10,
                            }}>{moment(item.tanggal_kursus).format('dddd, DD MMMM YYYY')}</Text>
                        </>
                    }



                    <TouchableOpacity onPress={() => navigation.navigate('MapData', item)}>
                        <Text style={{
                            backgroundColor: colors.primary,
                            color: colors.white,
                            padding: 10,
                            borderRadius: 10,
                            fontFamily: fonts.secondary[600],
                            fontSize: 15,
                            textAlign: 'center'
                        }}>Maps coordinates :{'\n'} {item.lat} , {item.long}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})