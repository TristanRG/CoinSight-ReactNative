# CoinSight-ReactNative

## Description:

Welcome to my Crypto Tracking App! This React Native application allows users to track the prices and performance of various cryptocurrencies. Users can view detailed information about specific cryptocurrencies, save their favorites, and toggle settings like notifications, location services, and dark mode. The app is designed to be user-friendly, offering real-time data and customizable options to enhance the user experience.

## Project Structure:

### Files and Components:

- HomeScreen.tsx: The main screen that welcomes users and introduces them to the world of cryptocurrency. It features the app's logo and a headline.

- CryptoListScreen.tsx: Displays a list of various cryptocurrencies along with key information such as current prices and 24-hour percentage changes. Users can browse and select a cryptocurrency to view more detailed information on the DetailsScreen.

- DetailsScreen.tsx: This screen displays detailed information about a selected cryptocurrency, including its current price, price changes over different intervals (1h, 24h, 7d), and the ability to save the crypto to a favorites list. Users can also view a real-time price chart of the cryptocurrency.

- SettingsScreen.tsx: The settings screen allows users to toggle features such as notifications, location services, and dark mode. These settings are saved using AsyncStorage, ensuring that user preferences persist between app sessions.

- DarkModeContext.tsx: A context that manages the global state of the dark mode setting, allowing for consistent theme application across the app.

### Key Features:

- Real-Time Crypto Tracking: Users can view up-to-date information on various cryptocurrencies, including current prices and price changes over different time intervals.

- Favorite Cryptocurrencies: Users can save their preferred cryptocurrencies to a favorites list for quick access and tracking.

- Interactive Charts: The app features interactive charts that display the price history of cryptocurrencies over different periods (1h, 24h, 7d).

- Settings Management: Users can customize their experience by toggling notifications, location services, and dark mode. These preferences are saved and restored on app startup.

### State management

- useState: Used for managing the state of user preferences and cryptocurrency data within individual screens.
- useEffect: Handles the loading and saving of user settings from/to AsyncStorage and manages side effects like fetching cryptocurrency data.

