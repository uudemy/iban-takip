#!/bin/bash

echo "🚀 IBAN Yöneticisi - Replit'te Başlatılıyor..."
echo "📱 Bu uygulama Expo ile geliştirilmiştir"
echo ""

# Bağımlılıkları kontrol et
if [ ! -d "node_modules" ]; then
    echo "📦 Bağımlılıklar yükleniyor..."
    npm install
fi

echo "🌐 Web sunucusu başlatılıyor..."
echo "📱 Mobil önizleme için Expo Go uygulamasını kullanın"
echo ""

# Web sunucusunu başlat
npm run web
