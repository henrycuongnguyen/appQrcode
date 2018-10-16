import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, Dimensions, ScrollView, Text } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import { FontAwesome as Icon, MaterialIcons } from '@expo/vector-icons';
import ReservePage from '../pages/reserve/index';
import QrCode from '../index';
import MainSidebar from './homeSidebar';
import Home from '../pages/home/index';

const AccountRouter = createDrawerNavigator(
    {
        Home: {
            screen: Home,
            path: 'home',
            navigationOptions: {
                drawerLabel: () => 'Home',
                drawerIcon: props => (
                    <MaterialIcons style={[styles.icon, { color: props.tintColor }]} name='home' color={props.tintColor} size={18} />
                ),
            }
        },
        ReservePage: {
            screen: ReservePage,
            path: 'reservePage',
            navigationOptions: {
                drawerLabel: () => 'All guests',
                drawerIcon: props => (
                    <MaterialIcons style={[styles.icon, { color: props.tintColor }]} name='people' color={props.tintColor} size={18} />
                ),
            }
        },
        QrCode: {
            screen: QrCode,
            path: 'qrcode',
            navigationOptions: {
                drawerLabel: 'QrCode',
                drawerIcon: props => (
                    <Icon style={[styles.icon, { color: props.tintColor }]} name='qrcode' color={props.tintColor} size={18} />
                ),
            }
        }

    },
    {
        initialRouteName: 'Home',
        contentComponent: props => (
            <MainSidebar {...props}
                routes={this.routes}
                onMenuItemPress={this.onMenuItemPress} />
        ),
        contentOptions: {
        }

    },

);

export default AccountRouter;


const styles = StyleSheet.create({
    icon: { fontSize: 18, color: "#808080" }
});


