import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking, BackHandler, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData, webURL } from '../../utils/localStorage';
import { DimensionThisPhone, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import { MyButton, MyHeader, MyInput } from '../../components';
import { WebView } from 'react-native-webview';
import GetLocation from 'react-native-get-location';
import { getDistance, convertDistance } from 'geolib';

export default function MapData({ navigation, route }) {
    const item = route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader judul="History Detail Map" onPress={(() => navigation.goBack())} />
            <WebView source={{ uri: `${webURL}home/map?lat=${item.lat}&long=${item.long}` }} style={{ height: 100 }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})