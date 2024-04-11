import React, { useState, useEffect, } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Alert, AppState } from 'react-native';
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
import { API_URL } from '@env';

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
    navigation.navigate('ForgotTabs');
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

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      setModalVisible(false);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const handleLoginPress = async () => {
    try {
      setLoading(true);

      console.log('Enviando solicitud de inicio de sesión:', { userWorker: username, password: password });

      const response = await axios.post(`${API_URL}/worker/login`, {
        userWorker: username,
        password: password,
      });

      setLoading(false);

      console.log('Respuesta del servidor:', response.data);

      if (response.data.error) {
        setType('warning');
      } else {
        const workerData = {
          name: response.data.name,
          password: response.data.password,
          email: response.data.email,
          telefono: response.data.telefono,
          direccion: response.data.direccion,
          divisionId: response.data.idDivision,
          userId: response.data.id,
          userWorker: response.data.userWorker,
          saldo: response.data.saldo,
          token: response.data.token,
          lastname: response.data.lastname,
          nuCuenta: response.data.nuCuenta,
          divisionStatus: response.data.divisionStatus,
          status: response.data.status,
        };

        console.log('Datos del trabajador almacenados:', workerData);
        await AsyncStorage.setItem('workerData', JSON.stringify(workerData));

        setType('success');

        setUsername('');
        setPassword('');

      }
    } catch (error) {
      setLoading(false);
      console.log('Error en la solicitud de inicio de sesión:', error);
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

      <InputField
        label="Usuario:"
        value={username}
        onChangeText={handleUsernameChange}
        placeholder=""
      />

      <InputField
        label="Contraseña:"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry={true}
        placeholder=""
      />
      <View style={styles.loginPart}>
        <TouchableOpacity onPress={handleForgotPasswordPress}>
          <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
        </TouchableOpacity>

        <ButtonComponent onPress={handleLoginPress} title="Ingresar" />

      </View>

      <Loading isShow={isLoading} title="Cargando..." setShow={setLoading} />

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        {type === 'success' ? (
          <CustomAlert
            type="success"
            onPress={() => navigation.navigate('HomeTabs')}
            title="¡Sesión exitosa!"
            iconColor="#2D7541"
          />
        ) : (
          <CustomAlert
            type="warning"
            title="¡Advertencia!"
            onPress={closeModal}
            iconColor="#BF0C0C"
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
    marginBottom: 10,
  },
  loginPart: {
    alignItems: 'center',
    marginTop: 10
  }
});

export default LoginScreen;