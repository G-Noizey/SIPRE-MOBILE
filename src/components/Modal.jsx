import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Overlay } from '@rneui/base';
import InputField from '../components/InputFields';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import RNModal from 'react-native-modal';
import CustomAlert from './CustomAlert';


export default function Modal(props) {
    const {
        isShow,
        title,
        type,
        onClose,
        API_URL,
        workerId,
        workerPassword,
        workerUsername
    } = props;

    const [currentValue, setCurrentValue] = useState('');
    const [newValue, setNewValue] = useState('');
    const [confirmNewValue, setConfirmNewValue] = useState('');
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isEmptyModalVisible, setIsEmptyModalVisible] = useState(false);
    const [isNotEqualModalVisible, setIsNotEqualModalVisible] = useState(false);
    const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
    const [isNotEqualActualPasswordModalVisible, setIsNotEqualActualPasswordModalVisible] = useState(false);
    const [isEqualPasswordModalVisible, setIsEqualPasswordModalVisible] = useState(false);
    const [isEqualUsernameModalVisible, setIsEqualUsernameModalVisible] = useState(false);

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
                setIsEmptyModalVisible(true);
                return;
            }
            if (newValue !== confirmNewValue) {
                setIsNotEqualModalVisible(true);
                return;
            }

            if (workerPassword === newValue) {
                setIsEqualPasswordModalVisible(true);
                return;
            }

            if (workerPassword !== currentValue) {
                setIsNotEqualActualPasswordModalVisible(true);
                return;
            }

            try {
                const requestData = { password: newValue };
                const updateResponse = await axios.put(`${API_URL}/worker/${workerId}/password`, requestData);

                if (updateResponse.status === 200) {
                    setIsSuccessModalVisible(true);
                    setCurrentValue('');
                    setNewValue('');
                    setConfirmNewValue('');
                    if (props.onUpdate) {
                        props.onUpdate(newValue);
                    }
                } else {
                    setIsWarningModalVisible(true);
                }
            } catch (error) {
                setIsWarningModalVisible(true);
            }
        } else if (type === 'username') {
            if (!newValue) {
                setIsEmptyModalVisible(true);
                return;
            }

            try {
                const requestData = { userWorker: newValue };

                if (newValue === workerUsername) {
                    setIsEqualUsernameModalVisible(true);
                    return;
                }

                const updateResponse = await axios.put(`${API_URL}/worker/${workerId}/username`, requestData);

                if (updateResponse.status === 200) {
                    setIsSuccessModalVisible(true);
                    setNewValue('');
                    if (props.onUpdate) {
                        props.onUpdate(newValue);
                    }
                } else {
                    setIsWarningModalVisible(true);
                }
            } catch (error) {
                setIsWarningModalVisible(true);
            }
        }
    };

    const closeModal = () => {
        setIsSuccessModalVisible(false);
        setIsWarningModalVisible(false);
        setIsNotEqualModalVisible(false);
        setIsEmptyModalVisible(false);
        setIsNotEqualActualPasswordModalVisible(false);
        setIsEqualPasswordModalVisible(false);
        setIsEqualUsernameModalVisible(false);
        onClose();
        setCurrentValue('');
        setNewValue('');
        setConfirmNewValue('');
    };

    return (
        <Overlay isVisible={isShow} overlayStyle={styles.overlay}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <TouchableOpacity onPress={closeModal}>
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


            <RNModal isVisible={isSuccessModalVisible} onBackdropPress={closeModal}>
                <CustomAlert
                    type="success"
                    title="Cambios guardados"
                    iconColor="#2D7541"
                    onPress={closeModal}
                />
            </RNModal>

            <RNModal isVisible={isEmptyModalVisible} onBackdropPress={closeModal}>
                <CustomAlert
                    type="emptyFields"
                    title="¡Faltan campos!"
                    iconColor="#BF0C0C"
                    onPress={closeModal}
                />
            </RNModal>

            <RNModal isVisible={isNotEqualModalVisible} onBackdropPress={closeModal}>
                <CustomAlert
                    type="notEqual"
                    title="¡Las contraseñas no coinciden!"
                    iconColor="#BF0C0C"
                    onPress={closeModal}
                />
            </RNModal>

            <RNModal isVisible={isNotEqualActualPasswordModalVisible} onBackdropPress={closeModal}>
                <CustomAlert
                    type="notEqual"
                    title="¡Contraseña actual incorrecta!"
                    iconColor="#BF0C0C"
                    onPress={closeModal}
                />
            </RNModal>

            <RNModal isVisible={isEqualPasswordModalVisible} onBackdropPress={closeModal}>
                <CustomAlert
                    type="notEqual"
                    title="¡La nueva contraseña debe ser diferente!"
                    iconColor="#BF0C0C"
                    onPress={closeModal}
                />
            </RNModal>

            <RNModal isVisible={isEqualUsernameModalVisible} onBackdropPress={closeModal}>
                <CustomAlert
                    type="notEqual"
                    title="¡El nuevo usuario debe ser diferente!"
                    iconColor="#BF0C0C"
                    onPress={closeModal}
                />
            </RNModal>

            <RNModal isVisible={isWarningModalVisible} onBackdropPress={closeModal}>
                <CustomAlert
                    type="warning"
                    title="!Advertencia!"
                    iconColor="#BF0C0C"
                    onPress={closeModal}
                />
            </RNModal>


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