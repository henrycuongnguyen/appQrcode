import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        backgroundColor: 'rgba(3,3,3,.1)',
        alignItems: 'center', 
        justifyContent: 'center',
    },
    loading:{
        backgroundColor: 'rgb(255,255,255)',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center', 
        justifyContent: 'center'
    }
})

class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const size = this.props.size || 30;
        const width = this.strokeWidth || 3;
        return (
            <View
                style={styles.container}>
                <ActivityIndicator style={styles.loading} size='large' color='#2196F3' />
            </View>
        )
    }
}

export default Loading;