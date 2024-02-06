import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LogoComponent from '../components/LogoComponent';
import InputField from '../components/InputFields';
import ButtonComponent from '../components/ButtonComponent';

import * as Font from 'expo-font';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation(); // Importa el hook de navegación

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
        MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
      });

      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // No renderizar nada si las fuentes no se han cargado
  }

  const handleForgotPasswordPress = () => {
    // Lógica relacionada con la recuperación de contraseña aquí

    // Después de realizar la lógica, redirige a ForgotPasswordScreen
    navigation.navigate('ForgotScreen');
  };



  const handleLoginPress = () => {
    // Aquí puedes realizar la lógica de autenticación con el servicio de Spring
    // Si la autenticación es exitosa, navega a la pantalla HomeScreen
    navigation.navigate('HomeScreen');
  };


  

  return (
    <View style={styles.container}>
      <View style={styles.logo2Container}>
        <Image source={require('../../assets/images/logo2.png')} style={styles.logo2} />
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
