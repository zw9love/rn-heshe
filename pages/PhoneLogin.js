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
    Platform
} from 'react-native';

let {width, height, scale} = Dimensions.get('window');
let marginLeft = (width - 150) / 4

import Title from '../components/Title'
import style from '../assets/style/common'

export default class PhoneLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleData: {
                title: '手机号登录'
            },
            mainData: [
                {name: '新浪微博', url: require('../assets/images/share_weibo.png')},
                {name: '微信好友', url: require('../assets/images/share_wechat.png')},
                {name: 'QQ', url: require('../assets/images/share_qq.png')},
            ],
            verificationActive: false,
            btnActive: false,
            txt: '获取验证码'
        }

        this.phoneNumber = this.phoneNumber.bind(this)
        this.verificationNumber = this.verificationNumber.bind(this)
        this.verification = this.verification.bind(this)
        this.myReduce = this.myReduce.bind(this)
    }

    componentDidMount() {
        this.count = 60
        this.lock = false
        this.len = 0
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    renderChoiceCell() {
        let data = this.state.mainData
        let arr = []
        data.map((msg, i) => {
            arr.push(
                <TouchableOpacity key={i} style={styles.choiceCell}>
                    <Image source={msg.url} style={styles.choiceImage}/>
                    <Text style={styles.choiceTxt}>{msg.name}</Text>
                </TouchableOpacity>
            )
        })

        return arr
    }

    // 获取手机号码
    phoneNumber(val) {
        // 手机正则
        this.check = /^1[34578]\d{9}$/.test(val)

        if (this.len == 4 && this.check) {
            this.setState({btnActive: true})
        } else {
            this.setState({btnActive: false})
        }

        if (this.check && !this.lock) {
            this.setState({verificationActive: true})
        } else {
            this.setState({verificationActive: false})
        }
    }

    // 获取验证码
    verificationNumber(val) {
        this.len = val.length

        if (this.len == 4 && this.check) {
            this.setState({btnActive: true})
        } else {
            this.setState({btnActive: false})
        }
    }

    // 验证码每秒减1的方法
    myReduce() {
        let str = this.count + 'S'
        this.setState({txt: str, verificationActive: false})
        this.count--
        if (this.count < 0) {
            clearInterval(this.timer)
            this.lock = false
            this.setState({txt: '重新获取验证码', verificationActive: true})
            this.count = 60
        }
    }

    // 点击验证码按钮
    verification() {
        if (!this.state.verificationActive) return
        this.lock = true
        this.myReduce()
        this.timer = setInterval(() => {
            this.myReduce()
        }, 1000)
    }

    render() {
        let verificationAbleStyle = this.state.verificationActive ? {borderColor: '#e92230'} : {}
        let verificationTxtAbleStyle = this.state.verificationActive ? {color: '#e92230'} : {}
        let loginAbleStyle = this.state.btnActive ? {backgroundColor: '#e92230'} : {}
        let loginTxtAbleStyle = this.state.btnActive ? {color: '#fff'} : {}
        return (
            <View style={styles.container}>
                <Title navigator={this.props.navigator} data={this.state.titleData}/>
                <View style={styles.mainWrap}>
                    <View style={styles.txt1Wrap}>
                        <TextInput
                            style={styles.txt}
                            underlineColorAndroid="transparent"
                            placeholder="请输入手机号"
                            placeholderTextColor="#ccc"
                            maxLength={11}
                            keyboardType="numeric"
                            onChangeText={this.phoneNumber}
                            clearButtonMode='always'
                        />
                    </View>
                    <View style={styles.centerWrap}>
                        <View style={styles.txt2Wrap}>
                            <TextInput
                                style={styles.txt}
                                underlineColorAndroid="transparent"
                                placeholder="验证码"
                                placeholderTextColor="#ccc"
                                maxLength={4}
                                keyboardType="numeric"
                                onChangeText={this.verificationNumber}
                                clearButtonMode='always'
                            />
                        </View>
                        <TouchableOpacity style={[styles.rightBtnWrap, verificationAbleStyle]}
                                          onPress={this.verification}>
                            <Text style={[styles.rightBtnTxt, verificationTxtAbleStyle]}>{this.state.txt}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.loginBtnWrap, loginAbleStyle]}>
                        <Text style={[styles.loginBtnTxt, loginTxtAbleStyle]}>登录</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.otherWrap}>
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
        paddingLeft: 10,
        paddingRight: 10
    },
    txt1Wrap: {
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingLeft: 10,
        paddingRight: 10,
    },
    txt: {
        height: 72,
        fontSize: 12,
        width: '100%',
        paddingVertical: 0
    },
    centerWrap: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15
    },
    txt2Wrap: {
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#ccc',
        width: width - 20 - 10 - width / 3,
        paddingLeft: 10,
        paddingRight: 10
    },
    rightBtnWrap: {
        width: width / 3,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    rightBtnTxt: {
        color: '#ccc',
        fontSize: 12
    },
    loginBtnWrap: {
        height: 36,
        borderRadius: 18,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginBtnTxt: {
        color: '#999'
    },
    otherWrap: {
        flex: 1,
        // backgroundColor:'yellow',
        justifyContent: 'center',
        alignItems: 'center',
    },
    choiceWrap: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        // borderColor:'#e8e8e8',
        // borderWidth:1,
        // backgroundColor:'skyblue',
        width: width
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