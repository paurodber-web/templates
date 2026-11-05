import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { build } from 'vite';
import preact from '@preact/preset-vite';

const root = process.cwd();
const dist = path.join(root, 'dist');
let html = await readFile(path.join(dist, 'index.html'), 'utf8');
const stylesheet = html.match(/<link\s+rel="stylesheet"\s+href="([^"]+)"\s*\/?\s*>/);
if (!stylesheet) throw new Error('No se encontró la hoja de estilos generada.');
const assetName = url => path.basename(new URL(url, 'https://local.invalid').pathname);
let css = await readFile(path.join(dist, '_astro', assetName(stylesheet[1])), 'utf8');
for (const match of [...css.matchAll(/url\((['"]?)([^)'"?#]+\.(woff2?|ttf|otf))\1\)/g)]) {
  const file = path.join(dist, '_astro', assetName(match[2]));
  const data = await readFile(file);
  const type = match[3] === 'woff2' ? 'font/woff2' : match[3] === 'woff' ? 'font/woff' : `font/${match[3]}`;
  css = css.replace(match[0], `url(data:${type};base64,${data.toString('base64')})`);
}
const bundle = await build({
  configFile: false,
  logLevel: 'warn',
  plugins: [preact()],
  build: {
    write: false,
    lib: { entry: path.join(root, 'scripts/standalone-entry.js'), name: 'ElQuartDesig', formats: ['iife'] },
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
const output = Array.isArray(bundle) ? bundle[0] : bundle;
const js = output.output.find(item => item.type === 'chunk')?.code;
if (!js) throw new Error('No se generó el JavaScript de la página.');
html = html.replace(stylesheet[0], `<style>${css}</style>`);
html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
if (!/<astro-island\b/.test(html)) throw new Error('No se encontró el contenido de la página.');
html = html.replace(/<astro-island\b[^>]*>/, '<div id="app">').replace('</astro-island>', '</div>');
html = html.replace('</body>', `<script>${js.replace(/<\/script/gi, '<\\/script')}</script></body>`);
await writeFile(path.join(root, 'index.html'), html);
console.log('HTML autónomo creado en index.html.');
