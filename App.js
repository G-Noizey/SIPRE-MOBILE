import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';  // Asegúrate de que la ruta sea correcta

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Puedes tener múltiples pantallas en tu aplicación */}
        <Stack.Screen name="Login"
         component={LoginScreen}
         options={{
          headerShown: false,
         }} />

        {/* Agrega más pantallas según sea necesario */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;