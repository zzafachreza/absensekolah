import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, Linking } from 'react-native';
import { fonts, windowWidth, colors, windowHeight } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';


export default function Login({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    username: null,
    password: null
  });
  const [loading, setLoading] = useState(false);


  const [company, setCompany] = useState({});

  useEffect(() => {

    axios.post(apiURL + 'company').then(res => {
      setCompany(res.data.data);

    })
  }, [])





  const masuk = () => {


    if (kirim.username == null && kirim.password == null) {
      Alert.alert(MYAPP, 'Username dan Password tidak boleh kosong !');
    } else if (kirim.username == null) {
      Alert.alert(MYAPP, 'Username tidak boleh kosong !');
    } else if (kirim.password == null) {
      Alert.alert(MYAPP, 'Password tidak boleh kosong !');
    } else {


      setLoading(true);
      console.log(kirim);

      axios
        .post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            showMessage({
              type: 'danger',
              message: res.data.message
            })
          } else {
            storeData('user', res.data.data);
            navigation.replace('Home')
          }
        }).finally(() => {
          setLoading(false)
        });



    }




  }

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: colors.white, position: 'relative' }}>


        <Image source={require('../../assets/top.png')} style={{
          width: windowWidth,

        }} />





        <View style={{
          paddingHorizontal: 20,
        }}>
          <Text style={{
            fontSize: windowWidth / 12,
            fontFamily: fonts.primary[600],
            color: colors.secondary,

          }}>Welcome</Text>
          <Text style={{
            fontSize: windowWidth / 22,
            fontFamily: fonts.primary[400],
            color: colors.secondary,
            marginBottom: 20,
          }}>Please login to continue</Text>
          <MyInput label="NIK / NISN" onChangeText={val => setKirim({
            ...kirim,
            username: val
          })}
            iconname="card-outline" keyboardType='number-pad' placeholder="Enter NIK / NISN" />
          <MyGap jarak={20} />
          <MyInput
            onChangeText={val => setKirim({
              ...kirim,
              password: val
            })}
            secureTextEntry={true}
            label="Kata Sandi"
            iconname="lock-closed-outline"
            placeholder="Masukan kata sandi"
          />
          <TouchableOpacity onPress={() => {
            Linking.openURL('https://wa.me/' + company.tlp + '?text=Forgot password for nisn/nik/email : ')
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: 15,
              marginVertical: 10,
              color: colors.primary,
              textAlign: 'right'
            }}>Forgot Password ?</Text>
          </TouchableOpacity>

          <MyGap jarak={20} />
          {!loading &&




            <>
              <MyButton
                onPress={masuk}
                title="Masuk"
                colorText={colors.white}
                warna={colors.primary}

                Icons="log-in-outline"
              />

              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 15,
                  marginVertical: 10,
                  color: colors.primary,
                  textAlign: 'center'
                }}>Don’t have an account ? Register</Text>
              </TouchableOpacity>
            </>
          }

        </View>


        {loading && <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color={colors.secondary} size="large" />
        </View>}
      </ScrollView>


    </>
  );
}

const styles = StyleSheet.create({});
