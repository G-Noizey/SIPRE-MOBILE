import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LogoComponent = () => {
  const imagePath = require('../../assets/images/logo.png');

  return (
    <View style={styles.logoContainer}>
      <Image source={imagePath} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    marginBottom: windowHeight * 0.15, // 15% de la altura de la pantalla
  },
  logo: {
    height: windowHeight * 0.2, // 20% de la altura de la pantalla
    width: windowWidth * 0.4, // 40% del ancho de la pantalla
  },
});

export default LogoComponent;
