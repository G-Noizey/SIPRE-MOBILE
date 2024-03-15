import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Overlay } from '@rneui/base';
import InputField from '../components/InputFields';
import { Ionicons } from '@expo/vector-icons';


export default function Modal(props) {
    const { isShow, title, type, onClose } = props;
    const [currentValue, setCurrentValue] = useState('');
    const [newValue, setNewValue] = useState('');
    const [confirmNewValue, setConfirmNewValue] = useState('');

    const handleCurrentValueChange = (text) => {
        setCurrentValue(text);
    };

    const handleNewValueChange = (text) => {
        setNewValue(text);
    };

    const handleConfirmNewValueChange = (text) => {
        setConfirmNewValue(text);
    };

    const handleSubmit = () => {
        if (type === 'password') {
            console.log('Nueva contraseña:', newValue);
        } else if (type === 'username') {
            console.log('Nuevo nombre de usuario:', newValue);
        }
        onClose();
    };

    return (
        <Overlay
            isVisible={isShow}
            windowsBackgroundColor='rgba(0,0,0,0.5)'
            overlayBackgroundColor='transparent'
            overlayStyle={styles.overlay}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                {type === 'password' && (
                    <>
                        <InputField
                            label="Contraseña actual:"
                            value={currentValue}
                            onChangeText={handleCurrentValueChange}
                            secureTextEntry={true}
                            placeholder="Ingrese su contraseña actual"
                        />
                        <InputField
                            label="Nueva contraseña:"
                            value={newValue}
                            onChangeText={handleNewValueChange}
                            secureTextEntry={true}
                            placeholder="Ingrese su nueva contraseña"
                        />
                        <InputField
                            label="Confirmar nueva contraseña:"
                            value={confirmNewValue}
                            onChangeText={handleConfirmNewValueChange}
                            secureTextEntry={true}
                            placeholder="Confirme su nueva contraseña"
                        />
                    </>
                )}
                {type === 'username' && (
                    <InputField
                        label="Nuevo nombre de usuario:"
                        value={newValue}
                        onChangeText={handleNewValueChange}
                        placeholder="Ingrese su nuevo usuario"
                    />
                )}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Guardar cambios</Text>
                </TouchableOpacity>
            </View>
        </Overlay>
    );
}


const styles = StyleSheet.create({
    overlay: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    container: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
    },
    title: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        flex: 1
    },
    form: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});