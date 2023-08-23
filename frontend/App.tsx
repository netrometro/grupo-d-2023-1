import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import BMI from './pages/BMI';
import Allergy from './pages/Allergy';
import Symptoms from './src/pages/symptoms';
import Water from './pages/Water';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Tela Principal" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="IMC" component={BMI} />
        <Stack.Screen name="Alergia" component={Allergy} />
        <Stack.Screen name="Sintoma" component={Symptoms} />
        <Stack.Screen name="Água" component={Water} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
