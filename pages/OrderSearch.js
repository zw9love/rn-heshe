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
    Image,
    Dimensions,
    Platform,
    FlatList
} from 'react-native';

import SearchTitle from '../components/SearchTitle'
import OrderCell from '../components/OrderCell'
import ModalTxt from '../components/ModalTxt'
import style from '../assets/style/common'
import Mock from "mockjs"

export default class MyOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchData: {
                searchName: '搜索尚阅号'
            },
            mainData: [],
            orderActive: false,
            modalTxt: ''
        }

        this.renderOrderCell = this.renderOrderCell.bind(this)
        this.renderModalTxt = this.renderModalTxt.bind(this)
        this.renderMainDataItem = this.renderMainDataItem.bind(this)
        this.mainScrollEndReached = this.mainScrollEndReached.bind(this)
    }

    // 挂载完成
    componentWillMount() {
        // 现在是一个锁要控制全部OrderCell 只能把lock放在父组件上 每个cell都有一个lock是不符合逻辑的
        this.count = 1
        this.lock = false
        this.timer = null
        this.setState({mainData: this.getMockData()})
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

    getMockData() {
        let data = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|20': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                id: '@id',
                name: '@cname',
                info: '@ctitle(10,50)',
                // eyes: '@integer(0,10000)',
                // msgs: '@integer(0,10000)',
                url: require('../assets/images/demo1.jpg')
            }]
        }).list
        return data
    }

    renderMainDataKey(item, index) {
        return item.id
    }

    renderMainDataItem({item, index}) {
        return (<OrderCell key={index} index={index} data={item} parent={this}/>)
    }

    mainScrollEndReached() {
        if (!this.refreshLock) {
            this.refreshLock = true
            this.setState({mainData: this.state.mainData.concat(this.getMockData())})
            this.refreshLock = false
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <SearchTitle navigator={this.props.navigator} data={this.state.searchData}/>
                {/*<ScrollView style={styles.mainWrap}>*/}
                {/*{this.renderOrderCell()}*/}
                {/*</ScrollView>*/}
                <FlatList
                    style={styles.mainWrap}
                    data={this.state.mainData}
                    keyExtractor={this.renderMainDataKey}
                    renderItem={this.renderMainDataItem}
                    onEndReachedThreshold={0.95}
                    onEndReached={this.mainScrollEndReached}
                    refreshing={true}
                />
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