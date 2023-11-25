import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function AccountEdit({ navigation, route }) {


    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        setLoading(true);
        console.log(kirim);
        axios.post(apiURL + 'update_profile', kirim).then(res => {
            console.log(res.data)



            if (res.data.status == 200) {
                Alert.alert(MYAPP, res.data.message);
                console.log(res.data.data);
                storeData('user', res.data.data);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Splash' }],
                });
            }
        }).finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        setKirim({
            ...kirim,
            newfoto_user: null
        })
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>

            <MyHeader onPress={() => navigation.goBack()} judul="EDIT PROFILE" />
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => {


                        launchImageLibrary({
                            includeBase64: true,
                            quality: 1,
                            mediaType: "photo",
                            maxWidth: 200,
                            maxHeight: 200
                        }, response => {
                            // console.log('All Response = ', response);

                            setKirim({
                                ...kirim,
                                newfoto_user: `data:${response.type};base64, ${response.base64}`,
                            });
                        });



                    }} style={{
                        width: 100,
                        height: 100,
                        borderWidth: 1,
                        borderColor: colors.border,
                        overflow: 'hidden',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image style={{
                            width: 100,
                            height: 100,
                        }} source={{
                            uri: kirim.newfoto_user !== null ? kirim.newfoto_user : kirim.foto_user,
                        }} />
                    </TouchableOpacity>
                </View>


                <MyInput label="Name" iconname="person" value={kirim.nama_lengkap} onChangeText={x => setKirim({ ...kirim, nama_lengkap: x })} />
                <MyGap jarak={10} />
                <MyInput label="NIK/NISN" iconname="card" value={kirim.username} onChangeText={x => setKirim({ ...kirim, username: x })} />
                <MyGap jarak={10} />
                <MyCalendar value={kirim.tanggal_lahir} onDateChange={x => {
                    setKirim({
                        ...kirim,
                        tanggal_lahir: x
                    })
                }} iconname="calendar" label="Date" />
                <MyGap jarak={10} />
                <MyPicker iconname="male-female" label="Jenis Kelamin" value={kirim.gender} onValueChange={x => {
                    setKirim({
                        ...kirim,
                        jenis_kelamin: x
                    })
                }} data={[
                    { label: 'Laki-laki', value: 'Laki-laki' },
                    { label: 'Perempuan', value: 'Perempuan' },
                ]} />
                <MyGap jarak={10} />
                <MyInput label="Email" iconname="mail" value={kirim.email} onChangeText={x => setKirim({ ...kirim, email: x })} />
                <MyGap jarak={10} />
                <MyInput label="Phone Number" keyboardType='phone-pad' iconname="call" value={kirim.telepon} onChangeText={x => setKirim({ ...kirim, telepon: x })} />
                <MyGap jarak={10} />
                <MyInput label="Address" iconname="location" value={kirim.alamat} onChangeText={x => setKirim({ ...kirim, alamat: x })} />
                <MyGap jarak={10} />
                <MyInput label="Password" iconname="lock-closed" secureTextEntry={true} onChangeText={x => setKirim({ ...kirim, newpassword: x })} placeholder="Kosongkan jika tidak diubah" />
                <MyGap jarak={20} />
                {loading && <ActivityIndicator color={colors.primary} size="large" />}

                {!loading && <MyButton warna={colors.secondary} colorText={colors.white} iconColor={colors.white} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})