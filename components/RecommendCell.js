/**
 * Created by Administrator on 2017/4/16.
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

export default class Recommend extends Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this)
        this.jumpShow = this.jumpShow.bind(this)
    }

    // 点击左侧删除按钮
    edit(index) {
        let obj = this.context.store.getState().mySetThisReducer
        obj.setState({shadowActive: true})
        let action = {type: 'setIndex', value: index}
        this.context.store.dispatch(action)
        // console.log(this.context.store.getState())
    }

    // 必须声明这玩意 子组件才能拿到store
    static contextTypes = {
        store: React.PropTypes.object.isRequired    // 子组件的  contextTypes 必须声明 这句很重要
    }

    // 渲染左侧删除块
    renderEdit() {
        return (
            <View style={styles.editWrap}>
                <TouchableOpacity style={styles.editBtn} onPress={() => {
                    this.edit(this.props.index)
                }}>
                    <View style={styles.editLine}>

                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    // 去详情页
    jumpShow() {
        let nav = this.context.store.getState().myNavigator;
        nav.push({
            component: Show,
            passProps: this.props.data
        })
    }

    render() {
        return (
            <View style={[styles.mainWrapper, this.props.specialStyle]}>
                {
                    this.props.editAcitve ? this.renderEdit() : null
                }
                <TouchableOpacity style={styles.leftWrapper} onPress={this.jumpShow}>
                    <Image source={this.props.data.url || require('../assets/images/p1.jpg')} style={styles.smallImg}/>
                </TouchableOpacity>
                <View style={styles.rightWrapper}>
                    <TouchableOpacity onPress={this.jumpShow}>
                        <Text numberOfLines={2} style={styles.right_Top}>
                            {this.props.data.title}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.right_Middle}>
                            #{this.props.data.orderName}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.right_Bottom}>
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
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8'
        // paddingLeft:10,
        // paddingRight:10
    },
    smallImg: {
        width: width / 2 - 10,
        height: width * 0.67 / 2
    },
    rightWrapper: {
        width: width / 2 - 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    right_Top: {
        color: '#333',
        fontSize: 14
    },
    right_Middle: {
        color: '#999',
        fontSize: 12,
        marginTop: 10,
    },
    right_Bottom: {
        flexDirection: 'row',
        marginTop: 10
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
    editWrap: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editBtn: {
        width: 26,
        height: 26,
        borderWidth: 1,
        borderColor: '#e92230',
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editLine: {
        width: 15,
        height: 1,
        backgroundColor: '#e92230'
    }
})