import React from "react";
import { StatusBar, Platform, Image, Alert, StyleSheet, View, } from "react-native";
import { Constants } from 'expo';

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const styles = StyleSheet.create({
    statusBar: {
        paddingTop: Constants.statusBarHeight,
    }
});
export default MyStatusBar;