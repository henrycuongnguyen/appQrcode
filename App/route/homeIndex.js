import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, Dimensions, ScrollView, Text } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import { Ionicons, FontAwesome as Icon, MaterialIcons } from '@expo/vector-icons';
import ReservePage from '../pages/reserve/index';
import QrCode from '../index';
import MainSidebar from './homeSidebar';

const AccountRouter = createDrawerNavigator(
    {
        ReservePage: {
            screen: ReservePage,
            path: 'reservePage',
            navigationOptions: {
                drawerLabel: () => 'All guests',
                drawerIcon: props => (
                    <MaterialIcons style={[styles.icon, { color: props.tintColor }]} name='menu' color={props.tintColor} size={18} />
                ),
            }
        },
        QrCode: {
            screen: QrCode,
            path: 'qrcode',
            navigationOptions: {
                drawerLabel: 'QrCode',
                drawerIcon: props => (
                    <Ionicons style={[styles.icon, { color: props.tintColor }]} name='ios-qr-scanner' color={props.tintColor} size={18} />
                ),
            }
        }

    },
    {
        initialRouteName: 'ReservePage',
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


