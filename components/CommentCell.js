/**
 * Created by zw9love on 2017/4/29.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';

let {width, height, scale} = Dimensions.get('window');

export default class CommentCell extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likeNum: this.props.data.like,
            count: 0
        }
        this.myLike = this.myLike.bind(this)
        this.renderCommentInfo = this.renderCommentInfo.bind(this)
        this.edit = this.edit.bind(this)
        this.getInfoName = this.getInfoName.bind(this)
        this.myEditMsg = this.myEditMsg.bind(this)
        this.checkEditMsg = this.checkEditMsg.bind(this)
    }

    // 检查是否能评论
    checkEditMsg() {
        return this.props.editMsgActive
    }

    // 点击like按钮 likeNum+1
    myLike() {
        if (!this.checkEditMsg()) return
        if (this.state.count > 0) return
        this.setState({likeNum: this.state.likeNum + 1, count: this.state.count + 1})
    }

    // 点击msg按钮
    myEditMsg(index) {
        if (!this.checkEditMsg()) return
        let obj = this.context.store.getState().mySetThisReducer;
        obj.setState({editActive: true, defaultMsg: `我来说两句...`})
        let action = {type: 'setIndex', value: index}
        this.context.store.dispatch(action)
    }

    // 获取评论对象
    getInfoName(name) {
        if (!this.checkEditMsg()) return
        let obj = this.context.store.getState().mySetThisReducer;
        obj.setState({editActive: true, defaultMsg: `回复：${name}`})
        let action = {type: 'setIndex', value: this.props.index}
        this.context.store.dispatch(action)
    }

    // 渲染评论块
    renderCommentInfo() {
        let data = this.props.data.commentData;
        let arr = [];
        let len = data.length
        // 如果评论存在
        if (len > 0) {
            data.map((msg, i) => {
                // 如果name2存在
                if (msg.name2) {
                    let name1 = msg.name1 + '  '
                    let name2 = '  ' + msg.name2
                    arr.push(
                        <View key={i} style={styles.commentCellWrap}>
                            <TouchableOpacity onPress={() => {
                                this.getInfoName(name1)
                            }}>
                                <Text>
                                    <Text style={styles.nameStyle} onPress={() => {
                                        this.getInfoName(name1)
                                    }}>
                                        {name1}
                                    </Text>
                                    <Text style={[styles.otherStyle, {marginLeft: 5, marginRight: 5}]}>
                                        回复
                                    </Text>
                                    <Text style={styles.nameStyle} onPress={() => {
                                        this.getInfoName(name2)
                                    }}>
                                        {name2}：
                                    </Text>
                                    <Text style={[styles.otherStyle, styles.commentInfoStyle]}>
                                        {msg.info}
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                } else {
                    arr.push(
                        <View key={i} style={styles.commentCellWrap}>
                            <TouchableOpacity onPress={() => {
                                this.getInfoName(msg.name1)
                            }}>
                                <Text>
                                    <Text style={styles.nameStyle}>
                                        {msg.name1}：
                                    </Text>
                                    <Text style={[styles.otherStyle, styles.commentInfoStyle]}>
                                        {msg.info}
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

            })
        }

        return arr;

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

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.editActive ? this.renderEdit() : null
                }
                <View style={styles.infoWrap}>
                    <View style={styles.infoTopWrap}>
                        <View style={styles.infoTopWrap_left}>
                            <TouchableOpacity>
                                <Image source={this.props.data.url} style={{width: 48, height: 48, borderRadius: 24}}/>
                            </TouchableOpacity>
                            <View style={styles.nameAndTime}>
                                <TouchableOpacity>
                                    <Text style={{color: '#62b3ef', fontSize: 13}}>{this.props.data.name}</Text>
                                </TouchableOpacity>
                                <Text style={{color: '#999', fontSize: 12, marginTop: 5}}>{this.props.data.time}</Text>
                            </View>
                        </View>
                        <View style={styles.infoTopWrap_right}>
                            <View style={[styles.dataWrap, {marginRight: 20}]}>
                                <Text style={{marginRight: 5, fontSize: 12}}>{this.state.likeNum}</Text>
                                <TouchableOpacity onPress={this.myLike}>
                                    <Image source={require('../assets/images/like.png')}
                                           style={{width: 15, height: 16}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.dataWrap}>
                                <Text style={{marginRight: 5, fontSize: 12}}>{this.props.data.msg}</Text>
                                <TouchableOpacity onPress={() => {
                                    this.myEditMsg(this.props.index)
                                }}>
                                    <Image source={require('../assets/images/fix_msg.png')}
                                           style={{width: 16, height: 16}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.infoBottomWrap}>
                        <View style={{width: 58}}></View>
                        <View>
                            <TouchableOpacity style={styles.mainInfo}>
                                <Text style={styles.mainInfoTxt}>{this.props.data.info}</Text>
                            </TouchableOpacity>
                            <View style={styles.commentWrap}>
                                {this.renderCommentInfo()}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
    },
    infoWrap: {},
    infoTopWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoTopWrap_left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoTopWrap_right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dataWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameAndTime: {
        marginLeft: 10
    },
    infoBottomWrap: {
        flexDirection: 'row',
    },
    mainInfo: {
        width: width - 58 - 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#e8e8e8'
    },
    mainInfoTxt: {
        color: '#666',
        fontSize: 14,
        lineHeight: 22
    },
    editWrap: {
        width: 40,
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 11,
        marginRight: 15
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
    },
    commentWrap: {},
    commentCellWrap: {
        flexDirection: 'row',
        width: width - 58 - 20,
        alignItems: 'flex-start',
        marginTop: 10
    },
    nameStyle: {
        fontSize: 12,
        color: '#62b3ef'
    },
    otherStyle: {
        color: '#666',
        fontSize: 12,
    },
    commentInfoStyle: {
        lineHeight: 20,
        // flexWrap:'wrap',
        // alignItems: 'flex-start',
    }
})