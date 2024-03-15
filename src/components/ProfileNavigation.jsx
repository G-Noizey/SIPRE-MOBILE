import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProfileNavigation(props) {

    const { name, size, color, onPress } = props

    return (

        <View>
            <TouchableOpacity onPress={onPress}>
                <Icon name={name} size={size} color={color} />
            </TouchableOpacity>
        </View>
    )
}
