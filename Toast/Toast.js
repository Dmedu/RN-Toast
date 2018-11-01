import React, {
    Component,
} from 'react';
import {
    View,
    Text
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';

import ToastView from '../Toast'

let rootSiblings = undefined;
class Toast extends Component {

    // options = { ToastView 内部 propsTypes }
    static showText = (text, onDismiss, options = {}) => {

        if(rootSiblings){
            rootSiblings.update(<ToastView text={text} {...options} showType={'api'} onDismiss={()=>{
                onDismiss && onDismiss()
                Toast.hide(rootSiblings)
            }}/>);
            return rootSiblings
        }

        rootSiblings = new RootSiblings(<ToastView text={text} {...options} showType={'api'} onDismiss={()=>{
            onDismiss && onDismiss()
            Toast.hide(rootSiblings)
        }}/>)
        return  rootSiblings;
    };

    static showImage = (text, image, onDismiss, options = {}) => {
        if(rootSiblings){
            rootSiblings.update(<ToastView text={text} image={image} {...options} showType={'api'} onDismiss={()=>{
                onDismiss && onDismiss()
                Toast.hide(rootSiblings)
            }}/>)

            return rootSiblings
        }

        rootSiblings =  new RootSiblings(<ToastView text={text} image={image} {...options} showType={'api'} onDismiss={()=>{
            onDismiss && onDismiss()
            Toast.hide(rootSiblings)
        }}/>);
        return rootSiblings
    };

    static hide = toast => {
        if (toast instanceof RootSiblings) {
            toast.destroy();
        } else {
            console.warn(`Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`);
        }
    };

    _toast = null;

    componentWillMount = () => {
        this._toast = new RootSiblings(<ToastView
            {...this.props}
        />);
    };

    componentWillReceiveProps = nextProps => {
        this._toast.update(<ToastView
            {...nextProps}
        />);
    };

    componentWillUnmount = () => {
        this._toast.destroy();
    };

    render() {
        return null;
    }
}

export {
    RootSiblings as Manager
};
export default Toast;
