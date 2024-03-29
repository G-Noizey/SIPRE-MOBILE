import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const InputField = ({ label, value, onChangeText, secureTextEntry, placeholder, disabled }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        editable={!disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: windowWidth * 0.04, // 4% del ancho de la pantalla
  },
  label: {
    fontFamily: 'MontserratRegular',
    marginBottom: windowWidth * 0.012, // 1.2% del ancho de la pantalla
    fontSize: windowWidth * 0.04, // 4% del ancho de la pantalla
    color: 'black',
  },
  input: {
    height: windowWidth * 0.097, // 9.7% del ancho de la pantalla
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: windowWidth * 0.024, // 2.4% del ancho de la pantalla
    paddingLeft: windowWidth * 0.027, // 2.7% del ancho de la pantalla
  },
  disabled: {
    backgroundColor: '#f0f0f0', // Color de fondo gris para indicar que el input está deshabilitado
    color: '#888', // Cambiar el color del texto para indicar que el input está deshabilitado
  },
});

export default InputField;
