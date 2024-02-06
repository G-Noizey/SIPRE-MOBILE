import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import BottomNavBar from '../navigation/BottomNavBar';
import RoundedCard from '../components/RoundedCard';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <View style={styles.logo}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo2} />
      </View>

      <Text style={styles.title}>Línea de crédito</Text>

      <View style={styles.content}>
        <Text style={styles.text1}>Credito Disponible:</Text>
        <Text style={styles.text2}> $10,000   </Text>

    {/* Integración del componente RoundedCard */}
    <RoundedCard
  title="Título de la tarjeta"
  content="Contenido de la tarjeta. Puedes personalizar este texto según tus necesidades."
  imageUrl={require('../../assets/images/logo2.png')} // Usa require para imágenes locales
/>

  
      </View>

      {/* Barra de navegación personalizada */}
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: windowWidth * 0.09,
  },
  title: {
    fontFamily: 'MontserratBold',
    fontSize: windowWidth * 0.06,
    marginBottom: windowHeight * 0.03,
    fontSize: 20,
  },
  content: {
    flex: 1,
    width: '100%',
  },
  logo: {
    width: windowHeight * 0.10,
    height: windowHeight * 0.10,
    marginRight: windowWidth * 0.70,
  },
  logo2: {
    width: windowHeight * 0.08,
    height: windowHeight * 0.08,
    marginRight: windowWidth * 0.2,
  },
  text1: {
    fontFamily: 'MontserratRegular',
    marginBottom: windowHeight * 0.03,
    paddingLeft: windowWidth * 0.03,
    fontSize: 15,
    color: 'gray',
  },
  text2: {
    fontFamily: 'MontserratRegular',
    fontSize: 30,
    color: 'green',
  },
});

export default HomeScreen;
