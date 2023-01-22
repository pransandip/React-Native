import React, {Component} from 'react';
import {View, Text} from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class EndDateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  stringToDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date([month, day, year].join('/'));
  };

  render() {
    return (
      <DatePicker
        style={{
          width: '100%',
          borderWidth: 0,
          borderColor: '',
        }}
        date={this.props.values?.endDate}
        mode="date"
        minDate={new Date()}
        placeholder="DD/MM/YYYY"
        format="DD/MM/YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        onDateChange={(date) => {
          this.props.handleFormData('endDate', this.stringToDate(date));
        }}
        customStyles={{
          dateInput: {
            height: 36,
            backgroundColor: 'rgba(58, 177, 202, 0.1)',
            padding: 10,
            borderRadius: 4,
            fontSize: 14,
            fontWeight: '400',
            borderWidth: 0,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
          },
          placeholderText: {
            color: '#969696',
          },
        }}
      />
    );
  }
}
