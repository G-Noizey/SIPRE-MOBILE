import { StyleSheet, Text, View, Dimensions, Image, TextInput } from 'react-native'
import React, { useState, useEffect, useNavigation } from 'react'
import UserInfoTextInputEditable from '../../../../../components/UserInfoTextInputEditable';
import ButtonComponent from '../../../../../components/ButtonComponent';
import BackButtonComponent from '../../../../../components/BackButtonComponent';
import Modal from 'react-native-modal';
import CustomAlert from '../../../../../components/CustomAlert';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TransferScreen = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isTransferSent, setIsTransferSent] = useState(false);


    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handlePress = () => {
        // Aquí deberías realizar la lógica para enviar el correo
        // Supongamos que has realizado la lógica y determinas si el correo se envió correctamente o no
        const transferSentSuccessfully = true; // Supongamos que esto es el resultado de tu lógica

        setIsTransferSent(transferSentSuccessfully);
        setIsModalVisible(true);
    };

    return (
        <View style={styles.container}>

            <View style={styles.logo}>
                <Image source={require('../../../../../../assets/images/logo.png')} style={styles.logo2} />
            </View>

            <Text style={styles.title}>Registrar Transferencia</Text>

            <UserInfoTextInputEditable
                placeholder={"Concepto"}
                maxLength={30}
            />
            <UserInfoTextInputEditable
                placeholder={"Monto"}
                maxLength={5}
            />

            <UserInfoTextInputEditable
                placeholder={"Cuenta Destinataria"}
                maxLength={20}
            />

            <UserInfoTextInputEditable
                placeholder={"Fecha de compra"}
                maxLength={8}
            />

            <ButtonComponent title={"Registrar"} onPress={handlePress} />

            <ButtonComponent title={"Subir comprobante"} />

            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                {isTransferSent ? (
                    <CustomAlert
                        type="success"
                        title="Transferencia registrada correctamente!"
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