import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, AppState } from 'react-native';
import RoundedCard from '../../../../components/RoundedCard';
import ProfileNavigation from '../../../../components/ProfileNavigation';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import RecentMovements from '../../../../components/RecentMovements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = () => {

  const navigation = useNavigation();
  const [saldo, setSaldo] = useState(0);
  const [nuCuenta, setNuCuenta] = useState(0);

  const ProfileScreen = () => {
    navigation.navigate('Profile');
  }

  const fetchWorkerSaldo = async () => {
    try {
      const storedData = await AsyncStorage.getItem('workerData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setSaldo(parsedData.saldo);
        setNuCuenta(parsedData.nuCuenta);
      }
    } catch (error) {
      console.error('Error al obtener el saldo del trabajador:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchWorkerSaldo();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../../../../../assets/images/logo.png')} style={styles.logo2} />
        <ProfileNavigation
          name='user-circle'
          size={40}
          color='green'
          onPress={ProfileScreen}
        />
      </View>
      <Text style={styles.title}>Línea de crédito</Text>

      <View style={styles.content}>

        <View style={styles.creditContainer}>
          <Text style={styles.text1}>Crédito Disponible:</Text>
          <Text style={styles.text2}>${saldo}</Text>
        </View>

        <RoundedCard
          title="Cuenta"
          content={nuCuenta}
          imageUrl={require('../../../../../assets/images/logo2.png')}
        />
        <Text style={styles.text3}>Movimientos</Text>

        <View style={styles.movimientos}>
          <RecentMovements />
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
    marginBottom: windowHeight * 0.01,
    fontSize: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
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
    marginBottom: 10,
  },
  creditContainer: {
    flexDirection: "column",
    alignItems: "center",
    height: 50,
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
    width: '115%',
    borderRadius: 10,
    marginBottom: 30,
    alignItems: 'center',
  }

});

export default HomeScreen;
