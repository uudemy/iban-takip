#!/bin/bash

echo "🚀 IBAN Yöneticisi - Kurulum Başlıyor..."
echo "📦 Node.js ve npm kontrol ediliyor..."

# Node.js versiyonunu kontrol et
if command -v node &> /dev/null; then
    echo "✅ Node.js $(node --version) bulundu"
else
    echo "❌ Node.js bulunamadı!"
    exit 1
fi

# npm versiyonunu kontrol et
if command -v npm &> /dev/null; then
    echo "✅ npm $(npm --version) bulundu"
else
    echo "❌ npm bulunamadı!"
    exit 1
fi

echo "📦 Bağımlılıklar yükleniyor..."
npm install

echo "🌐 Web sunucusu başlatılıyor..."
npm run web
