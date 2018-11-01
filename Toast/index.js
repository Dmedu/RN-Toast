import React, {PureComponent} from 'react';
import {
    Animated
} from 'react-native'
import Render from './render'
import PropTypes from 'prop-types'

export default class Toast extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isShow: false,
            opacityValue: new Animated.Value(0),
            text: this.props.text,
            image: this.props.image
        };

        this.showState = false; // 多次弹框情况下，确保弹出动画只走一次

        this.show = this.show.bind(this);
        this.close = this.close.bind(this)
        this.showImage = this.showImage.bind(this)
        this.showText = this.showText.bind(this)

    };
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }
    componentDidMount(){
        if (this.props.showType === 'api'){
            this.show()
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            text: nextProps.text,
            image: nextProps.image
        },()=>{
            this.show()
        });
    }

    // 组件方式
    showText(text, onDismiss){
        this.onDismiss = onDismiss
        this.setState({
            text
        },()=>{
            this.show()
        });
    }

    // 组件方式
    showImage(text, image, onDismiss){
        this.onDismiss = onDismiss
        this.setState({
            text,
            image
        },()=>{
            this.show()
        });
    }

    show(){
        this.setState({
            isShow: true,
        });

        // 重置计时器
        this.timer && clearTimeout(this.timer);

        if(this.showState){
            this.close();
            return
        }

        Animated.timing(
            this.state.opacityValue,
            {
                toValue: 1,
                duration: this.props.duration,
            }
        ).start(()=>{

            this.close();
            this.showState = true
        })
    }

    close(){

        this.timer = setTimeout(()=>{
            Animated.timing(
                this.state.opacityValue,
                {
                    toValue: 0,
                    duration: this.props.duration,
                }
            ).start(()=>{

                this.setState({
                    isShow: false
                },()=>{
                    this.showState = false;
                    if (typeof this.props.onDismiss === 'function'){
                        this.props.onDismiss()
                    }
                    if (typeof this.onDismiss === 'function'){
                        this.onDismiss()
                    }
                })
            })
        },this.props.delay)
    }

    render() {
        return Render.render.call(this);
    }
}
Toast.propsType = {
    text: PropTypes.string, // 标题
    image:PropTypes.oneOf(['success','warning','error','problem']), // 图片
    duration: PropTypes.number, // 动画效果持续时间
    delay:PropTypes.number, // toast 显示时间
    textStyle: PropTypes.object, // 自定义文本 style
    viewStyle: PropTypes.object, // 自定义view style
    onDismiss: PropTypes.func,
    showType: PropTypes.oneOf(['api','component']), // warning：调用方式，外界无需操作此参数 (api方式、组件方式)
};
Toast.defaultProps = {
    text: '',
    image: '',
    duration: 250,
    delay: 3000,
    showType: 'component'
};
