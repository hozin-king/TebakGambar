# 🎮 Tebak Gambar

Game kuis tebak kata dari gambar ala game Indonesia — 100% offline.

## Cara Main
1. Lihat gambar petunjuk di tiap level
2. Tap huruf dari bank huruf untuk mengisi slot jawaban (tap slot untuk mengembalikan huruf)
3. Tekan **CEK JAWABAN** — benar = +40 koin & bonus kombo
4. **60 tahap** dalam **6 level** (tiap level 10 tahap), Bahasa Indonesia, tingkat kesulitan menanjak
5. Level berikutnya terbuka otomatis setelah 5/10 tahap level sebelumnya selesai

### Fitur
- **📅 Tantangan Harian** — 1 level spesial tiap hari, hadiah 2x koin, streak harian dicatat
- **🔥 Kombo** — jawab benar beruntun tanpa salah untuk bonus koin bertingkat (x2→+10, x3→+20, x4→+30, x5+→+50)
- **🏅 Pencapaian** — 6 badge: 10 tahap, kombo 5x, 1 level penuh, streak harian 3 hari, 1000 koin, semua 60 tahap
- **📊 Statistik** — level selesai, kombo tertinggi, total koin terkumpul (tampil di home)

### Hint (pakai koin)
| Hint | Biaya | Efek |
|------|-------|------|
| 💡 Buka Huruf | 50 koin | Membuka 1 huruf jawaban yang benar |
| 🧹 Hapus Huruf | 30 koin | Menghapus 3 huruf pengecoh dari bank |
| ⏭ Lewati | 100 koin | Lewati level langsung |

Progress (koin, tahap selesai, level terbuka, kombo, pencapaian) tersimpan otomatis di perangkat.

## Struktur
```
tebak-gambar/
├── game/                  # Game HTML5/JS (source of truth)
│   ├── index.html
│   ├── style.css
│   ├── game.src.js        # source readable (jawaban plaintext)
│   ├── build.py           # enkripsi jawaban (XOR+base64 ala StringFog) -> game.build.js
│   ├── game.js            # hasil minify (yang dimuat index.html)
│   └── assets/            # 60 gambar level (AI-generated, gaya kartun flat)
├── android/               # Wrapper native Kotlin + WebView
│   └── app/src/main/...
├── .github/workflows/     # CI: build debug APK otomatis
└── README.md
```

## Build APK
- **Otomatis (disarankan):** push ke GitHub → tab *Actions* → download artifact `tebak-gambar-debug-apk`
- **Lokal via Android Studio:** salin dulu gamenya ke assets, lalu build:
  ```bash
  mkdir -p android/app/src/main/assets
  cp -r game android/app/src/main/assets/game
  ```
  lalu buka folder `android/` di Android Studio → Run.

APK full offline — tidak meminta permission internet sama sekali.

## Credit
- Gambar 60 level: AI-generated via pipeline Muse (gaya kartun flat konsisten)
- Ikon aplikasi: AI-generated
- SFX & musik latar: 100% original, disintesis via WebAudio (tanpa aset luar)
- Kode: HTML5 + Kotlin
