import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ForgotScreen from '../../modules/auth/forgotPassword/adapters/screens/ForgotScreen';

const Stack = createStackNavigator();

export default function ForgotPasswordStack() {
    return (

        <Stack.Navigator>

            <Stack.Screen
                name="ForgotScreen"
                component={ForgotScreen}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({})