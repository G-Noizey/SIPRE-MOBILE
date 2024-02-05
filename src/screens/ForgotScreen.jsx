// ForgotScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LogoComponent from '../components/LogoComponent';
import InputField from '../components/InputFields';
import ButtonComponent from '../components/ButtonComponent';
import BackButtonComponent from '../components/BackButtonComponent';
import * as Font from 'expo-font';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ForgotScreen = () => {
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

  const handleBack = () => {
    // Lógica relacionada con la recuperación de contraseña aquí

    // Después de realizar la lógica, redirige a LoginScreen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>

      <View style={styles.logo2Container}>
        <Image source={require('../../assets/images/logo2.png')} style={styles.logo2} />
      </View>

      <View style={styles.container}>
        <LogoComponent />
      </View>

      <Text style={styles.loginText}>Recuperación de contraseña</Text>

      <InputField label="Correo Electrónico:" value={username} onChangeText={handleUsernameChange} placeholder="" />

        <View style={styles.div}>

        <ButtonComponent onPress={() => console.log('Botón presionado')} title="Solicitar" />


        </View>

      <BackButtonComponent onPress={handleBack} />
      
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
