# IBAN Yöneticisi - React Native Expo Uygulaması

Bu uygulama, iOS cihazlarda Expo Go kullanarak IBAN kayıt ve takip işlemlerini kolaylaştırmak için geliştirilmiş kullanıcı dostu bir mobil uygulamadır.

## 🌟 Özellikler

### 📱 Temel Fonksiyonlar
- **IBAN Kayıt**: Yeni IBAN numaralarını kolayca ekleyin
- **IBAN Doğrulama**: Gerçek zamanlı IBAN doğrulaması (MOD-97 algoritması)
- **IBAN Yönetimi**: Kayıtlı IBAN'ları düzenleyin, silin veya güncelleyin
- **Arama ve Filtreleme**: İsim, IBAN numarası veya açıklamaya göre arama yapın
- **Kategori Sistemi**: IBAN'ları kategorilere ayırın (Kişisel, İş, Aile, vb.)

### 🎨 Kullanıcı Arayüzü
- **Material Design**: React Native Paper ile modern ve tutarlı tasarım
- **iOS Uyumlu**: iOS tasarım rehberlerine uygun arayüz
- **Responsive**: Farklı ekran boyutlarına uyumlu tasarım
- **Animasyonlar**: Smooth geçişler ve kullanıcı etkileşimleri
- **Dark/Light Tema**: Otomatik tema desteği

### 🔧 Teknik Özellikler
- **Offline Çalışma**: Veriler yerel olarak AsyncStorage'da saklanır
- **Gerçek Zamanlı Doğrulama**: IBAN girişi sırasında anlık doğrulama
- **Kopyala/Paylaş**: IBAN numaralarını kolayca kopyalayın veya paylaşın
- **Banka Bilgileri**: Türk IBAN'ları için banka ismi görüntüleme
- **Ülke Bilgileri**: IBAN'dan ülke ve banka kodu çıkarma

## 🚀 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn
- iOS cihaz veya simülatör
- Expo Go uygulaması (iOS App Store'dan indirin)

### Adımlar

1. **Depoyu klonlayın:**
```bash
git clone <repository-url>
cd iban-replit
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Uygulamayı başlatın:**
```bash
npm start
```

4. **QR kodu okutun:**
   - Terminal'de görünen QR kodu iOS cihazınızla Expo Go uygulaması üzerinden okutun
   - Veya `npm run ios` komutu ile iOS simülatöründe çalıştırın

## 📁 Proje Yapısı

```
iban-replit/
├── components/
│   ├── IBANApp.js          # Ana uygulama bileşeni
│   ├── IBANForm.js         # IBAN ekleme/düzenleme formu
│   └── IBANCard.js         # IBAN görüntüleme kartı
├── utils/
│   └── ibanUtils.js        # IBAN doğrulama ve yardımcı fonksiyonlar
├── assets/                 # Görsel dosyalar
├── App.js                  # Ana uygulama dosyası
└── package.json
```

## 🔧 Kullanılan Teknolojiler

- **React Native**: Mobil uygulama geliştirme framework'ü
- **Expo**: React Native geliştirme platformu
- **React Native Paper**: Material Design UI bileşenleri
- **Expo Vector Icons**: İkon seti
- **AsyncStorage**: Yerel veri depolama
- **Expo Linear Gradient**: Gradient efektleri
- **Expo Clipboard**: Panoya kopyalama işlemleri

## 📱 Ekran Görüntüleri

### Ana Ekran
- IBAN listesi görüntüleme
- Arama ve filtreleme
- Kategori filtreleri

### IBAN Ekleme/Düzenleme
- Gerçek zamanlı IBAN doğrulama
- Kategori seçimi
- Banka bilgisi görüntüleme

### IBAN Detayları
- Formatlanmış IBAN görüntüleme
- Kopyala/Paylaş seçenekleri
- Düzenleme ve silme işlemleri

## 🧪 IBAN Doğrulama

Uygulama aşağıdaki IBAN doğrulama özelliklerini destekler:

- **Format Kontrolü**: IBAN formatı doğrulama
- **Uzunluk Kontrolü**: Ülkeye göre IBAN uzunluk kontrolü
- **MOD-97 Algoritması**: Uluslararası standart doğrulama
- **Ülke Kodu Kontrolü**: Geçerli ülke kodları kontrolü
- **Check Digit Kontrolü**: Kontrol rakamları doğrulama

### Desteklenen Ülkeler
- 🇹🇷 Türkiye (TR)
- 🇩🇪 Almanya (DE)
- 🇫🇷 Fransa (FR)
- 🇬🇧 İngiltere (GB)
- 🇮🇹 İtalya (IT)
- 🇪🇸 İspanya (ES)
- 🇳🇱 Hollanda (NL)
- 🇧🇪 Belçika (BE)
- 🇦🇹 Avusturya (AT)
- 🇨🇭 İsviçre (CH)
- Ve daha fazlası...

## 🔒 Güvenlik

- **Yerel Depolama**: Veriler sadece cihazda saklanır
- **Encryption**: AsyncStorage otomatik şifreleme
- **Validation**: Tüm girdiler doğrulanır
- **Error Handling**: Güvenli hata yönetimi

## 📞 Destek

Herhangi bir sorun yaşarsanız veya önerileriniz varsa:

1. Issues bölümünde yeni bir konu açın
2. Detaylı açıklama ve ekran görüntüleri ekleyin
3. Cihaz bilgilerinizi belirtin

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

---

💡 **İpucu**: Expo Go uygulamasını iOS cihazınıza indirmeyi unutmayın!



![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/uudemy/iban-mobile?utm_source=oss&utm_medium=github&utm_campaign=uudemy%2Fiban-mobile&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)
