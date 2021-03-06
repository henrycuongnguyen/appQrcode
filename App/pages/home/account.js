import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import {
    View, Container, Form, Button, Thumbnail, Spinner, Item, Input
} from 'native-base';
const logo = require('../../../assets/icon.png');
import KeyboardSpacer from '../../controls/keyboard-space';
import axios from 'axios';
import { API_URL } from '../constants/Config';
const pa = "oa@dev#lovewhatyoudo!";
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "cati3r.admin",
            password: "!xrm9XcRYM5#EUglL8115BZm#",
            loading: false,
            email: "",
            msg: '',
            isModalVisible: false,
            keyboardVisibled: false
        }
        // AsyncStorage.removeItem('access_token');
    }

    validate = () => {
        const { username, password } = this.state;
        if (username && password) {
            this.setState({ loading: true })
            var url = `${API_URL}/wp-json/jwt-auth/v1/token`;
            axios({
                method: 'POST',
                // headers: { 'content-type': 'application/json' },
                data: { username: username, password: password },
                url,
            }).then(({ data }) => {
                this.setState({ loading: false })
                if (data.token) {
                    console.log('====================================')
                    console.log(data.token)
                    console.log('====================================')
                    AsyncStorage.setItem('access_token', data.token);
                    this.props.login('loggedin');
                }

            })
                .catch((e) => {
                    this.setState({ loading: false, msg: 'Incorrect account' });
                    console.log('error pass', this.state.password, e)
                })
        } else {
            this.setState({ msg: 'Please enter full fields' });
        }
    }


    login = () => {
        const { username, password } = this.state;
        if (username && password) {
            this.setState({ loading: true })
            var url = `${API_URL}/wp-json/qrcode/login`;
            axios({
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                data: { a: username, b: password },
                url,
            }).then(({ data }) => {
                this.setState({ loading: false })
                console.log('====================================')
                console.log(data)
                console.log('====================================')
                if (data.success && data.token) {
                    AsyncStorage.setItem('access_token', 'loggedin');
                    console.log('logged in')
                    this.props.login('loggedin');
                }
                else {
                    console.log('sai pass', this.state.password)
                    this.setState({ loading: false, msg: 'Incorrect account' })
                }
            })
                .catch((e) => {
                    this.setState({ loading: false, msg: 'Incorrect account' });
                    console.log('error pass', this.state.password, e)
                })
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
                                autoCapitalize='none'
                                ref='title'
                                required
                                underlineColorAndroid='transparent'
                                value={this.state.username}
                                onChangeText={value => this.setState({ username: value })}
                                style={styles.input} placeholder="Username" />
                        </Item>

                        <Item>
                            <Input
                                placeholder="Password"
                                autoCapitalize='none'
                                ref='title'
                                required
                                password
                                secureTextEntry={true}
                                underlineColorAndroid='transparent'
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
                        <Button transparent dark onPress={() => this.validate()} style={{ backgroundColor: '#fff', padding: 10 }} >
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