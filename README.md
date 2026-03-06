# Turkish CRM MVP (Next.js + Supabase)

Bu proje, müşteri yönetimi ve görev takibi yapabileceğiniz, Türkçe arayüze sahip hızlı bir CRM MVP prototipidir.

## 🚀 Teknolojiler

- **Frontend**: [Next.js](https://nextjs.org/) (Pages Router)
- **Backend/Database**: [Supabase](https://supabase.com/)
- **Dil**: JavaScript + Vanilla CSS

## 📂 Proje Yapısı

- `pages/index.js`: Ana Dashboard. Müşteri listesini gösterir.
- `pages/customers/new.js`: Yeni müşteri ekleme formu.
- `pages/tasks/new.js`: Müşterilere özel görev atama formu.
- `lib/supabaseClient.js`: Supabase bağlantı ayarları.
- `styles/globals.css`: Uygulamanın genel tasarımı.
- `schema.sql`: Veritabanı tablolarını oluşturmak için gerekli SQL kodları.

## ⚙️ Kurulum ve Çalıştırma

### 1. Veritabanı Hazırlığı
Supabase Dashboard'unuzda **SQL Editor** kısmına gidin ve projedeki `schema.sql` dosyasının içeriğini oraya yapıştırıp çalıştırın. Bu işlem `customers` ve `tasks` tablolarını oluşturacaktır.

### 2. Ortam Değişkenleri
`.env.local` dosyasında Supabase URL ve Anon Key bilgilerinizin doğru olduğundan emin olun.

### 3. Yerel Çalıştırma
Proje dizininde aşağıdaki komutları çalıştırın:

```bash
npm install
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışmaya başlayacaktır.

## 🛠️ Sorun Giderme

- **Hata: Could not find column...**: SQL Editor'de şemayı güncellediğinizden emin olun ve gerekirse `Reload Schema Cache` yapın.
- **Hata: Row-level security policy**: MVP aşamasında RLS'i devre dışı bırakmak için `ALTER TABLE ... DISABLE ROW LEVEL SECURITY;` komutunu kullanabilirsiniz.

## 📄 Lisans
Bu proje geliştirme ve test amaçlıdır.
