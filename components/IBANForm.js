import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Card,
  Text,
  TextInput,
  Button,
  Chip,
  Surface,
  useTheme,
  HelperText,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { validateIBAN, formatIBAN, getIBANInfo } from '../utils/ibanUtils';

const IBANForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [iban, setIban] = useState(initialData?.iban || '');
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState(initialData?.category || 'Kişisel');
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const theme = useTheme();

  const categories = ['Kişisel', 'İş', 'Aile', 'Tasarruf', 'Yatırım', 'Diğer'];

  // IBAN gerçek zamanlı doğrulama
  const handleIBANChange = (text) => {
    const cleanText = text.replace(/\s/g, '').toUpperCase();
    const formattedText = formatIBAN(cleanText);
    setIban(formattedText);
    
    // Hata temizle
    if (errors.iban) {
      setErrors(prev => ({ ...prev, iban: null }));
    }
  };

  // Form doğrulama
  const validateForm = () => {
    const newErrors = {};

    if (!iban.trim()) {
      newErrors.iban = 'IBAN numarası gereklidir';
    } else if (!validateIBAN(iban)) {
      newErrors.iban = 'Geçersiz IBAN numarası';
    }

    if (!name.trim()) {
      newErrors.name = 'İsim gereklidir';
    } else if (name.trim().length < 2) {
      newErrors.name = 'İsim en az 2 karakter olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form gönderme
  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsValidating(true);
    
    const ibanData = {
      iban: iban.replace(/\s/g, ''),
      name: name.trim(),
      description: description.trim(),
      category,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const success = onSubmit(ibanData);
    if (success) {
      // Form temizle
      setIban('');
      setName('');
      setDescription('');
      setCategory('Kişisel');
      setErrors({});
    }
    
    setIsValidating(false);
  };

  // IBAN bilgilerini al
  const ibanInfo = iban ? getIBANInfo(iban) : null;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Card style={styles.formCard}>
            <Card.Content>
              <Text variant="headlineSmall" style={styles.title}>
                {initialData ? 'IBAN Düzenle' : 'Yeni IBAN Ekle'}
              </Text>

              {/* IBAN Input */}
              <TextInput
                label="IBAN Numarası"
                value={iban}
                onChangeText={handleIBANChange}
                mode="outlined"
                style={styles.input}
                placeholder="TR00 0000 0000 0000 0000 0000 00"
                maxLength={35}
                autoCapitalize="characters"
                error={!!errors.iban}
                left={<TextInput.Icon icon="bank" />}
              />
              <HelperText type="error" visible={!!errors.iban}>
                {errors.iban}
              </HelperText>

              {/* IBAN Bilgi Kartı */}
              {ibanInfo && ibanInfo.isValid && (
                <Surface style={styles.ibanInfoCard}>
                  <View style={styles.ibanInfoHeader}>
                    <MaterialIcons 
                      name="check-circle" 
                      size={20} 
                      color={theme.colors.primary} 
                    />
                    <Text variant="titleSmall" style={styles.ibanInfoTitle}>
                      IBAN Bilgileri
                    </Text>
                  </View>
                  <Text variant="bodySmall">Ülke: {ibanInfo.countryName}</Text>
                  <Text variant="bodySmall">Ülke Kodu: {ibanInfo.countryCode}</Text>
                  {ibanInfo.bankCode && (
                    <Text variant="bodySmall">Banka Kodu: {ibanInfo.bankCode}</Text>
                  )}
                </Surface>
              )}

              {/* İsim Input */}
              <TextInput
                label="İsim / Açıklayıcı Başlık"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
                placeholder="Örn: Ahmet Yılmaz - Ziraat Bankası"
                error={!!errors.name}
                left={<TextInput.Icon icon="account" />}
              />
              <HelperText type="error" visible={!!errors.name}>
                {errors.name}
              </HelperText>

              {/* Açıklama Input */}
              <TextInput
                label="Açıklama (Opsiyonel)"
                value={description}
                onChangeText={setDescription}
                mode="outlined"
                style={styles.input}
                placeholder="IBAN hakkında notlar..."
                multiline
                numberOfLines={3}
                left={<TextInput.Icon icon="note-text" />}
              />

              {/* Kategori Seçimi */}
              <Text variant="titleSmall" style={styles.categoryTitle}>
                Kategori
              </Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.categoryContainer}
              >
                {categories.map((cat) => (
                  <Chip
                    key={cat}
                    selected={category === cat}
                    onPress={() => setCategory(cat)}
                    style={styles.categoryChip}
                  >
                    {cat}
                  </Chip>
                ))}
              </ScrollView>
            </Card.Content>
          </Card>

          {/* Butonlar */}
          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={onCancel}
              style={[styles.button, styles.cancelButton]}
            >
              İptal
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={[styles.button, styles.submitButton]}
              loading={isValidating}
              disabled={isValidating}
            >
              {initialData ? 'Güncelle' : 'Ekle'}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  formCard: {
    elevation: 2,
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    marginBottom: 8,
  },
  ibanInfoCard: {
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#E8F5E8',
  },
  ibanInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ibanInfoTitle: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  categoryTitle: {
    marginTop: 8,
    marginBottom: 12,
    color: '#333',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryChip: {
    marginRight: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    marginRight: 8,
  },
  submitButton: {
    marginLeft: 8,
  },
});

export default IBANForm;
