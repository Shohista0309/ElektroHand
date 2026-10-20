# ElectroHand — 3D Elektr Zanjirlari Simulyatori

**ElectroHand** — foydalanuvchining veb-kamerasi orqali real vaqtdagi qo‘l harakatlari (jestlari) yordamida 3D elektr kabellarini boshqarish, portlarga ulash va zanjirni sinash imkonini beruvchi interaktiv web simulyator.

Hech qanday ro‘yxatdan o‘tish, profil yaratish yoki tashqi serverlar talab etilmaydi. Dastur to‘liq foydalanuvchi brauzerida lokal ishlaydi va foydalanuvchi maxfiyligini 100% kafolatlaydi.

---

## ⚡ Asosiy Imkoniyatlar va Funksiyalar

1. **Bosh Sahifa (Landing Page):**
   - Zamonaviy elektrotexnika va kiberxavfsizlik uslubidagi qorong‘i ko‘k (`#070d19`) va neon-ko‘k (cyan) ranglar palitrasi.
   - O‘zbek tilidagi sarlavha: *"Elektr zanjirlarini qo‘l harakatingiz bilan boshqaring."*
   - O‘zbek tilidagi quyi sarlavha: *"Kamerangiz orqali 3D kabellarni ushlang, harakatlantiring va kerakli portlarga ulang."*
   - To‘g‘ridan-to‘g‘ri simulyatorni ochuvchi yaqqol **“Boshlash”** tugmasi.
   - Harakatlar qanday ishlashini tushuntiruvchi 3 bosqichli vizual qo‘llanma (Chimchilang ➔ Harakatlantiring ➔ Ulang).
   - Veb-kamera maxfiyligi bo‘yicha to‘liq kafolat bo‘limi.

2. **Real Vaqtli Veb-Kamera Qo‘l Kuzatuvi (Hand Tracking):**
   - Google **MediaPipe Tasks Vision Hand Landmarker** modeli orqali 21 ta 3D nuqtani uzluksiz kuzatish.
   - Lokal yuklangan Wasm va Model fayllari (`/models/hand_landmarker.task`, `/mediapipe/wasm/`) orqali tashqi internet tezligiga bog‘liq bo‘lmagan tezkor ishlash.
   - Jonli videoni aks ettiruvchi mini-kamera oynasi (Webcam Overlay) va qo‘l skeletini chizib beruvchi neon grafikali kanvas.
   - Holat indikatorlari: **“Qo‘l aniqlandi”** (yashil) va **“Qo‘l topilmadi”** (sariq).
   - Kameraga ruxsat berilmaganda yoki xatolik yuz berganda muloyim o‘zbekcha tushuntirish va qayta urinish tugmasi.
   - Kamerani to‘xtatish va qayta yoqish tugmalari (kamerani to‘xtatganda `stream.getTracks().forEach(t => t.stop())` orqali to‘liq xotiradan tozalash).

3. **Aniq Jest Boshqaruvi (Gesture Controls):**
   - **Kabelni ushlash (Pick up):** Ko‘rsatkich va bosh barmoq uchlari orasidagi masofani hisoblash orqali chimchilash (Pinch) harakatini aniqlash. Gisterezis (boshlanish: `< 0.058`, qo‘yib yuborish: `> 0.088`) orqali harakatning o‘z-o‘zidan o‘chib-yonishining oldi olingan.
   - **Uzoqdagi kabellarni tasodifiy ushlab olishdan himoya:** Faqatgina qo‘l kabel ulagichi (connector) boshiga yaqin bo‘lganda ushlanadi.
   - **Kabelni siljitish (Move):** Ekranning 2D koordinatalarini Three.js 3D elektron plata yuzasiga proyeksiyalash (`Raycaster` va `Plane`). Eksponensial harakat yumshatgichi (EMA filter) qo‘l titrashini (jitter) bartaraf qiladi.
   - **Mos keluvchi portlarni ko‘rsatish:** Kabel terminalga yaqinlashganda, mos terminal yashil rangda, mos bo‘lmagan terminal qizil rangda ogohlantiruvchi pulsatsiyalanuvchi halqa bilan yoritiladi.
   - **Kabelni ulash yoki rad etish (Release & Snap):**
     - Agar kabel to‘g‘ri terminalga yaqin joyda qo‘yib yuborilsa: kabel ulagichi port ichiga avtomatik qistiriladi (**Snap**), musiqiy tovush yangraydi, uchqunlar sochiladi va **“Ulandi!”** xabari chiqadi.
     - Agar noto‘g‘ri port ustida qo‘yib yuborilsa: ulanish rad etiladi, kabel prujina animatsiyasi bilan orqaga qaytadi, ogohlantiruvchi signal chalinadi va **“Noto‘g‘ri port”** xabari beriladi.
     - Bo‘sh joyda qo‘yib yuborilsa: **“Kabel ulanmagan”** xabari beriladi va kabel boshlang‘ich holatiga qaytadi.

