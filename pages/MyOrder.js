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
    ListView,
    Platform,
    FlatList
} from 'react-native';

import Title from '../components/Title'
import AlreadyOrderCell from '../components/AlreadyOrderCell'
import OrderSearch from './OrderSearch'
import style from '../assets/style/common'
import Mock from "mockjs";

export default class MyOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleData: {
                title: '我的订阅'
            },
            mainData: [],
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }

        this.jump = this.jump.bind(this)
        this.renderAlreadyOrderCell = this.renderAlreadyOrderCell.bind(this)
        this.renderMainDataItem = this.renderMainDataItem.bind(this)
        this.mainScrollEndReached = this.mainScrollEndReached.bind(this)
    }

    componentDidMount() {
        let data = this.state.mainData
        this.setState({dataSource: this.state.dataSource.cloneWithRows(data), mainData: this.getMockData()})
    }

    renderRow(data) {
        return (
            <AlreadyOrderCell data={data}/>
        )
    }

    // 渲染已经订阅块
    renderAlreadyOrderCell() {
        let data = this.state.mainData
        let arr = []
        data.map((msg, i) => {
            arr.push(
                <AlreadyOrderCell key={i} data={msg}/>
            )
        })

        return arr
    }


    // 跳转
    jump() {
        this.props.navigator.push({
            component: OrderSearch
        })
    }

    getMockData() {
        let data = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|20': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                id: '@id',
                name: '@cname',
                info: '@ctitle(10,50)',
                num: '@integer(0,10000)',
                time: '@time("HH:mm")',
                url: require('../assets/images/demo5.jpg')
            }]
        }).list
        return data
    }

    renderMainDataKey(item, index) {
        return index
    }

    renderMainDataItem({item, index}) {
        return (<AlreadyOrderCell key={index} index={index} data={item}/>)
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
                <Title navigator={this.props.navigator} data={this.state.titleData}/>
                <ScrollView>
                    <View style={{paddingLeft: 10, paddingRight: 10}}>
                        <TouchableOpacity style={styles.searchWrap} onPress={this.jump}>
                            <View style={styles.addWrap}>
                                <View style={styles.horLine}/>
                                <View style={styles.verLine}/>
                            </View>
                            <Text style={{color: '#ea303d', fontSize: 14}}>添加更多订阅号</Text>
                        </TouchableOpacity>
                    </View>
                    {/*<View style={{paddingLeft: 10, paddingRight: 10}}>*/}
                    {/*{this.renderAlreadyOrderCell()}*/}
                    {/*</View>*/}
                    <FlatList
                        style={{paddingLeft: 10, paddingRight: 10}}
                        data={this.state.mainData}
                        keyExtractor={this.renderMainDataKey}
                        renderItem={this.renderMainDataItem}
                        onEndReachedThreshold={0.95}
                        onEndReached={this.mainScrollEndReached}
                        refreshing={true}
                    />

                    {/*<ListView*/}
                    {/*dataSource={this.state.dataSource}*/}
                    {/*renderRow={this.renderRow}*/}
                    {/*contentContainerStyle={styles.listViewContainer}*/}
                    {/*/>*/}
                </ScrollView>

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
    searchWrap: {
        height: 30,
        borderRadius: 15,
        borderColor: '#ea303d',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    addWrap: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ea303d',
        marginRight: 5
    },
    horLine: {
        position: 'absolute',
        left: 2,
        top: 6.5,
        width: 10,
        height: 1,
        backgroundColor: '#ea303d'
    },
    verLine: {
        position: 'absolute',
        left: 6.5,
        top: 2,
        width: 1,
        height: 10,
        backgroundColor: '#ea303d'
    },
    listViewContainer: {
        paddingLeft: 10,
        paddingRight: 10
    }
})