import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';
const colors = ['#877564', '#504559', '#d20cac', '#45095e', '#0e672f', '#b5b318', '#9e03b2'];

class Avatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noImage: false
        }
        this.randomId = Math.round(Math.random() * colors.length);
    }

    componentWillReceiveProps(newProps) {
        this.setState({ noImage: false });
    }

    render() {
        const size = this.props.size || 60;
        const name = this.props.name || '';
        const id = this.props.id || this.randomId;
        var url = this.props.url;

        let colorIndex = id % colors.length;
        let randomColor = colors[colorIndex];

        let nameMatch = name.trim().match(/\S+$/);

        if (typeof url != 'string') url = '';

        if (url) {
            url = request.host + url;
        }

        if (!url || this.state.noImage) {
            return (
                <View style={[styles.avatarIcon, this.props.style, { backgroundColor: randomColor, width: size, height: size }]}>
                    <Text style={[styles.avatarIconText, { fontSize: size * 2 / 3.5 }]}>
                        {nameMatch && nameMatch[0] ? nameMatch[0][0] : '?'}
                    </Text>
                </View>
            )
        }

        return (
            <Image
                style={[styles.avatarImage, this.props.style, { width: size, height: size, borderRadius: size / 2 }]}
                source={{ uri: url }}
                onError={() => this.setState({ noImage: true })} />
        )
    }
}

Avatar.propTypes = {
    size: PropTypes.number,
    url: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    style: PropTypes.any
}
export default Avatar;



const styles = StyleSheet.create({
    avatarIcon: {
        position: 'relative',
        opacity: 0.8,
        width: 50,
        height: 50,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#fff',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarImage: {
        width: 50,
        height: 50,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#fff'
    },
    avatarIconText: {
        color: '#fff',
        fontSize: 30,
    },
})
