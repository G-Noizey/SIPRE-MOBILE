import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import UserInfoTextInput from '../../../../../components/UserInfoTextInput';
import ButtonComponentGray from '../../../../../components/ButtonComponentGray';
import Modal from '../../../../../components/Modal';
import { useNavigation } from '@react-navigation/native';
import ProfileNavigation from '../../../../../components/ProfileNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Profile = () => {
    const [showLoading, setShowLoading] = useState(false);
    const [showLoadingUser, setShowLoadingUser] = useState(false);
    const [workerData, setWorkerData] = useState(null);
    const [divisionName, setDivisionName] = useState('');

    const navigation = useNavigation();

    const handleCloseModal = () => {
        setShowLoading(false);
        setShowLoadingUser(false);
    };

    const HomeScreen = () => {
        navigation.navigate('HomeTabs');
    };

    const closeSession = () => {
        navigation.navigate('LoginTabs');
    };

    useEffect(() => {
        const fetchWorkerData = async () => {
            try {
                // Obtener los datos del trabajador almacenados en el almacenamiento local
                const storedData = await AsyncStorage.getItem('workerData');

                if (storedData) {
                    // Convertir los datos de nuevo a objeto utilizando JSON.parse
                    const parsedData = JSON.parse(storedData);
                    setWorkerData(parsedData);

                    // Obtener el nombre de la división
                    const response = await axios.get(`http://192.168.108.88:8080/division/${parsedData.divisionId}`);
                    setDivisionName(response.data.name);

                    // Agregamos un console.log para verificar los datos del trabajador
                    console.log('Datos del trabajador:', parsedData);
                    console.log('Nombre de la división:', response.data.name);
                }
            } catch (error) {
                console.error('Error al obtener los datos del trabajador:', error);
            }
        };

        fetchWorkerData();
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.logo}>
                <Image source={require('../../../../../../assets/images/logo.png')} style={styles.logo2} />
                <ProfileNavigation
                    name='home'
                    size={40}
                    color='green'
                    onPress={HomeScreen}
                />
            </View>

            <Text style={styles.title}>Informacion de cuenta</Text>

            <Text style={styles.title2}>Informacion Personal</Text>

            {workerData && (
                <>
                    <UserInfoTextInput
                        placeholder={"Numero de cuenta"}
                        userInfo={workerData.numeroCuenta}
                        editable={false}
                    />
                    <UserInfoTextInput placeholder={"Nombre de usuario"} userInfo={workerData.name}
                        editable={false}
                    />
                    <UserInfoTextInput placeholder={"Correo Electronico"} userInfo={workerData.email}
                        editable={false}
                    />
                    <UserInfoTextInput placeholder={"Telefono"} userInfo={workerData.telefono}
                        editable={false}
                    />
                    <UserInfoTextInput placeholder={"Direccion"} userInfo={workerData.direccion}
                        editable={false}
                    />
                    <UserInfoTextInput placeholder={"Division"} userInfo={divisionName}
                        editable={false}
                    />
                </>
            )}

            <Text style={styles.title3}>Seguridad</Text>

            <View style={styles.containerButtons}>
                <View style={styles.row}>
                    <View style={styles.seguridadButtons}>
                        <ButtonComponentGray
                            title={"Cambiar contraseña  "}
                            icon={"lock"}
                            onPress={() => setShowLoading(true)}
                        />
                        <ButtonComponentGray
                            title={"Cambiar usuario    "}
                            icon={"lock"}
                            onPress={() => setShowLoadingUser(true)}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <ButtonComponentGray title={"Cerrar sesion"} onPress={closeSession} />
                </View>
            </View>

            <Modal
                isShow={showLoading}
                title="Cambio de contraseña"
                type='password'
                onClose={handleCloseModal}
            />

            <Modal
                isShow={showLoadingUser}
                title="Cambio de usuario"
                type='username'
                onClose={handleCloseModal}
            />

        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: windowWidth * 0.09,
        justifyContent: 'flex-start',
        // alignItems: 'center',

    },
    logo: {
        width: windowHeight * 0.10,
        height: windowHeight * 0.10,
        marginRight: windowWidth * 0.70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    logo2: {
        width: windowHeight * 0.08,
        height: windowHeight * 0.08,
        marginLeft: windowWidth * -0.041
        //marginRight: windowWidth * 0.2,
    },
    title: {
        fontFamily: 'MontserratBold',
        fontSize: windowWidth * 0.06,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 1
    },
    title2: {
        fontFamily: 'MontserratRegular',
        marginBottom: windowHeight * 0.03,
        fontSize: 15,
        marginTop: 10,
        marginBottom: 15
    },
    title3: {
        fontFamily: 'MontserratRegular',
        fontSize: 15,
        marginTop: 1,
        marginBottom: 12
    },
    containerButtons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    seguridadButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: -25

    },

})

export default Profile;