/**
 * Created by zw9love on 2017/4/2.
 */
import React  from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated,
    Easing
} from 'react-native';

//Demo1  spring动画类型
// export  default class Playground extends React.Component {
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             bounceValue: new Animated.Value(0),
//         };
//     }
//     render(): ReactElement {
//         return (
//             <Animated.Image                         // 可选的基本组件类型: Image, Text, View
//                 source={require('../assets/img/2.jpg')}
//                 style={{
//           flex: 1,
//           transform: [                        // `transform`是一个有序数组（动画按顺序执行）
//             {scale: this.state.bounceValue},  // 将`bounceValue`赋值给 `scale`
//           ]
//         }}
//             />
//         );
//     }
//     componentDidMount() {
//         this.state.bounceValue.setValue(1.5);     // 设置一个较大的初始值
//         Animated.spring(                          // 可选的基本动画类型: spring, decay, timing
//             this.state.bounceValue,                 // 将`bounceValue`值动画化
//             {
//                 toValue: 1,                         // 将其值以动画的形式改到一个较小值，最终结果的值
//                 friction: 1,                          // Bouncier spring  摩擦力 默认7
//                 tension:40                            //张力 默认40
//             }
//         ).start();                                // 开始执行动画
//     }
// }

//Demo2  timing动画类型
// export  default class Playground extends React.Component {
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             fadeValue: new Animated.Value(0),
//         };
//     }
//     render(): ReactElement {
//         return (
//             <Animated.Image                         // 可选的基本组件类型: Image, Text, View
//                 source={require('../assets/img/2.jpg')}
//                 style={{opacity:this.state.fadeValue}}
//             />
//         );
//     }
//     componentDidMount() {
//         //this.state.fadeValue.setValue(0);     // 设置一个较大的初始值
//         Animated.timing(                          // 可选的基本动画类型: spring, decay, timing
//             this.state.fadeValue,                 // 将`bounceValue`值动画化
//             {
//                 toValue: 1,                         // 将其值以动画的形式改到一个较小值，最终结果的值
//                 duration:1000                       //动画时间 默认500ms
//             }
//         ).start((msg)=>{
//             //alert(msg.finished)
//         });                                // 开始执行动画
//     }
// }

//Demo3
// export default React.createClass({
//     getInitialState() {
//         return {
//             fadeInOpacity: new Animated.Value(0) // 初始值
//         };
//     },
//     componentDidMount() {
//         //要在内部使用
//         //Animated.delay(10000);
//         Animated.timing(this.state.fadeInOpacity, {
//             toValue: 1, // 目标值
//             duration: 1000, // 动画时间
//             easing: Easing.ease // 缓动函数
//         }).start();
//     },
//     render() {
//         return (
//             <Animated.View style={[styles.demo, {
//                 opacity: this.state.fadeInOpacity.interpolate({
//                             inputRange: [0,1],
//                             //这里0.5就是最终结果
//                             outputRange: [0,0.5]
//                 })
//             }]}>
//             <Text style={styles.text}>悄悄的，我出现了</Text>
//             </Animated.View>
//         );
//     }
// });
//
// const styles = StyleSheet.create({
//     demo: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'white',
//     },
//     text: {
//         fontSize: 30
//     }
// });

//Demo4  多个动画组合
export default React.createClass({
    getInitialState() {
        return {
            fadeInOpacity: new Animated.Value(0),
            rotation: new Animated.Value(0),
            fontSize: new Animated.Value(0),
            left: new Animated.Value(0)
        };
    },
    componentDidMount() {
        var timing = Animated.timing;
        //parallel同步  sequence一个一个来 stagger给每个动画一个指定的延迟时间
        Animated.parallel(['fadeInOpacity', 'rotation', 'fontSize','left'].map(property => {
            return timing(this.state[property], {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            });
        })).start();
    },
    render() {
    return (

        <View style={styles.container}>
            <Animated.View style={[styles.demo, {
                opacity: this.state.fadeInOpacity,
                left:this.state.left.interpolate({
                            inputRange: [0,1],
                            outputRange: [0,100]
                }),
                transform: [
                    /*{
                        rotateZ: this.state.rotation.interpolate({
                            inputRange: [0,1],
                            outputRange: ['0deg', '360deg']
                        })
                    },*/
                    {
                        rotateY: this.state.rotation.interpolate({
                            inputRange: [0,1],
                            outputRange: ['0deg', '-45deg']
                        })
                    },
                    /*{
                        rotateX: this.state.rotation.interpolate({
                            inputRange: [0,1],
                            outputRange: ['0deg', '360deg']
                        })
                    }*/
                ]
                }]}
            >
                <Animated.Text style={{
                        fontSize: this.state.fontSize.interpolate({
                            inputRange: [0,1],
                            outputRange: [12,26]
                        })
                    }}>我骑着七彩祥云出现了
                </Animated.Text>
            </Animated.View>
        </View>

    );
}
});

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    demo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
        position:'relative',
    },
    text: {
        fontSize: 30
    }
});