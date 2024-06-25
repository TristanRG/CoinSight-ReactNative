import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import CryptoListScreen from './screens/CryptoListScreen';
import SavedScreen from './screens/SavedScreen';
import DetailsScreen from './screens/DetailsScreen';
import { StyleSheet } from 'react-native';
import { Crypto } from './types';
import { DarkModeProvider, DarkModeContext } from './context/DarkModeContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

interface MainTabsProps {
  savedCryptos: Crypto[];
  setSavedCryptos: React.Dispatch<React.SetStateAction<Crypto[]>>;
}

const MainTabs: React.FC<MainTabsProps> = ({ savedCryptos, setSavedCryptos }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: darkMode ? styles.tabBarDark : styles.tabBarLight,
        tabBarLabelStyle: darkMode ? styles.tabBarLabelDark : styles.tabBarLabelLight,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Crypto List">
        {() => (
          <CryptoListScreen 
            savedCryptos={savedCryptos} 
            setSavedCryptos={setSavedCryptos}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Saved">
        {() => (
          <SavedScreen
            savedList={savedCryptos}
            setSavedCryptos={setSavedCryptos}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const App = () => {
  const [savedCryptos, setSavedCryptos] = useState<Crypto[]>([]);

  useEffect(() => {
    console.log("App component mounted");
  }, []);

  return (
    <DarkModeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main">
            {() => <MainTabs savedCryptos={savedCryptos} setSavedCryptos={setSavedCryptos} />}
          </Stack.Screen>
          <Stack.Screen name="Details">
            {(props) => <DetailsScreen {...props} savedCryptos={savedCryptos} setSavedCryptos={setSavedCryptos} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </DarkModeProvider>
  );
};

const styles = StyleSheet.create({
  tabBarLight: {
    backgroundColor: '#f4f4f4',
  },
  tabBarDark: {
    backgroundColor: '#252525',
  },
  tabBarLabelLight: {
    color: '#000000',
    fontWeight: 'bold',
  },
  tabBarLabelDark: {
    color: '#c3a754',
    fontWeight: 'bold',
  },
  tabBarIndicator: {
    backgroundColor: '#c3a754',
  },
});

export default App;
