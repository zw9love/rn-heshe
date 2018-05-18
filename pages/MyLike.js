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
    StatusBar,
    Platform,
    FlatList
} from 'react-native';

import {connect} from 'react-redux'

import Title from '../components/Title'
import RecommendCell from '../components/RecommendCell'
import Modal from '../components/Modal'
import style from '../assets/style/common'
import Mock from "mockjs"

class MyLike extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleData: {
                title: '我的收藏',
                edit: true
            },
            mainData: [],
            editActive: false,
            shadowActive: false,
            refreshLock: false
        }

        this.changeEditActive = this.changeEditActive.bind(this)
        this.renderMainDataItem = this.renderMainDataItem.bind(this)
        this.mainScrollEndReached = this.mainScrollEndReached.bind(this)
    }

    render() {
        return (
            <View style={styles.container}>
                <Title navigator={this.props.navigator} data={this.state.titleData}
                       changeEditActive={this.changeEditActive}/>
                {/*<ScrollView style={styles.verticalScroll}>*/}
                    {/*{this.renderRecommendCell()}*/}
                {/*</ScrollView>*/}
                <FlatList
                    style={styles.verticalScroll}
                    data={this.state.mainData}
                    extraData={this.state.mainData}
                    keyExtractor={this.renderMainDataKey}
                    renderItem={this.renderMainDataItem}
                    onEndReachedThreshold={0.95}
                    onEndReached={this.mainScrollEndReached}
                    refreshing={true}
                />
                {
                    this.state.shadowActive ? <Modal obj={this} info="删除这条收藏" delete={true}/> : null
                }
            </View>
        )
    }

    // 挂载完成的时候把this存进去store
    componentDidMount() {
        const {setMyState} = this.props;
        setMyState(this);
        this.setState({mainData: this.getMockData()})
    }

    // 点击编辑按钮的方法
    changeEditActive() {
        let list = []
        // this.state.mainData.forEach(o => {o.editActive = !o.editActive})
        list = list.concat(this.state.mainData);
        this.setState({mainData: list, editActive: !this.state.editActive})
    }

    getMockData() {
        let data = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|8': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                id: '@id',
                orderName: '@cname',
                title: '@title(3, 5)',
                eyes: '@integer(0,10000)',
                msgs: '@integer(0,10000)',
                url: require('../assets/images/demo1.jpg')
                // editActive: false
                // url: "@pick(['../assets/images/demo1.jpg'" +
                // ", '../assets/images/demo2.jpg'" +
                // ", '../assets/images/demo3.jpg'" +
                // ", '../assets/images/demo4.jpg'" +
                // ", '../assets/images/demo5.jpg'])"
            }]
        }).list
        // console.log(data)
        return data
    }

    renderMainDataKey(item, index) {
        return item.id
    }

    renderMainDataItem({item, index}) {
        let specialStyle = index === 0 ? {paddingTop: 0} : {}
        return (<RecommendCell key={index} index={index} data={item} specialStyle={specialStyle} editActive={this.state.editActive}/>)
    }

    mainScrollEndReached() {
        if (!this.refreshLock) {
            this.refreshLock = true
            this.setState({mainData: this.state.mainData.concat(this.getMockData())})
            this.refreshLock = false
        }
    }

    // 渲染RecommendCell块
    renderRecommendCell() {
        let data = this.state.mainData
        let arr = [];
        data.map((msg, i) => {
            let specialStyle = i === 0 ? {paddingTop: 0} : {}
            arr.push(
                <RecommendCell key={i} index={i} data={msg} specialStyle={specialStyle}
                               editActive={this.state.editActive}/>
            )
        })

        return arr
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: style.marginTop
    },
    verticalScroll: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 15
    }
})

//这个还必须呀 我去
function mapStateToProps(state) {
    //console.log(state);
    return {
        shadowState: state.editShadowReducer
    }
}

// Map Redux actions to component props  负责输出逻辑
/*
 mapDispatchToProps的里面方法的调用会再次触发mapStateToProps
 */
function mapDispatchToProps(dispatch) {
    return {
        setMyState: (obj) => dispatch({type: 'setMyLike', value: obj}),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyLike);
