import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CoinLayout from '../coins/CoinLayout';
import { Crypto } from '../types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { DarkModeContext } from '../context/DarkModeContext';

type SavedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

interface SavedScreenProps {
  savedList: Crypto[];
  setSavedCryptos: (cryptos: Crypto[]) => void;
}

const SavedScreen: React.FC<SavedScreenProps> = ({ savedList, setSavedCryptos }) => {
  const navigation = useNavigation<SavedScreenNavigationProp>();
  const { darkMode } = useContext(DarkModeContext);

  const handleSaveToggle = (crypto: Crypto) => {
    setSavedCryptos(savedList.filter((c) => c.id !== crypto.id));
  };

  const handleCryptoClick = (crypto: Crypto) => {
    navigation.navigate('Details', { crypto });
  };

  if (savedList.length === 0) {
    return (
      <View style={[styles.container, darkMode ? styles.containerDark : styles.containerLight]}>
        <Text style={darkMode ? styles.textDark : styles.textLight}>No saved cryptocurrencies.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, darkMode ? styles.containerDark : styles.containerLight]}>
      <FlatList
        data={savedList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CoinLayout
            crypto={item}
            onPress={() => handleCryptoClick(item)}
            onSaveToggle={() => handleSaveToggle(item)}
            isSaved={true} 
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
  containerLight: {
    backgroundColor: '#f4f4f4',
  },
  containerDark: {
    backgroundColor: '#252525',
  },
  textLight: {
    color: '#000000',
  },
  textDark: {
    color: '#ffffff',
  },
});

export default SavedScreen;
