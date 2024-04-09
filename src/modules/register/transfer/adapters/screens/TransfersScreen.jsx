import { StyleSheet, Text, View, Dimensions, Image, TextInput } from 'react-native'
import React, { useState, useEffect, useNavigation } from 'react'
import UserInfoTextInputEditable from '../../../../../components/UserInfoTextInputEditable';
import ButtonComponent from '../../../../../components/ButtonComponent';
import Modal from 'react-native-modal';
import CustomAlert from '../../../../../components/CustomAlert';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';
import Toast from 'react-native-toast-message';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TransferScreen = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isTransferSent, setIsTransferSent] = useState(false);
    const [concepto, setConcepto] = useState('');
    const [monto, setMonto] = useState('');
    //  const [destinatario, setDestinatario] = useState('');
    const [fechaCompra, setFechaCompra] = useState(new Date().toISOString().split('T')[0]);
    const [showWarningAlert, setShowWarningAlert] = useState(false);
    const [showMontoInvalidoAlert, setShowMontoInvalidoAlert] = useState(false);
    //  const [showDestinatarioInvalidoAlert, setShowDestinatarioInvalidoAlert] = useState(false);
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
            formData.append('monto', parseFloat(monto));
            //formData.append('nuTransferencia', destinatario);
            formData.append('fecha', fechaCompra);
            formData.append('status', 'Pendiente');

            const storedData = await AsyncStorage.getItem('workerData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                formData.append('idWorker', parsedData.userId);
                formData.append('idDivision', parsedData.divisionId);

                /*
                   const destinatarioExists = await axios.get(`${API_URL}/worker/exists/${destinatario}`);
                   if (!destinatarioExists.data || destinatario === parsedData.nuCuenta) {
                       setShowDestinatarioInvalidoAlert(true);
                       return;
                   }
                */

                const saldoActual = parsedData.saldo;
                if (saldoActual < parseFloat(monto)) {
                    setShowIncompleteAmountAlert(true);
                    return;
                }
                const nuevoSaldo = saldoActual - parseFloat(monto);

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

                const response = await axios.post(`${API_URL}/transfer/register`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    await axios.put(`${API_URL}/worker/${parsedData.userId}/updateSaldo`, null, {
                        params: {
                            nuevoSaldo: nuevoSaldo
                        }
                    });

                    // Actualizar el saldo en el almacenamiento local
                    const updatedWorkerData = { ...parsedData, saldo: nuevoSaldo };
                    await AsyncStorage.setItem('workerData', JSON.stringify(updatedWorkerData));

                    setIsTransferSent(true);
                    setIsModalVisible(true);
                    setConcepto('');
                    setMonto('');
                    // setDestinatario('');
                    setSelectedImage(null);
                }
            }
        } catch (error) {
            console.error('Error al enviar los datos al servidor:', error);
            setIsTransferSent(false);
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

                setSelectedImage(manipResult.uri);

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
        //  const regexDestinatario = /^\d{16}$/;

        if (!concepto.trim() || !monto.trim() || !fechaCompra || !selectedImage) {
            setShowWarningAlert(true);
            return false;
        }

        if (!regexNumeros.test(monto)) {
            setShowMontoInvalidoAlert(true);
            return false;
        }

        /* if (!regexDestinatario.test(destinatario)) {
             setShowDestinatarioInvalidoAlert(true);
             return false;
         }
         */

        return true;
    };

    return (
        <View style={styles.container}>

            <View style={styles.logo}>
                <Image source={require('../../../../../../assets/images/logo.png')} style={styles.logo2} />
            </View>

            <Text style={styles.title}>Registrar Transferencia</Text>

            <UserInfoTextInputEditable
                placeholder={"Concepto"}
                placeholder2={"Ej. Pago de servicios"}
                maxLength={30}
                isDateInput={false}
                onTextChange={(text) => setConcepto(text)}
                value={concepto}
            />
            <UserInfoTextInputEditable
                placeholder={"Monto"}
                placeholder2={"$$$$$"}
                maxLength={5}
                isDateInput={false}
                onTextChange={(text) => setMonto(text)}
                value={monto}
            />

            {/*
            <UserInfoTextInputEditable
                placeholder={"Destinatario"}
                placeholder2={"12354654565445"}
                maxLength={20}
                isDateInput={false}
                onTextChange={(text) => setDestinatario(text)}
                value={destinatario}
            /> 
            */}

            <UserInfoTextInputEditable
                placeholder={"Fecha"}
                isDateInput={true}
                onDateChange={(date) => setFechaCompra(date)}
                value={fechaCompra}
            />

            <ButtonComponent title={"Subir comprobante"} onPress={openImagePicker} />
            <ButtonComponent title={"Registrar"} onPress={handlePress} />

            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                {isTransferSent ? (
                    <CustomAlert
                        type="success"
                        title="¡Movimiento exitoso!"
                        iconColor="#2D7541"
                        onPress={closeModal}
                    />
                ) : (
                    <CustomAlert
                        title="¡Fallo al registrar la transferencia!"
                        iconColor="#BF0C0C"
                        onPress={closeModal}
                    />
                )}
            </Modal>

            <Modal isVisible={showWarningAlert} onBackdropPress={() => setShowWarningAlert(false)}>
                <CustomAlert
                    type={"emptyFields"}
                    title="¡Faltan campos!"
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

            {/*
            <Modal isVisible={showDestinatarioInvalidoAlert} onBackdropPress={() => setShowDestinatarioInvalidoAlert(false)}>
                <CustomAlert
                    type={"warning"}
                    title="¡Cuenta inválida!"
                    iconColor="#BF0C0C"
                    onPress={() => setShowDestinatarioInvalidoAlert(false)}
                />
            </Modal>
            */}

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

export default TransferScreen;