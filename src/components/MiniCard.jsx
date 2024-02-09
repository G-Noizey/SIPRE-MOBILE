import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; // Importa los iconos necesarios

const MiniCard = ({ content }) => {
  // Función para seleccionar el icono según el texto
  const selectIcon = (text) => {

    switch (text.toLowerCase()) {
      case 'registrar compra':
        return <FontAwesome name="shopping-cart" size={24} color="green" />;
      case 'registrar transferencia':
        return <MaterialIcons name="compare-arrows" size={24} color="green" />;
      case 'estado de cuenta':
        return <MaterialIcons name="account-balance" size={24} color="green" />;
      default:
        return <FontAwesome name="question" size={24} color="black" />;
    }
    
  };

  return (
    <TouchableOpacity style={styles.card}>
      {/* Renderiza el icono seleccionado */}
      {selectIcon(content)}
      <Text style={styles.content}>{content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    margin: 14,
    elevation: 10,
    alignItems: 'center',
    flex: 1
  },
  content: {
    fontFamily: 'MontserratRegular',
    fontSize: 15,
    textAlign: 'center'
  }
});

export default MiniCard;
