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
} from 'react-native';

let {width, height, scale} = Dimensions.get('window');

import OrderShow from '../pages/OrderShow'

export default class MyOrder extends Component {
    constructor(props) {
        super(props)
        this.jump = this.jump.bind(this)
    }

    // 跳转
    jump() {
        let nav = this.context.store.getState().myNavigator;
        nav.push({
            component: OrderShow,
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
                <TouchableOpacity onPress={this.jump}>
                    <Image source={this.props.data.url} style={styles.orderImage}/>
                </TouchableOpacity>
                <View style={styles.txtWrap}>
                    <TouchableOpacity onPress={this.jump}>
                        <Text style={styles.nameTxt}>{this.props.data.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.jump}>
                        <Text style={styles.infoTxt} numberOfLines={1}>{this.props.data.info}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.timeWrap}>
                    <Text style={{fontSize: 12}}>{this.props.data.time}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // height:70,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#e8e8e8',
        // backgroundColor:'yellow',
        paddingTop: 10,
        paddingBottom: 10
    },
    orderImage: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 10
    },
    txtWrap: {
        width: width - 20 - 54 - 40,
        marginRight: 10
    },
    nameTxt: {
        color: '#2e99e9',
        fontSize: 13
    },
    infoTxt: {
        color: '#ccc',
        marginTop: 5,
        fontSize: 12
    },
    timeWrap: {
        position: 'absolute',
        right: 0,
        top: 10,
        width: 40
    }
})

