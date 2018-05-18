/**
 * Created by zw9love on 2017/4/28.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar
} from 'react-native';

export default class MyOrder extends Component {
    constructor(props) {
        super(props)
        this.back = this.back.bind(this);
        this.edit = this.edit.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.state = {
            name: '编辑'
        }
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
                        {
                            this.props.data ? <Text style={styles.title}>{this.props.data.title}</Text> : null
                        }
                    </TouchableOpacity>
                    <View style={styles.editWrap}>
                        {
                            this.props.data.edit ? this.renderEdit() : null
                        }

                    </View>
                </View>
            </View>
        )
    }

    renderEdit() {
        return (
            <TouchableOpacity style={{padding: 10, paddingRight: 0}} onPress={this.edit}>
                <Text style={{fontSize: 14}}>{this.state.name}</Text>
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        this.count = 0;
    }

    back() {
        this.props.navigator.pop();
    }

    edit() {
        this.count++;
        this.count % 2 ? this.setState({name: '完成'}) : this.setState({name: '编辑'})
        this.props.changeEditActive()
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#e8e8e8'
    },
    backImage: {
        height: 18,
        width: 18,
        marginRight: 5
    },
    backWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    title: {
        fontSize: 14
    },
    editWrap: {
        position: 'absolute',
        right: 10,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    hideStyle: {
        height: StatusBar.currentHeight
    }
})