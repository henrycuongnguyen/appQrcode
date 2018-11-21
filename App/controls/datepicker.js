import moment from 'moment';
import React, { Component } from 'react';

import DatePicker from 'react-native-datepicker';

class SmartDatePicker extends Component {

    getFormat = () => {
        if (this.props.mode == 'time') {
            return "HH:mm"
        }
        else if (this.props.mode == 'datetime') {
            return "DD/MM/YYYY HH:mm"
        }
        else {
            return "DD/MM/YYYY";
        }
    }

    getDate = () => {
        if (this.props.date) {
            if (moment.isMoment(this.props.date)) {
                return this.props.date.format(this.getFormat());
            }
            else if (typeof this.props.date == 'string') {
                return moment(this.props.date, this.props.format).format(this.getFormat());
            }
            else {
                return moment(this.props.date).format(this.getFormat());
            }
        }
        return null;
    }

    getString = (date) => {
        if (this.props.format) {
            return moment(date, this.getFormat()).format(this.props.format);
        }
        if (this.props.mode == 'time') {
            return date;
        }
        else if (this.props.mode == 'datetime') {
            return moment(date, this.getFormat()).format('YYYY-MM-DD HH:mm');
        }
        else {
            return moment(date, this.getFormat()).format('YYYY-MM-DD')
        }
    }

    render() {
        return (
            <DatePicker
                style={this.props.style}
                date={this.getDate()}
                // date = {this.props.date}
                mode={this.props.mode || 'date'}
                placeholder={this.props.placeholder || ' '}
                confirmBtnText={this.props.confirmBtnText || 'OK'}
                cancelBtnText={this.props.cancelBtnText || 'Cancel'}
                format={this.getFormat()}
                showIcon={this.props.showIcon || false}
                customStyles={{
                    dateInput: {
                        borderWidth: 0,
                        alignItems: 'flex-start',
                        paddingLeft: 4,
                        ...this.props.customInputStyle
                    },
                    ...this.props.customStyles
                }}
                onDateChange={(date) => {
                    if (this.props.onDateChange) {
                        this.props.onDateChange(this.getString(date));
                    }
                }}
            />
        )
    }
}

export default SmartDatePicker