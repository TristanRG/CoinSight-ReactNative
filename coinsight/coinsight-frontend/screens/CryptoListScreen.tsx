import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import CoinLayout from '../coins/CoinLayout';
import { Crypto } from '../types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { DarkModeContext } from '../context/DarkModeContext';

type CryptoListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

interface CryptoListScreenProps {
  savedCryptos: Crypto[];
  setSavedCryptos: (cryptos: Crypto[]) => void;
}

const CryptoListScreen: React.FC<CryptoListScreenProps> = ({ savedCryptos, setSavedCryptos }) => {
  const [cryptocurrencies, setCryptocurrencies] = useState<Crypto[] | null>(null);
  const navigation = useNavigation<CryptoListScreenNavigationProp>();
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    console.log('CryptoListScreen mounted');
    const fetchCryptocurrencies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cryptocurrencies');
        const data = await response.json();
        setCryptocurrencies(data.data);
      } catch (error) {
        console.error('Error fetching cryptocurrencies:', error);
      }
    };

    fetchCryptocurrencies();
  }, []);

  const handleSaveToggle = (crypto: Crypto) => {
    const index = savedCryptos.findIndex((c) => c.id === crypto.id);
    if (index !== -1) {
      setSavedCryptos(savedCryptos.filter((c) => c.id !== crypto.id));
    } else {
      setSavedCryptos([...savedCryptos, crypto]);
    }
  };

  const handleCryptoClick = (crypto: Crypto) => {
    navigation.navigate('Details', { crypto });
  };

  if (!cryptocurrencies) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: darkMode ? '#252525' : '#ffffff' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#252525' : '#ffffff' }]}>
      <FlatList
        data={cryptocurrencies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CoinLayout
            key={item.id}
            crypto={item}
            onPress={() => handleCryptoClick(item)}
            onSaveToggle={() => handleSaveToggle(item)}
            isSaved={savedCryptos.some((c) => c.id === item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CryptoListScreen;
