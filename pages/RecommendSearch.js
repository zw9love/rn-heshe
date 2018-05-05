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
    Platform
} from 'react-native';

import SearchTitle from '../components/SearchTitle'
import RecommendCell from '../components/RecommendCell'
import style from '../assets/style/common'

export default class MyOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchData: {
                searchName: '搜索'
            },
            mainData: [
                {
                    orderName: '时尚芭莎1',
                    title: '卡通人物客串super modal 这样很disney',
                    eyes: '267',
                    msgs: '78',
                    url: require('../assets/images/demo1.jpg')
                },
                {
                    orderName: '男人装1',
                    title: '除了小白裙，你还可以这样穿这些白色过夏天',
                    eyes: '342',
                    msgs: '261',
                    url: require('../assets/images/demo2.jpg')
                },
                {
                    orderName: '时尚芭莎2',
                    title: '卡通人物客串super modal 这样很disney',
                    eyes: '267',
                    msgs: '78',
                    url: require('../assets/images/demo3.jpg')
                },
                {
                    orderName: '男人装2',
                    title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来1',
                    eyes: '666',
                    msgs: '888',
                    url: require('../assets/images/demo4.jpg')
                },
                {
                    orderName: '时尚芭莎3',
                    title: '卡通人物客串super modal 这样很disney',
                    eyes: '267',
                    msgs: '78',
                    url: require('../assets/images/demo5.jpg')
                },
                {
                    orderName: '男人装3',
                    title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来2',
                    eyes: '777',
                    msgs: '999',
                    url: require('../assets/images/demo1.jpg')
                },
                {
                    orderName: '时尚芭莎4',
                    title: '卡通人物客串super modal 这样很disney',
                    eyes: '267',
                    msgs: '78',
                    url: require('../assets/images/demo2.jpg')
                },
                {
                    orderName: '男人装4',
                    title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来3',
                    eyes: '888',
                    msgs: '111',
                    url: require('../assets/images/demo3.jpg')
                },
                {
                    orderName: '时尚芭莎5',
                    title: '卡通人物客串super modal 这样很disney',
                    eyes: '267',
                    msgs: '78',
                    url: require('../assets/images/demo4.jpg')
                },
                {
                    orderName: '男人装5',
                    title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来4',
                    eyes: '999',
                    msgs: '378',
                    url: require('../assets/images/demo5.jpg')
                },
                {
                    orderName: '时尚芭莎6',
                    title: '卡通人物客串super modal 这样很disney',
                    eyes: '267',
                    msgs: '78',
                    url: require('../assets/images/demo1.jpg')
                },
                {
                    orderName: '男人装6',
                    title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来5',
                    eyes: '123',
                    msgs: '456',
                    url: require('../assets/images/demo2.jpg')
                },
            ]
        }

        this.renderRecommendCell = this.renderRecommendCell.bind(this)
    }

    // 挂载完成
    componentWillMount() {

    }


    // 渲染订阅cell
    renderRecommendCell() {
        let data = this.state.mainData;
        let arr = []
        data.map((msg, i) => {
            arr.push(
                <RecommendCell key={i} data={msg}/>
            )
        })

        return arr;
    }


    render() {
        return (
            <View style={styles.container}>
                <SearchTitle navigator={this.props.navigator} data={this.state.searchData}/>
                <ScrollView style={styles.mainWrap}>
                    {this.renderRecommendCell()}
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
    mainWrap: {
        paddingLeft: 10,
        paddingRight: 10
    }
})