import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DetailsScreenNavigationProp, Crypto, DetailsScreenProps } from '../types';
import { WebView } from 'react-native-webview';

const DetailsScreen: React.FC<DetailsScreenProps> = ({ savedCryptos, setSavedCryptos }) => {
  const navigation = useNavigation();
  const route = useRoute<DetailsScreenNavigationProp['route']>();
  const { crypto } = route.params;

  console.log('Crypto Details:', crypto);

  const [interval, setInterval] = useState('7d'); 
  const [priceChange, setPriceChange] = useState(crypto.quote.usd.percentChange7d);

  const isSaved = savedCryptos.some((savedCrypto) => savedCrypto.id === crypto.id);

  const handleSaveToggle = () => {
    const index = savedCryptos.findIndex((c) => c.id === crypto.id);
    if (index !== -1) {
      setSavedCryptos(savedCryptos.filter((c) => c.id !== crypto.id));
    } else {
      setSavedCryptos([...savedCryptos, crypto]);
    }
  };

  const handleIntervalChange = (newInterval: string, newChange: number) => {
    setInterval(newInterval);
    setPriceChange(newChange);
  };

  const getChartImageUrl = () => {
    switch (interval) {
      case '1h':
        return `https://s3.coinmarketcap.com/generated/sparklines/web/1h/usd/${crypto.id}.png`;
      case '24h':
        return `https://s3.coinmarketcap.com/generated/sparklines/web/24h/usd/${crypto.id}.png`;
      case '7d':
      default:
        return `https://s3.coinmarketcap.com/generated/sparklines/web/7d/usd/${crypto.id}.png`;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/icons/back-arrow.png')} style={styles.backArrow} />
        </TouchableOpacity>
        <Image source={{ uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png` }} style={styles.symbolImage} />
        <Text style={styles.symbol}>{crypto.symbol}</Text>
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity onPress={handleSaveToggle}>
            <Text style={styles.saveButton}>{isSaved ? 'Unsave' : 'Save'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.details}>
        <Text style={styles.price}>${crypto.quote.usd.price.toFixed(2)}</Text>
        <Text style={[styles.change, priceChange > 0 ? styles.up : styles.down]}>
          {priceChange.toFixed(2)}%
        </Text>
      </View>
      <View style={styles.intervalButtons}>
        <Button title="1h" onPress={() => handleIntervalChange('1h', crypto.quote.usd.percentChange1h)} />
        <Button title="24h" onPress={() => handleIntervalChange('24h', crypto.quote.usd.percentChange24h)} />
        <Button title="7d" onPress={() => handleIntervalChange('7d', crypto.quote.usd.percentChange7d)} />
      </View>
      <WebView
        source={{ uri: getChartImageUrl() }}
        style={styles.chart}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
    color: 'white',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backArrow: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  symbolImage: {
    width: 48,
    height: 48,
    marginRight: 8,
  },
  symbol: {
    fontSize: 20,
    color: 'white',
  },
  saveButtonContainer: {
    flex: 1, 
    alignItems: 'flex-end', 
  },
  saveButton: {
    color: '#c3a754',
    fontSize: 16,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  price: {
    fontSize: 26,
    color: '#c3a754',
    marginRight: 16,
  },
  change: {
    fontSize: 20,
  },
  up: {
    color: '#4caf50',
  },
  down: {
    color: '#f44336',
  },
  intervalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  chart: {
    height: 400,
    width: '100%',
  },
});

export default DetailsScreen;
