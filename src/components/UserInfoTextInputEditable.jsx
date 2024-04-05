import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const UserInfoTextInputEditable = ({ placeholder, maxLength, isDateInput = false, placeholder2, onTextChange, value, onDateChange }) => {
    const [dateValue, setDateValue] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleChangeText = (text) => {
        setAdditionalText(text);
        if (onTextChange) {
            onTextChange(text);
        }
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateValue;
        setShowDatePicker(false);
        setDateValue(currentDate);
        if (onDateChange) {
            onDateChange(currentDate);
        }
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(date);
    };

    return (
        <View style={styles.container}>
            {isDateInput ? (
                <>
                    <TextInput
                        placeholder={placeholder}
                        editable={false}
                        placeholderTextColor={'green'}
                        style={styles.placeholderInput}
                    />
                    <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.dateText}>{formatDate(dateValue)}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={dateValue}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </>
            ) : (
                <>
                    <TextInput
                        placeholder={placeholder}
                        editable={false}
                        placeholderTextColor={'green'}
                        style={styles.placeholderInput}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder={placeholder2}
                        value={value}
                        maxLength={maxLength}
                        onChangeText={onTextChange}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        marginBottom: 15,
        height: 50,
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
    },
    placeholderInput: {
        width: '40%',
        color: 'black',
        textAlign: 'left',
    },
    textInput: {
        height: 40,
        width: '62%',
        textAlign: 'center',
        color: 'black',
    },
    dateInput: {
        height: 40,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    dateText: {
        color: 'black',
    },
});


export default UserInfoTextInputEditable;
