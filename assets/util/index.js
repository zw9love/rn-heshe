import {isIphoneX} from "react-native-iphone-x-helper";
import {Platform} from "react-native";

export function getNeedMargin(){
    let marginTop = 0
    if(isIphoneX()){
        marginTop = 30
    }else{
        marginTop = Platform.OS === 'android' ? 0 : 15
    }
    // console.log('isIphoneX = ' + isIphoneX())
    return marginTop
}