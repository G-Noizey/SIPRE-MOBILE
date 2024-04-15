import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_URL } from '@env'
import { useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';
import ButtonComponent from './ButtonComponent';

export default function RecentMovements() {

    const [movements, setMovements] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedMovement, setSelectedMovement] = useState(null);

    const fetchMovements = async () => {

        try {

            const storedData = await AsyncStorage.getItem('workerData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                const workerId = parsedData.userId;

                const responseTransferencias = await axios.get(`${API_URL}/transfer/all/${workerId}`);
                const responseCompras = await axios.get(`${API_URL}/buys/all/${workerId}`);

                let counter = 0;
                const transferenciasConContador = responseTransferencias.data.map(transferencia => ({
                    ...transferencia,
                    tipo: 'Transferencia',
                    contador: counter++
                }));

                const comprasConContador = responseCompras.data.map(compra => ({
                    ...compra,
                    tipo: 'Compra',
                    contador: counter++
                }));

                const combinedMovements = [...transferenciasConContador, ...comprasConContador].sort((a, b) => {

                    return a.contador - b.contador;
                });

                console.log('Datos:', combinedMovements);

                setMovements(combinedMovements);
                await AsyncStorage.setItem('movements', JSON.stringify(combinedMovements));

            }
        } catch (error) {
            console.error('Error al obtener los movimientos:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchMovements();
        }, [])
    );

    const handleOpenModal = (movement) => {
        setSelectedMovement(movement);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const renderMovements = ({ item }) => (

        <View style={styles.container}>

            <View style={styles.column}>
                <Text style={{ fontWeight: "bold" }}>Registro de </Text>
                <Text style={{ fontWeight: "bold" }}>Cantidad:</Text>
                <Text style={{ fontWeight: "bold" }}>Estatus:</Text>
            </View>

            <TouchableOpacity onPress={() => handleOpenModal(item)}>
                <View style={styles.column2}>
                    <Text style={{ fontWeight: "bold" }}>{item.tipo}:</Text>
                    <Text>${item.monto}</Text>
                    <Text>{item.status}</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.column3}>
                {item.tipo === 'Transferencia' ? (
                    <Icon name="exchange" size={50} color={'green'} />
                ) : (
                    <Icon name="shopping-cart" size={50} color={'green'} />
                )}
            </View>

        </View>

    );

    return (
        <View style={styles.FlatList}>
            <FlatList
                data={movements}
                renderItem={renderMovements}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                    <Text style={styles.noMovementsMessage}>Sin movimientos recientes</Text>
                )}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleCloseModal}
            >

                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {selectedMovement && (
                            <>
                                <Text>
                                    <Text style={styles.boldText}>Registro de </Text>
                                    <Text style={styles.boldText}>{selectedMovement.tipo}</Text>
                                </Text>
                                <Text>
                                    <Text style={styles.boldText}>Concepto: </Text>
                                    <Text>{selectedMovement.descripcion}</Text>
                                </Text>
                                <Text>
                                    <Text style={styles.boldText}>Monto: </Text>
                                    <Text>${selectedMovement.monto}</Text>
                                </Text>
                                <Text>
                                    <Text style={styles.boldText}>Fecha: </Text>
                                    <Text>{selectedMovement.fecha}</Text>
                                </Text>
                                <Text>
                                    <Text style={styles.boldText}>Estado: </Text>
                                    <Text>{selectedMovement.status}</Text>
                                </Text>
                                <View style={styles.commentBox}>
                                <Text style={styles.boldText}>Comentario: </Text>

                                    <Text>{selectedMovement.comentario}</Text>
                                </View>

                                 <ButtonComponent title="Cerrar"onPress={handleCloseModal}></ButtonComponent>
                            </>
                        )}
                    </View>

                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexWrap: 'wrap',
    },
    text1: {
        fontFamily: 'MontserratRegular',
        fontSize: 15,
        color: 'gray',
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
        flexShrink: 1,
    },
    column2: {
        flexDirection: 'column',
        flexShrink: 1,
        width: 212,
    },
    column3: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: 50,
    },
    FlatList: {
        flex: 1,
    },
    noMovementsMessage: {
        marginTop: 155,
        fontSize: 20,
        color: 'gray',
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        margin: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    commentBox: {
        marginTop: 10,
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 10,
    },

   


  


    boldText: {
        fontWeight: 'bold',
    },

})