4. **Haqiqiy 3D Simulyatsiya (Three.js Circuit Board):**
   - 3D Bosma plata (PCB) — qorong‘i tekstura, mis va cyan izlar, oltin vintlar, mikrokontroller (ELECTROHAND AT32 chipi), SMD rezistorlar, kondensatorlar.
   - 3 ta har xil rangdagi moslashuvchan 3D kabellar:
     - 🔴 **Qizil kabel:** +5V DC Quvvat liniyasi
     - ⚫ **Qora kabel:** GND (Yer / Zamin) liniyasi
     - 🔵 **Moviy kabel:** LED SIGNAL boshqaruv liniyasi
   - Kabellar harakati davomida Three.js `CatmullRomCurve3` va `TubeGeometry` orqali dinamik qayta egilib turadi (fizik osilib turish egri chizig‘i bilan).
   - Yopiq kontur hosil bo‘lganda (barcha 3 ta kabel to‘g‘ri ulanganda):
     - Markaziy 3D LED yashil rangda yorqin yonadi va butun platani yoritadi.
     - Platadagi izlar va raqamli displey faollashadi: `⚡ 5.00V [ZANJIR ISHGA TUSHDI]`.
     - Bayramona konfetti (`canvas-confetti`) otiladi va g‘alaba modali ko‘rinadi.

5. **Interfeys va Qo‘shimcha Qulayliklar:**
   - O‘zbek tilidagi real vaqtli bildirishnomalar (Toast tizimi).
   - Zaxira **Sichqoncha rejimi** (veb-kamerasiz yoki yorug‘lik yetarli bo‘lmagan kompyuterlarda to‘liq sichqoncha bilan boshqarish imkoniyati).
   - Web Audio API orqali sintez qilingan tovush effektlari (kabelni ushlash, ulash, xato signali, zanjir ishga tushishi fanfarasi). Ovozni o‘chirish/yoqish tugmasi.
   - **“Qayta boshlash”** tugmasi — barcha kabellarni boshlang‘ich holatga qaytaradi.
   - Surdo AI platformasi to‘liq saqlangan bo‘lib, kerak bo‘lsa menyu orqali unga ham o‘tish mumkin.

---

## 🛠 Texnologiyalar Steki

- **Dastur asosi:** React 18, TypeScript, Vite 5.
- **3D Dvigatel:** Three.js (`^0.170.0`).
- **Kompyuter Ko‘rishi (Computer Vision):** Google MediaPipe Tasks Vision (`@mediapipe/tasks-vision^1.1.1`).
- **Uslublar (Styling):** Tailwind CSS 3 (Maxsus `electro` ranglar va neon effektlar).
- **Ikonkalar:** Lucide React.
- **Ovozli Effektlar:** Web Audio API (hech qanday tashqi audio fayl yuklanmaydi, to‘g‘ridan-to‘g‘ri brauzerda sintezlanadi).
- **Bayramona effektlar:** Canvas Confetti.

---

## 🚀 O‘rnatish va Ishga Tushirish

Loyihani kompyuteringizda ishga tushirish uchun quyidagi buyruqlarni bajaring:

### 1. Bog‘liqliklarni o‘rnatish:
```bash
npm install
```

### 2. Dasturni dasturlash (dev) rejimida ishga tushirish:
```bash
npm run dev
```
Dastur `http://localhost:5173/` manzilida ochiladi.

### 3. Loyihani ishlab chiqarish (production build) uchun yig‘ish va tekshirish:
```bash
npm run build
npm run preview
```
Dastur `http://localhost:4173/` manzilida ishga tushadi.

