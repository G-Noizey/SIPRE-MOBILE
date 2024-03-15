import { StyleSheet, Text, View, Dimensions, Image, TextInput, FlatList } from 'react-native'
import React, { useState, useEffect, useNavigation } from 'react'
import BackButtonComponent from '../../../../../components/BackButtonComponent';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AccountStatus = () => {

    const egresosCompraData = [
        { id: 1, fecha: '01/03/2024', concepto: 'Compra de alimentos', monto: '$50', division: 'Supermercado', },
        { id: 2, fecha: '05/03/2024', concepto: 'Compra de ropa', monto: '$100', division: 'Moda', },
    ];

    const egresosTransferenciaData = [
        { id: 1, fecha: '02/03/2024', concepto: 'Transferencia a amigo', monto: '$30', division: 'Transferencias', destino: '1234567890' },
        { id: 2, fecha: '08/03/2024', concepto: 'Pago de factura', monto: '$80', division: 'Servicios', destino: '0987654321' },
    ];

    const ingresosData = [
        { id: 1, fecha: '03/03/2024', concepto: 'Pago de salario', monto: '$500' },
        { id: 2, fecha: '10/03/2024', concepto: 'Reembolso de gastos', monto: '$200' },
    ];

    const columnNames = ['Fecha', 'Concepto', 'Monto', 'Division', 'No. Destino'];

    // Renderizado de ítems de tabla
    const renderTableItem = ({ item }) => {
        const { id, ...dataWithoutId } = item;
        return (
            <View style={styles.tableRow}>
                {Object.keys(dataWithoutId).map(key => (
                    <Text style={styles.tableCell} key={key}>{item[key]}</Text>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../../../../../assets/images/logo.png')}
                        style={styles.logo}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>¡Hola, Luis Adán!</Text>
                    <Text style={styles.subtitle}>Este es tu Estado de Cuenta</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems:'center'  }}>
                <Text style={{ fontWeight: 'bold', marginLeft: 10, marginTop: 10, marginBottom: 10 }}> Periodo </Text>
                <Text> 22/02/2024 - 23/03-2024</Text>
            </View>

            <View >
                <Text style={styles.tableTitle}>Egresos Compra</Text>
                <View style={styles.tableRow}>
                    {columnNames.slice(0, 4).map((name, index) => (
                        <Text style={styles.tableHeader} key={index}>{name}</Text>
                    ))}
                </View>
                <FlatList
                    data={egresosCompraData}
                    renderItem={renderTableItem}
                    keyExtractor={item => item.id.toString()}
                />

                <Text style={styles.tableTitle}>Egresos Transferencia</Text>
                <View style={styles.tableRow}>
                    {columnNames.map((name, index) => (
                        <Text style={styles.tableHeader} key={index}>{name}</Text>
                    ))}
                </View>
                <FlatList
                    data={egresosTransferenciaData}
                    renderItem={renderTableItem}
                    keyExtractor={item => item.id.toString()}
                />

                <Text style={styles.tableTitle}>Ingresos</Text>
                <View style={styles.tableRow}>
                    {columnNames.slice(0, 3).map((name, index) => (
                        <Text style={styles.tableHeader} key={index}>{name}</Text>
                    ))}
                </View>
                <FlatList
                    data={ingresosData}
                    renderItem={renderTableItem}
                    keyExtractor={item => item.id.toString()}
                />
            </View>

            <View style={{ alignItems: 'center' }}>
                <BackButtonComponent />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50
    },
    logoContainer: {
        marginRight: 12,
    },
    logo: {
        width: windowHeight * 0.13,
        height: windowHeight * 0.13,
    },
    textContainer: {
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'MontserratBold',
        fontSize: 20,
        textAlign: 'center',
        color: 'green'
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        color: 'green'
    },
    tableTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 20,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
        borderWidth: 1,
        padding: 5,
    },
});

export default AccountStatus;