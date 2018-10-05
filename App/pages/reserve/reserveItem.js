import React, { PureComponent } from 'react';
import { Platform, StyleSheet, View, RefreshControl, Text, TouchableOpacity, Alert, Linking } from 'react-native';
import { Ionicons, MaterialIcons as Icon } from '@expo/vector-icons';
import RsTouchableNativeFeedback from '../../controls/touchable-native-feedback';
import Avatar from '../../controls/avatar';

class ReserveItem extends PureComponent {
    constructor(props) {
        super(props);
    }

    onDetail = (data) => {
        this.props.showBox(data, 'reserveDetail')
    }

    render() {
        const { data } = this.props;
        if (!data) return null;

        return (
            <RsTouchableNativeFeedback onPress={() => this.onDetail(data)}>
                <View style={styles.reserve}>
                    <Avatar url={null} name={!!data.acf.last_name && data.acf.last_name[0]} id={(data.ID)} />
                    <View style={styles.customerInfo}>
                        <Text style={styles.customerTitle} ellipsizeMode='tail' numberOfLines={1}>
                            {data.acf.first_name +' '+ data.acf.last_name}
                        </Text>

                        {
                            !!data.acf.mobile_number && (
                                <View style={styles.reserveProps}>
                                    <Icon type='MaterialIcons' name="phone" style={styles.propIcon} />
                                    <Text style={[styles.propValue, styles.link]}>{data.acf.mobile_number[0]}</Text>
                                </View>
                            )
                        }
                        {
                            !!data.acf.email && (
                                <View style={styles.reserveProps}>
                                    <Icon type='MaterialIcons' name="email" style={styles.propIcon} />
                                    <Text style={[styles.propValue, styles.link]}>{data.acf.email[0]}</Text>
                                </View>
                            )
                        }
                    </View>
                </View>
            </RsTouchableNativeFeedback>
        );
    }
}

export default ReserveItem;


const styles = StyleSheet.create({
    reserve: {
        flexDirection: 'row',
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderBottomColor: '#f2f2f2',
        paddingVertical: 5,
        margin: 10,
        marginBottom: 0,
        backgroundColor: '#fff',
        borderRadius: 2
    },
    customerInfo: {
        flex: 1,
        // marginVertical: 5,
        // paddingHorizontal: 10,
    },
    customerTitle: {
        fontSize: 14,
        paddingTop: 10,
        color: '#222',
        fontWeight: 'bold'
    },
    customerActiion: {
        padding: 7,
    },
    customerActiionIcon: {
        flex: 1,
        padding: 3,
        fontSize: 25
    },
    reserveProps: {
        flexDirection: 'row',
    },
    propIcon: {
        fontSize: 14,
        color: '#999',
        paddingTop: 3,
        paddingLeft: 2
    },
    propValue: {
        fontSize: 14,
        color: '#999',
        marginLeft: 10,
        color: '#111'
    },
    link: {
        // color: '#0a8afe',
        color: '#999'
    },
    nameStt: {
        fontSize: 14,
        color: '#fff',
        paddingLeft: 10,
        paddingRight: 10
    },
    cancel: {
        textDecorationLine: 'line-through'
    },
    btnStatusDetails: {
        backgroundColor: 'green',
        alignItems: 'center',
        borderRadius: 4,
        padding: 3
    }
});
