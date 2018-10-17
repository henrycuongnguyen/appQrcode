import React, { Component } from 'react';
import { createDrawerNavigator, DrawerItems, DrawerActions } from 'react-navigation';
import { Platform, TouchableOpacity } from 'react-native';
import {
    StyleSheet, Text, View, Image, ScrollView, TouchableWithoutFeedback, Alert
} from 'react-native';
import MyStatusBar from '../pages/statusBar/MyStatusBar';
const ios = Platform.OS === 'ios';
const logo = require('../../assets/icon-ios.png');

class MainSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    componentDidMount() {
    }


    onMenuItemPress = (scene, base) => {
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
        if (scene.route.key.match(/^Divider/i)) {
            return false;
        }
        base(scene);
        if (this.props.onMenuItemPress) {
            this.props.onMenuItemPress(scene.route.key);
        }
    }

    getLabel = (scene, base) => {
        // console.log('scene', scene, base);

        if (scene.route.key.match(/^Divider/i)) {
            return (
                <TouchableWithoutFeedback>
                    <View style={styles.dividerWrap}>
                        <View style={styles.divider} />
                    </View>
                </TouchableWithoutFeedback>
            );
        }
        return (
            <View style={styles.menuLabel}>
                <Text style={[styles.menuText, { color: scene.tintColor }]}>{base(scene)}</Text>
            </View>
        );
    }

    render() {
        let background = '#f3a76b';

        return (
            <View style={styles.container}>
                <ScrollView>
                    <MyStatusBar
                        barStyle="light-content"
                        backgroundColor={background}
                    />
                    <View style={styles.wrapLogo}>
                        <Image
                            style={styles.stretch}
                            source={logo}
                        />
                    </View>
                    <DrawerItems
                        {...this.props}
                        onItemPress={route => this.onMenuItemPress(route, this.props.onItemPress)}
                        getLabel={scene => this.getLabel(scene, this.props.getLabel)}
                    />
                </ScrollView>
            </View>
        )
    }
}

export default MainSidebar;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapLogo: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f89f6d'
    },
    logo: {
        width: 50,
        height: 50,
    },
    stretch: {
        width: 120,
        height: 120,
        resizeMode: 'cover'
    },
    dividerWrap: {
        paddingVertical: 10,
        flex: 1
    },
    divider: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#ccc',
    },
    menuLabel: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 13,
        paddingBottom: 13
    },
    menuText: {
        fontSize: 16,
        flex: 1
    },
    menuCount: {
        backgroundColor: 'red',
        borderRadius: 10,
        marginRight: 15,
        paddingHorizontal: 6,
        paddingVertical: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 3
    },
    menuCountText: {
        color: '#fff'
    },
})
