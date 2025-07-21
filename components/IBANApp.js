import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Appbar,
  Card,
  Text,
  Button,
  FAB,
  Searchbar,
  Chip,
  Surface,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import IBANForm from './IBANForm';
import IBANCard from './IBANCard';
import { validateIBAN } from '../utils/ibanUtils';

const IBANApp = ({ ibanList, onSaveIBANs }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const theme = useTheme();

  // IBAN ekleme
  const handleAddIBAN = (newIBAN) => {
    // IBAN doğrulama
    if (!validateIBAN(newIBAN.iban)) {
      Alert.alert('Geçersiz IBAN', 'Lütfen geçerli bir IBAN numarası girin.');
      return false;
    }

    // Duplicate kontrol
    const exists = ibanList.some(item => item.iban === newIBAN.iban);
    if (exists) {
      Alert.alert('Mevcut IBAN', 'Bu IBAN zaten kayıtlı.');
      return false;
    }

    const updatedList = [...ibanList, { ...newIBAN, id: Date.now().toString() }];
    onSaveIBANs(updatedList);
    setShowAddForm(false);
    
    Alert.alert('Başarılı', 'IBAN başarıyla eklendi.');
    return true;
  };

  // IBAN silme
  const handleDeleteIBAN = (id) => {
    Alert.alert(
      'IBAN Sil',
      'Bu IBAN\'ı silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            const updatedList = ibanList.filter(item => item.id !== id);
            onSaveIBANs(updatedList);
          },
        },
      ]
    );
  };

  // IBAN düzenleme
  const handleEditIBAN = (id, updatedIBAN) => {
    if (!validateIBAN(updatedIBAN.iban)) {
      Alert.alert('Geçersiz IBAN', 'Lütfen geçerli bir IBAN numarası girin.');
      return false;
    }

    const updatedList = ibanList.map(item =>
      item.id === id ? { ...item, ...updatedIBAN } : item
    );
    onSaveIBANs(updatedList);
    Alert.alert('Başarılı', 'IBAN başarıyla güncellendi.');
    return true;
  };

  // Arama ve filtreleme
  const filteredIBANs = ibanList.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.iban.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = !filterCountry || item.iban.startsWith(filterCountry);
    
    return matchesSearch && matchesCountry;
  });

  // Benzersiz ülke kodları
  const uniqueCountries = [...new Set(ibanList.map(item => item.iban.substring(0, 2)))];

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="IBAN Yöneticisi" subtitle={`${ibanList.length} IBAN kayıtlı`} />
      </Appbar.Header>

      {showAddForm ? (
        <IBANForm
          onSubmit={handleAddIBAN}
          onCancel={() => setShowAddForm(false)}
        />
      ) : (
        <>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.accent]}
            style={styles.headerGradient}
          >
            <Surface style={styles.searchContainer}>
              <Searchbar
                placeholder="IBAN ara..."
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchbar}
              />
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.chipContainer}
              >
                <Chip
                  selected={!filterCountry}
                  onPress={() => setFilterCountry('')}
                  style={styles.chip}
                >
                  Tümü
                </Chip>
                {uniqueCountries.map(country => (
                  <Chip
                    key={country}
                    selected={filterCountry === country}
                    onPress={() => setFilterCountry(filterCountry === country ? '' : country)}
                    style={styles.chip}
                  >
                    {country}
                  </Chip>
                ))}
              </ScrollView>
            </Surface>
          </LinearGradient>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {filteredIBANs.length === 0 ? (
              <Card style={styles.emptyCard}>
                <Card.Content style={styles.emptyContent}>
                  <Text variant="headlineSmall" style={styles.emptyTitle}>
                    {ibanList.length === 0 ? 'Henüz IBAN eklenmemiş' : 'Arama sonucu bulunamadı'}
                  </Text>
                  <Text variant="bodyMedium" style={styles.emptyText}>
                    {ibanList.length === 0 
                      ? 'İlk IBAN\'ınızı eklemek için + butonuna tıklayın'
                      : 'Arama kriterlerinizi değiştirip tekrar deneyin'
                    }
                  </Text>
                  {ibanList.length === 0 && (
                    <Button
                      mode="contained"
                      onPress={() => setShowAddForm(true)}
                      style={styles.emptyButton}
                    >
                      İlk IBAN'ı Ekle
                    </Button>
                  )}
                </Card.Content>
              </Card>
            ) : (
              filteredIBANs.map(item => (
                <IBANCard
                  key={item.id}
                  iban={item}
                  onDelete={() => handleDeleteIBAN(item.id)}
                  onEdit={(updatedIBAN) => handleEditIBAN(item.id, updatedIBAN)}
                />
              ))
            )}
            <View style={styles.bottomSpacing} />
          </ScrollView>

          {ibanList.length > 0 && (
            <FAB
              style={styles.fab}
              icon="plus"
              onPress={() => setShowAddForm(true)}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerGradient: {
    paddingBottom: 16,
  },
  searchContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  searchbar: {
    marginBottom: 12,
    elevation: 0,
  },
  chipContainer: {
    flexDirection: 'row',
  },
  chip: {
    marginRight: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyCard: {
    marginTop: 32,
    elevation: 2,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 24,
  },
  emptyButton: {
    paddingHorizontal: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  bottomSpacing: {
    height: 80,
  },
});

export default IBANApp;
