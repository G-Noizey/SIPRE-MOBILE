import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../../modules/home/adapters/screens/HomeScreen';
import LoginStack from '../stack/LoginStack'
import ForgotPasswordStack from '../stack/ForgotPasswordStack'
import Profile from '../../modules/auth/account/adapters/screens/Profile';
import BuysScreen from '../../modules/register/shopping/adapters/screens/BuysScreen';
import TransferScreen from '../../modules/register/transfer/adapters/screens/TransfersScreen';
import AccountStatus from '../../modules/register/status/adapters/screens/AccountStatus';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStackNavigator() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LoginTabs"
                component={LoginStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ForgotTabs"
                component={ForgotPasswordStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="HomeTabs"
                component={HomeTabsNavigator}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="AccountStatus"
                component={AccountStatus}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
            />



        </Stack.Navigator>
    );
}

function HomeTabsNavigator() {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarItemStyle: styles.tabBarItemStyle,
                tabBarStyle: styles.tabBarStyle,
                tabBarActiveTintColor: 'green',
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Buys"
                component={BuysScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="shopping-cart" size={size} color={color} />
                    ),
                    headerShown: false
                }}
            />

            <Tab.Screen
                name="Transfer"
                component={TransferScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="exchange" size={size} color={color} />
                    ),
                    headerShown: false
                }}
            />

        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MainStackNavigator />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabBarLabelStyle: {
        display: 'none',
    },
    tabBarItemStyle: {
        paddingVertical: 1,
        marginTop: -18,
    },
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        left: 15,
        right: 15,
        backgroundColor: '#fff',
        padding: 20,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        alignItems: 'center',
    },
});