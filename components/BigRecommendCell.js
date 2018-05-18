/**
 * Created by zw9love on 2017/5/1.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';

let {width, height, scale} = Dimensions.get('window');

import Show from '../pages/Show'

export default class BigRecommendCell extends Component {
    constructor(props) {
        super(props)
        this.jumpShow = this.jumpShow.bind(this)
    }

    //跳转show页面
    jumpShow() {
        let nav = this.context.store.getState().myNavigator;
        nav.push({
            component: Show,
            passProps: this.props.data
        })
    }

    // 必须声明这玩意 子组件才能拿到store
    static contextTypes = {
        store: React.PropTypes.object.isRequired    // 子组件的  contextTypes 必须声明 这句很重要
    }


    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.titleWrap} onPress={this.jumpShow}>
                    <Text style={styles.titleTxt}>{this.props.data.title}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.jumpShow}>
                    <Image source={this.props.data.url || require('../assets/images/b1.jpg')} style={styles.bigImage}/>
                </TouchableOpacity>
                <View style={styles.bottomWrap}>
                    <View style={styles.iconWrap}>
                        <View style={styles.leftIconWrap}>
                            <TouchableOpacity>
                                <Image source={require('../assets/images/eyes.png')} style={styles.eyesIcon}/>
                            </TouchableOpacity>
                            <Text style={styles.number}>{this.props.data.eyes}</Text>
                        </View>
                        <View style={styles.rightIconWrap}>
                            <TouchableOpacity>
                                <Image source={require('../assets/images/msg.png')} style={styles.msgIcon}/>
                            </TouchableOpacity>
                            <Text style={styles.number}>{this.props.data.msgs}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.orderNameWrap}>
                        <Text style={styles.orderName}>{this.props.data.orderName}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: '#e8e8e8'
    },
    titleWrap: {
        marginTop: 10,
        marginBottom: 10
    },
    titleTxt: {
        color: '#333',
        fontSize: 14
    },
    bigImage: {
        width: width - 20,
        height: (width - 20) * 0.68
    },
    bottomWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10
    },
    iconWrap: {
        flexDirection: 'row',
    },
    leftIconWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightIconWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    eyesIcon: {
        width: 14,
        height: 8
    },
    msgIcon: {
        width: 12,
        height: 10
    },
    number: {
        color: '#666',
        fontSize: 10,
        marginLeft: 5
    },
    orderNameWrap: {},
    orderName: {
        fontSize: 12,
        color: '#999'
    }
})