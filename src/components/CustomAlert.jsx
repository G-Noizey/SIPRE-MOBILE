import React from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CustomAlert = ({ type, onPress, title, iconColor, text }) => {
    const renderIcon = () => {
        if (type === 'success') {
            return <Icon name="check-circle" size={90} color={iconColor} />;
        } else if (type === 'warning') {
            return <Icon name="times-circle" size={90} color={iconColor} />;
        } else {
            return null; 
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            {renderIcon()}
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.text2}> {text} </Text>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Continuar</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,  // Ajusta el radio de la esquina para un aspecto más redondeado
        padding: 20,
        borderWidth: 1,
        borderColor: '#dddddd',
        height: 300,  // Ajusta la altura del modal según tus necesidades
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
    },
    text2: {
        fontSize: 18,
        color: 'green'
    },
    icon: {
        fontSize: 50,
        color: '#2D7541',
        marginBottom: 1,
        marginTop: 10,
    },
    button: {
        backgroundColor: '#2D7541',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 35,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CustomAlert;