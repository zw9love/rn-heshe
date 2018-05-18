/**
 * Created by zw9love on 2017/5/1.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
    StatusBar,
    Animated,
    Easing,
} from 'react-native';

let {width, height, scale} = Dimensions.get('window');

// 模态框文字组件
export default class ModalTxt extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fadeInOpacity: new Animated.Value(0),
            duration: 500
        }
        this.modalAnimate = this.modalAnimate.bind(this)
    }

    // 挂载完成的时候触发动画
    componentWillMount() {
        let action = {type: 'setModalTxt', value: this}
        this.context.store.dispatch(action)
        this.modalAnimate(1)
    }

    // 组件移除的时候清除定时器
    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    // 必须声明这玩意 子组件才能拿到store
    static contextTypes = {
        store: React.PropTypes.object.isRequired    // 子组件的  contextTypes 必须声明 这句很重要
    }

    // modal动画方法
    modalAnimate(val) {
        Animated.timing(this.state.fadeInOpacity, {
            toValue: val, // 目标值
            duration: this.state.duration, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start();

        // 如果是显示，2000之后让它消失
        if (val == 1) {
            this.timer = setTimeout(() => {
                this.modalAnimate(0)
            }, 1500)
        }
    }

    render() {
        return (
            <Animated.View style={[styles.modalWrap, {
                opacity: this.state.fadeInOpacity
            }]}>
                <Text style={styles.modalTxt}>{this.props.info}</Text>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    modalWrap: {
        position: 'absolute',
        left: width * 0.7 / 2,
        top: (height - 40) / 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.3,
        height: 40,
        backgroundColor: 'rgba(0,0,0,.5)',
        borderRadius: 5
    },
    modalTxt: {
        color: '#fff',
        fontSize: 14
    },
})