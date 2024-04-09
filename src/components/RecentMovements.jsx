import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_URL } from '@env'
import { useFocusEffect } from '@react-navigation/native';

export default function RecentMovements() {

    const [movements, setMovements] = useState([]);

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

    const renderMovements = ({ item }) => (

        <View style={styles.container}>

            <View style={styles.column}>
                <Text style={{ fontWeight: "bold" }}>Registro de </Text>
                <Text style={{ fontWeight: "bold" }}>Concepto:</Text>
                <Text style={{ fontWeight: "bold" }}>Cantidad:</Text>
                <Text style={{ fontWeight: "bold" }}>Fecha:</Text>
                <Text style={{ fontWeight: "bold" }}>Estatus:</Text>
            </View>

            <View style={styles.column2}>
                <Text style={{ fontWeight: "bold" }}>{item.tipo}:</Text>
                <Text style={{ width: 230 }}>{item.descripcion}</Text>
                <Text>${item.monto}</Text>
                <Text>{item.fecha}</Text>
                <Text>{item.status}</Text>
            </View>

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

})