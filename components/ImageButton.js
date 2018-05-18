import React, {Component} from 'react';
import {TouchableOpacity, Image} from 'react-native';

export default class ImageButton extends Component {
    render() {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={this.props.onPress}>
                {this._renderImg()}
            </TouchableOpacity>
        )
    }
    _renderImg(){
        if(this.props.defaultSource){
            return (
                <Image
                    style={this.props.style}
                    source={this.props.defaultSource}
                >
                    <Image
                        style={this.props.style}
                        source={this.props.source}
                    >
                        {this.props.children}
                    </Image>
                </Image>
            )
        }else {
            return (
                <Image
                    style={this.props.style}
                    source={this.props.source}
                >
                    {this.props.children}
                </Image>
            )
        }
    }

}