import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const base = process.env.PAGES_BASE;
if (!base || !/^\/[a-zA-Z0-9_.-]+$/.test(base)) throw new Error('Invalid PAGES_BASE');

async function update(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await update(path);
    else if (['.html', '.css', '.js'].includes(extname(entry.name))) {
      const content = await readFile(path, 'utf8');
      const rewritten = content.replace(/(["'`(])\/(?!\/)(?=[a-zA-Z_#?'"`])/g, `$1${base}/`);
      if (rewritten !== content) await writeFile(path, rewritten);
    }
  }
}
await update('dist');
