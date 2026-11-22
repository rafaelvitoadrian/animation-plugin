import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync, readFileSync, readdirSync, writeFileSync, unlinkSync, rmdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {test} from 'node:test';

const installer = fileURLToPath(new URL('../install.mjs', import.meta.url));
const source = fileURLToPath(new URL('../skills/animation-video/', import.meta.url));

function compareDirectories(original, installed) {
  const entries = readdirSync(original, {withFileTypes: true});
  assert.deepEqual(readdirSync(installed).sort(), entries.map(entry => entry.name).sort());
  for (const entry of entries) {
    const from = join(original, entry.name);
    const to = join(installed, entry.name);
    if (entry.isDirectory()) compareDirectories(from, to);
    else assert.deepEqual(readFileSync(to), readFileSync(from), entry.name);
  }
}

function removeTestDirectory(directory) {
  for (const entry of readdirSync(directory, {withFileTypes: true})) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) removeTestDirectory(path);
    else unlinkSync(path);
  }
  rmdirSync(directory);
}

for (const [agent, folder] of [['codex', '.agents'], ['antigravity', '.agents'], ['claude', '.claude']]) {
  test(`installs the full skill for ${agent} and preserves an existing copy`, () => {
    const project = mkdtempSync(join(tmpdir(), 'animation skill '));
    const scope = join(project, folder);
    const skills = join(scope, 'skills');
    const skill = join(skills, 'animation-video');
    const install = () => spawnSync(process.execPath, [installer, agent, project], {encoding: 'utf8'});
    const first = install();
    assert.equal(first.status, 0, first.stderr);
    try {
      compareDirectories(source, skill);
      const bundle = join(skill, 'vendor', 'rva-stickman');
      const manifest = JSON.parse(readFileSync(join(bundle, '.claude-plugin', 'plugin.json'), 'utf8'));
      assert.equal(manifest.name, 'growkaz-stickman');
      assert.equal(manifest.version, '1.1.0');
      assert.ok(readFileSync(join(bundle, 'RVA_Stickman.plugin')).length > 0);
      const entry = join(skill, 'SKILL.md');
      writeFileSync(entry, 'local edits');
      assert.equal(install().status, 1);
      assert.equal(readFileSync(entry, 'utf8'), 'local edits');
    } finally {
      removeTestDirectory(skill);
      for (const directory of [skills, scope, project]) rmdirSync(directory);
    }
  });
}
