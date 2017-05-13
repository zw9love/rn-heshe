/**
 * Created by Administrator on 2017/4/16.
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
    ToastAndroid,
    BackAndroid,
    Platform,
    Animated,
    Easing,
    StatusBar
} from 'react-native';

import RecommendCell from '../components/RecommendCell'
import BigRecommendCell from '../components/BigRecommendCell'
import Search from '../components/Search'
import MyOrder from './MyOrder'
import MyLike from './MyLike'
import MyComment from './MyComment'
import Suggestion from './Suggestion'
import LoginChoice from './LoginChoice'
import OrderSearch from './OrderSearch'
import RecommendSearch from './RecommendSearch'
import Modal from '../components/Modal'

let {width, height, scale} = Dimensions.get('window');

class Shadow extends Component {
    constructor(props){
        super(props)
    }
    componentWillUnmount(){
        this.props.asideAnimate(0)
    }

    componentDidMount(){
        this.props.asideAnimate(1)
    }

    render(){
        return(
            <TouchableOpacity style={styles.shadowWrapper} onPress={this.props.hideInfo} />
        )
    }
}

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstNavData: [
                '推荐', '行业', '订阅', '时尚', '美妆', '娱乐', '生活',
                '推荐2', '行业2', '订阅2', '时尚2', '美妆2', '娱乐2', '生活2',
                '推荐3', '行业3', '订阅3', '时尚3', '美妆3', '娱乐3', '生活3'
            ],
            secondNavData: [
                '咨询', '人物', '买手', '设计师', '时尚周', '智慧少年', '生活',
                '咨询2', '人物2', '买手2', '设计师2', '时尚周2', '智慧少年2', '生活2',
                '咨询3', '人物3', '买手3', '设计师3', '时尚周3', '智慧少年3', '生活3',
            ],
            mainData: [
                {orderName: '时尚芭莎', title: '卡通人物客串super modal 这样很disney', eyes: '267', msgs: '78'},
                {orderName: '男人装', title: '除了小白裙，你还可以这样穿这些白色过夏天', eyes: '342', msgs: '261'},
                {orderName: '男人装', title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来1', eyes: '666', msgs: '888'},
                {orderName: '时尚芭莎1', title: '欧洲杯期间，穿的美美的看球才是正经事', eyes: '777', msgs: '999'},
                {orderName: '男人装', title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来3', eyes: '888', msgs: '111'},
                {orderName: '男人装', title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来4', eyes: '999', msgs: '378'},
                {orderName: '男人装', title: '这双珍珠鞋到底有多美？连蕾哈娜穿上都不肯脱下来5', eyes: '123', msgs: '456'},
                {orderName: '时尚芭莎2', title: '欧洲杯期间，穿的美美的看球才是正经事', eyes: '123', msgs: '456',url:require('../assets/images/demo4.jpg')},
            ],
            asideData:[
                {url:require('../assets/images/myorder.png'),name:'我的订阅',component:MyOrder},
                {url:require('../assets/images/star.png'),name:'我的收藏',component:MyLike},
                {url:require('../assets/images/fix_msg.png'),name:'我的评论',component:MyComment},
                {url:require('../assets/images/suggestion.png'),name:'意见反馈',component:Suggestion},
                // {url:require('../assets/images/quit.png'),name:'退出'},
            ],
            firstIndex: 0,
            secondIndex: 0,
            rotation: new Animated.Value(0),
            left: new Animated.Value(0),
            fadeInOpacity: new Animated.Value(0),
            asideLeft: new Animated.Value(0),
            mainShadowActive: false,
            shadowActive:false
        }

        this.onBackAndroid = this.onBackAndroid.bind(this)
        this.showInfo = this.showInfo.bind(this)
        this.hideInfo = this.hideInfo.bind(this)
        this.renderAside = this.renderAside.bind(this)
        this.quit = this.quit.bind(this)
        this.jump = this.jump.bind(this)
        this.jumpLogin = this.jumpLogin.bind(this)
        this.asideAnimate = this.asideAnimate.bind(this)
    }

    componentWillMount() {
        //这里判不判断都行
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }

        // 设置navigator放在store里
        let action = {type:'setNavigator',value:this.props.navigator}
        this.context.store.dispatch(action)
    }

    // 必须声明这玩意 子组件才能拿到store
    static contextTypes = {
        store: React.PropTypes.object.isRequired    // 子组件的  contextTypes 必须声明 这句很重要
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid(quitOrder) {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            return false;
        }
        let nav = this.props.navigator
        if (!nav) {
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            return true;
        } else {
            let length = nav.getCurrentRoutes().length;
            if (length > 1) {
                nav.pop();
            } else {
                this.lastBackPressed = Date.now();
                ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            }
            return true;
        }
    }

    render() {
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
                <Animated.View style={[styles.main,{
                        left:this.state.left.interpolate({
                            inputRange: [0,1],
                            outputRange: [0,width * 0.6]
                        }),
                        transform: [
                            {
                                rotateY: this.state.rotation.interpolate({
                                    inputRange: [0,1],
                                    outputRange: ['0deg', '-6deg']
                                })
                            }
                        ]
                    }]}>
                    <View style={styles.hideStyle} />
                    {/*一级导航*/}
                    <View style={{paddingLeft:10,paddingRight:10}}>
                        <View style={{flexDirection:'row',borderBottomColor:'#e8e8e8',borderBottomWidth:1}}>
                            <View style={styles.navWrapper}>
                                <TouchableOpacity onPress={this.showInfo}>
                                    <Image source={require('../assets/images/nav.png')} style={styles.navImage}></Image>
                                </TouchableOpacity>
                            </View>
                            <ScrollView
                                contentContainerStyle={styles.contentContainer}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                {this.renderFirstNav()}
                            </ScrollView>
                        </View>
                    </View>
                    {/*二级导航或者搜索框*/}
                    <View style={{paddingLeft:10,paddingRight:10}}>
                        {this.renderSecond()}
                    </View>
                    {/*页面主内容*/}
                    <ScrollView
                        style={styles.verticalScroll}
                    >
                        {this.renderRecommendCell()}
                    </ScrollView>
                    {/*服了，这遮罩玩意还只能放最后啊*/}
                    {this.state.mainShadowActive ? this.renderShadow() : null}
                </Animated.View>
                <Animated.View style={[styles.asideWrapper,{
                    opacity: this.state.fadeInOpacity,
                    left: this.state.asideLeft.interpolate({
                            inputRange: [0,1],
                            outputRange: [- width * 0.6, 10]
                    })
                }]}>
                    <View style={styles.asideTop}>
                        <TouchableOpacity onPress={this.jumpLogin}>
                            <Image source={require('../assets/images/login.png')} style={styles.loginImage}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.jumpLogin}>
                            <Text>点击登录</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {this.renderAside()}
                        <TouchableOpacity style={styles.asideCell} onPress={this.quit}>
                            <Image source={require('../assets/images/quit.png')} style={styles.asideCellImage}/>
                            <Text>退出登录</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
                {
                    this.state.shadowActive ? <Modal obj={this} info="退出登录"/> : null
                }
            </View>
        )
    }

    // 点击退出
    quit(){
        this.setState({shadowActive:true})
    }

    // 点击侧边栏跳转
    jump(val){
        // alert(this.props.navigator)
        this.props.navigator.push({
            component:val
        })
    }

    // 跳转到登录选择页面
    jumpLogin(){
        this.props.navigator.push({
            component:LoginChoice
        })
    }

    // 侧边栏渲染方法
    renderAside(){
        let data = this.state.asideData;
        let arr = [];
        data.map((msg,i)=>{
            arr.push(
                <TouchableOpacity key={i} style={styles.asideCell} onPress={()=>{this.jump(msg.component)}}>
                    <Image source={msg.url} style={styles.asideCellImage}/>
                    <Text>{msg.name}</Text>
                </TouchableOpacity>
            )
        })
        return arr
    }


    // 侧边栏动画方法
    asideAnimate(val){
        let timing = Animated.timing;
        //parallel同步  sequence一个一个来 stagger给每个动画一个指定的延迟时间
        Animated.parallel(['rotation', 'left','asideLeft','fadeInOpacity'].map(property => {
            return timing(this.state[property], {
                toValue: val,
                duration: 300,
                easing: Easing.linear
            });
        })).start();
    }

    // 显示信息栏
    showInfo() {
        this.setState({mainShadowActive: true})
    }

    // 隐藏信息栏
    hideInfo() {
        this.setState({mainShadowActive: false})
    }

    // 渲染遮罩层
    renderShadow() {
        return (
            <Shadow style={styles.shadowWrapper} hideInfo={this.hideInfo} asideAnimate={this.asideAnimate}/>
        )
    }

    //一级导航的渲染方法
    renderFirstNav() {
        let data = this.state.firstNavData;
        let arr = [];
        let currentIndex = this.state.firstIndex
        let specialStyle;
        let firstStyle = {};
        data.map((msg, i) => {
            firstStyle = i == 0 ? {marginLeft: 0} : {}
            specialStyle = i == currentIndex ? {color: '#e92230', fontSize: 18} : {}
            arr.push(
                <TouchableOpacity key={i} onPress={()=>{this.firstNavClick(i)}}>
                    <Text style={[styles.firstNav,specialStyle,firstStyle]}>
                        {msg}
                    </Text>
                </TouchableOpacity>
            )
        })
        return arr;
    }

    firstNavClick(index) {
        // alert(index)
        this.setState({firstIndex: index})
    }

    //二级模块的渲染方法
    renderSecond() {
        switch (this.state.firstIndex) {
            case 0:
                return <Search title="搜索" component={RecommendSearch}/>
                break;
            case 1:
                return (
                    <ScrollView
                        contentContainerStyle={styles.contentContainer2}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {this.renderSecondNav()}
                    </ScrollView>
                )
                break;
            case 2:
                return <Search title="搜索订阅号" component={OrderSearch}/>
                break;
            default:
                return <Search title="搜索" component={RecommendSearch}/>
                break;
        }
    }

    // 二级导航的渲染方法
    renderSecondNav() {
        let data = this.state.secondNavData;
        let arr = [];
        let currentIndex = this.state.secondIndex
        let specialStyle;
        let firstStyle = {};
        data.map((msg, i) => {
            firstStyle = i == 0 ? {marginLeft: 0} : {}
            specialStyle = i == currentIndex ? {color: '#e92230', borderColor: '#e92230'} : {}
            arr.push(
                <TouchableOpacity key={i} onPress={()=>{this.secondNavClick(i)}}>
                    <Text style={[styles.secondNav,specialStyle,firstStyle]}>
                        {msg}
                    </Text>
                </TouchableOpacity>
            )
        })
        return arr;
    }

    secondNavClick(index) {
        // alert(index)
        this.setState({secondIndex: index})
    }

    renderRecommendCell() {
        let data = this.state.mainData;
        let arr = [];
        data.map((msg, i) => {
            let specialStyle = i == 0 ? {paddingTop: 0} : {}
            if((i + 1) % 4 == 0){
                arr.push(
                    <BigRecommendCell key={i} data={msg} specialStyle={specialStyle}/>
                )
            }else{
                arr.push(
                    <RecommendCell key={i} data={msg} specialStyle={specialStyle}/>
                )
            }
        })

        return arr;
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginBottom:100
    },
    main: {
        position: 'relative'
    },
    navWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 20
    },
    navImage: {
        width: 18,
        height: 18
    },
    contentContainer: {
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
    },
    contentContainer2: {
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    verticalScroll: {
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 155 + StatusBar.currentHeight
    },
    firstNav: {
        fontSize: 16,
        marginLeft: 20
    },
    secondNav: {
        fontSize: 14,
        height: 30,
        color: '#666',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        marginLeft: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },
    shadowWrapper: {
        width: width,
        height: height,
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0,.3)'
    },
    asideWrapper:{
        width:width * 0.6,
        height:height,
        position:'absolute',
        top:StatusBar.currentHeight
    },
    asideCell:{
        flexDirection:'row',
        height:56,
        alignItems: 'center',
        borderBottomWidth:1,
        borderColor:'#ccc'
    },
    asideCellImage:{
        width:25,
        height:25,
        marginRight:10,
    },
    asideTop:{
        flexDirection:'row',
        marginTop:15,
        marginBottom:15,
        alignItems: 'center',
    },
    loginImage:{
        width:44,
        height:44,
        marginRight:10,
        borderRadius:22,
        borderWidth:1,
        borderColor:'#333'
    },
    hideStyle:{
        height:StatusBar.currentHeight
    }
})