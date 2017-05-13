/**
 * Created by Administrator on 2017/5/1.
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
    ListView
} from 'react-native';

import Title from '../components/Title'
import AlreadyOrderCell from '../components/AlreadyOrderCell'
import OrderSearch from './OrderSearch'

export default class MyOrder extends Component{
    constructor(props){
        super(props)
        this.state={
            titleData:{
                title:'我的订阅'
            },
            mainData:[
                {name:'全民星探1',num:'22',time:'22:08',url:require('../assets/images/demo1.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探2',num:'22',time:'22:08',url:require('../assets/images/demo2.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探3',num:'22',time:'12:08',url:require('../assets/images/demo3.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探4',num:'22',time:'14:22',url:require('../assets/images/demo4.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探5',num:'22',time:'22:08',url:require('../assets/images/demo5.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探6',num:'22',time:'22:08',url:require('../assets/images/demo1.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探7',num:'22',time:'13:51',url:require('../assets/images/demo2.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探8',num:'22',time:'22:08',url:require('../assets/images/demo3.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探9',num:'22',time:'22:08',url:require('../assets/images/demo4.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探10',num:'22',time:'22:08',url:require('../assets/images/demo5.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探1',num:'22',time:'22:08',url:require('../assets/images/demo1.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探2',num:'22',time:'22:08',url:require('../assets/images/demo2.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探3',num:'22',time:'12:08',url:require('../assets/images/demo3.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探4',num:'22',time:'14:22',url:require('../assets/images/demo4.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探5',num:'22',time:'22:08',url:require('../assets/images/demo5.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探6',num:'22',time:'22:08',url:require('../assets/images/demo1.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探7',num:'22',time:'13:51',url:require('../assets/images/demo2.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探8',num:'22',time:'22:08',url:require('../assets/images/demo3.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探9',num:'22',time:'22:08',url:require('../assets/images/demo4.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
                {name:'全民星探10',num:'22',time:'22:08',url:require('../assets/images/demo5.jpg'),info:'著名奶爸耍大牌经纪人一年四换，片场的话著名奶爸耍大牌经纪人一年四换，片场的话'},
            ],
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2})
        }

        this.jump = this.jump.bind(this)
        this.renderAlreadyOrderCell = this.renderAlreadyOrderCell.bind(this)
    }

    componentDidMount(){
        let data = this.state.mainData
        this.setState({dataSource:this.state.dataSource.cloneWithRows(data)})
    }

    renderRow(data){
        return(
            <AlreadyOrderCell data={data}/>
        )
    }

    // 渲染已经订阅块
    renderAlreadyOrderCell(){
        let data = this.state.mainData
        let arr = []
        data.map((msg,i)=>{
            arr.push(
                <AlreadyOrderCell key={i} data={msg}/>
            )
        })

        return arr
    }


    // 跳转
    jump(){
        this.props.navigator.push({
            component:OrderSearch
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Title navigator={this.props.navigator} data={this.state.titleData}/>
                <ScrollView>
                    <View style={{paddingLeft:10,paddingRight:10}}>
                        <TouchableOpacity style={styles.searchWrap} onPress={this.jump}>
                            <View style={styles.addWrap}>
                                <View style={styles.horLine}></View>
                                <View style={styles.verLine}></View>
                            </View>
                            <Text style={{color:'#ea303d',fontSize:14}}>添加更多订阅号</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingLeft:10,paddingRight:10}}>
                        {this.renderAlreadyOrderCell()}
                    </View>
                    {/*<ListView*/}
                        {/*dataSource={this.state.dataSource}*/}
                        {/*renderRow={this.renderRow}*/}
                        {/*contentContainerStyle={styles.listViewContainer}*/}
                    {/*/>*/}
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    searchWrap:{
        height:30,
        borderRadius:15,
        borderColor:'#ea303d',
        borderWidth:1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10,
        marginBottom:10
    },
    addWrap:{
        width:16,
        height:16,
        borderRadius:8,
        borderWidth:1,
        borderColor:'#ea303d',
        marginRight:5
    },
    horLine:{
        position:'absolute',
        left:2,
        top:6.5,
        width:10,
        height:1,
        backgroundColor:'#ea303d'
    },
    verLine:{
        position:'absolute',
        left:6.5,
        top:2,
        width:1,
        height:10,
        backgroundColor:'#ea303d'
    },
    listViewContainer:{
        paddingLeft:10,
        paddingRight:10
    }
})