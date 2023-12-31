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
        username: ''
    });

    const modul = 'user';

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
                    }}>NISN / NIK</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{item.username}</Text>
                    <Text style={{
                        marginTop: 5,
                        fontFamily: fonts.secondary[600],
                        fontSize: 12
                    }}>Name</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{item.nama_lengkap}</Text>
                    <Text style={{
                        marginTop: 5,
                        fontFamily: fonts.secondary[600],
                        fontSize: 12
                    }}>Email</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{item.email}</Text>
                    <Text style={{
                        marginTop: 5,
                        fontFamily: fonts.secondary[600],
                        fontSize: 12
                    }}>User Type</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12
                    }}>{item.tipe}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => {
                        setKirim({
                            tipe: 'UPDATE',
                            id: item.id,
                            username: item.username,
                            email: item.email
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
                }}>{route.params.username}</Text>
            </View>
            <View style={{
                flex: 1,
            }}>
                <FlatList data={data} renderItem={__renderItem} />
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
                        email: '',
                        username: ''
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

                            <MyGap jarak={10} />
                            <MyInput label="NISN / NIK" onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    username: x
                                })
                            }} value={kirim.username} iconname="create" />
                            <MyGap jarak={10} />
                            <MyInput multiline label="Email" onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    email: x
                                })
                            }} value={kirim.email} iconname="create" />
                            <MyGap jarak={10} />
                            <MyInput secureTextEntry={true} label="New Password" onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    password: x
                                })
                            }} value={kirim.password} iconname="create" />
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
                                        username: ''
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