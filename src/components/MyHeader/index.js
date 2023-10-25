import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { colors, fonts, windowWidth } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { getData } from '../../utils/localStorage';
import MyMenu from '../MyMenu';
export default function MyHeader({ onPress, judul }) {

  return (

    <View style={{
      flexDirection: 'row',
      backgroundColor: colors.white,
      padding: 5,
      height: 50,
      borderBottomWidth: 3,
      borderBottomColor: colors.primary,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      alignItems: 'center'
    }}>
      <TouchableOpacity onPress={onPress} style={{
        padding: 5,
      }}>
        <Icon type='ionicon' name='arrow-back-outline' size={windowWidth / 13} color={colors.black} />
      </TouchableOpacity>
      <Text style={{
        flex: 1,
        left: 10,
        fontFamily: fonts.secondary[600],
        fontSize: 20,
        color: colors.primary
      }}>{judul}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
