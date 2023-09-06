import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/Home';
import BMI from './src/pages/BMI';
import Allergy from './src/pages/Allergy';
import Symptoms from './src/pages/symptoms';
import Checklist from './src/pages/Checklist';
import Medication from './src/pages/Medication';
import Register from './src/pages/Register';
import NewsPage from './src/pages/NewsPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Tela Principal" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="IMC" component={BMI} />
        <Stack.Screen name="Alergia" component={Allergy} />
        <Stack.Screen name="Sintoma" component={Symptoms} />
        <Stack.Screen name="Medicamento" component={Medication} />
        <Stack.Screen name="Registro" component={Register} />
        <Stack.Screen name="Notícias" component={NewsPage} />
        <Stack.Screen name="Checklist" component={Checklist} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
