/**
 * Created by zw9love on 2017/4/29.
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
} from 'react-native';

let {width, height, scale} = Dimensions.get('window');

import OrderShow from '../pages/OrderShow'

export default class MyOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderActive: false
        }
        this.beOrder = this.beOrder.bind(this)
        this.jump = this.jump.bind(this)
        this.renderOrder = this.renderOrder.bind(this)
    }

    // 挂载完成
    componentDidMount() {
        this.count = 1
        this.lock = false
    }

    // 跳转
    jump() {
        let nav = this.context.store.getState().myNavigator;
        nav.push({
            component: OrderShow,
            passProps: this.props.data
        })
    }

    // 必须声明这玩意 子组件才能拿到store
    static contextTypes = {
        store: React.PropTypes.object.isRequired    // 子组件的  contextTypes 必须声明 这句很重要
    }

    // 点击订阅
    beOrder() {
        let obj = this.props.parent
        if (obj.lock) return
        obj.lock = true
        if (this.count % 2) {
            obj.setState({orderActive: true, modalTxt: '已订阅'})
            obj.timer = setTimeout(() => {
                obj.setState({orderActive: false})
                obj.lock = false
            }, 2500)
        } else {
            obj.setState({orderActive: true, modalTxt: '已取消订阅'})
            obj.timer = setTimeout(() => {
                obj.setState({orderActive: false})
                obj.lock = false
            }, 2500)
        }
        this.count++
        this.setState({orderActive: !this.state.orderActive})
    }

    renderOrder() {
        if (this.state.orderActive) {
            return (
                <View style={styles.alreadyWrap}>
                    <Text style={styles.alreadyTxt}>已订阅</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.unAlreadyWrap}>
                    <View style={styles.lineHor}></View>
                    <View style={styles.lineVer}></View>
                    <Text style={styles.orderTxt}>订阅</Text>
                </View>
            )
        }
    }

    render() {
        let orderStyle = this.state.orderActive ? {borderColor: '#ccc'} : {}
        return (
            <View style={styles.container} onPress={this.jump}>
                <TouchableOpacity onPress={this.jump}>
                    <Image source={this.props.data.url} style={styles.orderImage}/>
                </TouchableOpacity>
                <View style={styles.txtWrap}>
                    <TouchableOpacity onPress={this.jump}>
                        <Text style={styles.nameTxt}>{this.props.data.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.jump}>
                        <Text style={styles.infoTxt} numberOfLines={1}>{this.props.data.info}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.btnWrap, orderStyle]} onPress={this.beOrder}>
                    {/*<View style={styles.unAlreadyWrap}>*/}
                    {/*<View style={styles.lineHor}></View>*/}
                    {/*<View style={styles.lineVer}></View>*/}
                    {/*<Text style={styles.orderTxt}>订阅</Text>*/}
                    {/*</View>*/}
                    {/*<View style={styles.alreadyWrap}>*/}
                    {/*<Text style={styles.alreadyTxt}>已订阅</Text>*/}
                    {/*</View>*/}
                    {this.renderOrder()}
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#e8e8e8'
    },
    orderImage: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 10
    },
    txtWrap: {
        width: width - 20 - 54 - 70,
        marginRight: 10
    },
    nameTxt: {
        color: '#333',
        fontSize: 13
    },
    infoTxt: {
        color: '#ccc',
        marginTop: 5,
        fontSize: 12
    },
    btnWrap: {
        width: 60,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e92230'
    },
    unAlreadyWrap: {
        width: 60,
        height: 22,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    orderTxt: {
        color: '#e92230',
        fontSize: 12,
        marginRight: 10
    },
    lineVer: {
        position: 'absolute',
        height: 8,
        width: 1,
        backgroundColor: '#e92230',
        left: 13.5,
        top: 7
    },
    lineHor: {
        position: 'absolute',
        width: 8,
        height: 1,
        backgroundColor: '#e92230',
        left: 10,
        top: 10.5
    },
    alreadyWrap: {
        width: 60,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alreadyTxt: {
        color: '#ccc',
        fontSize: 12
    }
})

