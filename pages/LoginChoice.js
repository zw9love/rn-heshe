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
    Dimensions, Platform,
} from 'react-native';

let {width, height, scale} = Dimensions.get('window');
let marginLeft = (width - 200) / 5

import Title from '../components/Title'
import PhoneLogin from './PhoneLogin'
import style from '../assets/style/common'

export default class LoginChoice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleData: {
                title: '选择登录方式'
            },
            mainData: [
                {name: '新浪微博', url: require('../assets/images/share_weibo.png')},
                {name: '微信好友', url: require('../assets/images/share_wechat.png')},
                {name: 'QQ', url: require('../assets/images/share_qq.png')},
                {name: '手机号', url: require('../assets/images/share_phone.png')},
            ]
        }

        this.jump = this.jump.bind(this)
    }

    jump() {
        this.props.navigator.push({
            component: PhoneLogin
        })
    }

    renderChoiceCell() {
        let data = this.state.mainData
        let arr = []
        data.map((msg, i) => {
            if (i === data.length - 1) {
                arr.push(
                    <TouchableOpacity key={i} style={styles.choiceCell} onPress={this.jump}>
                        <Image source={msg.url} style={styles.choiceImage}/>
                        <Text style={styles.choiceTxt}>{msg.name}</Text>
                    </TouchableOpacity>
                )
            } else {
                arr.push(
                    <TouchableOpacity key={i} style={styles.choiceCell}>
                        <Image source={msg.url} style={styles.choiceImage}/>
                        <Text style={styles.choiceTxt}>{msg.name}</Text>
                    </TouchableOpacity>
                )
            }
        })

        return arr
    }

    render() {
        return (
            <View style={styles.container}>
                <Title navigator={this.props.navigator} data={this.state.titleData}/>
                <View style={styles.mainWrap}>
                    <Text style={styles.methodTxt}>选择登录方式</Text>
                    <View style={styles.choiceWrap}>
                        {this.renderChoiceCell()}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: style.marginTop
    },
    mainWrap: {
        height: height - 50,
        // backgroundColor:'yellow',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    choiceWrap: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        borderColor: '#e8e8e8',
        borderWidth: 1,
        // backgroundColor:'skyblue'
    },
    choiceCell: {
        alignItems: 'center',
        marginLeft: marginLeft
    },
    choiceImage: {
        width: 50,
        height: 50
    },
    choiceTxt: {
        fontSize: 12
    },
    methodTxt: {
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
        fontSize: 14,
        // backgroundColor:'yellow'
    }
})