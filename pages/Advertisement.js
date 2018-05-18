/**
 * Created by zw9love on 2017/4/23.
 */
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ToastAndroid,
    BackAndroid,
    Platform,
    StatusBar
} from 'react-native';
import TimerMixin from 'react-timer-mixin'

const Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');

import Home from './Home'
import style from '../assets/style/common'

export default React.createClass({
    mixins: [TimerMixin],
    componentWillMount() {
        //这里判不判断都行,IOS的BackAndroid为空
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
        //alert(888);
    },
    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    },
    onBackAndroid() {
        //alert(666);
        // if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //     //最近2秒内按过back键，可以退出应用。
        //     return false;
        // }
        // //console.log(this.props)
        this.lastBackPressed = Date.now();
        ToastAndroid.show('就不给你退出，必须给我看广告', ToastAndroid.SHORT);
        return true;
    },
    getInitialState() {
        return {
            time: 5
        }
    },
    render() {
        return (
            <View style={styles.container}>
                {/*StatusBar组件*/}
                <StatusBar
                    animated={true}
                    hidden={true}
                    //backgroundColor='#FF6100'
                    //translucent={true}
                    //barStyle='light-content'
                    //showHideTransition={'fade'}
                    //networkActivityIndicatorVisible={true}
                />
                <Image source={require('../assets/images/reba.jpg')} style={styles.image}/>
                <View style={styles.txtWrap}>
                    <TouchableOpacity onPress={this.jump}>
                        <Text style={styles.adver}>跳过广告</Text>
                    </TouchableOpacity>
                    <Text style={styles.restTime}>{this.state.time}</Text>
                </View>
            </View>
        )
    },
    componentDidMount() {
        this.num = this.state.time;
        this.timer = this.setInterval(() => {
            this.num--;
            if (this.num == -1) {
                this.clearInterval(this.timer);
                this.props.navigator.replace({
                    component: Home,
                    // passProps:{}  //传递过去的参数
                    // passProps:this.props.data
                })
            } else {
                this.setState({time: this.state.time - 1})
            }
        }, 1000)
    },
    jump() {
        this.clearInterval(this.timer);
        this.props.navigator.replace({
            component: Home
        })
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: width,
        height: height,
        // resizeMode:Image.resizeMode.contain,
    },
    txtWrap: {
        position: 'absolute',
        right: 20,
        top: 20 + style.marginTop,
        justifyContent: 'center',
        alignItems: 'center',
    },
    adver: {
        fontSize: 14,
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 6,
        borderRadius: 4
    },
    restTime: {
        fontSize: 12,
        color: '#fff',
        marginTop: 5
    }
})