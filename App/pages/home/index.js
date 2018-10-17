import React from 'react';
import { StyleSheet, View, Text, Platform, StatusBar, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Toolbar from '../../controls/toolbars';
import Create from '../reserve/create';
import MyStatusBar from '../statusBar/MyStatusBar';

const { height, width } = Dimensions.get('window');
class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            refreshing: false,
            showCreate: false,
            activeBtn: null,
        }
    }

    componentDidMount() {
    }

    showMenu = () => {
        this.props.navigation.openDrawer();
    }

    onShowQrcode = () => {
        this.props.navigation.navigate('QrCode');
    }

    onShowList = () => {
        this.props.navigation.navigate('ReservePage');
    }

    onShowRegister = () => {
        this.setState({ showCreate: true })
    }

    onShowRegisterIpad = () => {
        this.props.navigation.navigate('ReservePage');
    }

    render() {
        const ios = Platform.OS === 'ios';
        return (
            <View style={styles.container}>
                {height < 1024 ?
                    <Toolbar
                        noShadow
                        icon={<MaterialIcons name='menu' style={{ fontSize: 22, color: '#fff' }} />}
                        onIconPress={this.showMenu}
                        titleText='Home'
                        style={styles.toolbar}
                    ></Toolbar> :
                    <View style={{ alignItems: 'center', backgroundColor: '#ffa06c', paddingTop: 10 }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', padding: 23 }}>Main menu</Text>
                    </View>
                }
                <View style={styles.container}>
                    <View style={[height >= 1024 ? styles.wrapBoxIpad : styles.wrapBox]}>
                        <TouchableOpacity style={[styles.box, this.state.activeBtn == 3 && { backgroundColor: '#ffa06c' }]} onPress={height >= 1024 ? this.onShowRegisterIpad : this.onShowRegister} >
                            <Text style={[styles.text, this.state.activeBtn == 3 && { color: '#fff' }]}>Register Guest</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.box, this.state.activeBtn == 1 && { backgroundColor: '#ffa06c' }]} onPress={this.onShowQrcode}>
                            <Text style={[styles.text, this.state.activeBtn == 1 && { color: '#fff' }]}>Scan QR Code</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.box, this.state.activeBtn == 2 && { backgroundColor: '#ffa06c' }]} onPress={this.onShowList}>
                            <Text style={[styles.text, this.state.activeBtn == 2 && { color: '#fff' }]}>Guest List</Text>
                        </TouchableOpacity>
                    </View>
                    <Create
                        onRequestClose={() => this.setState({ showCreate: false })}
                        refresh={() => this.onShowList()}
                        show={this.state.showCreate}
                    />
                </View>
            </View>
        );
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    wrapBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapBoxIpad: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: height >= 1024  ? (width-220)/3 : (height-220)/3,
        height: height >= 1024  ? (width-220)/3 : (height-220)/3,
        margin: 20,
        padding: 20,
        borderColor: '#ffa06c',
        borderRadius: height >= 1024  ? (width-220)/6 : (height-220)/6,
        borderWidth: 2,
        overflow : "hidden",
    },

    toolbar: {
        backgroundColor: '#ffa06c'
    },
    text: { 
        color: '#ffa06c', 
        fontWeight: 'bold', 
        fontSize: 15 ,
        textAlign: 'center'
    }
});
