import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Alert } from 'react-native';
import UserInfoTextInput from '../../../../../components/UserInfoTextInput';
import ButtonComponentGray from '../../../../../components/ButtonComponentGray';
import Modal from '../../../../../components/Modal';
import { useNavigation } from '@react-navigation/native';
import ProfileNavigation from '../../../../../components/ProfileNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';
import CustomAlertClose from '../../../../../components/CustomAlertClose';
import RNModal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Profile = () => {
    const [showLoading, setShowLoading] = useState(false);
    const [showLoadingUser, setShowLoadingUser] = useState(false);
    const [workerData, setWorkerData] = useState(null);
    const [divisionName, setDivisionName] = useState('');
    const [showConfirmLogout, setShowConfirmLogout] = useState(false);
    const navigation = useNavigation();

    const handleCloseModal = () => {
        setShowLoading(false);
        setShowLoadingUser(false);
        setShowConfirmLogout(false); // Closes session confirm modal
    };

    const HomeScreen = () => {
        navigation.navigate('HomeTabs');
    };

    const updateUsernameInWorkerData = (newUsername) => {
        if (workerData) {
            setWorkerData({
                ...workerData,
                userWorker: newUsername,
            });
        }
    };

    const updatePasswordInWorkerData = (newPassword) => {
        if (workerData) {
            setWorkerData({
                ...workerData,
                password: newPassword,
            });
        }
    };

    const toggleConfirmLogout = () => {
        setShowConfirmLogout(!showConfirmLogout);
    };

    const closeSession = async () => {
        try {
            await AsyncStorage.removeItem('workerData');
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginTabs' }],
            });
        } catch (error) {
            console.error('Error al cerrar la sesión:', error);
        }
    };

    useEffect(() => {
        const fetchWorkerData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('workerData');
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    setWorkerData(parsedData);

                    const response = await axios.get(`${API_URL}/division/${parsedData.divisionId}`);
                    setDivisionName(response.data.body.name);
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
                <Text style={styles.title}>Perfil</Text>
                <ProfileNavigation
                    name='home'
                    size={40}
                    color='green'
                    onPress={HomeScreen}
                />
            </View>

            <Text style={styles.title2}>Información Personal</Text>

            <View>
                {workerData && (
                    <>
                        <UserInfoTextInput
                            placeholder={"Número de cuenta"} userInfo={workerData.nuCuenta}
                            editable={false}
                        />
                        <UserInfoTextInput placeholder={"Nombre de usuario"} userInfo={workerData.userWorker}
                            editable={false}
                        />
                        <UserInfoTextInput placeholder={"Correo"} userInfo={workerData.email}
                            editable={false}
                        />
                        <UserInfoTextInput placeholder={"Teléfono"} userInfo={workerData.telefono}
                            editable={false}
                        />
                        <UserInfoTextInput placeholder={"Dirección"} userInfo={workerData.direccion}
                            editable={false}
                        />
                        <UserInfoTextInput placeholder={"División"} userInfo={divisionName}
                            editable={false} />

                    </>
                )}

            </View>

            <Text style={styles.title3}>Seguridad</Text>

            <View style={styles.containerButtons}>
                <View style={styles.row}>
                    <View style={styles.seguridadButtons}>
                        <ButtonComponentGray
                            title={"Cambiar contraseña"}
                            icon={"lock"}
                            onPress={() => setShowLoading(true)}
                        />
                        <ButtonComponentGray
                            title={"Cambiar nombre de usuario"}
                            onPress={() => setShowLoadingUser(true)}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <ButtonComponentGray
                        title={"Cerrar sesión"}
                        onPress={toggleConfirmLogout} // Updated to toggle confirmation modal
                    />
                </View>
            </View>

            <Modal
                isShow={showLoading}
                title="Cambio de contraseña"
                type='password'
                onClose={handleCloseModal}
                onUpdate={updatePasswordInWorkerData}
                API_URL={API_URL}
                workerPassword={workerData ? workerData.password : null}
                workerId={workerData ? workerData.userId : null}
                workerUsername={workerData ? workerData.userWorker : null}
            />

            <Modal
                isShow={showLoadingUser}
                title="Cambio de usuario"
                type='username'
                onClose={handleCloseModal}
                onUpdate={updateUsernameInWorkerData}
                API_URL={API_URL}
                workerPassword={workerData ? workerData.password : null}
                workerId={workerData ? workerData.userId : null}
                workerUsername={workerData ? workerData.userWorker : null}
            />

            <RNModal
                isVisible={showConfirmLogout}
                onBackdropPress={toggleConfirmLogout}
            >
                <CustomAlertClose
                    type="warning"
                    onPress={closeSession}
                    onCancel={toggleConfirmLogout}
                    title="¿Seguro de cerrar sesión?"
                    iconColor="#BF0C0C"
                />
            </RNModal>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: windowWidth * 0.09,
        justifyContent: 'flex-start',
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
    },
    title: {
        fontFamily: 'MontserratBold',
        fontSize: windowWidth * 0.06,
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10
    },
    title2: {
        textAlign: 'center',
        fontFamily: 'MontserratRegular',
        marginBottom: windowHeight * 0.03,
        fontSize: 15,
        marginTop: 10,
        marginBottom: 15
    },
    title3: {
        fontFamily: 'MontserratRegular',
        fontSize: 15,
        marginTop: 10,
        textAlign: 'center',
        marginBottom: 12
    },
    containerButtons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        /*
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        */
    },
    seguridadButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -15
    },

})

export default Profile;