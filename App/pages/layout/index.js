import React, { Component } from 'react';
import { Text, AsyncStorage, View } from 'react-native';
// import LoadingPage from './../../controls/loading';
import LoginPage from '../home/account';
import MainPage from '../../route/homeIndex';
class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            networkError: null,
            loggedIn: false
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('access_token', (err, result) => {
            console.log(result);
            if (result == 'loggedin') {
                this.setState({
                    loggedIn: true
                })
            }
        });
    }

    login = (data) => {
        if (data == 'loggedin') {
            this.setState({
                loggedIn: true
            })
        }
    }

    render() {
        return (
            this.state.loggedIn == true ?
                <MainPage />
                :
                <LoginPage login={(data) => this.login(data)} />
        )
    }
}
export default Layout;