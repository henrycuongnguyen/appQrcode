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
            loggedIn: false,
            access_token: ''
        }
    }

    componentDidMount() {

        AsyncStorage.getItem("access_token").then((value) => {
            if (value) {
                this.setState({ loggedIn: true });
            }
        })
            .then(res => {
                //do something else
            });

        this.updateListener = Updates.addListener(this._handleUpdate)
    }

    componentWillUnmount() {
        this.updateListener.remove();
    }

    _handleUpdate = ({ type }) => {
        if (type === Updates.EventType.DOWNLOAD_FINISHED) {
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
        AsyncStorage.getItem("access_token").then((value) => {
            this.setState({ access_token: value })
        })
            .then(res => {
                if (data = this.state.access_token) {
                    this.setState({ loggedIn: true })
                }
            });
    }

    logout = () => {
        console.log('logout')
        AsyncStorage.removeItem('access_token');
        this.setState({
            loggedIn: false
        })
    }

    render() {
        console.log(this.state.loggedIn, "hhfguidhfo");
        // if (!this.state.loggedIn) return null;

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