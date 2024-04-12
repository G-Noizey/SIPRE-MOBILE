import React from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CustomAlertClose = ({ type, onPress, onCancel, title, iconColor }) => {
    const renderIcon = () => {
        if (type === 'success') {
            return <Icon name="check-circle" size={90} color={iconColor} />;
        } else if (type === 'warning') {
            return <Icon name="exclamation-circle" size={90} color={iconColor} />;
        } else {
            return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.renderIcon}>
                {renderIcon()}
            </View>
            <Text style={styles.text}>{title}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        height: 'auto',
        width: '80%',
        marginLeft: '10%',
        paddingTop: 45,
    },
    text: {
        fontSize: 25,
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        backgroundColor: '#2D7541',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20,
    },
    cancelButton: {
        backgroundColor: '#d33',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    renderIcon: {
        position: 'absolute',
        top: -45,
        backgroundColor: 'white',
        borderRadius: 100,
    },
});


export default CustomAlertClose;