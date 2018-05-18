/**
 * Created by zw9love on 2017/4/30.
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
    TextInput,
    StatusBar,
    Animated,
    Easing, Platform,
} from 'react-native';

let {width, height, scale} = Dimensions.get('window');
let marginShareLeft = (width - 220) / 6
let marginBottomShareLeft = (width - 150) / 4

import OrderCell from '../components/OrderCell'
import RecommendCell from '../components/RecommendCell'
import CommentCell from '../components/CommentCell'
import ModalTxt from '../components/ModalTxt'
import style from '../assets/style/common'

// 主要内容块Cell组件
class MainCell extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text style={styles.mainTxt}>{this.props.data.info}</Text>
                <TouchableOpacity>
                    <Image source={this.props.data.url} style={styles.mainImage}/>
                </TouchableOpacity>
            </View>
        )
    }
}

// 分享块Cell组件
class ShareCell extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity style={styles.ShareCellWrap}>
                <Image source={this.props.data.url} style={styles.shareImage}/>
            </TouchableOpacity>
        )
    }
}


export default class Show extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mainData: [
                {
                    url: require('../assets/images/demo1.jpg'),
                    info: '每到夏季就会让我们不由自主的去选择白色的服装，因为白色不仅好看，也是最不吸热的颜色。我们也为了找寻这样的答案而寻找出了十位时尚'
                },
                {
                    url: require('../assets/images/demo2.jpg'),
                    info: '每到夏季就会让我们不由自主的去选择白色的服装，因为白色不仅好看，也是最不吸热的颜色。我们也为了找寻这样的答案而寻找出了十位时尚'
                },
                {
                    url: require('../assets/images/demo3.jpg'),
                    info: '每到夏季就会让我们不由自主的去选择白色的服装，因为白色不仅好看，也是最不吸热的颜色。我们也为了找寻这样的答案而寻找出了十位时尚'
                },
            ],
            shareData: [
                {url: require('../assets/images/share_friend.png')},
                {url: require('../assets/images/share_qq.png')},
                {url: require('../assets/images/share_wechat.png')},
                {url: require('../assets/images/share_weibo.png')},
                {url: require('../assets/images/share_zone.png')},
            ],
            recommendData: [
                {
                    url: require('../assets/images/demo4.jpg'),
                    orderName: '时尚芭莎',
                    title: '卡通人物客串super modal 这样很disney',
                    eyes: '267',
                    msgs: '78'
                },
                {
                    url: require('../assets/images/demo5.jpg'),
                    orderName: '男人装',
                    title: '除了小白裙，你还可以这样穿这些白色过夏天',
                    eyes: '342',
                    msgs: '261'
                },
            ],
            commentData: [
                {
                    name: '张小二',
                    url: require('../assets/images/demo1.jpg'),
                    time: '刚刚',
                    like: 331,
                    msg: 21,
                    info: '天啊撸，为什么这套真丝“睡袍”套装穿她身上会这么仙美 贵族气！蓝色和桃粉色玫瑰印花飘散着甜美气息。1',
                    commentData: [
                        {name1: '一点咨询网友', info: '这里都是游戏暗卫的名字还剩多少钱十年间耗时间节省时间。'},
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
                        {name1: 'zw9love', info: '这里都是游戏暗卫的名字还剩多少钱十年间耗时间节省时间。'},
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
            bottomShareData: [
                {name: '新浪微博', url: require('../assets/images/share_weibo.png')},
                {name: '微信好友', url: require('../assets/images/share_wechat.png')},
                {name: '朋友圈', url: require('../assets/images/share_friend.png')},
                {name: 'QQ', url: require('../assets/images/share_qq.png')},
                {name: 'QQ空间', url: require('../assets/images/share_zone.png')},
                {name: '复制链接', url: require('../assets/images/share_copy.png')},
            ],
            orderData: {url: require('../assets/images/demo1.jpg'), name: '时尚芭莎', info: '2016-07-04'},
            starImage: require('../assets/images/star.png'),
            modalTxt: '',
            editActive: false,
            shadowActive: false,
            starHoverActive: false,
            shareActive: false,
            orderActive: false,
            defaultMsg: '我来说两句...'
        }

        this.renderMainCell = this.renderMainCell.bind(this)
        this.renderShareCell = this.renderShareCell.bind(this)
        this.renderRecommendCell = this.renderRecommendCell.bind(this)
        this.back = this.back.bind(this)
        this.edit = this.edit.bind(this)
        this.pulish = this.pulish.bind(this)
        this.cancel = this.cancel.bind(this)
        this.star = this.star.bind(this)
        this.myShare = this.myShare.bind(this)
        this.shareCancel = this.shareCancel.bind(this)
        this.getMessage = this.getMessage.bind(this)
    }

    // 挂载完成
    componentWillMount() {
        this.count = 1;
        this.lock = false
        this.timer = null
        this.message = ''
        let action = {type: 'setShow', value: this}
        this.context.store.dispatch(action)
    }

    // 渲染文章详情
    renderMainCell() {
        let data = this.state.mainData
        let arr = []
        data.map((msg, i) => {
            arr.push(
                <MainCell key={i} data={msg}/>
            )
        })

        return arr
    }

    // 渲染分享块
    renderShareCell() {
        let data = this.state.shareData
        let arr = []
        data.map((msg, i) => {
            arr.push(
                <ShareCell key={i} data={msg}/>
            )
        })

        return arr
    }

    // 渲染推荐块
    renderRecommendCell() {
        let data = this.state.recommendData
        let arr = []
        data.map((msg, i) => {
            arr.push(
                <RecommendCell key={i} data={msg}/>
            )
        })

        return arr
    }

    // 渲染评论块
    renderCommentCell() {
        let data = this.state.commentData
        let arr = []
        data.map((msg, i) => {
            arr.push(
                <CommentCell key={i} index={i} data={msg} editMsgActive={true}/>
            )
        })

        return arr
    }

    // 渲染底部编辑块
    renderBottomFixed() {
        return (
            <View style={styles.bottomFixed}>
                <TouchableOpacity onPress={this.back}>
                    <Image source={require('../assets/images/back.png')} style={styles.fixImage}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.edit}>
                    <View style={styles.inputWrap}>
                        <Text style={styles.inputPlaceHolder}>发表伟大言论...</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.edit}>
                    <Image source={require('../assets/images/fix_msg.png')} style={styles.fixImage}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.star}>
                    <Image source={this.state.starImage} style={styles.fixImage}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.myShare}>
                    <Image source={require('../assets/images/fix_share.png')} style={styles.fixImage}/>
                </TouchableOpacity>
            </View>
        )
    }

    // 渲染遮罩底部输入框
    renderTextArea() {
        return (
            <View style={styles.fixedWrap}>
                <View style={styles.shadowWrap}/>
                <View style={styles.textAreaWrap}>
                    <View style={styles.btnWrap}>
                        <TouchableOpacity style={styles.btnLeft} onPress={this.cancel}>
                            <Text style={styles.btnLeftTxt}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnRight} onPress={this.pulish}>
                            <Text style={styles.btnRightTxt}>发表</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TextInput
                            style={styles.TxtWrap}
                            underlineColorAndroid="transparent"
                            placeholder={this.state.defaultMsg}
                            clearButtonMode="always"
                            placeholderTextColor="#ccc"
                            autoFocus={true}
                            onChangeText={this.getMessage}
                            clearTextOnFocus={true}
                            multiline={true}
                        />
                    </View>
                </View>
            </View>

        )
    }

    // 渲染模态框
    renderModalTxt() {
        if (this.state.starHoverActive || this.state.orderActive) {
            return (
                <ModalTxt info={this.state.modalTxt}/>
            )
        } else {
            return null
        }
    }

    // 渲染底部分享块
    renderBottomShare() {
        return (
            <View style={styles.fixedWrap}>
                <View style={styles.shadowWrap}/>
                <View style={styles.shareBottomWrap}>
                    <View style={styles.shareMainWrap}>
                        {this.renderShareMainCell()}
                    </View>
                    <TouchableOpacity style={styles.shareCancelWrap} onPress={this.shareCancel}>
                        <Text style={{color: '#999', fontSize: 16}}>取消</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    // 渲染底部分享块cell
    renderShareMainCell() {
        let data = this.state.bottomShareData
        let arr = []
        data.map((msg, i) => {
            arr.push(
                <TouchableOpacity key={i} style={{
                    alignItems: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: marginBottomShareLeft
                }}>
                    <Image source={msg.url} style={{width: 50, height: 50}}/>
                    <Text style={{color: '#333', fontSize: 12}}>{msg.name}</Text>
                </TouchableOpacity>
            )
        })
        return arr
    }

    // 点击分享按钮
    myShare() {
        this.setState({shareActive: true})
    }

    // 点击分享取消按钮
    shareCancel() {
        this.setState({shareActive: false})
    }

    // 点击返回按钮
    back() {
        this.props.navigator.pop();
    }

    // 点击编辑按钮
    edit() {
        this.setState({editActive: true, defaultMsg: '我来说两句...'})
    }

    // 点击取消按钮
    cancel() {
        this.setState({editActive: false})
    }

    // 点击发表按钮
    pulish() {
        // let index = this.context.store.getState().indexReducer
        let arr = this.state.commentData
        let defaultMsg = this.state.defaultMsg

        // let myIndex = this.context.store.getState().indexReducer == '' ? this.state.commentData.length - 1 : this.context.store.getState().indexReducer

        let myIndex = this.context.store.getState().indexReducer

        if (defaultMsg.search('回复') != -1) {
            let name2 = defaultMsg.slice(3)
            arr[myIndex].commentData.push({name1: '烧牌', name2: name2, info: this.message})
        } else {
            arr[myIndex].commentData.push({name1: '烧牌', info: this.message})
        }
        this.setState({editActive: false, commentData: arr})
        this.message = ''
        let action = {type: 'setIndex', value: 4}
        this.context.store.dispatch(action)
    }

    // 获取输入框值
    getMessage(val) {
        this.message = val
    }

    // 点击收藏按钮
    star() {
        if (this.lock) return
        this.lock = true
        if (this.count % 2) {
            this.setState({
                starHoverActive: true,
                modalTxt: '已收藏',
                starImage: require('../assets/images/star_hover.png')
            })
            this.timer = setTimeout(() => {
                this.setState({starHoverActive: false})
                this.lock = false
            }, 2500)
        } else {
            this.setState({starHoverActive: true, modalTxt: '已取消收藏', starImage: require('../assets/images/star.png')})
            this.timer = setTimeout(() => {
                this.setState({starHoverActive: false})
                this.lock = false
            }, 2500)
        }

        this.count++;
    }

    beOrder() {

    }

    // 必须声明这玩意 子组件才能拿到store
    static contextTypes = {
        store: React.PropTypes.object.isRequired    // 子组件的  contextTypes 必须声明 这句很重要
    }

    render() {
        // alert(this.state.starActive)
        return (
            <View style={styles.container}>
                {/*StatusBar组件*/}
                <StatusBar
                    animated={true}
                    hidden={false}
                    translucent={true}
                    //barStyle='light-content'
                    showHideTransition={'fade'}
                />
                <View style={styles.hideStyle}/>
                <ScrollView
                    contentContainerStyle={styles.contentContainer}
                >
                    <View style={styles.titleWrap}>
                        <Text style={styles.titleInfo}>{this.props.title}</Text>
                    </View>
                    <View>
                        <OrderCell data={this.state.orderData} parent={this}/>
                    </View>
                    <View style={styles.mainWrap}>
                        {this.renderMainCell()}
                    </View>
                    <View style={styles.formerWrap}>
                        <TouchableOpacity>
                            <Text style={styles.formerTxt}>阅读原文</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.shareWrap}>
                        <View style={styles.shareLeft}>
                            <Text style={styles.shareLeftTxt}>分享：</Text>
                        </View>
                        <View style={styles.shareRight}>
                            {this.renderShareCell()}
                        </View>
                    </View>
                    <View style={styles.otherWrap}>
                        <Text style={styles.otherTxt}>相关阅读</Text>
                    </View>
                    <View>
                        {this.renderRecommendCell()}
                    </View>
                    <View style={styles.otherWrap}>
                        <Text style={styles.otherTxt}>热门评论</Text>
                    </View>
                    <View>
                        {this.renderCommentCell()}
                    </View>
                </ScrollView>
                {/*日了狗了，居然跟顺序有关系，尼玛bug*/}
                {this.renderModalTxt()}
                {this.renderBottomFixed()}
                {/*{this.renderFixInfo()}*/}
                {this.state.editActive ? this.renderTextArea() : null}
                {this.state.shareActive ? this.renderBottomShare() : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 40,
        marginTop: style.marginTop + 5
    },
    hideStyle: {
        height: StatusBar.currentHeight
    },
    contentContainer: {
        paddingLeft: 10,
        paddingRight: 10
    },
    titleWrap: {
        marginTop: 10
    },
    titleInfo: {
        color: '#333',
        fontSize: 16
    },
    mainWrap: {
        marginTop: 10
    },
    mainImage: {
        width: width - 20,
        height: 0.68 * (width - 20),
        marginTop: 10,
        marginBottom: 10
    },
    mainTxt: {
        fontSize: 14,
        color: '#666',
        lineHeight: 24
    },
    formerWrap: {
        // marginTop:10,
        marginBottom: 10
    },
    formerTxt: {
        color: '#62b3ef',
        fontSize: 14
    },
    shareWrap: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#e8e8e8',
        paddingBottom: 10
    },
    shareLeft: {
        width: 50
    },
    shareLeftTxt: {
        color: '#666',
        fontSize: 14
    },
    shareRight: {
        flexDirection: 'row',
    },
    ShareCellWrap: {
        marginLeft: marginShareLeft
    },
    shareImage: {
        width: 30,
        height: 30
    },
    otherWrap: {
        marginTop: 10,
        marginBottom: 10
    },
    otherTxt: {
        color: '#333',
        fontSize: 14
    },
    bottomFixed: {
        width: width,
        height: 40,
        position: 'absolute',
        zIndex: 100,
        backgroundColor: '#fff',
        left: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    inputWrap: {
        width: 200,
        height: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        justifyContent: 'center',
    },
    fixImage: {
        width: 20,
        height: 20
    },
    inputPlaceHolder: {
        marginLeft: 20,
        color: '#ccc',
        fontSize: 12
    },
    shadowWrap: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,.3)'
    },
    textAreaWrap: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: width,
        height: height / 3,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        // zIndex:10000
    },
    btnWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10,
        height: 20,
        // backgroundColor:'yellow'
    },
    btnLeftTxt: {
        color: '#666',
        fontSize: 12
    },
    btnRightTxt: {
        color: '#e92230',
        fontSize: 12
    },
    TxtWrap: {
        height: height / 3 - 50,
        marginBottom: 10,
        width: width - 20,
        // backgroundColor:'yellow',
        textAlignVertical: 'top',
        padding: 0,
        fontSize: 12
    },

    fixedWrap: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: width,
        height: height,
        zIndex: 666666
    },
    shareBottomWrap: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: width,
        // height:height * 0.4,
        backgroundColor: '#fff',
    },
    shareCancelWrap: {
        // position:'absolute',
        // left:0,
        // top:height * 0.4 - 40,
        width: width,
        height: 40,
        borderTopWidth: 1,
        borderColor: '#e8e8e8',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'yellow'
    },
    shareMainWrap: {
        width: width,
        // height:height * 0.4 - 65,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    }
})
