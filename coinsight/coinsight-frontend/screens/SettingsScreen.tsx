import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkModeContext } from '../context/DarkModeContext';

const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedNotifications = await AsyncStorage.getItem('notificationsEnabled');
        const savedLocation = await AsyncStorage.getItem('locationEnabled');
        const savedDarkMode = await AsyncStorage.getItem('darkModeEnabled');

        if (savedNotifications !== null) {
          setNotificationsEnabled(JSON.parse(savedNotifications));
        }
        if (savedLocation !== null) {
          setLocationEnabled(JSON.parse(savedLocation));
        }
        if (savedDarkMode !== null) {
          if (JSON.parse(savedDarkMode) !== darkMode) {
            toggleDarkMode();
          }
        }
      } catch (error) {
        console.log('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  const handleNotificationsToggle = async () => {
    try {
      const newValue = !notificationsEnabled;
      setNotificationsEnabled(newValue);
      await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(newValue));
    } catch (error) {
    }
  };

  const handleLocationToggle = async () => {
    try {
      const newValue = !locationEnabled;
      setLocationEnabled(newValue);
      await AsyncStorage.setItem('locationEnabled', JSON.stringify(newValue));
    } catch (error) {
      console.log('Error saving location setting:', error);
    }
  };

  const handleDarkModeToggle = async () => {
    try {
      toggleDarkMode();
      await AsyncStorage.setItem('darkModeEnabled', JSON.stringify(!darkMode));
    } catch (error) {
      console.log('Error saving dark mode setting:', error);
    }
  };

  return (
    <View style={[styles.container, darkMode ? styles.containerDark : styles.containerLight]}>
      <View style={styles.settingItem}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleNotificationsToggle}
          value={notificationsEnabled}
        />
        <Text style={darkMode ? styles.textDark : styles.textLight}>Enable Notifications</Text>
      </View>
      <View style={styles.settingItem}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={locationEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleLocationToggle}
          value={locationEnabled}
        />
        <Text style={darkMode ? styles.textDark : styles.textLight}>Enable Location</Text>
      </View>
      <View style={styles.settingItem}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleDarkModeToggle}
          value={darkMode}
        />
        <Text style={darkMode ? styles.textDark : styles.textLight}>Enable Dark Mode</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    backgroundColor: '#f4f4f4',
  },
  containerDark: {
    backgroundColor: '#252525',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: 300,
  },
  textLight: {
    color: '#000000',
  },
  textDark: {
    color: '#c3a754',
  },
});

export default SettingsScreen;
