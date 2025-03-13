// App.js
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import ResultScreen from './src/screens/ResultScreen';
import { themes, defaultTheme } from './src/themes';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Lato_400Regular,
    Lato_700Bold,
  });
  const [theme, setTheme] = useState(defaultTheme); // Tema inicial

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} theme={themes[theme]} setTheme={setTheme} />}
        </Stack.Screen>
        <Stack.Screen name="Game">
          {(props) => <GameScreen {...props} theme={themes[theme]} />}
        </Stack.Screen>
        <Stack.Screen name="Result">
          {(props) => <ResultScreen {...props} theme={themes[theme]} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}