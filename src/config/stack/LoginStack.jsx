import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../../modules/auth/login/adapters/screens/LoginScreen';

const Stack = createStackNavigator();

export default function LoginStack() {
    return (

        <Stack.Navigator>

            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({})