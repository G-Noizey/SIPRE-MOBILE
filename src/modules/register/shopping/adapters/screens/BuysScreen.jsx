import React, { useState, } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { API_URL } from '@env';
import UserInfoTextInputEditable from '../../../../../components/UserInfoTextInputEditable';
import ButtonComponent from '../../../../../components/ButtonComponent';
import Modal from 'react-native-modal';
import CustomAlert from '../../../../../components/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImageManipulator from 'expo-image-manipulator';
import Toast from 'react-native-toast-message';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BuysScreen = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRegisterSent, setIsRegisterSent] = useState(false);
    const [concepto, setConcepto] = useState('');
    const [monto, setMonto] = useState('');
    const [fechaCompra, setFechaCompra] = useState(new Date().toISOString().split('T')[0]);
    const [showWarningAlert, setShowWarningAlert] = useState(false);
    const [showMontoInvalidoAlert, setShowMontoInvalidoAlert] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showIncompleteAmountAlert, setShowIncompleteAmountAlert] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handlePress = async () => {
        if (!validarCampos()) {
            return;
        }

        try {
            let formData = new FormData();
            formData.append('descripcion', concepto);
            formData.append('fecha', fechaCompra);
            formData.append('monto', parseFloat(monto));
            formData.append('status', 'Pendiente');

            const storedData = await AsyncStorage.getItem('workerData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                console.log(parsedData);
                formData.append('idWorker', parsedData.userId);
                formData.append('idDivision', parsedData.divisionId);

                const saldoActual = parsedData.saldo;

                if (saldoActual < parseFloat(monto)) {
                    setShowIncompleteAmountAlert(true);
                    return;
                }

                const nuevoSaldo = saldoActual - parseFloat(monto);

                // Actualiza el saldo en el AsyncStorage
                const updatedWorkerData = { ...parsedData, saldo: nuevoSaldo };
                await AsyncStorage.setItem('workerData', JSON.stringify(updatedWorkerData));

                if (selectedImage) {
                    const uriParts = selectedImage.split('/');
                    const fileName = uriParts[uriParts.length - 1];
                    const fileType = fileName.split('.')[1];

                    formData.append('comprobante', {
                        uri: selectedImage,
                        name: fileName,
                        type: `image/${fileType}`,
                    });
                }

                const response = await axios.post(`${API_URL}/buys/register`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Respuesta del servidor:', response.data);

                // Si la compra se registra correctamente, actualiza el saldo del trabajador en el backend
                if (response.status === 200) {
                    await axios.put(`${API_URL}/worker/${parsedData.userId}/updateSaldo`, null, {
                        params: {
                            nuevoSaldo: nuevoSaldo
                        }
                    });

                    setIsRegisterSent(true);
                    setIsModalVisible(true);
                    setConcepto('');
                    setMonto('');
                    setSelectedImage(null);
                }
            }
        } catch (error) {
            console.error('Error al enviar los datos al servidor:', error);
            setIsRegisterSent(false);
        }
    };

    const openImagePicker = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                throw new Error('Permiso denegado para acceder a la galería');
            }
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 1,
            });

            if (!result.cancelled && result.assets && result.assets.length > 0) {
                // Acceder al primer elemento del array 'assets' para obtener el URI
                const uri = result.assets[0].uri;
                console.log('Imagen seleccionada:', uri);

                const manipResult = await ImageManipulator.manipulateAsync(
                    uri,
                    [{ resize: { width: 800 } }], // Ajusta el ancho a 800 y mantiene la relación de aspecto
                    { compress: 0.7 } // Comprimir la imagen para reducir el tamaño del archivo
                );

                console.log('Imagen comprimida:', manipResult.uri);

                setSelectedImage(uri);

                Toast.show({
                    type: 'success',
                    text1: 'Imagen seleccionada',
                    visibilityTime: 3000, // Duración del mensaje en milisegundos
                });

            } else {
                console.log('No se seleccionó ninguna imagen');
            }
        } catch (error) {
            console.error('Error al abrir la galería:', error.message);
        }
    };

    const validarCampos = () => {
        const regexNumeros = /^[0-9]+$/;

        if (!concepto.trim() || !monto.trim() || !selectedImage) {
            setShowWarningAlert(true);
            return false;
        }

        if (!regexNumeros.test(monto)) {
            setShowMontoInvalidoAlert(true);
            return false;
        }

        return true;
    };

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={require('../../../../../../assets/images/logo.png')} style={styles.logo2} />
            </View>
            <Text style={styles.title}>Registrar Compra</Text>
            <UserInfoTextInputEditable
                placeholder={"Concepto"}
                placeholder2={"Ej. Compra de alimentos"}
                maxLength={30}
                isDateInput={false}
                onTextChange={(text) => setConcepto(text)}
                value={concepto}
            />
            <UserInfoTextInputEditable
                placeholder={"Monto"}
                maxLength={5}
                placeholder2={"$$$$$"}
                isDateInput={false}
                onTextChange={(text) => setMonto(text)}
                value={monto}
            />
            <UserInfoTextInputEditable
                placeholder={"Fecha"}
                isDateInput={true}
                onDateChange={(date) => setFechaCompra(date.toISOString().split('T')[0])}
                value={fechaCompra}
            />
            <ButtonComponent title={"Subir comprobante"} onPress={openImagePicker} />
            <ButtonComponent title={"Registrar"} onPress={handlePress} />
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                {isRegisterSent ? (
                    <CustomAlert
                        type="success"
                        title="¡Compra registrada!"
                        iconColor="#2D7541"
                        onPress={closeModal}
                    />
                ) : (
                    <CustomAlert
                        title="¡Fallo al registrar la compra!"
                        iconColor="#BF0C0C"
                        onPress={closeModal}
                    />
                )}
            </Modal>
            <Modal isVisible={showWarningAlert} onBackdropPress={() => setShowWarningAlert(false)}>
                <CustomAlert
                    type={"emptyFields"}
                    title="¡Faltan Campos!"
                    iconColor="#BF0C0C"
                    onPress={() => setShowWarningAlert(false)}
                />
            </Modal>
            <Modal isVisible={showMontoInvalidoAlert} onBackdropPress={() => setShowMontoInvalidoAlert(false)}>
                <CustomAlert
                    type={"numOnly"}
                    title="¡Monto inválido!"
                    iconColor="#BF0C0C"
                    onPress={() => setShowMontoInvalidoAlert(false)}
                />
            </Modal>
            <Modal isVisible={showIncompleteAmountAlert} onBackdropPress={() => setShowIncompleteAmountAlert(false)}>
                <CustomAlert
                    type={"invalidAmount"}
                    title="¡Saldo insuficiente!"
                    iconColor="#BF0C0C"
                    onPress={() => setShowIncompleteAmountAlert(false)}
                />
            </Modal>
            {selectedImage && (
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            )}
            <Toast />
        </View>

    );


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: windowWidth * 0.09,
        justifyContent: 'flex-start',
        alignItems: 'center',


    },
    logo: {
        width: windowHeight * 0.10,
        height: windowHeight * 0.10,
        marginRight: windowWidth * 0.70,
    },
    logo2: {
        width: windowHeight * 0.08,
        height: windowHeight * 0.08,
        marginRight: windowWidth * 0.2,
    },
    title: {
        fontFamily: 'MontserratBold',
        fontSize: windowWidth * 0.06,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 28
    },

})

export default BuysScreen;