> **Eslatma:** Brauzer xavfsizlik qoidalariga ko‘ra, veb-kameraga ruxsat faqat `localhost` yoki `https://` protokoli orqali ishlaydi.

---

## 📋 Qo‘lda Sinovdan O‘tkazish Ro‘yxati (Manual Testing Checklist)

1. **Bosh Sahifa Yuklanishi:**
   - Sayt ochilganda qorong‘i elektrotexnika uslubidagi ElectroHand bosh sahifasi ko‘rinadi.
   - Sarlavha, qo‘llanma bo‘limi va maxfiylik kafolati o‘zbek tilida to‘g‘ri aks etadi.

2. **Simulyatorga O‘tish:**
   - Markazdagi **“Boshlash”** tugmasini bosing.
   - Dastur to‘g‘ridan-to‘g‘ri 3D simulyator ekraniga o‘tadi. Hech qanday login yoki profil so‘ralmaydi.

3. **Kamera Ruxsati va Hand Tracking:**
   - Brauzer kamera so‘rovini beradi. Ruxsat bergach, pastki o‘ng burchakdagi mini-oynada video va qo‘l skeleti (cyan rangda) paydo bo‘ladi.
   - Qo‘lni ko‘rsatganingizda yuqoridagi status **“Qo‘l aniqlandi”** holatiga o‘tadi.

4. **Chimchilash (Pinch) va Kabelni Ushlash:**
   - Ko‘rsatkich va bosh barmog‘ingizni qizil kabel konnektori ustiga olib kelib, barmoqlarni birlashtiring.
   - Chimchilash darajasi 100% ga yetadi, ushlash tovushi yangraydi va **“Ushlandi: Qizil kabel”** xabari chiqadi.

5. **3D Fazoda Siljitish:**
   - Qo‘lingizni o‘ngga va chapga harakatlantiring. 3D kabel silliq egilib, qo‘lingiz orqasidan ergashadi.

6. **Mos Terminalni Tanib Olish:**
   - Qizil kabelni o‘ng tomondagi **+5V VCC** portiga yaqinlashtiring. Terminal atrofi yorqin yashil halqa bilan yonib-o‘chadi.
   - Agar qizil kabelni **GND** portiga yaqinlashtirsangiz, u qizil rangda ogohlantiruvchi holatga o‘tadi.

7. **Ulash (Snap) va Xatolikni Rad Etish:**
   - Qizil kabelni +5V porti ustida qo‘yib yuboring (barmoqlarni oching). Kabel portga aniq kiritiladi, uchqunlar sochiladi, ijobiy signal chalinadi va vazifalar panelida 1-vazifa bajarilgan deb belgilanadi.
   - Qora kabelni noto‘g‘ri portga qo‘yib yuborib ko‘ring. Tizim ulanishni rad etadi, kabel boshlang‘ich joyiga qaytadi va **“Noto‘g‘ri port!”** xabari beriladi.

8. **To‘liq Zanjirni Yig‘ish:**
   - Qora kabelni **GND**, moviy kabelni **LED SIGNAL** portiga ulang.
   - Barcha 3 ta kabel ulanganda markaziy 3D LED yashil bo‘lib yonadi, zanjir faollashadi, g‘alaba kuyi chalinadi va bayramona konfetti otiladi!

9. **Qayta Boshlash (Reset):**
   - **“Qayta boshlash”** tugmasini bosing. Barcha kabellar orqaga qaytadi va zanjir o‘chadi.

10. **Kamerani To‘xtatish:**
    - Mini-kamera oynasidagi kamera belgisini bosing. Kamera to‘xtaydi va noutbukning kamera indikatori o‘chadi.

---

## ⚠️ Ma’lum Cheklovlar (Known Limitations)

- **Yorug‘lik talabi:** Qo‘l barmoqlarini aniq tanib olish uchun xonada yetarli yorug‘lik bo‘lishi tavsiya etiladi.
- **Kamera ko‘rinishi:** Boshqaruv bitta qo‘l to‘liq kamera kadrida bo‘lganda eng yaxshi ishlaydi.
- **Zaxira rejim:** Agar veb-kamera mavjud bo‘lmasa, tepadagi **“Sichqoncha rejimi”** tugmasi orqali sichqoncha bilan ham barcha kabellarni tortib ulash mumkin.
