import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import {
    View, Container, Form, Button, Thumbnail, Spinner, Item, Input
} from 'native-base';
const logo = require('../../../assets/icon.png');
import KeyboardSpacer from '../../controls/keyboard-space';
import axios from 'axios';
import { API_URL } from '../constants/Config';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loading: false,
            email: "",
            msg: '',
            isModalVisible: false,
            keyboardVisibled: false
        }
    }


    login = () => {
        const { username, password } = this.state;
        if (username && password) {
            this.setState({ loading: true })
            var url = `${API_URL}/wp-json/wp/v2/users`;
            axios.get(url).then(response => {
                this.setState({ loading: false })
                let idUser = response.data[0];
                if (this.state.username == idUser.name && this.state.password == "oa@dev#lovewhatyoudo!") {
                    AsyncStorage.setItem('access_token', 'loggedin');
                    this.props.login('loggedin');
                }
            })
                .catch((e) => { this.setState({ loading: false, msg: 'Incorrect account' }) })
        } else {
            this.setState({ msg: 'Please enter full fields' });
        }
    }


    // keyboardToggle = (show) => {
    //     this.setState({ keyboardVisibled: show });
    // }

    render() {
        const { width, height } = Dimensions.get('window');

        return (
            <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
                <View style={styles.container}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Thumbnail logo square source={logo}
                            style={[this.state.keyboardVisibled && height < 1024 ? styles.logoSmall : styles.logo]} resizeMode="contain" />
                    </View>
                    <Form>
                        <Item>
                            <Input
                                placeholder="UserName"
                                autoCapitalize='words'
                                ref='title'
                                required
                                underlineColorAndroid='transparent'
                                value={this.state.username}
                                onChangeText={value => this.setState({ username: value })}
                                style={styles.input} placeholder="UserName" />
                        </Item>

                        <Item>
                            <Input
                                placeholder="Password"
                                autoCapitalize='words'
                                ref='title'
                                required
                                underlineColorAndroid='transparent'
                                secureTextEntry={true}
                                value={this.state.password}
                                onChangeText={value => this.setState({ password: value })}
                                style={styles.input} placeholder="Password" />
                        </Item>


                    </Form>
                    {!!this.state.msg &&
                        <View>
                            <Text style={{ color: 'red', paddingLeft: 20, paddingTop: 20 }}>{this.state.msg}</Text>
                        </View>}
                    <View style={{ marginTop: 30, marginLeft: 0, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <Button transparent dark onPress={() => this.login()} style={{ backgroundColor: '#fff', padding: 10 }} >
                            {this.state.loading && <Spinner color='green' />}
                            <Text style={{ paddingLeft: 15, paddingRight: 15, fontWeight: 'bold' }}>Login</Text>
                        </Button>
                    </View>
                </View>
                <KeyboardSpacer onToggle={this.keyboardToggle} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    form: {
        marginLeft: 40,
        marginRight: 40
    },
    containermodal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    containermodalbg: {
        backgroundColor: '#fff',
        padding: 15,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    Firstcart: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    logo: {
        height: 130,
        width: 250,
        marginBottom: 40,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoSmall: {
        height: 70,
        marginTop: 40,
        marginBottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formst: {
        marginLeft: 10,
        marginRight: 10,
    }
});

export default Login;