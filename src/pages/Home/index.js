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
import MyCarouser from '../../components/MyCarouser';
import { Rating } from 'react-native-ratings';

const MyMenuFeature = ({ img, label, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.border,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image source={img} style={{
          width: windowHeight / 4,
          resizeMode: 'contain',
          height: windowWidth / 4
        }} />
        <Text style={{
          fontFamily: fonts.secondary[600],
          marginVertical: 5,
          color: colors.primary
        }}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default function Home({ navigation, route }) {



  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});

  const _getTransaction = async () => {

    await getData('user').then(u => {
      setUser(u);
    })

    await axios.post(apiURL + 'company').then(res => {

      setComp(res.data.data);

    });

    await axios.post(apiURL + 'info').then(res => {

      console.log(res.data);
      setData(res.data);

    });
  }


  useEffect(() => {
    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);

  const __renderItem = ({ item }) => {
    return (

      <TouchableWithoutFeedback onPress={() => navigation.navigate('InfoDetail', item)}>
        <View style={{
          padding: 10,
          // borderWidth: 1,
          // elevation: 2,
          borderWidth: 1,
          borderColor: '#CDCDCD',
          padding: 20,
          marginVertical: 5,
          borderRadius: 5,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Icon type='ionicon' name='information' size={50} color={colors.secondary} />
          <View style={{
            left: 10,
            flex: 1,
          }}>
            <Text style={{

              fontSize: windowWidth / 20,
              fontFamily: fonts.primary[600],
              color: colors.primary,
              textAlign: 'center'

            }}>{item.judul}</Text>

          </View>
        </View>
      </TouchableWithoutFeedback>

    )
  }


  return (

    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
      position: 'relative'
    }}>

      <Image source={require('../../assets/banner.png')} style={{
        width: windowWidth,
        height: 220,
      }} />

      <View style={{
        flex: 1,
        padding: 10,
      }}>

        <Text style={{
          fontSize: windowWidth / 15,
          fontFamily: fonts.primary[600],
          color: colors.primary,

        }}>Informasi</Text>
        <View style={{
          height: 5,
          borderRadius: 5,
          width: 80,
          backgroundColor: colors.primary
        }}></View>

        <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={__renderItem} />


      </View>






      {/* navigation bottom */}
      <View style={{
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.secondary,
        justifyContent: 'space-around'
      }}>
        <TouchableOpacity style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='home' color={colors.white} size={20} />
          <Text style={{
            fontSize: windowWidth / 40,
            fontFamily: fonts.primary[400],
            color: colors.white,
            textAlign: 'center'
          }}>Home</Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Solat')} style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='time' color={colors.white} size={20} />
          <Text style={{
            fontSize: windowWidth / 40,
            fontFamily: fonts.primary[400],
            color: colors.white,
            textAlign: 'center'
          }}>Prayers</Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Kursus')} style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='create' color={colors.white} size={20} />

          <Text style={{
            fontSize: windowWidth / 40,
            fontFamily: fonts.primary[400],
            color: colors.white,
            textAlign: 'center'
          }}>Attendance</Text>
        </TouchableOpacity>



        <TouchableOpacity onPress={() => navigation.navigate('Pengaturan')} style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='settings' color={colors.white} size={20} />
          <Text style={{
            fontSize: windowWidth / 40,
            fontFamily: fonts.primary[400],
            color: colors.white,
            textAlign: 'center'
          }}>Setting</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  tulisan: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    textAlign: 'justify'
  },
  tulisanJudul: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.secondary[800],
    color: colors.black,
    textAlign: 'justify'
  }
})