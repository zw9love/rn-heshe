/**
 * Created by zw9love on 2017/4/29.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated,
    Easing,
    StatusBar,
    Platform
} from 'react-native';
import {getNeedMargin} from '../assets/util/index'

let {width, height, scale} = Dimensions.get('window');

export default class MyOrder extends Component {
    constructor(props) {
        super(props);
        this.sure = this.sure.bind(this)
        this.cancel = this.cancel.bind(this)
        this.modalAnimate = this.modalAnimate.bind(this)
        this.state = {
            fadeInOpacity: new Animated.Value(0),
            duration: 200
        }
    }

    // 点击确定按钮方法
    sure() {
        this.modalAnimate(0);
        this.timer = setTimeout(() => {
            this.props.obj.setState({shadowActive: false})
        }, this.state.duration)
        // 如果delete为真 则继续删除
        if (!this.props.delete) return
        let index = this.context.store.getState().indexReducer
        let obj = this.context.store.getState().mySetThisReducer
        // console.log(obj)
        console.log(index)
        // let arr = obj.state.mainData
        let list = []
        obj.state.mainData.splice(index, 1)
        list = list.concat(obj.state.mainData)
        obj.setState({mainData: list})
    }

    // 点击取消按钮方法
    cancel() {
        // let obj = this.context.store.getState().myLikeReducer
        // obj.setState({shadowActive:false})
        this.modalAnimate(0);
        this.timer = setTimeout(() => {
            // let obj = this.context.store.getState().myLikeReducer
            this.props.obj.setState({shadowActive: false})
        }, this.state.duration)
    }

    // 挂载完成的时候触发动画
    componentDidMount() {
        this.modalAnimate(1);
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
    }

    render() {
        return (
            <Animated.View style={[styles.shadowWrap, {
                opacity: this.state.fadeInOpacity
            }]}>
                {/*StatusBar组件*/}
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'rgba(0,0,0,0)'}
                    translucent={true}
                    //barStyle='light-content'
                    showHideTransition={'fade'}
                />
                <View style={styles.modalWrap}>
                    <View style={styles.modalTop}>
                        <Text style={{fontSize: 14, color: '#333'}}>是否{this.props.info}</Text>
                    </View>
                    <View style={styles.modalBottom}>
                        <TouchableOpacity style={styles.modalBtnLeft} onPress={this.sure}>
                            <Text style={{fontSize: 14, color: '#e92230'}}>确定</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalBtnRight} onPress={this.cancel}>
                            <Text style={{fontSize: 14, color: '#e92230'}}>取消</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    shadowWrap: {
        width: width,
        height: height,
        position: 'absolute',
        left: 0,
        top: -getNeedMargin(),
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0,.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalWrap: {
        borderRadius: 10,
        width: width * 0.7,
        backgroundColor: '#fff'
    },
    modalTop: {
        height: 60,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'skyblue'
    },
    modalBottom: {
        height: 40,
        // backgroundColor:'yellow',
        flexDirection: 'row',
    },
    modalBtnLeft: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: '#ccc'
    },
    modalBtnRight: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})