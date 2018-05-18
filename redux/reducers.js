/**
 * Created by zw9love on 2017/4/28.
 */
import { combineReducers } from 'redux';

// 设置下标
function indexReducer(state = 4, action){
    const {type, value} = action;
    switch (type) {
        case 'setIndex':
            return value;
            break;
        default:
            return state;
    }
}



// 设置页面this
function mySetThisReducer(state = null, action) {
    const {type, value} = action;
    switch (type) {
        case 'setMyLike':
            return value;
            break;
        case 'setMyComment':
            return value;
            break;
        case 'setModalTxt':
            return value;
            break;
        case 'setShow':
            return value;
            break;
        default:
            return state;
    }
    // return state
}

// 设置页面Navigator
function myNavigator(state = null, action) {
    const {type, value} = action;
    switch (type) {
        case 'setNavigator':
            return value;
            break;
        default:
            return state;
    }
    // return state
}



export default combineReducers({
    indexReducer,
    mySetThisReducer,
    myNavigator
});