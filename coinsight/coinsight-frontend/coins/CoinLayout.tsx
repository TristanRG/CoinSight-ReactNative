import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Crypto } from '../types';

interface CoinLayoutProps {
  crypto: Crypto;
  onPress: () => void;
  onSaveToggle: () => void;
  isSaved: boolean;
}

const CoinLayout: React.FC<CoinLayoutProps> = ({ crypto, onPress, onSaveToggle, isSaved }) => {
  const image = `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`;
  const chartImage = `https://s3.coinmarketcap.com/generated/sparklines/web/7d/usd/${crypto.id}.png`;
  const price = crypto.quote.usd.price.toFixed(2);
  const change = Number(crypto.quote.usd.percentChange24h.toFixed(2));
  const changeDirection = change > 0 ? 'up' : 'down';
  const changeColor = changeDirection === 'up' ? styles.up : styles.down;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        <Image source={{ uri: image }} style={styles.currencyImage} />
        <View style={styles.currencyInfo}>
          <Text style={styles.currencyName}>{crypto.name}</Text>
          <Text style={styles.currencySymbol}>{crypto.symbol}</Text>
        </View>
        <Image source={{ uri: chartImage }} style={styles.currencyChart} />
        <View style={styles.currencyPriceChange}>
          <Text style={styles.currencyPrice}>${price}</Text>
          <View style={styles.currencyChange}>
            <Text style={changeColor}>{change} %</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={(event) => {
            event.stopPropagation();
            onSaveToggle();
          }}
        >
          <Text style={styles.saveText}>{isSaved ? 'Unsave' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#252525',
    borderRadius: 12,
    margin: 8,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  currencyImage: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  currencyInfo: {
    flexDirection: 'column',
  },
  currencyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  currencySymbol: {
    fontSize: 14,
    marginTop
: 4,
    color: '#fff',
  },
  currencyChart: {
    width: 120,
    height: 48,
  },
  currencyPriceChange: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  currencyPrice: {
    color: '#c3a754',
    fontSize: 18,
    fontWeight: 'bold',
  },
  currencyChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  up: {
    color: '#4caf50',
  },
  down: {
    color: '#f44336',
  },
  saveButton: {
    backgroundColor: '#c3a754',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CoinLayout;
