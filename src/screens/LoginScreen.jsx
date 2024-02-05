import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import * as Font from 'expo-font';

const LoginScreen = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  return (
    <View style={styles.container}>

      {/* Logo */}


      <View style={styles.logo2Container}>
             <Image source={require('../../assets/images/logo2.png')} style={styles.logo2} />
      </View>


      <View style={styles.logoContainer}>
             <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>

      {/* Texto "Inicia Sesión" */}
      <Text style={styles.loginText}>Iniciar Sesión</Text>

      {/* Input de usuario con label */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuario:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={username}
          onChangeText={handleUsernameChange}
        />
      </View>

      {/* Input de contraseña con label */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
      </View>

      {/* Enlace "Olvidé mi contraseña" */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
      </TouchableOpacity>

      {/* Botón "Iniciar" */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginBottom: 100
  },
  logoContainer: {
    marginBottom: 50,
  },

  logo2Container:{
    marginBottom: 20,
    marginRight:250

  },

  logo2:{
    height:50,
    width:70,
    marginBottom: 40
  },

  logo: {

    height:150,
    width:200,
    



  },

  loginText: {
    fontFamily: 'MontserratRegular',
    fontSize: 30,
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontFamily: 'MontserratRegular',
    marginBottom: 5,
    fontSize: 16,
    color: 'black',
  },
  input: {
    height: 35,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingLeft: 10,
  },
  forgotPassword: {
    color: 'green',
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#2D7541',
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 10,
  },
  loginButtonText: {
    color: 'white',
    fontFamily: 'MontserratRegular',
    fontSize: 20,
  },
});

export default LoginScreen;
