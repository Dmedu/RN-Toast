import React from 'react';
import {
    StyleSheet,
    Dimensions,
} from 'react-native';

import {whiteColor, blackColor} from './constValue/colorValue'
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({

    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerView: {
        backgroundColor: blackColor,
        borderRadius: 4,
        maxWidth: width * 2 / 3,
        paddingVertical: 10,
        paddingHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        color: whiteColor,
        textAlign: 'center'
    },
    image: {
        width: 36,
        height: 36,
        marginBottom: 10
    }
})