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
    Dimensions, Platform,
} from 'react-native';

import Title from '../components/Title'
import CommentCell from '../components/CommentCell'
import Modal from '../components/Modal'
import style from '../assets/style/common'

export default class MyOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleData: {
                title: '我的评论',
                edit: true
            },
            mainData: [
                {
                    name: '张小二',
                    url: require('../assets/images/demo1.jpg'),
                    time: '刚刚',
                    like: 331,
                    msg: 21,
                    info: '天啊撸，为什么这套真丝“睡袍”套装穿她身上会这么仙美 贵族气！蓝色和桃粉色玫瑰印花飘散着甜美气息。1',
                    commentData: [
                        {name1: '一点咨询网友', name2: '', info: '这里都是游戏暗卫的名字还剩多少钱十年间耗时间节省时间。'},
                        {name1: '张小二', name2: '一点咨询网友', info: '这里都是游戏暗卫的名字还剩多少钱十年间耗时间节省时间。'},
                    ]
                },
                {
                    name: '张小二',
                    url: require('../assets/images/demo2.jpg'),
                    time: '一小时前',
                    like: 321,
                    msg: 313,
                    info: '天啊撸，为什么这套真丝“睡袍”套装穿她身上会这么仙美 贵族气！蓝色和桃粉色玫瑰印花飘散着甜美气息。2',
                    commentData: [
                        {name1: 'zw9love', name2: '', info: '这里都是游戏暗卫的名字还剩多少钱十年间耗时间节省时间。'},
                        {name1: '青衫衣旧', name2: '一点咨询网友', info: '这里都是游戏暗卫的名字还剩多少钱十年间耗时间节省时间。'},
                    ]
                },
                {
                    name: '张小二',
                    url: require('../assets/images/demo3.jpg'),
                    time: '两小时前',
                    like: 311,
                    msg: 121,
                    info: '天啊撸，为什么这套真丝“睡袍”套装穿她身上会这么仙美 贵族气！蓝色和桃粉色玫瑰印花飘散着甜美气息。3',
                    commentData: []
                },
                {
                    name: '张小二',
                    url: require('../assets/images/demo4.jpg'),
                    time: '三小时前',
                    like: 321,
                    msg: 565,
                    info: '天啊撸，为什么这套真丝“睡袍”套装穿她身上会这么仙美 贵族气！蓝色和桃粉色玫瑰印花飘散着甜美气息。4',
                    commentData: []
                },
                {
                    name: '张小二',
                    url: require('../assets/images/demo5.jpg'),
                    time: '六小时前',
                    like: 654,
                    msg: 321,
                    info: '天啊撸，为什么这套真丝“睡袍”套装穿她身上会这么仙美 贵族气！蓝色和桃粉色玫瑰印花飘散着甜美气息。5',
                    commentData: []
                },
            ],
            editActive: false,
            shadowActive: false
        }

        this.changeEditActive = this.changeEditActive.bind(this)
    }


    // 挂载完成的时候把this存进去store
    componentDidMount() {
        // console.log(this.context.store)
        let action = {type: 'setMyComment', value: this}
        this.context.store.dispatch(action)
    }

    // 点击编辑按钮的方法
    changeEditActive() {
        this.setState({editActive: !this.state.editActive})
    }

    // 必须声明这玩意 子组件才能拿到store
    static contextTypes = {
        store: React.PropTypes.object.isRequired    // 子组件的  contextTypes 必须声明 这句很重要
    }

    renderComment() {
        let data = this.state.mainData;
        let arr = [];
        data.map((msg, i) => {
            arr.push(
                <CommentCell key={i} index={i} data={msg} editActive={this.state.editActive}/>
            )
        })

        return arr;
    }


    render() {
        return (
            <View style={styles.container}>
                <Title navigator={this.props.navigator} data={this.state.titleData}
                       changeEditActive={this.changeEditActive}/>
                <ScrollView
                    style={{paddingLeft: 10, paddingRight: 10}}
                >
                    {this.renderComment()}
                </ScrollView>
                {
                    this.state.shadowActive ? <Modal obj={this} info="删除这条评论" delete={true}/> : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: style.marginTop
    }
})