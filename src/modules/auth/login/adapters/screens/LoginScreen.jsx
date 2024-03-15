import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import LogoComponent from '../../../../../components/LogoComponent';
import InputField from '../../../../../components/InputFields';
import ButtonComponent from '../../../../../components/ButtonComponent';
import CustomAlert from '../../../../../components/CustomAlert';
import Loading from '../../../../../components/Loading';
import axios from 'axios';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [type, setType] = useState('success');
  const navigation = useNavigation();

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleForgotPasswordPress = () => {
    // Lógica para manejar el olvido de contraseña
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
    return null;
  }

  const handleLoginPress = async () => {
    try {
      setLoading(true);

      const response = await axios.post('http://192.168.92.172:8080/worker/login', {
        userWorker: username,
        password: password,
      });

      setLoading(false);

      console.log('Respuesta del servidor:', response.data);

      if (response.data.error) {
        setType('default');
      } else {
        const workerData = {
          name: response.data.name,
          email: response.data.email,
          telefono: response.data.telefono,
          direccion: response.data.direccion,
          divisionId: response.data.idDivision,
          userId: response.data.id,
          userWorker: response.data.userWorker,
          saldo: response.data.saldo,
          token: response.data.token,
          lastname: response.data.lastname,
          status: response.data.status,
        };

        console.log('Datos del trabajador almacenados:', workerData);
        await AsyncStorage.setItem('workerData', JSON.stringify(workerData));

        setType('success');
      }
    } catch (error) {
      setLoading(false);
      setType('warning');
    }

    toggleModal();
};


  const closeModal = () => {
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo2Container}>
        <Image source={require('../../../../../../assets/images/logo2.png')} style={styles.logo2} />
      </View>

      <View style={styles.container}>
        <LogoComponent />
      </View>

      <Text style={styles.loginText}>Iniciar Sesión</Text>

      <InputField label="Usuario:" value={username} onChangeText={handleUsernameChange} placeholder="" />

      <InputField
        label="Contraseña:"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry={true}
        placeholder=""
      />

      <TouchableOpacity onPress={handleForgotPasswordPress}>
        <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
      </TouchableOpacity>

      <ButtonComponent onPress={handleLoginPress} title="Ingresar" />

      <Loading isShow={isLoading} title="Cargando..." setShow={setLoading} />

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        {type === 'success' ? (
          <CustomAlert
            type="success"
            onPress={() => navigation.navigate('HomeTabs')}
            title="¡Inicio de sesión exitoso!"
            iconColor="#2D7541"
          />
        ) : type === 'warning' ? (
          <CustomAlert
            type="warning"
            title="¡Advertencia!"
            onPress={closeModal}
            iconColor="#BF0C0C"
          />
        ) : (
          <CustomAlert
            type="default"
            onPress={closeModal}
            title="¡Algo salió mal!"
            text="El usuario ya no cuenta con acceso a la aplicación"
            iconColor="#000000"
          />
        )}
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: windowWidth * 0.1,
    marginBottom: windowHeight * 0.1,
  },
  logo2Container: {
    marginBottom: windowHeight * 0.02,
    marginRight: windowWidth * 0.70,
  },
  logo2: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.20,
    marginBottom: windowHeight * 0.04,
  },
  loginText: {
    fontFamily: 'MontserratRegular',
    fontSize: windowWidth * 0.08,
    marginBottom: windowHeight * 0.08,
  },
  forgotPassword: {
    color: 'green',
    marginBottom: windowHeight * 0.08,
  },
});

export default LoginScreen;
