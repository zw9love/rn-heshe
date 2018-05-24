/**
 * Created by zw9love on 2017/4/28.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform
} from 'react-native';

import Title from '../components/Title'
import style from '../assets/style/common'

export default class MyOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleData: {
                title: '意见反馈'
            },
            btnAble: {},
            btnAbleTxt: {}
        }
        this.info = this.info.bind(this)
        this.concatInfo = this.concatInfo.bind(this)
        this.checkInfo = this.checkInfo.bind(this)
    }

    componentDidMount() {
        this.txt1 = '';
        this.txt2 = '';
    }

    // 检测信息是否合格
    checkInfo() {
        // 手机正则
        let check1 = this.txt1.trim() && /^1[34578]\d{9}$/.test(this.txt2)
        // qq正则
        let check2 = this.txt1.trim() && /^[1-9]\\d{4,10}$/.test(this.txt2)
        // 邮箱正则
        let check3 = this.txt1.trim() && /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(this.txt2)

        // 符合一个就行
        if (check1 || check2 || check3) {
            this.setState({btnAble: {backgroundColor: '#e92230'}, btnAbleTxt: {color: '#fff'}})
        } else {
            this.setState({btnAble: {}, btnAbleTxt: {}})
        }
    }

    // 意见建议信息
    info(val) {
        this.txt1 = val
        this.checkInfo();
    }

    // 联系信息
    concatInfo(val) {
        this.txt2 = val
        this.checkInfo();
    }

    render() {
        return (
            <View style={styles.container}>
                <Title navigator={this.props.navigator} data={this.state.titleData}/>
                <View style={styles.mainWrap}>
                    <View style={styles.infoWrap}>
                        <TextInput style={styles.txt1}
                                   underlineColorAndroid="transparent"
                                   placeholder="请留下您的宝贵意见..."
                                   placeholderTextColor="#ccc"
                                   onChangeText={this.info}
                                   clearButtonMode='always'
                                   multiline={true}
                        />
                    </View>

                    <View style={styles.concatWrap}>
                        <TextInput
                            style={styles.txt2}
                            underlineColorAndroid="transparent"
                            placeholder="联系方式：QQ、邮箱或手机"
                            placeholderTextColor="#ccc"
                            onChangeText={this.concatInfo}
                            clearButtonMode='always'
                        />
                    </View>

                    <View style={{marginTop: 5, paddingLeft: 10, paddingRight: 10}}>
                        <Text style={{color: '#ccc', fontSize: 10}}>您的联系方式有助于我们沟通和解决问题，仅工作人员可见</Text>
                    </View>
                    <TouchableOpacity style={[styles.btnWrap, this.state.btnAble]}>
                        <Text style={[{color: '#999'}, this.state.btnAbleTxt]}>提交</Text>
                    </TouchableOpacity>
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
        paddingRight: 10,
        marginTop: 15
    },
    infoWrap: {
        height: 200,
        // backgroundColor:'yellow',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    txt1: {
        height: 200,
        textAlignVertical: 'top',
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 12,
        paddingVertical: 0
    },
    concatWrap: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingLeft: 10,
        paddingRight: 10,
    },
    txt2: {
        fontSize: 12,
        height: 60,
        width: '100%',
        paddingVertical: 0
        // backgroundColor:'green'
    },
    btnWrap: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#eee',
        marginTop: 15
    }
})