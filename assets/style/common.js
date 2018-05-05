import {Platform} from "react-native";
import { ifIphoneX } from 'react-native-iphone-x-helper'

let marginTop = 0

if(ifIphoneX()){
    // console.log('ifIphoneX = ' + ifIphoneX())
    marginTop = 30

}else{
    marginTop = Platform.OS === 'android' ? 0 : 15
}

export default {
    marginTop: marginTop
}