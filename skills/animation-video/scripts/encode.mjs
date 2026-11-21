import {spawnSync} from 'node:child_process';
import {existsSync, mkdirSync, mkdtempSync, readdirSync, renameSync, rmdirSync, unlinkSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {parseArgs} from 'node:util';

function run(ffmpeg, args) {
  const result = spawnSync(ffmpeg, args, {stdio: 'inherit'});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error('FFmpeg gagal (' + (result.signal ?? result.status) + ').');
}

try {
  const {values} = parseArgs({options: {
    frames: {type: 'string'}, audio: {type: 'string'}, out: {type: 'string'},
    fps: {type: 'string', default: '30'}, encoder: {type: 'string', default: 'cpu'},
    pattern: {type: 'string', default: 'element-%04d.jpeg'},
    ffmpeg: {type: 'string', default: 'ffmpeg'},
  }});
  const {frames, audio, out, fps, encoder, pattern, ffmpeg} = values;
  if (!frames || !audio || !out || !out.toLowerCase().endsWith('.mp4') ||
      !['cpu', 'nvenc'].includes(encoder) || !(Number(fps) > 0 && Number(fps) <= 240)) {
    throw new Error('Cara pakai: node encode.mjs --frames DIR --audio FILE --out FILE.mp4 [--fps 30] [--encoder cpu|nvenc]');
  }
  const token = /^([a-zA-Z0-9_-]*)%(?:0([1-9]))?d\.(jpe?g|png)$/.exec(pattern);
  if (!token) throw new Error('Pola frame harus seperti element-%04d.jpeg.');
  const [, prefix, width, extension] = token;
  const padding = Number(width ?? 0);
  const frameNames = readdirSync(frames).filter(name =>
    new RegExp('^' + prefix + '\\d+\\.' + extension + '$').test(name));
  const names = new Set(frameNames);
  if (!names.size || Array.from({length: names.size}, (_, index) =>
    prefix + String(index).padStart(padding, '0') + '.' + extension).some(name => !names.has(name))) {
    throw new Error('Frame harus lengkap dan bernomor urut mulai dari nol.');
  }
  const output = resolve(out);
  if (existsSync(output)) throw new Error('File tujuan sudah ada. Pilih nama baru.');
  mkdirSync(dirname(output), {recursive: true});
  const temp = mkdtempSync(join(dirname(output), '.encode-'));
  const file = join(temp, 'video.mp4');
  try {
    const codec = encoder === 'nvenc'
      ? ['-c:v', 'h264_nvenc', '-preset', 'p6', '-rc', 'vbr', '-cq', '19', '-b:v', '0']
      : ['-c:v', 'libx264', '-preset', 'medium', '-crf', '19'];
    run(ffmpeg, ['-hide_banner', '-nostdin', '-framerate', fps, '-start_number', '0',
      '-i', join(resolve(frames), pattern), '-i', resolve(audio),
      '-map', '0:v:0', '-map', '1:a:0', ...codec, '-pix_fmt', 'yuv420p',
      '-c:a', 'aac', '-b:a', '192k', '-t', String(names.size / Number(fps)),
      '-movflags', '+faststart', file]);
    run(ffmpeg, ['-v', 'error', '-xerror', '-i', file, '-f', 'null', '-']);
    if (existsSync(output)) throw new Error('File tujuan sudah ada. Pilih nama baru.');
    renameSync(file, output);
    console.log(output);
  } finally {
    if (existsSync(file)) unlinkSync(file);
    rmdirSync(temp);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
