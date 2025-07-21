// IBAN Validation Utility Functions

/**
 * IBAN doğrulama fonksiyonu
 * @param {string} iban - Doğrulanacak IBAN numarası
 * @returns {boolean} - IBAN geçerliyse true, değilse false
 */
export const validateIBAN = (iban) => {
  // Boşlukları ve özel karakterleri temizle
  const cleanIban = iban.replace(/\s/g, '').toUpperCase();
  
  // IBAN uzunluk kontrolü (Türkiye için 26 karakter)
  if (cleanIban.length < 15 || cleanIban.length > 34) {
    return false;
  }
  
  // İlk iki karakter ülke kodu olmalı
  const countryCode = cleanIban.substring(0, 2);
  if (!/^[A-Z]{2}$/.test(countryCode)) {
    return false;
  }
  
  // Check digit kontrolü
  const checkDigits = cleanIban.substring(2, 4);
  if (!/^\d{2}$/.test(checkDigits)) {
    return false;
  }
  
  // MOD-97 algoritması ile doğrulama
  const rearranged = cleanIban.substring(4) + cleanIban.substring(0, 4);
  const numericString = rearranged.replace(/[A-Z]/g, (char) => {
    return (char.charCodeAt(0) - 55).toString();
  });
  
  // Büyük sayılar için mod 97 hesaplama
  let remainder = '';
  for (let i = 0; i < numericString.length; i++) {
    remainder += numericString[i];
    if (remainder.length >= 9) {
      remainder = (parseInt(remainder) % 97).toString();
    }
  }
  remainder = parseInt(remainder) % 97;
  
  return remainder === 1;
};

/**
 * IBAN formatı düzenleme (4'lü gruplar halinde)
 * @param {string} iban - Formatlanacak IBAN
 * @returns {string} - Formatlanmış IBAN
 */
export const formatIBAN = (iban) => {
  const cleanIban = iban.replace(/\s/g, '').toUpperCase();
  return cleanIban.replace(/(.{4})/g, '$1 ').trim();
};

/**
 * IBAN ülke koduna göre banka bilgisi çıkarma
 * @param {string} iban - IBAN numarası
 * @returns {object} - Ülke kodu ve banka bilgileri
 */
export const getIBANInfo = (iban) => {
  const cleanIban = iban.replace(/\s/g, '').toUpperCase();
  const countryCode = cleanIban.substring(0, 2);
  
  const countryInfo = {
    'TR': { name: 'Türkiye', bankCodeLength: 5 },
    'DE': { name: 'Almanya', bankCodeLength: 8 },
    'FR': { name: 'Fransa', bankCodeLength: 5 },
    'GB': { name: 'İngiltere', bankCodeLength: 4 },
    'IT': { name: 'İtalya', bankCodeLength: 5 },
    'ES': { name: 'İspanya', bankCodeLength: 4 },
    'NL': { name: 'Hollanda', bankCodeLength: 4 },
    'BE': { name: 'Belçika', bankCodeLength: 3 },
    'AT': { name: 'Avusturya', bankCodeLength: 5 },
    'CH': { name: 'İsviçre', bankCodeLength: 5 }
  };
  
  const country = countryInfo[countryCode] || { name: 'Bilinmeyen', bankCodeLength: 0 };
  const bankCode = country.bankCodeLength > 0 ? cleanIban.substring(4, 4 + country.bankCodeLength) : '';
  
  return {
    countryCode,
    countryName: country.name,
    bankCode,
    isValid: validateIBAN(iban)
  };
};

/**
 * Türk bankalarının IBAN kodları
 */
export const TURKISH_BANKS = {
  '00001': 'T.C. Merkez Bankası',
  '00012': 'Türkiye Halk Bankası A.Ş.',
  '00015': 'T. Vakıflar Bankası T.A.O.',
  '00017': 'T. Emlak Bankası A.Ş.',
  '00032': 'Türkiye İş Bankası A.Ş.',
  '00046': 'Akbank T.A.Ş.',
  '00059': 'Şekerbank T.A.Ş.',
  '00062': 'T. Garanti Bankası A.Ş.',
  '00064': 'T. İş Bankası A.Ş. (İş Bankası)',
  '00067': 'Yapı ve Kredi Bankası A.Ş.',
  '00111': 'Finansbank A.Ş.',
  '00123': 'Türkiye Ekonomi Bankası A.Ş.',
  '00124': 'Turkish Bank A.Ş.',
  '00125': 'Bank Mellat',
  '00134': 'Denizbank A.Ş.',
  '00135': 'Türk Eximbank',
  '00143': 'HSBC Bank A.Ş.',
  '00146': 'Odea Bank A.Ş.',
  '00147': 'Citibank A.Ş.',
  '00148': 'JPMorgan Chase Bank N.A.',
  '00149': 'ING Bank A.Ş.',
  '00203': 'QNB Finansbank A.Ş.'
};

/**
 * Türk IBAN'ından banka adını getir
 * @param {string} iban - TR IBAN numarası
 * @returns {string} - Banka adı
 */
export const getTurkishBankName = (iban) => {
  const cleanIban = iban.replace(/\s/g, '').toUpperCase();
  if (!cleanIban.startsWith('TR')) {
    return 'Sadece TR IBAN\'ları için desteklenir';
  }
  
  const bankCode = cleanIban.substring(4, 9);
  return TURKISH_BANKS[bankCode] || 'Bilinmeyen Banka';
};
