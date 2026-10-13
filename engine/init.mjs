#!/usr/bin/env node
// 新建一个自包含的项目目录：复制模板 + 运行时文件，项目可以整体搬走。
//   node engine/init.mjs <目录> [video|slides]
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const [dir, kind = 'video'] = process.argv.slice(2);
if (!dir || !['video', 'slides'].includes(kind)) {
  console.error('用法: node engine/init.mjs <目录> [video|slides]');
  process.exit(1);
}
const out = resolve(dir);
mkdirSync(join(out, 'engine'), { recursive: true });
mkdirSync(join(out, 'out'), { recursive: true });
for (const f of ['runtime.js', 'deck.js', 'base.css', 'themes.css']) cpSync(join(here, f), join(out, 'engine', f));
const target = join(out, 'index.html');
if (existsSync(target)) console.log('index.html 已存在，未覆盖');
else cpSync(join(here, '..', 'templates', kind, 'index.html'), target);
if (!existsSync(join(out, 'STORYBOARD.md'))) cpSync(join(here, '..', 'templates', 'STORYBOARD.md'), join(out, 'STORYBOARD.md'));
console.log(`已创建 ${out}
  预览：浏览器打开 ${join(out, 'index.html')}
  拼图：node ${join(here, 'render.mjs')} ${target} --sheet ${join(out, 'out/sheet.jpg')}
  出片：node ${join(here, 'render.mjs')} ${target} --out ${join(out, 'out/video.mp4')} --audio ${join(out, 'out/audio.wav')}`);
