import React from 'react';
import Toolbar from '../../controls/toolbars';
import Loading from '../../controls/loading';
import {
    Dimensions, Linking, StyleSheet, ScrollView, Alert,
    TouchableOpacity, Image, Modal, TextInput, Switch, View, Text, Platform
} from 'react-native';
import { CheckBox } from 'native-base';
import { MaterialIcons as Icon } from '@expo/vector-icons';
const ios = Platform.OS === 'ios';
import axios from 'axios';
import {API_URL} from '../constants/Config';
var qs = require("qs");
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
            }
        }
    }


    setValue = data => {
        this.setState({
            model: { ...this.state.model, ...data }
        });
    }

    toggleCheckbox1 =  () => {
        this.setState({
            checkboxes1: !this.state.checkboxes1
        })
    }
    toggleCheckbox2 =  () => {
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
        return axios({
            method: 'POST',
            url: myurl,
            data: qs.stringify(this.state.model),
          }).then(response => {
            // this.props.onRequestClose();
            Alert.alert(
                'Thank you for your interest Ms Doe.',
                `Your reservation has been submitted. We have sent a confirmation email to ${this.state.model.email}.
                We look forward to seeing you on 1 Nov (Tue) at 11:00 AM. Get ready to be dazzled!`,
                [
                  {text: 'OK', onPress: () => {
                    this.props.refresh();
                    this.props.onRequestClose();
                  }},
                ],
                { cancelable: false }
              )
      	})
        .catch(err => console.log('err',err));
    }

    render() {
        const checkboxes1 = this.state.checkboxes1;
        const checkboxes2 = this.state.checkboxes2;
        if (!this.props.show) {
            return null;
        }

        return (
            <Modal
                supportedOrientations={['portrait', 'landscape']}
                onRequestClose={this.handleClose} >
                <Toolbar
                    elevation={2}
                    icon={<Icon name='arrow-back' style={styles.icon} />}
                    onIconPress={this.handleClose}
                    actions={[
                        {
                            icon: <Icon name='save' style={styles.icon} />,
                            onPress: this.handleSubmit,
                            disabled: this.state.loading
                        }
                    ]}
                    titleText='Register Guest'
                    style={styles.toolbar}
                ></Toolbar>

                <View style={styles.customer}>
                    <ScrollView keyboardShouldPersistTaps='always' style={{ backgroundColor: '#fff' }}>
                        <View style={styles.customerInfo}>
                            <View style={styles.prop}>
                                <Text style={styles.label}>Title</Text>
                                <TextInput
                                    autoCapitalize='words'
                                    ref='title'
                                    style={[styles.TextInput, ios && styles.TextInputIos]}
                                    required
                                    underlineColorAndroid='transparent'
                                    value={this.state.model.title}
                                    onChangeText={text => this.setValue({ title: text })} />
                            </View>
                            <View style={styles.prop}>
                                <Text style={styles.label}>First name</Text>
                                <TextInput
                                    autoCapitalize='words'
                                    ref='fname'
                                    style={[styles.TextInput, ios && styles.TextInputIos]}
                                    required
                                    underlineColorAndroid='transparent'
                                    value={this.state.model.first_name}
                                    onChangeText={text => this.setValue({ first_name: text })} />
                            </View>
                             <View style={styles.prop}>
                                <Text style={styles.label}>Last name</Text>
                                <TextInput
                                    autoCapitalize='words'
                                    ref='lname'
                                    style={[styles.TextInput, ios && styles.TextInputIos]}
                                    required
                                    underlineColorAndroid='transparent'
                                    value={this.state.model.last_name}
                                    onChangeText={text => this.setValue({ last_name: text })} />
                            </View>
                            <View style={styles.prop}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    ref='mail'
                                    style={[styles.TextInput, ios && styles.TextInputIos]}
                                    // required
                                    autoCapitalize='none'
                                    underlineColorAndroid='transparent'
                                    value={this.state.model.email}
                                    keyboardType='email-address'
                                    onChangeText={text => this.setValue({ email: text })} />
                            </View>
                            <View style={styles.prop}>
                                <Text style={styles.label}>Country Code</Text>
                                <TextInput
                                    ref='code'
                                    style={[styles.TextInput, ios && styles.TextInputIos]}
                                    required
                                    autoCapitalize='none'
                                    underlineColorAndroid='transparent'
                                    value={this.state.model.country_code}
                                    keyboardType='phone-pad'
                                    onChangeText={text => this.setValue({ country_code: text })} />
                            </View>
                            <View style={styles.prop}>
                                <Text style={styles.label}>Phone</Text>
                                <TextInput
                                    ref='code'
                                    style={[styles.TextInput, ios && styles.TextInputIos]}
                                    required
                                    autoCapitalize='none'
                                    underlineColorAndroid='transparent'
                                    value={this.state.model.mobile_number}
                                    keyboardType='phone-pad'
                                    onChangeText={text => this.setValue({ mobile_number: text })} />
                            </View>
                            <View style={styles.propCheckBox}>
                                <CheckBox 
                                onPress={() => this.toggleCheckbox1()}
                                checked={checkboxes1}  
                               />
                                <Text style={styles.checkBox}> I have read and agree to the Terms and Conditions and Privacy Policy. </Text>
                            </View>
                            <View style={styles.propCheckBox}>
                                <CheckBox 
                                onPress={() => this.toggleCheckbox2()}
                                checked={checkboxes2}  
                            />
                                <Text style={styles.checkBox}> I would like to receive information about Cartier’s products or services.</Text>
                            </View>
                        </View>
                    </ScrollView>
                    {this.state.loading && <Loading />}

                </View>
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
    customer: {
        flex: 1,
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
        paddingRight: 5
    }
    
});
