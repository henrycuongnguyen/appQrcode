import React from 'react';
import Toolbar from '../controls/toolbars';
import {
    Dimensions, Linking, StyleSheet, ScrollView, Alert,
    TouchableOpacity, Image, Modal, TextInput, Switch, View, Text, Platform
} from 'react-native';
import { Button } from 'native-base';
import { MaterialIcons as Icon } from '@expo/vector-icons';
const ios = Platform.OS === 'ios';
import axios from 'axios';
class InfoUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showInfo: false,
        }
    }

    componentDidMount() {
    }

    onFetchPost(id, url) {
        return axios.get(`${url}`, {
            params: {
                ID: id,
                checkedIn: true
            }
        }).then(response => {
            alert('Checkedin')
        })
            .catch(err => console.log(err));
    }

    handleClose = () => {
        if (this.props.onRequestClose) {
            this.props.onRequestClose();
        }
    }

    handleSubmit = (id, url) => {
        this.onFetchPost(id, url);
    }

    render() {
        console.log('');
        var dataStr = '';
        if (this.props.data) {
            // dataStr = JSON.parse(this.props.data.data);
            if (/^[\],:{}\s]*$/.test(this.props.data.data.replace(/\\["\\\/bfnrtu]/g, '@').
                replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
                replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                dataStr = JSON.parse(this.props.data.data);

            } else {

                dataStr = '';

            }
        }
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
                    // actions={[
                    //     {
                    //         icon: <Icon name='save' style={styles.icon} />,
                    //         onPress: () => this.handleSubmit(dataStr.post_id, dataStr.url),
                    //         disabled: this.state.loading
                    //     }
                    // ]}
                    titleText='Confirm Check-In'
                    style={styles.toolbar}
                ></Toolbar>

                <View style={styles.scanBar}>
                    <ScrollView keyboardShouldPersistTaps='always' style={{ backgroundColor: '#f5f5f5' }}>
                        <View style={styles.scanBarInfo}>
                            {!!dataStr ?
                                <View>
                                    <View>
                                        <Text style={styles.textFild}>Date: {dataStr.date}</Text>
                                        <Text style={styles.textFild}>Time: {dataStr.time}</Text>
                                        <Text style={styles.textFild}>Title: {dataStr.title}</Text>
                                        <Text style={styles.textFild}>First name: {dataStr.first_name}</Text>
                                        <Text style={styles.textFild}>Last name : {dataStr.last_name}</Text>
                                        <Text style={styles.textFild}>Email: {dataStr.email}</Text>
                                        <Text style={styles.textFild}>Country code: {dataStr.country_code}</Text>
                                        <Text style={styles.textFild}>Mobile number: {dataStr.mobile_number}</Text>
                                    </View>

                                    <Button transparent dark
                                        onPress={() => this.handleSubmit(dataStr.post_id, dataStr.url)}
                                        style={{ backgroundColor: '#fff', marginLeft: 5, marginTop: 15 }} >
                                        <Text style={{ paddingLeft: 10, paddingRight: 10, fontWeight: 'bold' }}>Confirm Check-In</Text>
                                    </Button>
                                </View>
                                :
                                <View>
                                    <Text style={{ textAlign: 'center', paddingTop: 15 }}>
                                        Url qrcode is not formatted
                                    </Text>
                                </View>
                            }
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        );
    }
}

export default InfoUser;

var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    icon: {
        fontSize: 22,
        color: '#fff'
    },
    scanBar: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    scanBarInfo: {
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
    textFild: {
        fontSize: 18,
        paddingLeft: 5
    },
    select: {
        height: 40,
        padding: 4,
        flex: 1,
        backgroundColor: '#f9f9f9'
    },

});
