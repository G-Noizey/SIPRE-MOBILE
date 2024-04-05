import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Overlay } from '@rneui/base';
import InputField from '../components/InputFields';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function Modal(props) {
    const {
        isShow,
        title,
        type,
        onClose,
        API_URL,
        workerId, // Obtén el ID del trabajador como una prop
    } = props;

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

    const handleSubmit = async () => {
        if (type === 'password') {
            if (!currentValue || !newValue || !confirmNewValue) {
                Alert.alert('Error', 'Por favor complete todos los campos');
                return;
            }
            if (newValue !== confirmNewValue) {
                Alert.alert('Error', 'La nueva contraseña y la confirmación no coinciden');
                return;
            }

            try {
                console.log('Nueva contraseña:', newValue);
                const requestData = { password: newValue };
                const updateResponse = await axios.put(`${API_URL}/worker/${workerId}/password`, requestData);

                if (updateResponse.status === 200) {
                    console.log('La contraseña se actualizó correctamente');
                    Alert.alert('Éxito', 'La contraseña se actualizó correctamente');
                    setCurrentValue('');
                    setNewValue('');
                    setConfirmNewValue('');
                } else {
                    console.error('Hubo un problema al actualizar la contraseña');
                    Alert.alert('Error', 'Hubo un problema al actualizar la contraseña');
                }
            } catch (error) {
                console.error('Error al actualizar la contraseña:', error);
                Alert.alert('Error', 'Hubo un problema al actualizar la contraseña');
            }
        } else if (type === 'username') {
            if (!newValue) {
                Alert.alert('Error', 'Por favor ingrese un nuevo nombre de usuario');
                return;
            }

            try {
                console.log('Nuevo nombre de usuario:', newValue);
                const requestData = { userWorker: newValue };
                const updateResponse = await axios.put(`${API_URL}/worker/${workerId}/username`, requestData);

                if (updateResponse.status === 200) {
                    console.log('El nombre de usuario se actualizó correctamente');
                    Alert.alert('Éxito', 'El nombre de usuario se actualizó correctamente');
                    setNewValue('');
                    if (props.onUpdate) {
                        props.onUpdate(newValue);
                    }
                } else {
                    console.error('Hubo un problema al actualizar el nombre de usuario');
                    Alert.alert('Error', 'Hubo un problema al actualizar el nombre de usuario');
                }
            } catch (error) {
                console.error('Error al actualizar el nombre de usuario:', error);
                Alert.alert('Error', 'Hubo un problema al actualizar el nombre de usuario');
            }
        }
        onClose();
    };


    return (
        <Overlay isVisible={isShow} overlayStyle={styles.overlay}>
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
                            secureTextEntry
                            placeholder="Ingrese su contraseña actual"
                        />
                        <InputField
                            label="Nueva contraseña:"
                            value={newValue}
                            onChangeText={handleNewValueChange}
                            secureTextEntry
                            placeholder="Ingrese su nueva contraseña"
                        />
                        <InputField
                            label="Confirmar nueva contraseña:"
                            value={confirmNewValue}
                            onChangeText={handleConfirmNewValueChange}
                            secureTextEntry
                            placeholder="Confirme su nueva contraseña"
                        />
                    </>
                )}
                {type === 'username' && (
                    <InputField
                        label="Nuevo nombre de usuario:"
                        value={newValue}
                        onChangeText={handleNewValueChange}
                        placeholder="Ingrese su nuevo nombre de usuario"
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