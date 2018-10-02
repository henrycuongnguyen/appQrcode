import React from 'react';
import Toolbar from '../controls/toolbars';
import WebContainer from '../controls/webcontainer';
import {
    Dimensions, Linking, StyleSheet, ScrollView, Alert,
    TouchableOpacity, Image, Modal, TextInput, Switch, View, Text, Platform
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
const ios = Platform.OS === 'ios';
class InfoUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showInfo: false,
        }
    }


    handleClose = () => {
        if (this.props.onRequestClose) {
            this.props.onRequestClose();
        }
    }

    handleSubmit = () => {
        console.log('checkin')
    }

    render() {
        console.log('data', this.props.data)
        var dataStr = '';
        if(this.props.data){
            dataStr = this.props.data.data;
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
                    actions={[
                        {
                            icon: <Icon name='save' style={styles.icon} />,
                            onPress: this.handleSubmit,
                            disabled: this.state.loading
                        }
                    ]}
                    titleText='Info'
                    style={styles.toolbar}
                ></Toolbar>

                <View style={styles.scanBar}>
                    <ScrollView keyboardShouldPersistTaps='always' style={{ backgroundColor: '#fff' }}>
                        <View style={styles.scanBarInfo}>
                            <View>
                                <WebContainer html={dataStr} autoHeight={true} style={styles.webView} />
                            </View>
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
    },
    scanBarInfo: {
        flex: 1,
        padding: 10,
    },
    toolbar: {
        backgroundColor: '#DB4437'
    },
    prop: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    label: {
        width: 95,
        fontWeight: 'bold',
        marginTop: 5,
        paddingRight: 5,
        flex: 1
    },
    textbox: {
        flex: 1,
        height: 40,
        padding: 4,
        backgroundColor: '#f9f9f9',
        width: width - 125
    },
    textboxIos: { borderWidth: 1, borderColor: '#ccc' },
    inputTextarea: {
        minHeight: 120,
        height: null,
        justifyContent: "flex-start",
        textAlignVertical: 'top',
        flex: 1
    },
    labelsl: {
        width: 95,
        fontWeight: 'bold',
        marginTop: 5,
        paddingRight: 5,
    },
    select: {
        height: 40,
        padding: 4,
        flex: 1,
        backgroundColor: '#f9f9f9'
    },
   
});
