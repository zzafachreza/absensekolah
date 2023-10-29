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
import { launchCamera } from 'react-native-image-picker';


export default function ({ navigation, route }) {

    const [user, setUser] = useState({});

    const [pilihan, setPilihan] = useState([]);
    const [kirim, setKirim] = useState({
        fid_kursus: '',
        fid_user: '',
        foto_hadir: 'https://zavalabs.com/nogambar.jpg'
    })


    const sendServer = () => {
        console.log(kirim);
        axios.post(apiURL + 'hadir_add', kirim).then(res => {
            console.log(res.data);
            Alert.alert(MYAPP, 'Your attendance has been saved !');
            navigation.goBack();
        })
    }



    useEffect(() => {
        getData('user').then(uu => {
            setUser(uu);
            axios.post(apiURL + 'kursus_list').then(res => {
                console.log(res.data);
                setPilihan(res.data);
                setKirim({
                    ...kirim,
                    fid_user: uu.id,
                    fid_kursus: res.data[0].value
                })
            });
        })


    }, []);


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
        }}>
            <MyHeader onPress={() => navigation.goBack()} judul="ATTENDANCES" />
            <View style={{
                padding: 10,
                flex: 1,
            }}>
                <MyGap jarak={10} />
                <MyPicker iconname="options" data={pilihan} onValueChange={x => {
                    setKirim({
                        ...kirim,
                        fid_kursus: x
                    })
                }} label="Your Course" />
                <View style={{

                    marginVertical: 10,
                    backgroundColor: colors.primary,
                    padding: 10,
                    borderRadius: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        color: colors.white
                    }}>Date</Text>

                    <Text style={{
                        textAlign: 'center',
                        fontFamily: fonts.secondary[800], fontSize: 20,
                        color: colors.white
                    }}>{moment().format('dddd, DD MMMM YYYY')}</Text>
                </View>


                <TouchableNativeFeedback onPress={() => {
                    launchCamera({
                        includeBase64: true,
                        quality: 1,
                        mediaType: "photo",
                        maxWidth: 200,
                        maxHeight: 200
                    }, response => {
                        // console.log('All Response = ', response);

                        setKirim({
                            ...kirim,
                            foto_hadir: `data:${response.type};base64, ${response.base64}`,
                        });
                    });
                }}>



                    <View



                        style={{
                            marginTop: 10,
                            alignSelf: 'center',
                            width: 300,
                            height: 300,
                            borderWidth: 1,
                            borderColor: colors.border,
                            overflow: 'hidden',
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Image style={{
                            width: 300,
                            height: 300,
                        }} source={{
                            uri: kirim.foto_hadir,
                        }} />

                    </View>
                </TouchableNativeFeedback>
            </View>
            <MyButton title="Submit" onPress={sendServer} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})