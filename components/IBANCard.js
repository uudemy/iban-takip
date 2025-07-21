import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Share,
} from 'react-native';
import {
  Card,
  Text,
  Button,
  IconButton,
  Chip,
  Surface,
  Menu,
  Divider,
  useTheme,
} from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import { MaterialIcons } from '@expo/vector-icons';
import { formatIBAN, getIBANInfo, getTurkishBankName } from '../utils/ibanUtils';
import IBANForm from './IBANForm';

const IBANCard = ({ iban, onDelete, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const theme = useTheme();

  const ibanInfo = getIBANInfo(iban.iban);
  const formattedIBAN = formatIBAN(iban.iban);
  const bankName = iban.iban.startsWith('TR') ? getTurkishBankName(iban.iban) : '';

  // IBAN'ı kopyala
  const copyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(iban.iban);
      Alert.alert('Başarılı', 'IBAN panoya kopyalandı.');
    } catch (error) {
      Alert.alert('Hata', 'IBAN kopyalanırken bir hata oluştu.');
    }
  };

  // IBAN'ı paylaş
  const shareIBAN = async () => {
    try {
      const shareContent = `${iban.name}\nIBAN: ${formattedIBAN}\n${iban.description ? `Açıklama: ${iban.description}` : ''}`;
      await Share.share({
        message: shareContent,
        title: 'IBAN Bilgisi',
      });
    } catch (error) {
      Alert.alert('Hata', 'IBAN paylaşılırken bir hata oluştu.');
    }
  };

  // Düzenleme form gönderimi
  const handleEditSubmit = (updatedData) => {
    const success = onEdit(updatedData);
    if (success) {
      setShowEditForm(false);
    }
    return success;
  };

  // Kategori rengi
  const getCategoryColor = (category) => {
    const colors = {
      'Kişisel': '#2196F3',
      'İş': '#FF9800',
      'Aile': '#4CAF50',
      'Tasarruf': '#9C27B0',
      'Yatırım': '#F44336',
      'Diğer': '#607D8B',
    };
    return colors[category] || colors['Diğer'];
  };

  if (showEditForm) {
    return (
      <IBANForm
        initialData={iban}
        onSubmit={handleEditSubmit}
        onCancel={() => setShowEditForm(false)}
      />
    );
  }

  return (
    <Card style={styles.card} elevation={2}>
      <Card.Content>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.titleContainer}>
              <Text variant="titleMedium" style={styles.name}>
                {iban.name}
              </Text>
              <Chip
                style={[styles.categoryChip, { backgroundColor: getCategoryColor(iban.category) + '20' }]}
                textStyle={{ color: getCategoryColor(iban.category), fontSize: 12 }}
              >
                {iban.category}
              </Chip>
            </View>
            {bankName && bankName !== 'Bilinmeyen Banka' && (
              <Text variant="bodySmall" style={styles.bankName}>
                {bankName}
              </Text>
            )}
          </View>

          <Menu
            visible={showMenu}
            onDismiss={() => setShowMenu(false)}
            anchor={
              <IconButton
                icon="dots-vertical"
                size={20}
                onPress={() => setShowMenu(true)}
              />
            }
          >
            <Menu.Item
              leadingIcon="pencil"
              onPress={() => {
                setShowMenu(false);
                setShowEditForm(true);
              }}
              title="Düzenle"
            />
            <Menu.Item
              leadingIcon="share-variant"
              onPress={() => {
                setShowMenu(false);
                shareIBAN();
              }}
              title="Paylaş"
            />
            <Divider />
            <Menu.Item
              leadingIcon="delete"
              onPress={() => {
                setShowMenu(false);
                onDelete();
              }}
              title="Sil"
              titleStyle={{ color: theme.colors.error }}
            />
          </Menu>
        </View>

        {/* IBAN Numarası */}
        <Surface style={styles.ibanContainer}>
          <View style={styles.ibanHeader}>
            <MaterialIcons 
              name="account-balance" 
              size={16} 
              color={theme.colors.primary} 
            />
            <Text variant="labelSmall" style={styles.ibanLabel}>
              IBAN
            </Text>
          </View>
          <Text variant="bodyLarge" style={styles.ibanText}>
            {formattedIBAN}
          </Text>
          <Button
            mode="text"
            icon="content-copy"
            onPress={copyToClipboard}
            style={styles.copyButton}
            labelStyle={styles.copyButtonText}
          >
            Kopyala
          </Button>
        </Surface>

        {/* IBAN Bilgileri */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <MaterialIcons name="flag" size={16} color="#666" />
            <Text variant="bodySmall" style={styles.infoText}>
              {ibanInfo.countryName} ({ibanInfo.countryCode})
            </Text>
          </View>
          {ibanInfo.bankCode && (
            <View style={styles.infoItem}>
              <MaterialIcons name="business" size={16} color="#666" />
              <Text variant="bodySmall" style={styles.infoText}>
                Banka Kodu: {ibanInfo.bankCode}
              </Text>
            </View>
          )}
        </View>

        {/* Açıklama */}
        {iban.description && (
          <Text variant="bodySmall" style={styles.description}>
            {iban.description}
          </Text>
        )}

        {/* Tarih Bilgisi */}
        <Text variant="labelSmall" style={styles.dateText}>
          {iban.updatedAt !== iban.createdAt ? 'Güncellendi: ' : 'Eklendi: '}
          {new Date(iban.updatedAt || iban.createdAt).toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  categoryChip: {
    marginLeft: 8,
    height: 24,
  },
  bankName: {
    color: '#666',
    fontStyle: 'italic',
  },
  ibanContainer: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    marginBottom: 12,
  },
  ibanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ibanLabel: {
    marginLeft: 4,
    color: '#666',
    fontWeight: 'bold',
  },
  ibanText: {
    fontFamily: 'monospace',
    color: '#333',
    marginBottom: 8,
    letterSpacing: 1,
  },
  copyButton: {
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  copyButtonText: {
    fontSize: 12,
  },
  infoContainer: {
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    marginLeft: 6,
    color: '#666',
  },
  description: {
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 12,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#E0E0E0',
  },
  dateText: {
    color: '#999',
    textAlign: 'right',
    fontSize: 11,
  },
});

export default IBANCard;
