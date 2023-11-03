import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
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


export default function InfoDetail({ navigation, route }) {
    const item = route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader judul="Informasi Detail" />

            <ScrollView style={{
                padding: 10,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    fontSize: 22,
                    color: colors.primary,
                    textAlign: 'center',
                    marginVertical: 10,
                }}>{item.judul}</Text>
                <View style={{
                    width: windowWidth / 2,
                    borderWidth: 2,
                    alignSelf: 'center',
                    marginVertical: 10
                }} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 16,
                    color: colors.primary,
                    textAlign: 'justify',
                    marginVertical: 10,
                }}>{item.keterangan}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})