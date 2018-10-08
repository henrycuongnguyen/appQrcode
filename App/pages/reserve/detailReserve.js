import React from 'react';
import Toolbar from '../../controls/toolbars';
import Loading from '../../controls/loading';
import {
    Dimensions, Linking, StyleSheet, ScrollView, Alert,
    TouchableOpacity, Image, Modal, TextInput, Switch, View, Text, Platform
} from 'react-native';
import { Form, Item, Input, Button, Picker, Header, Left, Body, Right, Title } from 'native-base';
import { MaterialIcons as Icon } from '@expo/vector-icons';
const ios = Platform.OS === 'ios';
import axios from 'axios';
import { API_URL } from '../constants/Config';
var qs = require("qs");
class DetailForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        }
    }

    handleClose = () => {
        if (this.props.onRequestClose) {
            this.props.onRequestClose();
        }
    }

    onEdit = () => {

        console.log('sc')
    }

    onFetchPost(id, fname, lname, mail, phone) {
            Alert.alert(
                'Guest Details',
`${fname} ${lname}
+ ${phone}
${mail}
                `,
                [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    {
                        text: 'OK', onPress: () => {
                            return axios.get(API_URL, {
                                params: {
                                    ID: id,
                                    checkedIn: true
                                }
                            }).then(response => {
                                alert('Checked')
                            })
                                .catch(err => console.log(err));
                        }
                    },
                ],
                { cancelable: false }
            )
    }

    onDeletePost(id) {
        Alert.alert(
            'Delete Reservation',
            'Are you sure?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        axios.get(API_URL, {
                            params: { ID: id, agree: 1 }
                        }).then(response => {
                            this.props.refresh();
                            this.props.onRequestClose();
                        })
                            .catch(err => console.log(err));
                    }
                },
            ],
            { cancelable: false }
        )
    }

    render() {
        const { data } = this.props;
        // console.log(data)
        if (!this.props.open) { return null; }
        if (!data) {
            return <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text>{'Đối tượng không tồn tại hoặc đã bị xóa'}</Text></View>
        }

        return (
            this.props.showDetailIpad ?
                <View style = {{backgroundColor: '#f5f5f5', flex: 1 }}>
                    <Header style={{ backgroundColor: '#ffa06c', borderBottomWidth: 0 }}>
                        <Left />
                        <Body>
                            <Title style={{ color: '#fff', paddingTop: 5 }}>Reserve a slot</Title>
                        </Body>
                        <Right />
                    </Header>

                    <View style={{ padding: 15, backgroundColor: '#f5f5f5' }}>
                    <View style={styles.reserveInfoIpad}>
                        <Form style={{ backgroundColor: '#fff' }}>
                            <Text style={{ margin: 15, fontWeight: 'bold' }}>Guest Details</Text>
                            <Item>
                                <Input
                                    editable={false}
                                    placeholder="Title"
                                    autoCapitalize='words'
                                    ref='title'
                                    required
                                    underlineColorAndroid='transparent'
                                    value={data.acf.title[0]}
                                    onChangeText={text => this.setValue({ title: text })}
                                />
                            </Item>
                            <Item>
                                <Input
                                    editable={false}
                                    placeholder="First Name"
                                    autoCapitalize='words'
                                    ref='fname'
                                    required
                                    underlineColorAndroid='transparent'
                                    value={data.acf.first_name[0]}
                                    onChangeText={text => this.setValue({ first_name: text })}
                                />
                            </Item>
                            <Item>
                                <Input
                                    editable={false}
                                    placeholder="Last Name"
                                    autoCapitalize='words'
                                    ref='lname'
                                    required
                                    underlineColorAndroid='transparent'
                                    value={data.acf.last_name[0]}
                                    onChangeText={text => this.setValue({ last_name: text })}
                                />
                            </Item>
                            <Item>
                                <Input
                                    editable={false}
                                    keyboardType='email-address'
                                    placeholder="Email"
                                    autoCapitalize='none'
                                    ref='mail'
                                    required
                                    underlineColorAndroid='transparent'
                                    value={data.acf.email[0]}
                                    onChangeText={text => this.setValue({ email: text })}
                                />
                            </Item>

                            <Item style={{ borderBottomWidth: 0 }}>
                                <Input
                                    editable={false}
                                    keyboardType='phone-pad'
                                    placeholder="Phone Number"
                                    required
                                    underlineColorAndroid='transparent'
                                    value={data.acf.mobile_number[0]}
                                    onChangeText={text => this.setValue({ mobile_number: text })}
                                />
                            </Item>
                        </Form>

                        <View style={{ marginTop: 30, marginLeft: 0, flexDirection: 'row' }}>
                            <Button transparent dark
                                onPress={() => this.onFetchPost(data.ID, data.acf.first_name[0], data.acf.last_name[0], data.acf.email[0], data.acf.mobile_number[0])}
                                style={{ backgroundColor: '#fff' }} >
                                <Text style={{ paddingLeft: 15, paddingRight: 15, fontWeight: 'bold' }}>Confirm Check-In</Text>
                            </Button>
                            <Button transparent dark onPress={() => this.onDeletePost(data.ID)} style={{ backgroundColor: '#fff', marginLeft: 15 }} >
                                <Text style={{ paddingLeft: 15, paddingRight: 15, fontWeight: 'bold' }}>Delete Reservation</Text>
                            </Button>
                        </View>
                    </View>
                </View>
                </View>
                :
            <Modal
                supportedOrientations={['portrait', 'landscape']}
                onRequestClose={this.handleClose} >
                <Toolbar
                    elevation={2}
                    icon={<Icon name='arrow-back' style={styles.icon} />}
                    onIconPress={this.handleClose}
                    titleText='Infomation'
                    style={styles.toolbar}
                ></Toolbar>
                <View style={styles.customer}>
                    <ScrollView keyboardShouldPersistTaps='always'>
                        <View style={{ padding: 15, backgroundColor: '#f5f5f5' }}>
                            <View style={styles.reserveInfoIpad}>
                                <Form style={{ backgroundColor: '#fff' }}>
                                    <Text style={{ margin: 15, fontWeight: 'bold' }}>Guest Details</Text>
                                    <Item>
                                        <Input
                                            editable={false}
                                            placeholder="Title"
                                            autoCapitalize='words'
                                            ref='title'
                                            required
                                            underlineColorAndroid='transparent'
                                            value={data.acf.title[0]}
                                            onChangeText={text => this.setValue({ title: text })}
                                        />
                                    </Item>
                                    <Item>
                                        <Input
                                            editable={false}
                                            placeholder="First Name"
                                            autoCapitalize='words'
                                            ref='fname'
                                            required
                                            underlineColorAndroid='transparent'
                                            value={data.acf.first_name[0]}
                                            onChangeText={text => this.setValue({ first_name: text })}
                                        />
                                    </Item>
                                    <Item>
                                        <Input
                                            editable={false}
                                            placeholder="Last Name"
                                            autoCapitalize='words'
                                            ref='lname'
                                            required
                                            underlineColorAndroid='transparent'
                                            value={data.acf.last_name[0]}
                                            onChangeText={text => this.setValue({ last_name: text })}
                                        />
                                    </Item>
                                    <Item>
                                        <Input
                                            editable={false}
                                            keyboardType='email-address'
                                            placeholder="Email"
                                            autoCapitalize='none'
                                            ref='mail'
                                            required
                                            underlineColorAndroid='transparent'
                                            value={data.acf.email[0]}
                                            onChangeText={text => this.setValue({ email: text })}
                                        />
                                    </Item>

                                    <Item style={{ borderBottomWidth: 0 }}>
                                        <Input
                                            editable={false}
                                            keyboardType='phone-pad'
                                            placeholder="Phone Number"
                                            required
                                            underlineColorAndroid='transparent'
                                            value={data.acf.mobile_number[0]}
                                            onChangeText={text => this.setValue({ mobile_number: text })}
                                        />
                                    </Item>
                                </Form>

                                <View style={{ marginTop: 30, marginLeft: 0, flexDirection: 'row' }}>
                                    <Button transparent dark
                                        onPress={() => this.onFetchPost(data.ID, data.acf.first_name[0], data.acf.last_name[0], data.acf.email[0], data.acf.mobile_number[0])}
                                        style={{ backgroundColor: '#fff' }} >
                                        <Text style={{ paddingLeft: 15, paddingRight: 15, fontWeight: 'bold' }}>Confirm Check-In</Text>
                                    </Button>
                                    <Button transparent dark onPress={() => this.onDeletePost(data.ID)} style={{ backgroundColor: '#fff', marginLeft: 15 }} >
                                        <Text style={{ paddingLeft: 15, paddingRight: 15, fontWeight: 'bold' }}>Delete Reservation</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        );
    }
}

export default DetailForm;
var { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    icon: {
        fontSize: 22,
        color: '#fff'
    },
    customer: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    customerInfo: {
        flex: 1,
        padding: 10,
    },
    toolbar: {
        backgroundColor: '#ffa06c'
    },
    prop: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    propsBtn: {
        marginTop: 20,
        flexDirection: 'row',
    },
    label: {
        width: 60,
        fontWeight: 'bold',
        marginTop: 5,
        paddingRight: 5,
        flex: 1
    },
    TextInput: {
        flex: 2,
        height: 40,
        padding: 4,
        backgroundColor: '#f9f9f9',
        width: width - 30
    },
    TextInputIos: { borderWidth: 1, borderColor: '#ccc' },
    labelsl: {
        width: 95,
        fontWeight: 'bold',
        marginTop: 5,
        paddingRight: 5,
    },
    // btnRes: {
    //     paddingLeft: 20
    // },
    btn: {
        backgroundColor: '#ffa06c',
        padding: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }

});
