import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const ButtonComponent = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2D7541',
    paddingVertical: windowWidth * 0.027, // 2.7% del ancho de la pantalla
    paddingHorizontal: windowWidth * 0.10, // 22% del ancho de la pantalla
    borderRadius: windowWidth * 0.027, // 2.7% del ancho de la pantalla
    marginTop: windowWidth * 0.048, // 4.8% del ancho de la pantalla
    width: windowWidth * 0.7, // 80% del ancho de la pantalla
    justifyContent: 'center', // Asegura que el contenido esté centrado verticalmente
  },
  buttonText: {
    color: 'white',
    fontFamily: 'MontserratRegular',
    fontSize: windowWidth * 0.04, // 4% del ancho de la pantalla
    textAlign: 'center', // Asegura que el texto esté centrado horizontalmente
  },
});

export default ButtonComponent;
