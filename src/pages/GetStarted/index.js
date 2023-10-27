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

export default function ({ navigation }) {







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
                // justifyContent: 'center',
                padding: 20,
            }}>

                <Text style={{
                    fontFamily: fonts.secondary[800],
                    color: colors.primary,
                    fontSize: 20,
                    textAlign: 'center',
                    marginBottom: 20,
                }}>Register As</Text>

                <MyButton title="Teacher" onPress={() => navigation.navigate('Register1')} />
                <MyGap jarak={30} />
                <MyButton title="Student" onPress={() => navigation.navigate('Register2')} />

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
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{
                    borderWidth: 1,
                    width: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 10,
                    borderColor: colors.white
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: 15,
                    }}>Next</Text>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
