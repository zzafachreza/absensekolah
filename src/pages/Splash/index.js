import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { MyButton, MyGap } from '../../components';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { MYAPP, getData } from '../../utils/localStorage';
import { TouchableOpacity } from 'react-native';

export default function Splash({ navigation }) {





  useEffect(() => {
    setTimeout(() => {
      getData('user').then(res => {
        if (!res) {
          navigation.replace('GetStarted')
        } else {
          navigation.replace('Home')
        }
      })
    }, 1000)
  }, [])

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
      justifyContent: 'center',
      position: 'relative',


    }}>


      <Image source={require('../../assets/top.png')} style={{
        width: windowWidth,

      }} />





      <View style={{
        flex: 1,
        justifyContent: 'center',
        padding: 20,
      }}>


        <ActivityIndicator size="large" color={colors.primary} />

      </View>
      <ImageBackground source={require('../../assets/bottom.png')} style={{
        width: windowWidth,
        height: 120,
        marginBottom: -10,
        paddingRight: 20,
        paddingBottom: 20,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
      }}>

      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
