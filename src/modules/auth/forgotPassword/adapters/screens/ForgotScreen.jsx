// ForgotScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import LogoComponent from '../../../../../components/LogoComponent';
import InputField from '../../../../../components/InputFields';
import ButtonComponent from '../../../../../components/ButtonComponent';
import BackButtonComponent from '../../../../../components/BackButtonComponent';
import CustomAlert from '../../../../../components/CustomAlert';
import axios from 'axios';
import { API_URL } from '@env';
import Loading from '../../../../../components/Loading';
import * as Font from 'expo-font';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ForgotScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation(); // Importa el hook de navegación
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyFieldModalVisible, setIsEmptyFieldModalVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [error, setError] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        MontserratRegular: require('../../../../../../assets/fonts/Montserrat-Regular.ttf'),
        MontserratBold: require('../../../../../../assets/fonts/Montserrat-Bold.ttf'),
      });

      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // No renderizar nada si las fuentes no se han cargado
  }

  const handleBack = () => {
    // Lógica relacionada con la recuperación de contraseña aquí

    // Después de realizar la lógica, redirige a LoginScreen
    navigation.navigate('Login');
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setIsEmptyFieldModalVisible(!isEmptyFieldModalVisible);
  };

  const closeModal = () => {
    setIsEmptyFieldModalVisible(false);
    setIsModalVisible(false);
    setIsEmailSent(false);
    setEmail('');
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handlePress = async () => {
    if (!email) {
      setIsEmptyFieldModalVisible(true);
      return;
    }
    console.log('Respuesta del servidor:', email);


    if (!validateEmail(email)) {
      setIsEmailValid(false);
      setIsModalVisible(true);
      return;
    }

    setIsEmailValid(true);
    setError('');
    setIsLoading(true);
    setIsEmailSent(false);
    setIsModalVisible(false);

    try {
      const response = await axios.post(`${API_URL}/reset-password-worker/enviar-correo-worker`, {
        email: email
      });

      setIsLoading(false);
      setEmail('');
      setIsEmailSent(true);
      setIsModalVisible(true);

    } catch (error) {
      console.error(error);
      setIsLoading(false);
      isEmailSent(false);
      setIsModalVisible(true);
    }

  };

  return (
    <View style={styles.container}>

      <View style={styles.logo2Container}>
        <Image source={require('../../../../../../assets/images/logo2.png')} style={styles.logo2} />
      </View>

      <View style={styles.container}>
        <LogoComponent />
      </View>

      <Text style={styles.loginText}>Recuperación de contraseña</Text>

      <InputField
        label="Correo Electrónico:"
        value={email}
        onChangeText={handleEmailChange}
        placeholder=""
      />

      <View>

        <ButtonComponent onPress={handlePress} title="Solicitar" />

      </View>

      <Loading isShow={isLoading} title="Cargando..." setShow={setIsLoading} />
      <BackButtonComponent onPress={handleBack} />

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        {isEmailSent ? (
          <CustomAlert
            type="success"
            title="¡Correo enviado!"
            iconColor="#2D7541"
            onPress={closeModal}
          />
        ) : (
          <CustomAlert
            type="warning"
            title="¡Formato incorrecto!"
            iconColor="#BF0C0C"
            onPress={closeModal}
          />
        )}
      </Modal>

      <Modal isVisible={isEmptyFieldModalVisible} onBackdropPress={toggleModal}>
        <CustomAlert
          type="emptyFields"
          title="Faltan Campos"
          iconColor="#BF0C0C"
          onPress={closeModal}
        />

      </Modal>


    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: windowWidth * 0.1, // 10% del ancho de la pantalla
    marginBottom: windowHeight * 0.1, // 10% de la altura de la pantalla
  },


  logo2Container: {
    marginBottom: windowHeight * 0.02, // 2% de la altura de la pantalla
    marginRight: windowWidth * 0.70, // 70% del ancho de la pantalla
  },

  logo2: {
    height: windowHeight * 0.05, // 5% de la altura de la pantalla
    width: windowWidth * 0.20, // 20% del ancho de la pantalla
    marginBottom: windowHeight * 0.07, // 4% de la altura de la pantalla
  },

  loginText: {
    fontFamily: 'MontserratRegular',
    fontSize: windowWidth * 0.05, // 8% del ancho de la pantalla
    marginBottom: windowHeight * 0.12, // 8% de la altura de la pantalla
  },

  div: {
    flex: 25,
    marginBottom: windowHeight * 0.00,
    height: windowHeight * 0.13,
  },

});

export default ForgotScreen;
