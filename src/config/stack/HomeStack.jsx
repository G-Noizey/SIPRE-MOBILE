import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../../modules/home/adapters/screens/HomeScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
    return (

        <Stack.Navigator>

            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
            />

        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({})