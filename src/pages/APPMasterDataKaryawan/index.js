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
import RNFS from 'react-native-fs';
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
} from 'react-native-document-picker'


import ProgressCircle from 'react-native-progress-circle'
import { MyButton, MyGap, MyInput } from '../../components';
import { Modal } from 'react-native';

export default function ({ navigation, route }) {
    const [open, setOpen] = useState(false);
    const [kirim, setKirim] = useState({
        tipe: 'ADD',
        nip: '',
        nama: '',
        jabatan: '',
        username: '',
        password: '',
    });

    const modul = 'karyawan';

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
                    }}>NIP</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{item.nip}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12
                    }}>Nama</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{item.nama}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12
                    }}>Jabatan</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{item.jabatan}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12
                    }}>Username</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{item.username}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12
                    }}>Password</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{item.password}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => {
                        setKirim({
                            tipe: 'UPDATE',
                            id_karyawan: item.id,
                            nip: item.nip,
                            nama: item.nama,
                            jabatan: item.jabatan,
                            username: item.username,
                            password: item.password,
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
                <MyButton title="Tambah" onPress={() => {
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
                        nip: '',
                        nama: '',
                        jabatan: '',
                        username: '',
                        password: '',
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

                            <MyInput iconname="create" label="nip" value={kirim.nip} onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    nip: x
                                })
                            }} />
                            <MyGap jarak={10} />
                            <MyInput iconname="create" label="nama" value={kirim.nama} onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    nama: x
                                })
                            }} />
                            <MyGap jarak={10} />
                            <MyInput iconname="create" label="jabatan" value={kirim.jabatan} onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    jabatan: x
                                })
                            }} />
                            <MyGap jarak={10} />
                            <MyInput iconname="create" label="username" value={kirim.username} onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    username: x
                                })
                            }} />
                            <MyGap jarak={10} />
                            <MyInput iconname="create" label="password" value={kirim.password} onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    password: x
                                })
                            }} />
                            <MyGap jarak={10} />

                            <MyGap jarak={20} />
                            <MyButton title="Simpan" onPress={() => {
                                console.log(kirim);
                                let link = '';
                                if (kirim.tipe == 'ADD') {
                                    link = apiURL + modul + '_add';

                                } else {
                                    link = apiURL + modul + '_update';
                                }
                                axios.post(link, kirim).then(res => {
                                    console.log(res);
                                    setKirim({
                                        tipe: 'ADD',
                                        nip: '',
                                        nama: '',
                                        jabatan: '',
                                        username: '',
                                        password: '',
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