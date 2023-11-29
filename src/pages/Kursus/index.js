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
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { launchCamera } from 'react-native-image-picker';
import GetLocation from 'react-native-get-location'

export default function ({ navigation, route }) {

    const [KursusHIS, setKursusHIS] = useState([]);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({});
    const [kursus, setKursus] = useState({});
    const [lokasi, setLokasi] = useState({
        lat: 0,
        long: 0,
    });
    const [kode, setKode] = useState('');
    const [pilihan, setPilihan] = useState([]);
    const [kirim, setKirim] = useState({
        fid_kursus: '',
        fid_user: '',
        foto_hadir: 'https://zavalabs.com/nogambar.jpg'
    })


    const sendServer = () => {
        console.log(kirim);

        if (kirim.foto_hadir.length > 250) {
            axios.post(apiURL + 'hadir_add', {
                ...kirim,
                fid_kursus: kursus.id,
                lat: lokasi.lat,
                long: lokasi.long
            }).then(res => {
                console.log(res.data);
                Alert.alert(MYAPP, 'Your attendance has been saved !');
                navigation.goBack();
            })

        } else {
            Alert.alert(MYAPP, 'Plase take your photo !')
        }
    }



    useEffect(() => {


        getData('kursus').then(res => {
            if (!res) {
                setKursusHIS([]);
            } else {
                setKursusHIS(res);
            }
        })

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then(location => {

                setLokasi({
                    lat: location.latitude,
                    long: location.longitude
                })
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })

        getData('user').then(uu => {
            setUser(uu);
            axios.post(apiURL + 'kursus_list').then(res => {

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
            {!open && <>
                <View style={{
                    padding: 10,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <MyInput autoFocus label="Input Course Code" placeholder="Please enter course code" onChangeText={x => {
                            setKode(x)
                        }} />
                    </View>
                    <View style={{
                        flex: 0.5,
                        paddingTop: 30,
                        paddingLeft: 5
                    }}>
                        <MyButton onPress={() => {


                            const Filtered = pilihan.filter(i => i.kode_kursus.toLowerCase().indexOf(kode.toLowerCase()) > -1);
                            if (Filtered.length > 0) {
                                console.log(Filtered[0]);
                                setKursus(Filtered[0]);
                                setOpen(true);
                                let tmpKursus = [...KursusHIS];
                                tmpKursus.push(Filtered[0]);
                                setKursusHIS(tmpKursus);
                                storeData('kursus', tmpKursus);

                            } else {
                                Alert.alert(MYAPP, 'THE COURSE IS NOT FOUND !')
                            }

                        }} title="SUBMIT" warna={colors.primary} colorText={colors.white} />
                    </View>


                </View>
                <View style={{
                    padding: 20,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: 15
                    }}>Course Code History</Text>
                    {KursusHIS.length > 0 && KursusHIS.map(i => {
                        return (
                            <TouchableNativeFeedback onPress={() => {
                                setKursus(i);
                                setOpen(true);
                            }}>
                                <View style={{
                                    padding: 10,
                                    borderWidth: 1,
                                    marginVertical: 10,
                                    borderRadius: 10,
                                    flexDirection: 'row',
                                    borderColor: colors.primary,
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 15
                                    }}>{i.kode_kursus} - {i.nama_kursus}</Text>
                                    <Icon type='ionicon' name='chevron-forward-circle-outline' color={colors.primary} />
                                </View>
                            </TouchableNativeFeedback>
                        )
                    })}
                </View>
            </>}

            {open && <>
                <View style={{
                    padding: 10,
                    flex: 1,
                }}>
                    <MyGap jarak={10} />
                    <View style={{

                        marginVertical: 10,
                        backgroundColor: colors.primary,
                        padding: 10,
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 15,
                            color: colors.white
                        }}>Your Course</Text>

                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.white
                        }}>
                            <Text style={{
                                flex: 1,
                                fontFamily: fonts.secondary[800], fontSize: 14,
                                color: colors.white
                            }}>{kursus.kode_kursus}</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[800], fontSize: 14,
                                color: colors.white
                            }}>{kursus.nama_kursus}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.white
                        }}>
                            <Text style={{
                                flex: 1,
                                fontFamily: fonts.secondary[800], fontSize: 14,
                                color: colors.white
                            }}>{moment(kursus.tanggal_kursus).format('ddd, DD MMMM YYYY')}</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[800], fontSize: 14,
                                color: colors.white
                            }}>{kursus.jam_kursus} s/d {kursus.jam_selesai} WIB</Text>
                        </View>
                    </View>
                    <View style={{

                        marginVertical: 10,
                        backgroundColor: colors.primary,
                        padding: 10,
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 15,
                            color: colors.white
                        }}>Date</Text>

                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.secondary[800], fontSize: 14,
                            color: colors.white
                        }}>{moment().format('dddd, DD MMMM YYYY')}</Text>
                    </View>


                    <View style={{

                        marginVertical: 10,
                        backgroundColor: colors.primary,
                        padding: 10,
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 15,
                            color: colors.white
                        }}>latitude & longitude </Text>

                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.secondary[800], fontSize: 14,
                            color: colors.white
                        }}> {lokasi.lat}, {lokasi.long}</Text>
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

            </>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})