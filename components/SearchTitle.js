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
    TextInput,
    StatusBar
} from 'react-native';

let {width, height, scale} = Dimensions.get('window');

export default class MyOrder extends Component {
    constructor(props) {
        super(props)
        this.back = this.back.bind(this);
    }

    render() {
        return (
            <View>
                {/*StatusBar组件*/}
                <StatusBar
                    animated={true}
                    hidden={false}
                    translucent={true}
                    //barStyle='light-content'
                    showHideTransition={'fade'}
                />
                <View style={styles.hideStyle}/>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.backWrap} onPress={this.back}>
                        <Image source={require('../assets/images/back.png')} style={styles.backImage}/>
                    </TouchableOpacity>
                    <View style={styles.searchWrap}>
                        <Image source={require('../assets/images/search.png')} style={styles.searchImage}/>
                        <TextInput
                            style={styles.searchTxt}
                            underlineColorAndroid="transparent"
                            placeholder={this.props.data.searchName}
                            placeholderTextColor="#ccc"
                            clearButtonMode="always"
                            // multiline={true}
                        />
                    </View>
                </View>
            </View>
        )
    }

    back() {
        this.props.navigator.pop();
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#e8e8e8',
        paddingLeft: 10,
        paddingRight: 10,
    },
    backImage: {
        height: 18,
        width: 18,
        marginRight: 5
    },
    backWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 14
    },
    searchWrap: {
        width: width - 43,
        height: 34,
        // backgroundColor:'red',
        borderRadius: 17,
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchTxt: {
        width: width - 85,
        fontSize: 12,
        marginLeft: 5,
        height: 32,
        // backgroundColor: 'yellow',
        // textAlignVertical: 'center',
        paddingVertical: 0
        // boxSizing: 'border-box'
        // flex: 1

    },
    searchImage: {
        width: 15,
        height: 16,
        marginLeft: 17
    },
    hideStyle: {
        height: StatusBar.currentHeight
    }
})