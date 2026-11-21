import {cpSync, existsSync, mkdirSync, realpathSync} from 'node:fs';
import {join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const [agent, directory, ...extra] = process.argv.slice(2);
const paths = {codex: '.agents', antigravity: '.agents', claude: '.claude'};
if (!Object.hasOwn(paths, agent ?? '') || !directory || extra.length) {
  console.error('Cara pakai: node install.mjs <codex|antigravity|claude> <folder-proyek>');
  process.exit(1);
}

const project = realpathSync(resolve(directory));
const source = fileURLToPath(new URL('./skills/animation-video', import.meta.url));
const parent = join(project, paths[agent], 'skills');
const destination = join(parent, 'animation-video');
if (existsSync(destination)) {
  console.error('Skill sudah ada. Pindahkan salinan lama jika ingin menggantinya:', destination);
  process.exit(1);
}
mkdirSync(parent, {recursive: true});
cpSync(source, destination, {recursive: true, force: false, errorOnExist: true});
console.log('Skill terpasang di', destination);
