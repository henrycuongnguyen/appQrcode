import React from 'react';
import { Dimensions, StyleSheet, Text, View, LayoutAnimation, StatusBar, TouchableOpacity } from 'react-native';
import { BarCodeScanner,  Permissions} from 'expo';
import { Ionicons as Icon } from '@expo/vector-icons';
import BoxInfo from './../../components/infoUser';
import { Button, Spinner } from 'native-base';
const { SCREEN_WIDTH } = Dimensions.get('window');

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showInfo: false,
            showCamera: false,
            currentInfo: null,
            hasCameraPermission: null
        }
    }

    async componentWillMount() {
       // const p1 = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const p2 = await Permissions.askAsync(Permissions.CAMERA);
        console.log('permission request',  p2)
        this.setState({hasCameraPermission: p2.status === 'granted'});
    }

    _handleBarCodeRead = result => {
        this.setState({
            currentInfo: result,
            showInfo: true
        })
    };

    onShowInfo = () => {
        this.setState({ showInfo: true })
    }

    showQrCode = () => {
        this.setState({ showCamera: true })
    }

    onCloseCamera = () => {
        this.props.navigation.navigate('Home');
    }

    render() {
         const { hasCameraPermission } = this.state;

         if (hasCameraPermission === null) {
            return (
                <View style={styles.page}></View>
            )
        }
        if (hasCameraPermission === false) {
            return (
                <View style={styles.page}>
                    <Text style={{marginTop: 40, textAlign: 'center'}}>No access to camera</Text>
                    <Button transparent dark block
                        onPress={this.onCloseCamera}
                        style={{ backgroundColor: '#fff', marginTop: 15 }} >
                        <Text style={{ paddingLeft: 10, paddingRight: 10, fontWeight: 'bold' }}>Close</Text>
                    </Button>
                </View>
            )
        }

        return (
            <View style={styles.page}>
                {this.state.showInfo == false &&

                    <BarCodeScanner
                        onBarCodeRead={this._handleBarCodeRead}
                        style={[StyleSheet.absoluteFill, styles.container]}
                    >
                        <View style={styles.layerTop}>
                            <View>
                                <TouchableOpacity onPress={this.onCloseCamera} >
                                    <Text style={styles.urlText}>Close</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={styles.layerCenter}>
                            <View style={styles.layerLeft} />
                            <View style={styles.focused}>
                                <Icon
                                    name="ios-qr-scanner"
                                    size={200}
                                    color='#fff'
                                />
                            </View>
                            <View style={styles.layerRight} />
                        </View>
                        <View style={styles.layerBottom} />
                    </BarCodeScanner>
                }
                <BoxInfo
                    data={this.state.currentInfo}
                    onRequestClose={() => this.setState({ showInfo: false })}
                    goHome={this.onCloseCamera}
                    show={this.state.showInfo}
                />
            </View>
        );
    }
}

// const opacity = 'rgba(0, 0, 0, .6)';
const opacity = 'rgba(0, 0, 0, 0)';

const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    btnqrcode: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4d904ff2'
    },
    layerTop: {
        flex: 2,
        backgroundColor: opacity
    },
    layerCenter: {
        flex: 2,
        flexDirection: 'row'
    },
    layerLeft: {
        flex: 2,
        backgroundColor: opacity
    },
    focused: {
        flex: 10,
        // borderWidth: 1,
        // borderColor: 'green',
        alignItems: 'center',
        justifyContent: 'center'
    },
    layerRight: {
        flex: 2,
        backgroundColor: opacity
    },
    layerBottom: {
        flex: 2,
        backgroundColor: opacity
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.9)',
        padding: 15,
        flexDirection: 'row',
    },
    urlText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 23,
        padding: 20
    },
    btnshowqrcode: {
        borderColor: '#fff',
        borderWidth: 1
    }

});