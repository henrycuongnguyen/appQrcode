import React, { Component } from 'react';
import { Text, AsyncStorage, View, Alert, Platform, StatusBar } from 'react-native';
import { Updates } from 'expo';
import LoginPage from '../home/account';
import MainPage from '../../route/homeIndex';
const ios = Platform.OS === 'ios';
import MyStatusBar from '../statusBar/MyStatusBar';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            networkError: null,
            loggedIn: null
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('access_token', (err, result) => {
            this.setState({
                loggedIn: result == 'loggedin'
            })
        });

        this.updateListener = Updates.addListener(this._handleUpdate)
    }

    componentWillUnmount() {
        this.updateListener.remove();
    }

    _handleUpdate = ({ type }) => {
        if (type === Updates.EventType.DOWNLOAD_FINISHED && !ios) {
            Alert.alert(
                'Update',
                'The application has been updated, do you want to reload it?',
                [
                    { text: 'No', style: 'cancel' },
                    {
                        text: 'Yes', onPress: async () => {
                            Updates.reloadFromCache();
                        }
                    },
                ],
                { cancelable: false }
            )
        }
    }

    login = (data) => {
        this.setState({
            loggedIn: data == 'loggedin'
        })
    }

    logout = () => {
        console.log('logout')
        AsyncStorage.removeItem('access_token');
        this.setState({
            loggedIn: false
        })
    }

    render() {
        if (this.state.loggedIn === null) return null;

        return (
            this.state.loggedIn == true ?
                <View style={{ flex: 1 }}>
                    <MyStatusBar
                        barStyle="light-content"
                        backgroundColor='#f3a76b'
                    />
                    <MainPage logout={this.logout} screenProps={{ logout: this.logout }} />
                </View>
                :
                <LoginPage login={this.login} />
        )
    }
}
export default Layout;