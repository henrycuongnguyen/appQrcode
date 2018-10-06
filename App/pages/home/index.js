import React from 'react';
import { StyleSheet, View, Text, Platform, StatusBar, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Toolbar from '../../controls/toolbars';
import MyStatusBar from '../statusBar/MyStatusBar';
import Create from '../reserve/create';
class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            refreshing: false,
            showCreate: false,
        }
    }

    componentDidMount() {
    }

    showMenu = () => {
        this.props.navigation.openDrawer();
    }

    onShowQrcode =() => {
        this.props.navigation.navigate('QrCode');
    }

    onShowList =() => {
        this.props.navigation.navigate('ReservePage');
    }

    onShowRegister = () => {
            this.setState({ showCreate: true })
    }


    render() {
        const ios = Platform.OS === 'ios';
        return (
            <View style={styles.container}>
                {
                    !!ios ?
                        <StatusBar backgroundColor='#ffa06c' barStyle='light-content' /> :
                        <MyStatusBar backgroundColor='#ffa06c' barStyle='light-content' />
                }
                <Toolbar
                    noShadow
                    icon={<MaterialIcons name='menu' style={{ fontSize: 22, color: '#fff' }} />}
                    onIconPress={this.showMenu}
                    titleText='Home'
                    style={styles.toolbar}
                ></Toolbar>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.wrapBox}>
                                <TouchableOpacity style={styles.box} onPress ={this.onShowRegister} >
                                    <Text style = {styles.text}>Register Guest</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.box} onPress ={this.onShowQrcode}>
                                    <Text style = {styles.text}>Scan QR Code</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.box} onPress ={this.onShowList}>
                                    <Text style = {styles.text}>Guest List</Text>
                                </TouchableOpacity>
                        </View>
                        <Create
                            onRequestClose={() => this.setState({ showCreate: false })}
                            refresh={() => this.onShowList()}
                            show={this.state.showCreate}
                        />
                    </View>
                </ScrollView>
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
    box: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        margin: 20,
        padding: 10,
        borderColor: '#ffa06c',
        borderRadius: 75,
        borderWidth: 2
    },

    toolbar: {
        backgroundColor: '#ffa06c'
    },
    text: {color: '#ffa06c', fontWeight: 'bold', fontSize: 15}
});
