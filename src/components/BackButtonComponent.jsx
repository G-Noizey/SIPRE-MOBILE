// BackButtonComponent.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const BackButtonComponent = ({ onPress }) => {
  const navigation = useNavigation(); // Importa el hook de navegación

  const handleBackPress = () => {
    if (onPress) {
      onPress(); // Ejecuta la función proporcionada (si existe) al presionar el botón
    } else {
      // Si no se proporciona una función personalizada, realiza la navegación hacia atrás
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleBackPress}>
      <Icon name="arrow-left" size={windowWidth * 0.04} color="white" style={styles.icon} />
      <Text style={styles.buttonText}></Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2D7541',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: windowWidth * 0.027,
    paddingHorizontal: windowWidth * 0.12,
    borderRadius: windowWidth * 0.027,
    marginTop: windowWidth * 0.12,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'MontserratRegular',
    fontSize: windowWidth * 0.04,
  },
  icon: {
    marginRight: windowWidth * 0.02,
  },
});

export default BackButtonComponent;
