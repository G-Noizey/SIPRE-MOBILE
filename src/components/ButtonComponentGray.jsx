import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;

const ButtonComponentGray = ({ title, onPress, icon }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>{title}</Text>
                <Icon name={icon} size={20} color="#333" style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 4
    },
    button: {
        backgroundColor: '#E0E0E0',
        paddingVertical: windowWidth * 0.027,
        borderRadius: windowWidth * 0.027,
        marginTop: windowWidth * 0.048,
        alignSelf: 'flex-start',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: 230
    },
    buttonText: {
        color: 'green',
        flex: 1,
        fontFamily: 'MontserratRegular',
        textAlign: 'center',
        fontSize: 14
    },
    icon: {
        marginRight: 10,
    }
});


export default ButtonComponentGray;