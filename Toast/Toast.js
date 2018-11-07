import React from 'react'

import RootSiblings from 'react-native-root-siblings';
import ToastView from '../Toast'

let rootSiblings = undefined;

// options = { ToastView 内部 propsTypes }
showText = (text, options = {}, onDismiss) => {

    if(rootSiblings){
        rootSiblings.update(<ToastView text={text}
                                       {...options}
                                       showType={'api'}
                                       onDismiss={()=>{
                                           onDismiss && typeof onDismiss === 'function' && onDismiss()
                                           this.hide()
                                       }}/>);
    }else {

        rootSiblings = new RootSiblings(<ToastView text={text}
                                                   {...options}
                                                   showType={'api'}
                                                   onDismiss={() => {
                                                       onDismiss && typeof onDismiss === 'function' && onDismiss()
                                                       this.hide()
                                                   }}/>)
    }
};

showImage = (text, image, options = {}, onDismiss) => {
    if(rootSiblings){
        rootSiblings.update(<ToastView text={text}
                                       image={image} {...options}
                                       showType={'api'}
                                       onDismiss={()=>{
                                           onDismiss && typeof onDismiss === 'function' && onDismiss()
                                           this.hide()
                                       }}/>)
    }else {
        rootSiblings = new RootSiblings(<ToastView text={text}
                                                   image={image}
                                                   {...options}
                                                   showType={'api'}
                                                   onDismiss={() => {
                                                       onDismiss && typeof onDismiss === 'function' && onDismiss()
                                                       this.hide()
                                                   }}/>);
    }
};

hide = () => {
    if (rootSiblings instanceof RootSiblings) {
        rootSiblings.destroy();
    } else {
        console.warn(`Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`);
    }
};

export default {
    showText,
    showImage
};
