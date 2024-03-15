import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import RoundedCard from '../../../../components/RoundedCard';
import ProfileNavigation from '../../../../components/ProfileNavigation';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = () => {

  const navigation = useNavigation();

  const ProfileScreen = () => {
    navigation.navigate('Profile');
  }

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logo}>
        <Image source={require('../../../../../assets/images/logo.png')} style={styles.logo2} />
        <ProfileNavigation
          name='user-circle'
          size={40}
          color='green'
          onPress={ProfileScreen}
        />
      </View>

      {/* Título */}
      <Text style={styles.title}>Línea de crédito</Text>

      <View style={styles.content}>
        {/* Crédito Disponible */}
        <Text style={styles.text1}>Credito Disponible:</Text>
        <Text style={styles.text2}> $10,000   </Text>

        {/* Tarjeta redondeada */}
        <RoundedCard
          title="Cuenta"
          content="BNK1001   ° 822"
          imageUrl={require('../../../../../assets/images/logo2.png')}
        />

        {/* Texto Movimientos */}
        <Text style={styles.text3}> Movimientos  </Text>

        <View style={styles.movimientos}>

          <Text>
            NO CUENTAS CON MOVIMIENTOS RECIENTES
          </Text>
          
        </View>
      </View>

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
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  text3: {
    fontFamily: 'MontserratRegular',
    color: 'gray',
    fontSize: 20,
    marginBottom: 30,
    marginTop: 10
  },
  containercard: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',

  },
  containercard2: {
    flex: 3,
    alignItems: 'center',

  },
  containerempty: {
    flex: 1
  },
  movimientos: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }

});

export default HomeScreen;