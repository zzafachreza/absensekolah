import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker, MyCalendar } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP } from '../../utils/localStorage';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { Icon } from 'react-native-elements';

export default function ({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        api_token: api_token,
        nama_lengkap: '',
        username: '',
        email: '',
        fid_kursus: '',
        password: '',
        repassword: '',
        telepon: '',
        alamat: ''


    });

    const simpan = () => {
        if (
            data.nama_lengkap.length === 0 &&
            data.username.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'Form cannot empty!',
            });
        } else if (data.nama_lengkap.length === 0) {
            showMessage({
                message: 'Enter your name',
            });
        }

        else if (data.username.length === 0) {
            showMessage({
                message: 'Enter your NIK',
            });
        } else if (data.password.length === 0) {
            showMessage({
                message: 'Enter your password',
            });
        } else {

            console.log(data);

            setLoading(true);
            axios
                .post(apiURL + 'register_teacher', data)
                .then(res => {
                    console.warn(res.data);

                    if (res.data.status == 404) {
                        showMessage({
                            type: 'danger',
                            message: res.data.message
                        })
                    } else {
                        showMessage({
                            type: 'success',
                            message: res.data.message
                        })

                        navigation.navigate('Login');
                    }


                }).finally(() => {
                    setLoading(false);
                });
        }
    };

    const [pilihan, setPilihan] = useState([]);


    useEffect(() => {
        axios.post(apiURL + 'kursus_list').then(res => {
            console.log(res.data);
            setPilihan(res.data);
            setData({
                ...data,
                fid_kursus: res.data[0].value
            })
        })
    }, []);


    return (
        <ImageBackground
            style={{
                flex: 1,
                backgroundColor: colors.white,
                position: 'relative'
            }}>




            {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>

                <Image source={require('../../assets/top.png')} style={{
                    width: windowWidth,

                }} />




                <View style={{
                    paddingHorizontal: 20,
                    backgroundColor: colors.white,
                    borderRadius: 20,
                }}>
                    <Text style={{
                        fontSize: windowWidth / 12,
                        fontFamily: fonts.primary[600],
                        color: colors.secondary,

                    }}>Register</Text>
                    <MyInput
                        placeholder="Enter Name"
                        label="Name"
                        iconname="person-outline"
                        value={data.nama_lengkap}
                        onChangeText={value =>
                            setData({
                                ...data,
                                nama_lengkap: value,
                            })
                        }
                    />
                    <MyGap jarak={10} />
                    <MyInput
                        placeholder="Enter Email"
                        label="Email"
                        iconname="mail-outline"
                        value={data.email}
                        onChangeText={value =>
                            setData({
                                ...data,
                                email: value,
                            })
                        }
                    />
                    <MyGap jarak={10} />
                    <MyInput
                        placeholder="Enter phone number"
                        label="Phone Number"
                        keyboardType='phone-pad'
                        iconname="call-outline"
                        value={data.telepon}
                        onChangeText={value =>
                            setData({
                                ...data,
                                telepon: value,
                            })
                        }
                    />

                    <MyGap jarak={10} />
                    <MyInput
                        placeholder="Enter address"
                        label="Adress"
                        iconname="location-outline"
                        value={data.alamat}
                        onChangeText={value =>
                            setData({
                                ...data,
                                alamat: value,
                            })
                        }
                    />

                    <MyGap jarak={10} />


                    <MyInput
                        placeholder="Enter NIK"
                        label="NIK"
                        iconname="card-outline"
                        keyboardType="phone-pad"
                        value={data.username}
                        onChangeText={value =>
                            setData({
                                ...data,
                                username: value,
                            })
                        }
                    />






                    <MyGap jarak={10} />
                    <MyPicker iconname="options" data={pilihan} onValueChange={x => {
                        setData({
                            ...data,
                            fid_kursus: x
                        })
                    }} label="Your Course" />

                    <MyGap jarak={10} />
                    <MyInput
                        placeholder="Enter Password"
                        label="Password"
                        iconname="lock-closed-outline"
                        secureTextEntry
                        value={data.password}
                        onChangeText={value =>
                            setData({
                                ...data,
                                password: value,
                            })
                        }
                    />

                </View>
                <MyGap jarak={20} />




                {!loading &&
                    <View style={{
                        padding: 20,
                    }}>
                        <MyButton
                            colorText={colors.white}
                            warna={colors.primary}
                            title="Register"
                            Icons="log-in"
                            onPress={simpan}
                        />
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{
                            padding: 10,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}><Text style={{
                            fontSize: windowWidth / 28,
                            fontFamily: fonts.primary[400],
                            textAlign: 'center',
                            color: colors.primary
                        }}>Already account ? <Text style={{
                            fontSize: windowWidth / 28,
                            fontFamily: fonts.primary[600],
                            textAlign: 'center',
                            color: colors.border
                        }}>Login</Text></Text></TouchableOpacity>
                    </View>
                }

                <MyGap jarak={10} />
                {loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>}
            </ScrollView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
