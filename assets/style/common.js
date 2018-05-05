import {Platform} from "react-native";

export default {
    marginTop: Platform.OS === 'android' ? 0 : 10
}