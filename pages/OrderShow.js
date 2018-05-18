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
    Platform
} from 'react-native';

let {width, height, scale} = Dimensions.get('window');

import Title from '../components/Title'
import RecommendCell from '../components/RecommendCell'
import ModalTxt from '../components/ModalTxt'
import style from '../assets/style/common'

export default class OrderShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleData: {
                title: this.props.name
            },
            reCommentData: [
                {orderName: '时尚芭莎', title: '卡通人物客串super modal 这样很disney', eyes: '267', msgs: '78'},
                {orderName: '男人装', title: '除了小白裙，你还可以这样穿这些白色过夏天', eyes: '342', msgs: '261'},
                {orderName: '男人装', title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来1', eyes: '666', msgs: '888'},
                {orderName: '男人装', title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来2', eyes: '777', msgs: '999'},
                {orderName: '男人装', title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来3', eyes: '888', msgs: '111'},
                {orderName: '男人装', title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来4', eyes: '999', msgs: '378'},
                {orderName: '男人装', title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来5', eyes: '123', msgs: '456'},
                {orderName: '时尚芭莎', title: '卡通人物客串super modal 这样很disney', eyes: '267', msgs: '78'},
                {orderName: '男人装', title: '除了小白裙，你还可以这样穿这些白色过夏天', eyes: '342', msgs: '261'},
                {orderName: '男人装', title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来1', eyes: '666', msgs: '888'},
                {orderName: '男人装', title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来2', eyes: '777', msgs: '999'},
                {orderName: '男人装', title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来3', eyes: '888', msgs: '111'},
                {orderName: '男人装', title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来4', eyes: '999', msgs: '378'},
                {orderName: '男人装', title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来5', eyes: '123', msgs: '456'},
            ],
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            orderActive: false,
            orderAlready: false,
            modalTxt: ''
        }

        this.beOrder = this.beOrder.bind(this)
        this.renderRecommendCell = this.renderRecommendCell.bind(this)
    }

    componentDidMount() {
        let data = this.state.reCommentData
        this.setState({dataSource: this.state.dataSource.cloneWithRows(data)})
        this.count = 1;
        this.lock = false;
        this.timer = null
    }

    // 点击订阅
    beOrder() {

        if (this.lock) return
        this.lock = true
        if (this.count % 2) {
            this.setState({orderActive: true, modalTxt: '已订阅'})
            this.timer = setTimeout(() => {
                this.setState({orderActive: false})
                this.lock = false
            }, 2500)
        } else {
            this.setState({orderActive: true, modalTxt: '已取消订阅'})
            this.timer = setTimeout(() => {
                this.setState({orderActive: false})
                this.lock = false
            }, 2500)
        }
        this.count++
        this.setState({orderAlready: !this.state.orderAlready})
    }

    //渲染订阅块
    renderOrder() {
        if (this.state.orderAlready) {
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

    renderRow(data) {
        return (
            <RecommendCell data={data}/>
        )
    }

    // 渲染推荐块
    renderRecommendCell() {
        let data = this.state.reCommentData
        let arr = []
        data.map((msg, i) => {
            arr.push(
                <RecommendCell key={i} data={msg}/>
            )
        })

        return arr
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
        let orderStyle = this.state.orderAlready ? {borderColor: '#ccc'} : {}
        return (
            <View style={styles.container}>
                <Title navigator={this.props.navigator} data={this.state.titleData}/>
                <ScrollView>
                    <View style={styles.header}>
                        <Image source={this.props.url} style={styles.headerImage}/>
                        <TouchableOpacity style={[styles.btnWrap, orderStyle]} onPress={this.beOrder}>
                            {this.renderOrder()}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleWrap}>
                        <Text>{this.state.titleData.title}</Text>
                    </View>
                    <View style={styles.mainWrap}>
                        <Text
                            style={styles.mainTxt}>观察者网集新闻传播与人文社科学术研究为一体，反映当下中国及全球化背景下的各种思潮的碰撞交锋；尤其侧重于中国崛起过程中境内外观察者网集新闻传播与人文社科学术研究为一体，反映当下中国及全球化背景下的各种思潮的碰撞交锋；尤其侧重于中国崛起过程中境内外</Text>
                    </View>
                    <View style={{paddingLeft: 10, paddingRight: 10}}>
                        {this.renderRecommendCell()}
                    </View>
                    {/*<ListView*/}
                    {/*dataSource={this.state.dataSource}*/}
                    {/*renderRow={this.renderRow}*/}
                    {/*contentContainerStyle={styles.listViewContainer}*/}
                    {/*/>*/}
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
    header: {
        alignItems: 'center',
        marginTop: 10
    },
    headerImage: {
        width: 60,
        height: 60,
        borderRadius: 35
    },
    btnWrap: {
        width: 60,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e92230',
        position: 'absolute',
        right: 10,
        top: 18,
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
    },
    titleWrap: {
        marginTop: 10,
        alignItems: 'center',
    },
    mainWrap: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
    },
    mainTxt: {
        color: '#999',
        fontSize: 14,
        lineHeight: 24,
        borderColor: '#e8e8e8',
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    listViewContainer: {
        paddingLeft: 10,
        paddingRight: 10
    }
})