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
import { maskJs, maskCurrency } from 'mask-js';
import 'moment/locale/id';
import RNFS from 'react-native-fs';
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker'


import ProgressCircle from 'react-native-progress-circle'
import { MyButton, MyCalendar, MyGap, MyInput } from '../../components';
import { Modal } from 'react-native';

export default function ({ navigation, route }) {
    const [open, setOpen] = useState(false);
    const [kirim, setKirim] = useState({
        tipe: 'ADD',
        kode_kursus: '',
        nama_kursus: '',
        tanggal_kursus: moment().format('YYYY-MM-DD'),
        jam_kursus: '',
        jam_selesai: '',
    });

    const modul = 'kursus';

    const [data, setData] = useState([]);

    useEffect(() => {
        __getTransaction();
    }, []);

    const __getTransaction = () => {
        axios.post(apiURL + modul).then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }

    const __renderItem = ({ item }) => {
        return (
            <View style={{
                marginVertical: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 10,
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12
                    }}>Course Code</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{item.kode_kursus}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12
                    }}>Course Name</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{item.nama_kursus}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12
                    }}>Course Date</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{moment(item.tanggal_kursus).format('dddd, DD MMMM YYYY')}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12
                    }}>Course Start Time</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{item.jam_kursus}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12
                    }}>Course End Time</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{item.jam_selesai}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => {
                        setKirim({
                            tipe: 'UPDATE',
                            id: item.id,
                            nama_kursus: item.nama_kursus,
                            tanggal_kursus: item.tanggal_kursus,
                            jam_kursus: item.jam_kursus,
                            jam_selesai: item.jam_selesai
                        });
                        setOpen(true);
                    }} style={{
                        padding: 10,
                    }}>
                        <Icon type='ionicon' name='create' color={colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                            {
                                text: 'TIDAK'
                            },
                            {
                                text: 'HAPUS',
                                onPress: () => {
                                    axios.post(apiURL + modul + '_delete', {
                                        id: item.id
                                    }).then(res => {
                                        __getTransaction();
                                    })
                                }
                            }
                        ])
                    }} style={{
                        padding: 10,
                    }}>
                        <Icon type='ionicon' name='trash' color={colors.danger} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10,
            backgroundColor: colors.white
        }}>
            <View style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    fontSize: 18,
                    color: colors.primary,
                }}>{route.params.judul}</Text>
            </View>
            <View style={{
                flex: 1,
            }}>
                <FlatList data={data} renderItem={__renderItem} />
            </View>
            <View>
                <MyButton title="Add" onPress={() => {
                    setOpen(true);
                }} />
            </View>

            {/* modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={open}
                onRequestClose={() => {
                    setOpen(!open);
                    setKirim({
                        tipe: 'ADD',
                        kode_kursus: '',
                        nama_kursus: '',
                        tanggal_kursus: moment().format('YYYY-MM-DD'),
                        jam_kursus: '',
                        jam_selesai: '',
                    })
                }}>
                <View style={{
                    backgroundColor: '#00000090',
                    flex: 1,
                    justifyContent: 'center',
                    padding: 10
                }}>
                    <View style={{
                        borderRadius: 10,
                        padding: 20,
                        flex: 1,
                        backgroundColor: colors.white,
                        justifyContent: 'center'
                    }}>
                        <ScrollView>
                            <MyInput label="Course Code" onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    kode_kursus: x
                                })
                            }} value={kirim.kode_kursus} iconname="create" />
                            <MyGap jarak={10} />
                            <MyInput label="Course Name" onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    nama_kursus: x
                                })
                            }} value={kirim.nama_kursus} iconname="create" />
                            <MyGap jarak={10} />
                            <MyCalendar label="Course Date" value={kirim.tanggal_kursus} iconname="create" onDateChange={x => {
                                setKirim({
                                    ...kirim,
                                    tanggal_kursus: x
                                })
                            }} />
                            <MyGap jarak={10} />
                            <MyInput label="Course Start Time" maxLength={5} keyboardType='number-pad' onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    jam_kursus: maskJs('99:99', x)
                                })
                            }} value={kirim.jam_kursus} iconname="create" />
                            <MyGap jarak={10} />
                            <MyInput label="Course End Time" maxLength={5} keyboardType='number-pad' onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    jam_selesai: maskJs('99:99', x)
                                })
                            }} value={kirim.jam_selesai} iconname="create" />
                            <MyGap jarak={20} />
                            <MyButton title="Save" onPress={() => {
                                console.log(kirim);
                                let link = '';
                                if (kirim.tipe == 'ADD') {
                                    link = apiURL + modul + '_add';

                                } else {
                                    link = apiURL + modul + '_update';
                                }
                                axios.post(link, kirim).then(res => {
                                    setKirim({
                                        tipe: 'ADD',
                                        nama_kursus: ''
                                    })
                                    __getTransaction();
                                    setOpen(false);
                                })
                            }} />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})