import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, Dimensions, ScrollView, Text } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import { FontAwesome as Icon, MaterialIcons } from '@expo/vector-icons';
import ReservePage from '../pages/reserve/index';
import QrCode from '../index';
import MainSidebar from './homeSidebar';
import Home from '../pages/home/index';
import Logout from './../pages/home/logout';

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
        },
        Divider_1: {
            screen: View
        },
        Logout: {
            screen: Logout,
            path: 'logout',
            navigationOptions: {
                drawerLabel: 'Logout',
                drawerIcon: props => (
                    <Icon style={[styles.icon, { color: props.tintColor }]} name='sign-out' color={props.tintColor} size={18} />
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


