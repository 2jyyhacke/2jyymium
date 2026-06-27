# 2jyymium Browser 🚀

2jyymium, temelinde Chromium motoru kullanan, ancak **Thorium** esintili ekstrem donanım optimizasyonları ve sıkı **De-googling** (Google servislerinden arındırma) politikası uygulanan yeni nesil, ultra-hızlı bir web tarayıcısıdır. Karanlık (dark) cyberpunk teması ve modern animasyonlarıyla hem performans hem de estetik arayan kullanıcılar için tasarlanmıştır.

---

## ⚡ Öne Çıkan Özellikler

### 🚀 Maksimum Performans (Thorium Tabanlı)
- **V-Sync Bypass:** GPU V-Sync kapatılarak FPS kilitleri kaldırılır.
- **GPU Rasterization & Zero-Copy:** Sayfa render işlemleri CPU'dan alınarak tamamen GPU'ya yüklenir, RAM ile VRAM arasındaki gecikme sıfıra indirilir.
- **V8 TurboFan (AVX2):** JavaScript motoru en agresif ayarlarda çalıştırılarak React/Vue gibi SPA sitelerinde maksimum hız elde edilir.
- **Deneysel WebAssembly:** Tarayıcı içi oyunlar ve ağır render gerektiren işlemler için deneysel WASM aktif.
- **1GB Disk Önbelleği & Paralel İndirme:** Sayfaların anında yüklenmesi için genişletilmiş disk önbelleği ve büyük dosyaların parçalara bölünerek indirilmesi.

### 🛡️ Gizlilik ve De-googling (Sıfır Telemetri)
- **Hardcoded User-Agent:** Tarayıcı kimliğiniz sürekli `2jyymium/1.0.0` olarak gönderilir, fingerprinting takibini zorlaştırır.
- **Katı Telemetri Engelleme:** Arka planda Google sunucularına giden (Analytics, Safe Browsing, Translate, Crash Reports) tüm veri akışı motor seviyesinde kesilir.
- **Native WebRequest Adblocker:** Reklam, izleyici ve analiz siteleri C++ ağ katmanında direkt engellenir.
- **WebRTC IP Koruması:** Local IP adreslerinin WebRTC üzerinden sızması önlenir (VPN kullanıcıları için kritik).
- **DNT & Sec-GPC:** Sitelerin sizi izlemesini engelleyen gizlilik başlıkları her istekte zorunlu kılınır.

### 🎨 Modern & Animasyonlu UI
- **Cyberpunk Dark Mode:** `#0d0f14` zeminli neon detaylara sahip, göz yormayan arayüz.
- **Gelişmiş Flags Paneli (`chrome://flags`):** Tarayıcının çekirdek optimizasyonlarını, GPU, Performans ve Gizlilik ayarlarını canlı filtrelemeyle kolayca açıp kapatabileceğiniz özel panel.
- **Eklenti Yöneticisi (`chrome://extensions`):** Yüklü Chromium uzantılarını listeleyebileceğiniz modern eklenti merkezi.
- **Sürükle-Bırak Sekmeler:** Akıcı animasyonlarla sekmeleri sürükleyip sıralayabilirsiniz.

---

## 📥 Kurulum

GitHub **Releases** sayfasından işletim sisteminize uygun `.exe` sürümünü indirebilirsiniz:
- **Setup Versiyonu:** Bilgisayarınıza standart kurulum yapar, başlat menüsüne ve masaüstüne kısayol ekler.
- **Portable Versiyon:** Kurulum gerektirmez, dosyayı çift tıklayarak direkt çalıştırabilirsiniz.

*(Not: Tarayıcı profil ve önbellek verileriniz `C:\ProgramData\2jyymium\browser_data` dizininde kalıcı olarak saklanır.)*

---

## 🛠️ Kaynak Koddan Derleme (Geliştiriciler İçin)

Projeyi kendi bilgisayarınızda derlemek isterseniz:

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/KULLANICI_ADINIZ/2jyymium.git
   cd 2jyymium
   ```

2. Gerekli bağımlılıkları (Electron & Electron Builder) kurun:
   ```bash
   npm install
   ```

3. Geliştirici modunda test edin:
   ```bash
   npm start
   ```

4. Windows için dağıtılabilir `.exe` dosyası oluşturun:
   ```bash
   npm run build
   ```
   *(Derleme bittiğinde `dist` klasörü içerisinde kurulum dosyalarınız hazır olacaktır.)*

---

## 📄 Lisans
Bu proje, açık kaynaklı geliştirme standartlarına uygun olarak tasarlanmıştır. Çekirdek Chromium ve Electron lisansları geçerlidir.

*“Geleceğin web deneyimi, karanlıkta daha hızlı.”*
