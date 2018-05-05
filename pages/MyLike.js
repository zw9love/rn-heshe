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
    StatusBar, Platform
} from 'react-native';

import {connect} from 'react-redux'

import Title from '../components/Title'
import RecommendCell from '../components/RecommendCell'
import Modal from '../components/Modal'

class MyLike extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleData: {
                title: '我的收藏',
                edit: true
            },
            mainData: [
                {
                    orderName: '时尚芭莎',
                    title: '卡通人物客串super modal 这样很disney',
                    eyes: '267',
                    msgs: '78',
                    url: require('../assets/images/demo1.jpg')
                },
                {
                    orderName: '男人装',
                    title: '除了小白裙，你还可以这样穿这些白色过夏天',
                    eyes: '342',
                    msgs: '261',
                    url: require('../assets/images/demo2.jpg')
                },
                {
                    orderName: '男人装',
                    title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来1',
                    eyes: '666',
                    msgs: '888',
                    url: require('../assets/images/demo3.jpg')
                },
                {
                    orderName: '男人装',
                    title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来2',
                    eyes: '777',
                    msgs: '999',
                    url: require('../assets/images/demo4.jpg')
                },
                {
                    orderName: '男人装',
                    title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来3',
                    eyes: '888',
                    msgs: '111',
                    url: require('../assets/images/demo5.jpg')
                },
                {
                    orderName: '男人装',
                    title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来4',
                    eyes: '999',
                    msgs: '378',
                    url: require('../assets/images/demo1.jpg')
                },
                {
                    orderName: '男人装',
                    title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来5',
                    eyes: '123',
                    msgs: '456',
                    url: require('../assets/images/demo2.jpg')
                },
                {
                    orderName: '男人装',
                    title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来5',
                    eyes: '456',
                    msgs: '456',
                    url: require('../assets/images/demo3.jpg')
                },
            ],
            editAcitve: false,
            shadowActive: false
        }

        this.changeEditAcitve = this.changeEditAcitve.bind(this)
    }

    render() {
        return (
            <View style={styles.container}>
                <Title navigator={this.props.navigator} data={this.state.titleData}
                       changeEditAcitve={this.changeEditAcitve}/>
                <ScrollView style={styles.verticalScroll}>
                    {this.renderRecommendCell()}
                </ScrollView>
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
    }

    // 点击编辑按钮的方法
    changeEditAcitve() {
        this.setState({editAcitve: !this.state.editAcitve})
    }

    // 渲染RecommendCell块
    renderRecommendCell() {
        let data = this.state.mainData
        let arr = [];
        data.map((msg, i) => {
            let specialStyle = i == 0 ? {paddingTop: 0} : {}
            arr.push(
                <RecommendCell key={i} index={i} data={msg} specialStyle={specialStyle}
                               editAcitve={this.state.editAcitve}/>
            )
        })

        return arr
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: Platform.OS === 'android' ? 0 : 10
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
