import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IBANApp from './components/IBANApp';

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

  // AsyncStorage'dan IBAN'ları yükle
  const loadIBANs = async () => {
    try {
      const savedIBANs = await AsyncStorage.getItem('ibanList');
      if (savedIBANs) {
        setIbanList(JSON.parse(savedIBANs));
      }
    } catch (error) {
      console.error('IBAN\'lar yüklenirken hata:', error);
      Alert.alert('Hata', 'Kayıtlı IBAN\'lar yüklenirken bir hata oluştu.');
    }
  };

  // IBAN listesini AsyncStorage'a kaydet
  const saveIBANs = async (newIBANList) => {
    try {
      await AsyncStorage.setItem('ibanList', JSON.stringify(newIBANList));
      setIbanList(newIBANList);
    } catch (error) {
      console.error('IBAN\'lar kaydedilirken hata:', error);
      Alert.alert('Hata', 'IBAN\'lar kaydedilirken bir hata oluştu.');
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
