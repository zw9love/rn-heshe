/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import { createStore,combineReducers } from 'redux'
import { Provider } from 'react-redux'

import Home from './pages/Home'
import Advertisement from './pages/Advertisement'
import AnimateDemo from './pages/AnimateDemo'
import MyLike from './pages/MyLike'
import Suggestion from './pages/Suggestion'
import OrderSearch from './pages/OrderSearch'
import MyComment from './pages/MyComment'
import Show from './pages/Show'
import MyOrder from './pages/MyOrder'
import OrderShow from './pages/OrderShow'
import LoginChoice from './pages/LoginChoice'
import PhoneLogin from './pages/PhoneLogin'

import reducers from './redux/reducers'

const store = createStore(reducers);
// export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools;
export default class heshe extends Component {
  render() {
    return (
    <Provider store={store}>
        <View style={styles.container}>
              <Navigator
                  initialRoute={{name: 'Advertisement', component: Advertisement
                  }}
                  renderScene={(route, navigator) =>{
                                    let Component =  route.component;
                                    return <Component {...route.passProps} navigator={navigator}/>
                                }}
                  //configureScene={
                  //                  (route, routeStack) => Navigator.SceneConfigs.FloatFromBottom
                  //            }
              />
        </View>
    </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection:'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('heshe', () => heshe);
