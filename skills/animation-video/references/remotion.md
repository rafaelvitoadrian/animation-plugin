# Remotion, Three.js, dan GrowKaz

## Membuat atau melanjutkan proyek

Periksa `package.json` dan komposisi yang ada. Untuk proyek baru, jalankan generator proyek resmi Remotion, lalu samakan versi semua paket `@remotion/*` dengan versi paket `remotion`. Pasang `three`, `@react-three/fiber`, dan `@remotion/three` bila memerlukan adegan 3D. Cocokkan versi Fiber dengan versi React. Kunci dependensi melalui lockfile.

Masukkan audio ke `public/` dan gunakan `staticFile()`. Daftarkan komposisi dengan FPS dan durasi `ceil(durasiAudio × fps)`. Gunakan `useCurrentFrame()`, `useVideoConfig()` dan `Sequence` untuk timing. Untuk Canvas 2D, gambar frame di `useLayoutEffect`. Untuk Three.js gunakan `ThreeCanvas`, turunkan pose dari frame, dan uji satu frame WebGL sebelum render penuh.

Jika memakai GrowKaz Stickman, gunakan salinan kit yang pengguna sudah miliki atau instal dari sumber yang ia izinkan. Impor hanya modul yang diperlukan, misalnya `engine/rig2d.js` untuk pose dan rim light serta `engine/fx2d.js` untuk atmosfer. Buat set dan aksi baru sesuai naskah. Jangan anggap instalasi kit di satu mesin berlaku di mesin lain. Repo skill ini tidak menyertakan kit GrowKaz.

## Pratinjau dan ekspor

```sh
npx remotion studio src/index.tsx
npx remotion still src/index.tsx MyVideo out/preview.png --frame=90
npx remotion render src/index.tsx MyVideo out/video.mp4
```

Sesuaikan entrypoint dan ID dengan proyek. Periksa beberapa frame pada setiap jenis adegan. Perhatikan pose yang menembus furnitur, gerakan pena dan tangan yang tidak selaras, teks terpotong, dan peralihan yang tidak cocok dengan voiceover.

Jika ekspor Remotion gagal karena FFmpeg/FFprobe bawaannya, render rangkaian JPEG dengan Remotion dan gabungkan audio menggunakan FFmpeg lokal. Dari direktori dengan Remotion terpasang:

```sh
npx remotion render src/index.tsx MyVideo render-frames --sequence --muted --image-format=jpeg --jpeg-quality=94
node /path/to/animation-video/scripts/encode.mjs --frames render-frames --audio public/voiceover-id.mp3 --out out/video.mp4 --fps 30 --encoder nvenc
```

Pakai folder frame baru untuk tiap render. Jika menggunakan pola nama frame kustom, gunakan `--pattern`. Untuk GPU NVIDIA, encoder harus berhasil mengodekan video; dukungan WebGL saat render frame merupakan pemeriksaan terpisah. Jika GPU tidak diminta dan tidak ada encoder NVIDIA, gunakan `--encoder cpu`. Untuk mempertahankan mix yang sudah disetujui, berikan file audio campuran sebagai `--audio`.

Jalankan `ffprobe -v error -show_streams -show_format out/video.mp4` untuk memeriksa durasi, codec, audio dan subtitle. Baca cuplikan hasil ekspor untuk memastikan overlay yang diminta hilang. Skrip encoder juga mendekode seluruh MP4 sebelum menyimpan hasilnya.

[Dokumentasi Remotion](https://www.remotion.dev/docs/) · [Integrasi Three.js](https://www.remotion.dev/docs/three)
