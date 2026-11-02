import { defineConfig } from 'astro/config';
import { resolve } from 'node:path';

export default defineConfig({
  vite: {
    plugins: [{
      name: 'reload-landing-html',
      apply: 'serve',
      configureServer(server) {
        const landing = resolve('public/versio-nova.html');
        server.watcher.on('change', (file) => {
          if (resolve(file) !== landing) return;
          for (const module of server.moduleGraph.getModulesByFile(landing) ?? []) {
            server.moduleGraph.invalidateModule(module);
          }
          server.ws.send({ type: 'full-reload', path: '*' });
        });
      },
    }],
    server: {
      watch: { usePolling: true, interval: 300 },
    },
  },
});
