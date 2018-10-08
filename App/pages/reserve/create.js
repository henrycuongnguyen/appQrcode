import React from 'react';
import Toolbar from '../../controls/toolbars';
import Loading from '../../controls/loading';
import {
    Dimensions, Linking, StyleSheet, ScrollView, Alert,
    TouchableOpacity, Image, Modal, TextInput, Switch, View, Text, Platform
} from 'react-native';
import { CheckBox, Form, Item, Input, ListItem, Body, Header, Left, Right, Title, Button, Picker } from 'native-base';
import { MaterialIcons as Icon } from '@expo/vector-icons';
const ios = Platform.OS === 'ios';
import axios from 'axios';
import { API_URL } from '../constants/Config';
var qs = require("qs");
const Items = Picker.Item;
class CreateForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            checkboxes1: false,
            checkboxes2: false,
            model: {
                title: '',
                first_name: '',
                last_name: '',
                email: '',
                country_code: '',
                mobile_number: '',
                date: '1 NOV (THU)',
                time: '11:00 AM',
            },
            selectedItem: undefined,
            results: {
                items: []
            }
        }
    }


    setValue = data => {
        this.setState({
            model: { ...this.state.model, ...data }
        });
    }

    toggleCheckbox1 = () => {
        this.setState({
            checkboxes1: !this.state.checkboxes1
        })
    }
    toggleCheckbox2 = () => {
        this.setState({
            checkboxes2: !this.state.checkboxes2
        })
    }

    handleClose = () => {
        if (this.props.onRequestClose) {
            this.props.onRequestClose();
        }
    }

    handleSubmit = () => {
        var myurl = `${API_URL}/reserve/`;
        var vfName = this.state.model.first_name;
        var vlName = this.state.model.last_name;
        var vemail = this.state.model.email;
        var vPhone = this.state.model.mobile_number;
        var vCode = this.state.model.country_code;
        var vTitle = this.state.model.title;
        if (vfName == '' || vlName == '' || vemail == '' || vPhone == '' || vCode == '' || vTitle == '') {
            alert('Please enter full fields');
        } else {
            return axios({
                method: 'POST',
                url: myurl,
                data: qs.stringify(this.state.model),
            }).then(response => {
                Alert.alert(
                    'Thank you for your interest Ms Doe.',
                    `Your reservation has been submitted. We have sent a confirmation email to ${this.state.model.email}. We look forward to seeing you on ${this.state.model.date} at ${this.state.model.time}. Get ready to be dazzled!`,
                    [
                        {
                            text: 'OK', onPress: () => {
                                this.props.refresh();
                                this.props.onRequestClose();
                            }
                        },
                    ],
                    { cancelable: false }
                )

                this.setState({
                    ...this.state,
                    model: {
                        title: '',
                        first_name: '',
                        last_name: '',
                        email: '',
                        country_code: '',
                        mobile_number: '',
                    }
                })

            })
                .catch(err => console.log('err', err));
        }
    }

    onValueChange = (value) => {
        this.setState({
            model: {
                date: value,
            }
        });
    }

    onValueChangeTime = (value) => {
        this.setState({
            model: {
                time: value,
            }
        });
    }


    render() {
        const checkboxes1 = this.state.checkboxes1;
        const checkboxes2 = this.state.checkboxes2;
        if (!this.props.show) {
            return null;
        }

        return (
            this.props.showCreateIpad ?
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
                            <Text style={{ marginBottom: 15}}>Complete the form below to reserve a slot for Cartier Collecrtion Exihibition.</Text>
                            <Form style={{ backgroundColor: '#fff' }}>
                                <Item>
                                    <Picker
                                        mode='dropdown'
                                        selectedValue={this.state.model.date}
                                        onValueChange={this.onValueChange}>
                                        <Items label='1 NOV (THU)' value='1 NOV (THU)' />
                                        <Items label='2 NOV (FRI)' value='2 NOV (FRI)' />
                                        <Items label='3 NOV (SAT)' value='3 NOV (SAT)' />
                                        <Items label='4 NOV (SUN)' value='4 NOV (SUN)' />
                                        <Items label='5 NOV (MON)' value='5 NOV (MON)' />
                                        <Items label='6 NOV (TUE)' value='6 NOV (TUE)' />
                                        <Items label='7 NOV (WED)' value='7 NOV (WED)' />
                                        <Items label='8 NOV (THU)' value='8 NOV (THU)' />
                                        <Items label='9 NOV (FRI)' value='9 NOV (FRI)' />
                                        <Items label='10 NOV (SAT)' value='10 NOV (SAT)' />
                                        <Items label='11 NOV (SUN)' value='11 NOV (SUN)' />
                                        <Items label='12 NOV (MON)' value='12 NOV (MON)' />
                                        <Items label='13 NOV (TUE)' value='13 NOV (TUE)' />
                                        <Items label='14 NOV (WED)' value='14 NOV (WED)' />
                                        <Items label='15 NOV (THU)' value='15 NOV (THU)' />
                                        <Items label='16 NOV (FRI)' value='16 NOV (FRI)' />
                                    </Picker>
                                </Item>
                                <Item>
                                    <Picker
                                        mode='dropdown'
                                        selectedValue={this.state.model.time}
                                        onValueChange={this.onValueChangeTime}>
                                        <Items label='11:00 AM' value='11:00 AM' />
                                        <Items label='12:00 AM' value='12:00 AM' />
                                        <Items label='1:00 AM' value='1:00 AM' />
                                        <Items label='2:00 AM' value='2:00 AM' />
                                        <Items label='3:00 AM' value='3:00 AM' />
                                        <Items label='4:00 AM' value='4:00 AM' />
                                        <Items label='5:00 AM' value='5:00 AM' />
                                        <Items label='6:00 AM' value='6:00 AM' />
                                        <Items label='7:00 AM' value='7:00 AM' />
                                    </Picker>
                                </Item>
                                <Item>
                                    <Input
                                        placeholder="Title"
                                        autoCapitalize='words'
                                        ref='title'
                                        required
                                        underlineColorAndroid='transparent'
                                        value={this.state.model.title}
                                        onChangeText={text => this.setValue({ title: text })}
                                    />
                                </Item>
                                <Item>
                                    <Input
                                        placeholder="First Name"
                                        autoCapitalize='words'
                                        ref='fname'
                                        required
                                        underlineColorAndroid='transparent'
                                        value={this.state.model.first_name}
                                        onChangeText={text => this.setValue({ first_name: text })}
                                    />
                                </Item>
                                <Item>
                                    <Input
                                        placeholder="Last Name"
                                        autoCapitalize='words'
                                        ref='lname'
                                        required
                                        underlineColorAndroid='transparent'
                                        value={this.state.model.last_name}
                                        onChangeText={text => this.setValue({ last_name: text })}
                                    />
                                </Item>
                                <Item>
                                    <Input
                                        keyboardType='email-address'
                                        placeholder="Email"
                                        autoCapitalize='none'
                                        ref='mail'
                                        required
                                        underlineColorAndroid='transparent'
                                        value={this.state.model.email}
                                        onChangeText={text => this.setValue({ email: text })}
                                    />
                                </Item>
                                <Item>
                                    <Input
                                        keyboardType='phone-pad'
                                        placeholder="Country Code"
                                        autoCapitalize='words'
                                        ref='mail'
                                        required
                                        underlineColorAndroid='transparent'
                                        value={this.state.model.country_code}
                                        onChangeText={text => this.setValue({ country_code: text })}
                                    />
                                </Item>
                                <Item>
                                    <Input
                                        keyboardType='phone-pad'
                                        placeholder="Phone Number"
                                        required
                                        underlineColorAndroid='transparent'
                                        value={this.state.model.mobile_number}
                                        onChangeText={text => this.setValue({ mobile_number: text })}
                                    />
                                </Item>
                                <ListItem>
                                    <CheckBox
                                        onPress={() => this.toggleCheckbox1()}
                                        checked={checkboxes1} />
                                    <Body>
                                        <Text style={{ paddingLeft: 10 }}>I have read and agree to the Terms and Conditions and Privacy Policy.</Text>
                                    </Body>
                                </ListItem>
                                <ListItem style={{ borderBottomWidth: 0 }}>
                                    <CheckBox
                                        onPress={() => this.toggleCheckbox2()}
                                        checked={checkboxes2} />
                                    <Body>
                                        <Text style={{ paddingLeft: 10 }}>I would like to receive information about Cartier’s products or services.</Text>
                                    </Body>
                                </ListItem>
                            </Form>

                            <View style={{ marginTop: 30, marginLeft: 0 }}>
                                <Button transparent dark onPress={this.handleSubmit} style={{ backgroundColor: '#fff' }} >
                                    <Text style={{ paddingLeft: 15, paddingRight: 15, fontWeight: 'bold' }}>Reserve a slot</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
                : <Modal
                    supportedOrientations={['portrait', 'landscape']}
                    onRequestClose={this.handleClose} >
                    <Toolbar
                        elevation={2}
                        icon={<Icon name='arrow-back' style={styles.icon} />}
                        onIconPress={this.handleClose}
                        titleText='Register Guest'
                        style={styles.toolbar}
                    ></Toolbar>
                    <ScrollView keyboardShouldPersistTaps='always'>
                        <View style={{ padding: 15, backgroundColor: '#f5f5f5' }}>
                            <View style={styles.reserveInfoIpad}>
                                <Text style={{ marginBottom: 15 }}>Complete the form below to reserve a slot for Cartier Collecrtion Exihibition.</Text>
                                <Form style={{ backgroundColor: '#fff' }}>
                                    <Item>
                                        <Picker
                                            mode='dropdown'
                                            selectedValue={this.state.model.date}
                                            onValueChange={this.onValueChange}>
                                            <Items label='1 NOV (THU)' value='1 NOV (THU)' />
                                            <Items label='2 NOV (FRI)' value='2 NOV (FRI)' />
                                            <Items label='3 NOV (SAT)' value='3 NOV (SAT)' />
                                            <Items label='4 NOV (SUN)' value='4 NOV (SUN)' />
                                            <Items label='5 NOV (MON)' value='5 NOV (MON)' />
                                            <Items label='6 NOV (TUE)' value='6 NOV (TUE)' />
                                            <Items label='7 NOV (WED)' value='7 NOV (WED)' />
                                            <Items label='8 NOV (THU)' value='8 NOV (THU)' />
                                            <Items label='9 NOV (FRI)' value='9 NOV (FRI)' />
                                            <Items label='10 NOV (SAT)' value='10 NOV (SAT)' />
                                            <Items label='11 NOV (SUN)' value='11 NOV (SUN)' />
                                            <Items label='12 NOV (MON)' value='12 NOV (MON)' />
                                            <Items label='13 NOV (TUE)' value='13 NOV (TUE)' />
                                            <Items label='14 NOV (WED)' value='14 NOV (WED)' />
                                            <Items label='15 NOV (THU)' value='15 NOV (THU)' />
                                            <Items label='16 NOV (FRI)' value='16 NOV (FRI)' />
                                        </Picker>
                                    </Item>
                                    <Item>
                                        <Picker
                                            mode='dropdown'
                                            selectedValue={this.state.model.time}
                                            onValueChange={this.onValueChangeTime}>
                                            <Items label='11:00 AM' value='11:00 AM' />
                                            <Items label='12:00 AM' value='12:00 AM' />
                                            <Items label='1:00 AM' value='1:00 AM' />
                                            <Items label='2:00 AM' value='2:00 AM' />
                                            <Items label='3:00 AM' value='3:00 AM' />
                                            <Items label='4:00 AM' value='4:00 AM' />
                                            <Items label='5:00 AM' value='5:00 AM' />
                                            <Items label='6:00 AM' value='6:00 AM' />
                                            <Items label='7:00 AM' value='7:00 AM' />
                                        </Picker>
                                    </Item>
                                    <Item>
                                        <Input
                                            placeholder="Title"
                                            autoCapitalize='words'
                                            ref='title'
                                            required
                                            underlineColorAndroid='transparent'
                                            value={this.state.model.title}
                                            onChangeText={text => this.setValue({ title: text })}
                                        />
                                    </Item>
                                    <Item>
                                        <Input
                                            placeholder="First Name"
                                            autoCapitalize='words'
                                            ref='fname'
                                            required
                                            underlineColorAndroid='transparent'
                                            value={this.state.model.first_name}
                                            onChangeText={text => this.setValue({ first_name: text })}
                                        />
                                    </Item>
                                    <Item>
                                        <Input
                                            placeholder="Last Name"
                                            autoCapitalize='words'
                                            ref='lname'
                                            required
                                            underlineColorAndroid='transparent'
                                            value={this.state.model.last_name}
                                            onChangeText={text => this.setValue({ last_name: text })}
                                        />
                                    </Item>
                                    <Item>
                                        <Input
                                            keyboardType='email-address'
                                            placeholder="Email"
                                            autoCapitalize='none'
                                            ref='mail'
                                            required
                                            underlineColorAndroid='transparent'
                                            value={this.state.model.email}
                                            onChangeText={text => this.setValue({ email: text })}
                                        />
                                    </Item>
                                    <Item>
                                        <Input
                                            keyboardType='phone-pad'
                                            placeholder="Country Code"
                                            autoCapitalize='words'
                                            ref='mail'
                                            required
                                            underlineColorAndroid='transparent'
                                            value={this.state.model.country_code}
                                            onChangeText={text => this.setValue({ country_code: text })}
                                        />
                                    </Item>
                                    <Item>
                                        <Input
                                            keyboardType='phone-pad'
                                            placeholder="Phone Number"
                                            required
                                            underlineColorAndroid='transparent'
                                            value={this.state.model.mobile_number}
                                            onChangeText={text => this.setValue({ mobile_number: text })}
                                        />
                                    </Item>
                                    <ListItem>
                                        <CheckBox
                                            onPress={() => this.toggleCheckbox1()}
                                            checked={checkboxes1} />
                                        <Body>
                                            <Text style={{ paddingLeft: 10 }}>I have read and agree to the Terms and Conditions and Privacy Policy.</Text>
                                        </Body>
                                    </ListItem>
                                    <ListItem style={{ borderBottomWidth: 0 }}>
                                        <CheckBox
                                            onPress={() => this.toggleCheckbox2()}
                                            checked={checkboxes2} />
                                        <Body>
                                            <Text style={{ paddingLeft: 10 }}>I would like to receive information about Cartier’s products or services.</Text>
                                        </Body>
                                    </ListItem>
                                </Form>

                                <View style={{ margin: 15, marginLeft: 0 }}>
                                    <Button transparent dark onPress={this.handleSubmit} style={{ backgroundColor: '#fff' }} >
                                        <Text style={{ paddingLeft: 15, paddingRight: 15, fontWeight: 'bold' }}>Reserve a slot</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </Modal>

        );
    }
}

export default CreateForm;
var { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    icon: {
        fontSize: 22,
        color: '#fff'
    },
    reserve: {
        flex: 1,
    },
    reserveInfo: {
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
    propCheckBox: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: "center"
    },
    label: {
        width: 80,
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
        width: width - 80
    },
    TextInputIos: { borderWidth: 1, borderColor: '#ccc' },
    labelsl: {
        width: 95,
        fontWeight: 'bold',
        marginTop: 5,
        paddingRight: 5,
    },
    checkBox: {
        paddingLeft: 20,
        paddingRight: 10
    }

});
