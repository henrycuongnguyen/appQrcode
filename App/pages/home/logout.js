import React from 'react';
import { Alert } from 'react-native';

export default class Logout extends React.Component {
    componentDidMount() {

        Alert.alert(
            'Logout',
            'Do you want to log out?',
            [
                { text: 'Cancel', onPress: () => { this.props.navigation.navigate('Home'); }, style: 'cancel' },
                { text: 'OK', onPress: () => { this.props.screenProps.logout(); } },
            ],
            { cancelable: false }
        )

    }
    render() {
        return null;
    }
}