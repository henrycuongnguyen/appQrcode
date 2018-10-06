import React from 'react';
import Toolbar from '../../controls/toolbars';
import Loading from '../../controls/loading';
import {
    Dimensions, Linking, StyleSheet, ScrollView, Alert,
    TouchableOpacity, Image, Modal, TextInput, Switch, View, Text, Platform
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
const ios = Platform.OS === 'ios';
import axios from 'axios';
import {API_URL} from '../constants/Config';
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

    onFetchPost(id) {
        console.log('err');
    }

    onDeletePost(id) {
        console.log(id);
        Alert.alert(
            'Delete Reservation',
            'Are you sure?',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => {
                axios.get(API_URL, {
                    params: { ID: id, agree: 1 }
                   }).then(response => {
                    this.props.refresh();
                    this.props.onRequestClose();
                  })
                .catch(err => console.log(err));
              }},
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
            <Modal
                supportedOrientations={['portrait', 'landscape']}
                onRequestClose={this.handleClose} >
                <Toolbar
                    elevation={2}
                    icon={<Icon name='arrow-back' style={styles.icon} />}
                    onIconPress={this.handleClose}
                    actions={[
                        {
                            icon: <Icon name='edit' style={styles.icon} />,
                            onPress: this.onEdit,
                            disabled: this.state.loading
                        }
                    ]}
                    titleText='Infomation'
                    style={styles.toolbar}
                ></Toolbar>

                <View style={styles.customer}>
                    <ScrollView keyboardShouldPersistTaps='always' style={{ backgroundColor: '#fff' }}>
                        <View style={styles.customerInfo}>
                            <View style={styles.prop}>
                                <Text style={styles.label}>Title</Text>
                                <Text style={[styles.TextInput, ios && styles.TextInputIos]}>
                                    {data.acf.title[0]}
                                </Text>
                            </View>
                            <View style={styles.prop}>
                                <Text style={styles.label}>First name</Text>
                                <Text style={[styles.TextInput, ios && styles.TextInputIos]}>
                                    {data.acf.first_name[0]}
                                </Text>
                            </View>
                            <View style={styles.prop}>
                                <Text style={styles.label}>Last name</Text>
                                <Text style={[styles.TextInput, ios && styles.TextInputIos]}>
                                    {data.acf.last_name[0]}
                                </Text>
                            </View>
                            <View style={styles.prop}>
                                <Text style={styles.label}>Mobile number</Text>
                                <Text style={[styles.TextInput, ios && styles.TextInputIos]}>
                                    {data.acf.mobile_number[0]}
                                </Text>
                            </View>
                            <View style={styles.prop}>
                                <Text style={styles.label}>Email</Text>
                                <Text style={[styles.TextInput, ios && styles.TextInputIos]}>
                                    {data.acf.email[0]}
                                </Text>
                            </View>
                            <View style={styles.propsBtn}>
                                <TouchableOpacity style={styles.btn} onPress = {()=> this.onFetchPost(data.ID)}>
                                    <Text style={styles.btnRes}>Confirm Check-in</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress = {()=> this.onDeletePost(data.ID)}>
                                    <Text style={styles.btnRes}>Delete Reservation</Text>
                                </TouchableOpacity>
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
