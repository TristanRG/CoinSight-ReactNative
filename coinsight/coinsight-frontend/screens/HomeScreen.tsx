import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DarkModeContext } from '../context/DarkModeContext';

const HomeScreen: React.FC = () => {
  const { darkMode } = useContext(DarkModeContext);

  const imageUrl = '../assets/icons/logo.png'; 

  useEffect(() => {
    console.log('HomeScreen mounted');
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#252525' : '#ffffff' }]}>
      <Image source={require(imageUrl)} style={styles.logo} onError={(e) => console.log(e.nativeEvent.error)} />
      <Text style={[styles.headline, { color: darkMode ? '#c3a754' : '#000' }]}>THE FUTURE OF CRYPTO</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 500,
    height: 500,
    marginBottom: 20,
  },
  headline: {
    fontSize: 32,
    textAlign: 'center',
  },
});

export default HomeScreen;
