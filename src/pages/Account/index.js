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
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

export default function ({ navigation, route }) {
    const [user, setUser] = useState({});
    const [com, setCom] = useState({});
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(false);



    useEffect(() => {


        if (isFocused) {
            getData('user').then(res => {
                console.log(res)
                setOpen(true);
                setUser(res);

            });
        }




    }, [isFocused]);



    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Are you sure ?', [
            {
                text: 'Cancel',
                style: "cancel"
            },
            {
                text: 'Logout',
                onPress: () => {
                    storeData('user', null);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Splash' }],
                    });
                }
            }
        ])
    };

    const MyList = ({ label, value }) => {
        return (
            <View
                style={{
                    marginVertical: 3,
                    padding: 5,
                    backgroundColor: colors.white,
                    borderRadius: 5,
                    flexDirection: 'row'
                }}>
                <Text
                    style={{
                        flex: 1,
                        color: colors.primary,
                        fontFamily: fonts.primary[400],

                    }}>
                    {label}
                </Text>
                <Text
                    style={{
                        fontFamily: fonts.primary[400],
                        color: colors.primary,
                    }}>
                    {value}
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#F4F6FF'
        }}>

            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}


            {open &&
                <>
                    <MyHeader onPress={() => navigation.goBack()} judul="PROFILE" />
                    <View style={{
                        backgroundColor: colors.primary,
                        padding: 10,
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            width: 81,
                            height: 81,
                            alignSelf: 'center',
                            borderWidth: 3,
                            borderRadius: 40,
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}>
                            <Image source={{
                                uri: user.foto_user
                            }} style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                            }} />
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.white,
                                fontSize: 20,
                            }}>{user.username}</Text>
                        </View>
                    </View>


                    <View style={{
                        backgroundColor: colors.white,
                        margin: 10,
                    }}>

                        <View style={{ padding: 10, }}>

                        </View>
                        <MyList label="Login as" value={user.tipe} />
                        <View style={{
                            borderWidth: 0.3,
                            borderColor: colors.border
                        }} />
                        <MyList label="Name" value={user.nama_lengkap} />
                        <MyList label={user.tipe == 'Teacher' ? 'NIK' : 'NISN'} value={user.username} />
                        <View style={{
                            borderWidth: 0.3,
                            borderColor: colors.border
                        }} />
                        <MyList label="Date" value={moment(user.tanggal_lahir).format('DD MMMM YYYY')} />
                        <MyList label="Gender" value={user.jenis_kelamin} />
                        <View style={{
                            borderWidth: 0.3,
                            borderColor: colors.border
                        }} />
                        <MyList label="Email" value={user.email} />
                        <MyList label={user.tipe == 'Teacher' ? 'Course' : 'Class'} value={user.tipe == 'Teacher' ? user.nama_kursus : user.nama_kelas} />

                        <View style={{
                            borderWidth: 0.3,
                            borderColor: colors.border
                        }} />


                    </View>
                    {/* data detail */}

                </>
            }
            <View style={{
                padding: 20,
            }}>
                <MyButton onPress={btnKeluar} warna={colors.black} title="Log Out" Icons="log-out" iconColor={colors.white} colorText={colors.white} />
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
