import React from 'react';

import {
    Text,
    View,
    Image,
    Animated
} from 'react-native';

import styles from './styles'
const successImage = require('./image/floatLayerSuccess.png')
const warningImage = require('./image/floatLayerWarning.png')
const errorImage = require('./image/floatLayerError.png')
const problemImage = require('./image/floatLayerProblem.png')


export default {
    render() {

        let showImage = undefined // 无图片

        if (this.state.image === 'success'){
            showImage = successImage
        }
        if (this.state.image === 'warning'){
            showImage = warningImage
        }
        if (this.state.image === 'error'){
            showImage = errorImage
        }
        if (this.state.image === 'problem'){
            showImage = problemImage
        }


        const view = this.state.isShow ? <View style={[styles.container, this.props.viewStyle]} pointerEvents={'none'}>
            <Animated.View style={[styles.centerView, { opacity: this.state.opacityValue }]}>
                {showImage && <Image style={styles.image} source={showImage}/>}
                <Text style={[styles.text, this.props.textStyle]}>{this.state.text}</Text>
            </Animated.View>
        </View> : <View/>

        return view
    }
}
