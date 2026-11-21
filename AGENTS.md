# Panduan agent

Repo ini mengembangkan skill lintas aplikasi `animation-video`. Sumber utama ada di [SKILL.md](skills/animation-video/SKILL.md). Jaga agar file itu ringkas dan simpan detail Remotion serta ekspor di [referensi](skills/animation-video/references/remotion.md).

Jika pengguna menulis `/animation-video`, `@animation-video`, atau `$animation-video` sebagai teks dan pesan sampai ke agent, perlakukan itu sebagai permintaan membaca SKILL.md dan mengikuti tahap yang diminta. Jika pengguna menyebut file SKILL.md lewat pemilih `@`, baca file yang dirujuk dan gunakan instruksinya.

- Pertahankan satu sumber skill untuk Codex, Antigravity, dan Claude Code. Metadata khusus host hanya untuk penemuan atau tampilan.
- Ubah komposisi di sumbernya. Pertahankan timing voiceover, format, serta preferensi overlay yang sudah ditetapkan pengguna.
- Gunakan input sintetis untuk pengujian. Jangan commit file media pengguna, hasil render, dependensi, token, atau kit pihak ketiga.
- Jalankan `node --test` sebelum mengajukan perubahan. Uji jalur ekspor CPU dan NVENC bila mengubah encoder dan perangkat mendukungnya.
- Perbarui README saat cara instalasi, pemanggilan, atau kebutuhan runtime berubah.

Lihat [panduan kontribusi](CONTRIBUTING.md) untuk peta proyek dan cara verifikasi.
