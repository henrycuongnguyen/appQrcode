import React from 'react';
import Toolbar from '../controls/toolbars';
import {
    Dimensions, Linking, StyleSheet, ScrollView, Alert,
    TouchableOpacity, Image, Modal, TextInput, Switch, View, Text, Platform
} from 'react-native';
import { Button, Spinner } from 'native-base';
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

    onFetchPost = (id, url) => {
        this.setState({ loading: true })
        return axios.get(`${url}`, {
            params: {
                ID: id,
                checkedIn: true
            }
        }).then(response => {
            this.setState({ loading: false })
            this.handleClose(null, true);
            setTimeout(()=>{
                alert('Checkedin')
            }, 200)
        })
            .catch(err => {
                alert('An error has occurred, please try again');
                this.setState({ loading: false })
                console.log(err)
            });
    }

    handleClose = (e, goHome) => {
        if (goHome && this.props.goHome) {
            this.props.goHome();
        }
        else if (this.props.onRequestClose) {
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
                    titleText='Confirm Check-In'
                    style={styles.toolbar}
                ></Toolbar>

                <View style={styles.scanBar}>
                    <ScrollView keyboardShouldPersistTaps='always' style={{ backgroundColor: '#f5f5f5' }}>
                        <View style={styles.scanBarInfo}>
                            {!!dataStr ?
                                <View>
                                    <View>
                                        <View style={styles.item}>
                                            <Text style={styles.label}>Date</Text>
                                            <Text style={styles.value}>{dataStr.date}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.label}>Time</Text>
                                            <Text style={styles.value}>{dataStr.time}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.label}>Title</Text>
                                            <Text style={styles.value}>{dataStr.title}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.label}>Firstname</Text>
                                            <Text style={styles.value}>{dataStr.first_name}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.label}>Lastname</Text>
                                            <Text style={styles.value}>{dataStr.last_name}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.label}>Email</Text>
                                            <Text style={styles.value}>{dataStr.email}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.label}>Country code</Text>
                                            <Text style={styles.value}>{dataStr.country_code}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.label}>Mobile number</Text>
                                            <Text style={styles.value}>{dataStr.mobile_number}</Text>
                                        </View>
                                    </View>

                                    <Button transparent dark block
                                        onPress={() => this.handleSubmit(dataStr.post_id, dataStr.url)}
                                        style={{ backgroundColor: '#fff', marginTop: 15 }} >
                                        {
                                            this.state.loading ? <Spinner /> : (
                                                <Text style={{ paddingLeft: 10, paddingRight: 10, fontWeight: 'bold' }}>Confirm Check-In</Text>
                                            )
                                        }
                                    </Button>
                                </View>
                                :
                                <View>
                                    <Text style={{ textAlign: 'center', paddingTop: 15 }}>
                                        Sorry, this QR code is invalid.
                                    </Text>
                                    <Button transparent dark block
                                        onPress={this.handleClose}
                                        style={{ backgroundColor: '#fff', marginTop: 15 }} >
                                        <Text style={{ paddingLeft: 10, paddingRight: 10, fontWeight: 'bold' }}>Scan another one</Text>
                                    </Button>
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
        backgroundColor: '#ffa06c',
        paddingTop: ios ? 20 : 0
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#fff',
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    label: {
        flex: 1,
        paddingLeft: 10
    },
    value: {
        flex: 3,
        paddingLeft: 10,
        color: '#888'
    },
    select: {
        height: 40,
        padding: 4,
        flex: 1,
        backgroundColor: '#f9f9f9'
    },

});
