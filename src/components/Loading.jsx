import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { Overlay } from '@rneui/base'

export default function Loading(props) {

    const { isShow, title } = props;

    return (

        <Overlay
            isVisible={isShow}
            windowsBackgroundColor='rgb(0,0,0,0.5)'
            overlayBackgroundColor='transparent'
            overlayStyle={styles.overlay}
        >

            <View style={styles.container}>
                <ActivityIndicator
                    size='large'
                    color='green'
                />

                <Text style={styles.title}> {title} </Text>

            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({

    overlay: {
        width: 250,
        height: 160,
        backgroundColor: '#fff',
        borderColor: '#2D7541',
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        color: '#2D7541',
        textTransform: 'uppercase',
        marginTop: 16,
        textAlign: 'center'
    }

});