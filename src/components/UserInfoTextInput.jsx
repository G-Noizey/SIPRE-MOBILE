import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const UserInfoTextInput = (props) => {
    const { placeholder, userInfo } = props
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                editable={false}
                placeholderTextColor={'green'}
            />
            <Text style={styles.userInfoText}>{userInfo}</Text>
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
        flex: 1,
    },
    userInfoText: {
        marginLeft: 10,
    },
});

export default UserInfoTextInput;