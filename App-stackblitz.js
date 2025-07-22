import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, Alert, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import IBANApp from './components/IBANApp';

// Web için AsyncStorage alternatifi
const storage = {
  async getItem(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  async setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      console.warn('Storage not available');
    }
  }
};

// Özel tema tanımlaması
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196F3',
    accent: '#03DAC6',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#212121',
    placeholder: '#757575',
  },
};

export default function App() {
  const [ibanList, setIbanList] = useState([]);

  // Uygulama başlatıldığında kayıtlı IBAN'ları yükle
  useEffect(() => {
    loadIBANs();
  }, []);

  // Storage'dan IBAN'ları yükle
  const loadIBANs = async () => {
    try {
      const savedIBANs = await storage.getItem('ibanList');
      if (savedIBANs) {
        setIbanList(JSON.parse(savedIBANs));
      }
    } catch (error) {
      console.error('IBAN\'lar yüklenirken hata:', error);
      if (Platform.OS !== 'web') {
        Alert.alert('Hata', 'Kayıtlı IBAN\'lar yüklenirken bir hata oluştu.');
      }
    }
  };

  // IBAN listesini Storage'a kaydet
  const saveIBANs = async (newIBANList) => {
    try {
      await storage.setItem('ibanList', JSON.stringify(newIBANList));
      setIbanList(newIBANList);
    } catch (error) {
      console.error('IBAN\'lar kaydedilirken hata:', error);
      if (Platform.OS !== 'web') {
        Alert.alert('Hata', 'IBAN\'lar kaydedilirken bir hata oluştu.');
      }
    }
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary} />
        <View style={styles.container}>
          <IBANApp 
            ibanList={ibanList}
            onSaveIBANs={saveIBANs}
          />
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});
