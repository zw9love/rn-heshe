/**
 * Created by Administrator on 2017/4/28.
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
    Platform
} from 'react-native';

import SearchTitle from '../components/SearchTitle'
import OrderCell from '../components/OrderCell'
import ModalTxt from '../components/ModalTxt'
import style from '../assets/style/common'

export default class MyOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchData: {
                searchName: '搜索尚阅号'
            },
            mainData: [
                {
                    url: require('../assets/images/demo1.jpg'),
                    name: '观察者网1',
                    info: '简介：观察者网系首批获得国新办资质认可观察者网系首批获得国新办资质认可1'
                },
                {
                    url: require('../assets/images/demo2.jpg'),
                    name: '观察者网2',
                    info: '简介：观察者网系首批获得国新办资质认可观察者网系首批获得国新办资质认可2'
                },
                {
                    url: require('../assets/images/demo3.jpg'),
                    name: '观察者网3',
                    info: '简介：观察者网系首批获得国新办资质认可观察者网系首批获得国新办资质认可3'
                },
                {
                    url: require('../assets/images/demo4.jpg'),
                    name: '观察者网4',
                    info: '简介：观察者网系首批获得国新办资质认可观察者网系首批获得国新办资质认可4'
                },
                {
                    url: require('../assets/images/demo5.jpg'),
                    name: '观察者网5',
                    info: '简介：观察者网系首批获得国新办资质认可观察者网系首批获得国新办资质认可5'
                },
                {
                    url: require('../assets/images/demo1.jpg'),
                    name: '观察者网6',
                    info: '简介：观察者网系首批获得国新办资质认可观察者网系首批获得国新办资质认可6'
                },
                {
                    url: require('../assets/images/demo2.jpg'),
                    name: '观察者网7',
                    info: '简介：观察者网系首批获得国新办资质认可观察者网系首批获得国新办资质认可7'
                },
                {
                    url: require('../assets/images/demo3.jpg'),
                    name: '观察者网8',
                    info: '简介：观察者网系首批获得国新办资质认可观察者网系首批获得国新办资质认可8'
                },
                {
                    url: require('../assets/images/demo4.jpg'),
                    name: '观察者网9',
                    info: '简介：观察者网系首批获得国新办资质认可观察者网系首批获得国新办资质认可9'
                },
                {
                    url: require('../assets/images/demo5.jpg'),
                    name: '观察者网10',
                    info: '简介：观察者网系首批获得国新办资质认可观察者网系首批获得国新办资质认可10'
                },
            ],
            orderActive: false,
            modalTxt: ''
        }

        this.renderOrderCell = this.renderOrderCell.bind(this)
        this.renderModalTxt = this.renderModalTxt.bind(this)
    }

    // 挂载完成
    componentWillMount() {
        // 现在是一个锁要控制全部OrderCell 只能把lock放在父组件上 每个cell都有一个lock是不符合逻辑的
        this.count = 1;
        this.lock = false,
        this.timer = null
    }


    // 渲染订阅cell
    renderOrderCell() {
        let data = this.state.mainData;
        let arr = []
        data.map((msg, i) => {
            arr.push(
                <OrderCell key={i} data={msg} parent={this}/>
            )
        })

        return arr;
    }

    // 渲染模态框
    renderModalTxt() {
        if (this.state.orderActive) {
            return (
                <ModalTxt info={this.state.modalTxt}/>
            )
        } else {
            return null
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <SearchTitle navigator={this.props.navigator} data={this.state.searchData}/>
                <ScrollView style={styles.mainWrap}>
                    {this.renderOrderCell()}
                </ScrollView>
                {this.renderModalTxt()}
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
    }
})