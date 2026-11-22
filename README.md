# Animation Plugin

`animation-video` adalah Agent Skill untuk membuat video bergerak dari storyboard dan voiceover. Skill ini mencakup timing narasi, pembuatan adegan, Remotion dan Three.js, kit bawaan RVA Stickman, ekspor MP4 lokal, serta penulisan caption unggahan.

## Instalasi

Siapkan Git dan Node.js 22 atau lebih baru. FFmpeg dan FFprobe diperlukan untuk ekspor lokal dan pemeriksaan video. NVIDIA NVENC memerlukan GPU dan driver yang mendukungnya.

```sh
git clone https://github.com/rafaelvitoadrian/animation-plugin.git
cd animation-plugin
```

Jalankan **satu** perintah berikut sesuai aplikasi. Jika Codex dan Antigravity membuka proyek yang sama, cukup instal sekali karena keduanya memakai `.agents/skills`.

```sh
node install.mjs codex "/path/to/video-project"
node install.mjs antigravity "/path/to/video-project"
node install.mjs claude "/path/to/video-project"
```

Di Windows, ganti path dengan folder seperti `D:\Video\Proyek Saya`. Buka kembali workspace di agent. Alternatif manualnya adalah menyalin seluruh folder `skills/animation-video` ke `.agents/skills/` untuk Codex dan Antigravity, atau `.claude/skills/` untuk Claude Code. Ini instalasi skill tingkat proyek. Untuk render dengan GPU lokal, jalankan agent di mesin yang memiliki GPU serta akses terminal. Claude di browser tidak menjalankan tool di GPU komputer Anda.

[Panduan Codex](https://learn.chatgpt.com/docs/build-skills) · [Panduan Antigravity](https://antigravity.google/docs/skills) · [Panduan Claude Code](https://code.claude.com/docs/en/skills)

Installer selalu menyalin arsip `RVA_Stickman.plugin` dan kit siap diimpor ke `animation-video/vendor/rva-stickman/`. Keduanya ikut saat menyalin folder skill secara manual. Skill mengakses kit langsung dari folder tersebut, tanpa perlu mendaftarkan plugin secara global. Jika versi sebelumnya sudah terpasang, jalankan `git pull` di repo ini, pindahkan folder skill lama ke luar direktori `skills` sebagai cadangan, lalu jalankan kembali perintah instalasi.

## Cara pakai

Simpan storyboard dan voiceover di folder proyek, lalu pilih cara panggil sesuai aplikasi:

- **Codex:** ketik `/skills` dan pilih **Animation Video**, atau gunakan `$animation-video`. Untuk memakai `@` di composer, pilih file `.agents/skills/animation-video/SKILL.md` lalu tulis tugasnya.
- **Antigravity:** ketik `/animation-video`. Untuk memakai `@`, pilih file `.agents/skills/animation-video/SKILL.md` sebagai referensi dan minta agent menggunakannya. Jika skill baru belum muncul, buka percakapan baru.
- **Claude Code:** ketik `/animation-video` atau sebut nama skill di prompt.

Cara yang berlaku di semua aplikasi adalah menulis “Pakai skill animation-video” diikuti tugasnya. Saat bekerja langsung di repo ini, [AGENTS.md](AGENTS.md) juga menjelaskan cara menangani alias yang diterima sebagai teks.

> Pakai skill animation-video. Buat animasi bergerak dari storyboard dan voiceover dalam folder ini. Gunakan Remotion untuk timeline dan Three.js untuk adegan 3D. Ekspor vertikal 1080 × 1920, 30 fps dengan NVIDIA NVENC. Jangan tampilkan subtitle, label, atau baris progres. Tulis juga caption Reels, Shorts, dan TikTok.

Untuk gaya stickman, tambahkan “Gunakan RVA Stickman bawaan” pada prompt. Nama berkas lampiran adalah `RVA_Stickman.plugin`. Manifest di dalamnya tetap memakai nama `growkaz-stickman` versi 1.1.0 dan mencantumkan kredit GrowKaz. Proyek Remotion dan aset media disiapkan per proyek.

Jika sudah memiliki hasil render frame Remotion, gunakan [panduan ekspor](skills/animation-video/references/remotion.md) dan skrip `encode.mjs`. Pakai `--ffmpeg "C:\path\to\ffmpeg.exe"` bila FFmpeg tidak ada di PATH.

## Pengembangan

Gunakan [AGENTS.md](AGENTS.md) untuk arahan kerja agent dan [CONTRIBUTING.md](CONTRIBUTING.md) untuk struktur repo serta pengujian. Jalankan `node --test` sebelum mengirim perubahan.
