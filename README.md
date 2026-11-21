# Animation Plugin

`animation-video` adalah Agent Skill untuk membuat video bergerak dari storyboard dan voiceover. Skill ini mencakup timing narasi, pembuatan adegan, Remotion dan Three.js, penggunaan opsional GrowKaz Stickman, ekspor MP4 lokal, serta penulisan caption unggahan.

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

## Cara pakai

Simpan storyboard dan voiceover di folder proyek, lalu panggil skill dengan `$animation-video` di Codex, `/animation-video` di Claude Code, atau sebut **skill animation-video** di prompt Antigravity.

> Pakai skill animation-video. Buat animasi bergerak dari storyboard dan voiceover dalam folder ini. Gunakan Remotion untuk timeline dan Three.js untuk adegan 3D. Ekspor vertikal 1080 × 1920, 30 fps dengan NVIDIA NVENC. Jangan tampilkan subtitle, label, atau baris progres. Tulis juga caption Reels, Shorts, dan TikTok.

Untuk gaya GrowKaz, tambahkan permintaan menggunakan GrowKaz Stickman dan sertakan lokasi kit milik Anda. Proyek Remotion, aset media, dan kit pihak ketiga dipasang terpisah. Repo ini tidak menyertakan rekaman, video pengguna, atau salinan plugin GrowKaz.

Jika sudah memiliki hasil render frame Remotion, gunakan [panduan ekspor](skills/animation-video/references/remotion.md) dan skrip `encode.mjs`. Pakai `--ffmpeg "C:\path\to\ffmpeg.exe"` bila FFmpeg tidak ada di PATH.
