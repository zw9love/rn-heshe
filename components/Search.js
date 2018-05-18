/**
 * Created by zw9love on 2017/4/23.
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

export default class Search extends Component {
    constructor(props) {
        super(props)
        this.jump = this.jump.bind(this)
    }

    // 跳转页面
    jump() {
        let nav = this.context.store.getState().myNavigator;
        nav.push({
            component: this.props.component,
        })
    }

    // 必须声明这玩意 子组件才能拿到store
    static contextTypes = {
        store: React.PropTypes.object.isRequired    // 子组件的  contextTypes 必须声明 这句很重要
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.searchWrapper} onPress={this.jump}>
                    {
                        this.props.imgHide ? null :
                            <Image source={require('../assets/images/search.png')} style={styles.searchImage}/>
                    }
                    <Text style={{fontSize: 14}}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    searchWrapper: {
        height: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchImage: {
        width: 15,
        height: 16,
        marginRight: 10,
    }
})