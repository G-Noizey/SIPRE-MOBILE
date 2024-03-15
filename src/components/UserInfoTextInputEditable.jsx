import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const UserInfoTextInputEditable = ({ placeholder, maxLength }) => {
    const [additionalText, setAdditionalText] = useState('');

    const handleChangeText = (text) => {
        setAdditionalText(text);
    };

    return (
        <View style={styles.container}>

            <TextInput
                placeholder={placeholder}
                editable={false}
                placeholderTextColor={'green'}
            />
            <TextInput
                style={styles.textInput}
                value={additionalText}
                maxLength={maxLength}
                onChangeText={handleChangeText}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderColor: 'transparent',
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        height: 40,
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
    },
    textInput: {
        height: 40,
        paddingLeft: 10,
        paddingRight: 50,
    },
});

export default UserInfoTextInputEditable;