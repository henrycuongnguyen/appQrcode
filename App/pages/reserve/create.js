import React from 'react';
import moment from 'moment';
import Toolbar from '../../controls/toolbars';
import Loading from '../../controls/loading';
import {
    Dimensions, Linking, StyleSheet, ScrollView, Alert,
    TouchableOpacity, Image, Modal, TextInput, Switch, View, Text, Platform, AsyncStorage
} from 'react-native';
import { CheckBox, Form, Item, Input, ListItem, Body, Header, Left, Right, Title, Button, Picker } from 'native-base';
import { MaterialIcons as Icon } from '@expo/vector-icons';
const ios = Platform.OS === 'ios';
import axios from 'axios';
import { API_URL } from '../constants/Config';
import DatePicker from '../../controls/datepicker';
var qs = require("qs");
const Items = Picker.Item;
import Constants from './const';
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
                date: moment().format("YYYY-MM-DD"),
                time: '11:00 AM',
                bir_day: '',
                bir_month: '',
                bir_year: '',
            },
            selectedItem: undefined,
            results: {
                items: []
            },
            data: null,
            d: [],
            t: [],
            y: [],
        }
        for (var i = 1; i <= 31; i++) {
            this.state.d.push(i);
        }
        for (var i = 1; i <= 12; i++) {
            this.state.t.push(i);
        }
        for (var i = 1940; i <= 2004; i++) {
            this.state.y.push(i);
        }

        //this.arrayholder = [];
    }

    componentDidMount() {
        var urlItem = `${API_URL}/wp-json/sections_timeslot/reserves`;
        this.setState({ loading: true });
        AsyncStorage.getItem("access_token").then((value) => {
            this.setState({ "access_token": value });
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${value}`,
                }
            };
            axios.get(`${urlItem}`, config).then(response => {
                // console.log('response==', response);
                this.setState({
                    data: response.data,
                    loading: false,
                })
                //this.arrayholder = response.data;
            })
                .catch(err => {
                    this.setState({
                        loading: false,
                    })
                });
        })
            .then(res => {

            }).catch((e) => {
                this.setState({
                    loading: false,
                })
            })
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
        var myurl = `${API_URL}/wp-json/register/v2/reserves`;
        // if (Object.values(this.state.model).find(v => v == '')) {
        //     alert('Please enter full fields');
        // }
        var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (this.state.model.date == '' || this.state.model.time == '' ||
            this.state.model.title == '' || this.state.model.first_name == '' ||
            this.state.model.last_name == '' || this.state.model.email == '' || this.state.model.country_code == '' || this.state.model.mobile_number == '') {
            alert('Please enter full fields');
        }
        else {
            if (reg.test(this.state.model.email) === false) {
                alert('Email error');
            } else {

                AsyncStorage.getItem("access_token").then((value) => {
                    console.log(value, '=======')
                    this.setState({ "access_token": value });
                    var config = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${value}`,
                        }
                    };
                    return axios({
                        method: 'POST',
                        url: myurl,
                        ...config,
                        data: this.state.model,
                    }).then(response => {
                        Alert.alert(
                            `Thank you for your interest ${this.state.model.last_name}.`,
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
                                date: moment().format("YYYY-MM-DD"),
                                time: '11:00 AM',
                            }
                        })

                    })
                        .catch(err => console.log('err', err));
                })
                    .then(res => {

                    }).catch((e) => {
                        this.setState({
                            loading: false,
                        })
                    })
            }
        }
    }

    onValueChange = (value) => {
        this.setState({
            model: {
                ...this.state.model,
                date: value,
            }
        });
    }

    onValueChangetime = (value) => {
        if (value !== 0) {
            this.setState({
                model: {
                    ...this.state.model,
                    time: value,
                }
            });
        }
    }
    onValueChangeTitle = (value) => {
        if (value !== 0) {
            this.setState({
                model: {
                    ...this.state.model,
                    title: value,
                }
            });
        }
    }
    onValueChangebir_day = (value) => {
        if (value !== 0) {
            this.setState({
                model: {
                    ...this.state.model,
                    bir_day: value,
                }
            });
        }
    }
    onValueChangebir_month = (value) => {
        if (value !== 0) {
            this.setState({
                model: {
                    ...this.state.model,
                    bir_month: value,
                }
            });
        }
    }
    onValueChangebir_year = (value) => {
        if (value !== 0) {
            this.setState({
                model: {
                    ...this.state.model,
                    bir_year: value,
                }
            });
        }
    }

    onValueChangecountry_code = (value) => {
        if (value !== 0) {
            this.setState({
                model: {
                    ...this.state.model,
                    country_code: value,
                }
            });
        }
    }


    render() {
        //const dataSection = {};
        const checkboxes1 = this.state.checkboxes1;
        const checkboxes2 = this.state.checkboxes2;
        if (!this.props.show) {
            return null;
        }

        //this.arrayholder.map((item) => {
        //     const key = `${item.post_status.charAt(0)}`;
        //     if (!dataSection[key]) {
        //         dataSection[key] = [];
        //     }
        //     if (item.acf.date[0] == this.state.model.date.replace(/-/g, '')) {
        //         var time = item.acf.time[0];
        //         var formatted = moment(time, "HH:mm:ss").format("hh:mm A");
        //         dataSection[key].push(formatted);
        //     }

        // })
        // console.log('--==', dataSection);
        // console.log(this.state.model, '-----');

        const dataSection = this.state.data ? this.state.data
            .filter(item => item.acf.date[0] == this.state.model.date.replace(/-/g, ''))
            .map(item => moment(item.acf.time[0], "HH:mm:ss").format("hh:mm A")) : [];

        return (
            this.props.showCreateIpad ?
                <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
                    <Header style={{ backgroundColor: '#ffa06c', borderBottomWidth: 0 }} iosBarStyle='light-content'>
                        <Left />
                        <Body>
                            <Title style={{ color: '#fff', paddingTop: 5 }}>Reserve a slot</Title>
                        </Body>
                        <Right />
                    </Header>

                    <View style={{ padding: 15, backgroundColor: '#f5f5f5' }}>
                        <View style={styles.reserveInfoIpad}>
                            <Text style={{ marginBottom: 15 }}>Complete the form below to reserve a slot for Cartier Collecrtion Exihibition.</Text>
                            <Form style={{ backgroundColor: '#fff' }}>
                                <Item>
                                    <DatePicker
                                        style={styles.datepicker}
                                        date={this.state.model.date}
                                        onDateChange={(date) => { this.setValue({ date: date }) }}
                                        minDate="2018-11-24"
                                        maxDate="2018-12-06"
                                        format="YYYY-MM-DD"
                                    />

                                </Item>
                                <Item>
                                    <Item>
                                        <Picker
                                            style={{ paddingRight: 15 }}
                                            mode='dropdown'
                                            selectedValue={this.state.model.time}
                                            onValueChange={this.onValueChangetime}>
                                            <Items label='Time' value='0' />
                                            {dataSection.map((i) => (<Item key={i} label={i.toString()} value={i} />))}
                                        </Picker>
                                        {/*
                                        <DatePicker
                                            style={styles.datepicker}
                                            date={this.state.model.time}
                                            mode="time"
                                            format="HH:mm"
                                            onDateChange={(date) => { this.setValue({ time: date }) }}
                                        />
                                         */}
                                    </Item>
                                </Item>
                                <Item>
                                    <Picker
                                        mode='dropdown'
                                        selectedValue={this.state.model.title}
                                        onValueChange={this.onValueChangeTitle}>
                                        <Items label='Title' value='0' />
                                        <Items label='Mr' value='Mr' />
                                        <Items label='Ms' value='Ms' />
                                        <Items label='Mdm' value='Mdm' />
                                    </Picker>
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
                                    <Picker
                                        style={{ paddingRight: 15 }}
                                        mode='dropdown'
                                        selectedValue={this.state.model.bir_day}
                                        onValueChange={this.onValueChangebir_day}>
                                        <Items label='DD' value='0' />
                                        {this.state.d.map((i) => (<Item key={i} label={i.toString()} value={i} />))}
                                    </Picker>
                                    <Picker
                                        style={{ paddingRight: 15 }}
                                        mode='dropdown'
                                        selectedValue={this.state.model.bir_month}
                                        onValueChange={this.onValueChangebir_month}>
                                        <Items label='MM' value='0' />
                                        {this.state.t.map((i) => (<Item key={i} label={i.toString()} value={i} />))}
                                    </Picker>
                                    <Picker
                                        style={{ paddingRight: 15 }}
                                        mode='dropdown'
                                        selectedValue={this.state.model.bir_year}
                                        onValueChange={this.onValueChangebir_year}>
                                        <Items label='YYYY' value='0' />
                                        {this.state.y.map((i) => (<Item key={i} label={i.toString()} value={i} />))}
                                    </Picker>
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
                                    <Picker
                                        mode='dropdown'
                                        selectedValue={this.state.model.country_code}
                                        onValueChange={this.onValueChangecountry_code}>
                                        <Items label='Country Code' value='0' />
                                        {Constants.map((i) => (<Item key={i.code} label={i.name + i.d_code} value={i.code} />))}
                                    </Picker>
                                </Item>
                                <Item>
                                    <Input
                                        keyboardType='phone-pad'
                                        placeholder="Mobile Number"
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
                                        <DatePicker
                                            style={styles.datepicker}
                                            date={this.state.model.date}
                                            onDateChange={(date) => { this.setValue({ date: date }) }}
                                            minDate="2018-11-24"
                                            maxDate="2018-12-06"
                                            format="YYYY-MM-DD"
                                        />

                                    </Item>
                                    <Item>
                                        <Picker
                                            style={{ paddingRight: 15 }}
                                            mode='dropdown'
                                            selectedValue={this.state.model.time}
                                            onValueChange={this.onValueChangetime}>
                                            <Items label='Time' value='0' />
                                            {dataSection.map((i) => (<Item key={i} label={i} value={i} />))}
                                        </Picker>
                                    </Item>
                                    <Item>
                                        <Picker
                                            mode='dropdown'
                                            selectedValue={this.state.model.title}
                                            onValueChange={this.onValueChangeTitle}>
                                            <Items label='Title' value='0' />
                                            <Items label='Mr' value='Mr' />
                                            <Items label='Ms' value='Ms' />
                                            <Items label='Mdm' value='Mdm' />
                                        </Picker>
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
                                        <Picker
                                            style={{ paddingRight: 15 }}
                                            mode='dropdown'
                                            selectedValue={this.state.model.bir_day}
                                            onValueChange={this.onValueChangebir_day}>
                                            <Items label='DD' value='0' />
                                            {this.state.d.map((i) => (<Item key={i} label={i.toString()} value={i} />))}
                                        </Picker>
                                        <Picker
                                            style={{ paddingRight: 15 }}
                                            mode='dropdown'
                                            selectedValue={this.state.model.bir_month}
                                            onValueChange={this.onValueChangebir_month}>
                                            <Items label='MM' value='0' />
                                            {this.state.t.map((i) => (<Item key={i} label={i.toString()} value={i} />))}
                                        </Picker>
                                        <Picker
                                            style={{ paddingRight: 15 }}
                                            mode='dropdown'
                                            selectedValue={this.state.model.bir_year}
                                            onValueChange={this.onValueChangebir_year}>
                                            <Items label='YYYY' value='0' />
                                            {this.state.y.map((i) => (<Item key={i} label={i.toString()} value={i} />))}
                                        </Picker>
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
                                        <Picker
                                            mode='dropdown'
                                            selectedValue={this.state.model.country_code}
                                            onValueChange={this.onValueChangecountry_code}>
                                            <Items label='Country Code' value='0' />
                                            {Constants.map((i) => (<Item key={i.code} label={i.name + i.d_code} value={i.code} />))}
                                        </Picker>
                                    </Item>
                                    <Item>
                                        <Input
                                            keyboardType='phone-pad'
                                            placeholder="Mobile Number"
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
        backgroundColor: '#ffa06c',
        paddingTop: ios ? 20 : 0
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
    datepicker: {
        flex: 1,
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
