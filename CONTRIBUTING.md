# Mengembangkan Animation Plugin

- `skills/animation-video/SKILL.md` menentukan kapan skill dipakai dan alur kerja utama.
- `skills/animation-video/references/` memuat prosedur teknis yang dibaca saat diperlukan.
- `skills/animation-video/scripts/` memuat alat yang ikut disalin saat instalasi.
- `skills/animation-video/agents/openai.yaml` mengatur nama tampilan di Codex.
- `install.mjs` menyalin satu paket ke lokasi yang dibaca aplikasi tujuan.

Gunakan Node.js 22 atau lebih baru. Jalankan `node --test` untuk memeriksa lokasi pemasangan, kelengkapan salinan, dan penolakan bila skill sudah ada. Untuk menguji perubahan pada encoder, gunakan rangkaian frame kecil dan audio sintetis. Jalankan ekspor dengan `--encoder cpu` dan, jika tersedia, `--encoder nvenc`. Periksa hasil dengan FFprobe.

Uji pemanggilan manual dengan membuka proyek uji di aplikasi yang menjadi target perubahan. Pastikan agent membaca skill yang tepat dan meminta hanya bahan yang belum tersedia. Catat aplikasi dan versi yang diuji dalam pull request.
