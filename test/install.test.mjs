import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync, readFileSync, writeFileSync, unlinkSync, rmdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {test} from 'node:test';

const installer = fileURLToPath(new URL('../install.mjs', import.meta.url));
const files = ['SKILL.md', 'agents/openai.yaml', 'references/remotion.md', 'scripts/encode.mjs'];

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
      for (const file of files) {
        const source = new URL(`../skills/animation-video/${file}`, import.meta.url);
        assert.deepEqual(readFileSync(join(skill, file)), readFileSync(source));
      }
      const entry = join(skill, 'SKILL.md');
      writeFileSync(entry, 'local edits');
      assert.equal(install().status, 1);
      assert.equal(readFileSync(entry, 'utf8'), 'local edits');
    } finally {
      for (const file of files) unlinkSync(join(skill, file));
      for (const subfolder of ['agents', 'references', 'scripts']) rmdirSync(join(skill, subfolder));
      for (const directory of [skill, skills, scope, project]) rmdirSync(directory);
    }
  });
}
