import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';

export default function Loading(props) {
    const { isShow, title } = props;

    if (!isShow) {
        return null; // No mostrar nada si isShow es falso
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator
                size='large'
                color='green'
                style={styles.activityIndicator}
            />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 50,
        bottom: 0,
        left: 0,
        right: 0,
    },
    activityIndicator: {
        marginBottom: 16,
    },
    title: {
        color: '#2D7541',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 20,
    },
});
