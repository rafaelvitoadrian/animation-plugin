---
name: animation-video
description: Ubah storyboard, naskah, atau voiceover menjadi animasi bergerak dengan Remotion, Three.js, atau GrowKaz Stickman yang dipasang pengguna. Gunakan untuk merancang adegan, menyelaraskan audio, merender MP4 lokal, merevisi overlay, atau membuat caption untuk Reels, Shorts, dan TikTok.
---

# Produksi video animasi

Pertahankan proyek dan aset asli. Cari storyboard, voiceover, referensi gambar, transkrip, dan komposisi yang ada sebelum membuat proyek baru. Jika pengguna hanya meminta instalasi, pasang dan verifikasi dependensi yang diminta tanpa mulai merender.

1. Tentukan topik dan versi yang dimaksud. Jika ada beberapa proyek, utamakan topik terakhir yang disebut eksplisit. Bedakan subtitle di dalam video, judul/label adegan, indikator progres, dan caption unggahan.
2. Ukur durasi voiceover dengan FFprobe. Pakai cue yang sudah tersedia; jika perlu transkripsi, gunakan model lokal seperti faster-whisper dengan bahasa yang sesuai. Tinjau waktu kata penting dan cocokkan cue dengan naskah. Pertahankan urutan kata, durasi, dan kecepatan suara asli kecuali pengguna meminta perubahan.
3. Buat daftar adegan berdasarkan frase narasi. Untuk setiap adegan catat mulai/akhir, aksi konkret, objek yang bergerak, komposisi, dan peralihan. Gerakkan karakter dan objek secara independen. Gunakan gambar storyboard sebagai arahan visual dan bangun adegan penuh agar hasilnya mengalir seperti video.
4. Pakai Remotion untuk timeline dan komposisi. Gunakan Three.js bila diperlukan geometri 3D dan GrowKaz bila pengguna memilih gaya stickman serta sudah menyediakan kit. Hitung setiap pose dan kamera dari frame. Lihat [alur Remotion](references/remotion.md) untuk pengaturan proyek, pengujian, dan render.
5. Terapkan revisi visual pada sumber komposisi. Untuk video tanpa tulisan, hapus teks yang digambar dari HTML/canvas dan track subtitle tambahan, termasuk judul, label bagian, indikator progres, serta CTA bergaya tombol jika mengandung tulisan. Buat pesan terbaca lewat aksi dan ikon yang jelas.
6. Cek pratinjau di awal, tengah, akhir, dan di tiap jenis aksi sebelum ekspor penuh. Verifikasi MP4 dengan membuka beberapa frame, membandingkan frame untuk aksi penting, mendekode seluruh file tanpa error, dan mengukur resolusi, FPS, durasi serta audio. Salin stream audio video sebelumnya hanya bila memang berasal dari sumber yang sama dan timing cocok.
7. Jika diminta caption unggahan, siapkan versi Reels, judul dan deskripsi YouTube Shorts, serta TikTok. Tulis hook yang sesuai isi, pertanyaan yang mengundang jawaban konkret, dan beberapa tag relevan. Hindari klaim baru dan jaminan viral. Simpan caption terpisah dari video.

Untuk video sosial vertikal, gunakan 1080 × 1920 pada 30 fps bila tidak ada format lain. Simpan MP4 baru dengan nama yang membedakannya dari versi terdahulu, dan laporkan encoder GPU hanya setelah terbukti di log.
