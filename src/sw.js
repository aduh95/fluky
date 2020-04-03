import { promises as fs } from "fs";
import { join, relative, extname } from "path";
import Terser from "terser";

const CACHE_VERSION = "v1";

const onInstall = event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      return cache.addAll(/* Array of files here */);
    })
  );
};

const onFetch = event => {
  const networkResponse = fetch(event.request).then(response => {
    return response.ok
      ? caches.open(CACHE_VERSION).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        })
      : new Response(
          "<h1>Not Found</h1>" +
            "<p>This request failed. Maybe a typo or a dead link?</p>" +
            '<p><img src="./favicon.svg" alt="Fluky"></p>' +
            '<p><a href="./index.html">Back to the game</a></p>',
          {
            headers: { "Content-Type": "text/html" },
            status: 404,
            statusText: "Not Found",
          }
        );
  });
  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || networkResponse)
      .catch(console.error)
  );
};

async function* getPublicFiles(dir) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const path = join(dir, file);
    const stats = await fs.stat(path);
    if (stats.isDirectory()) {
      yield* getPublicFiles(path);
    } else if (
      ![".mp3", ".ogg", ".map", ".webmanifest"].includes(extname(path))
    ) {
      yield path;
    }
  }
}

let outputName;
export default function plugin({ public_folder, enabled }) {
  return {
    name: "service-worker",
    resolveId(source) {
      if (source.startsWith("service-worker:")) {
        return source; // this signals that rollup should not ask other plugins or check the file system to find this id
      }
      return null; // other ids should be handled as usually
    },
    load(id) {
      if (id.startsWith("service-worker:")) {
        outputName = id.substring(id.indexOf(":") + 1);

        return enabled
          ? `if ("serviceWorker" in navigator) {
            navigator.serviceWorker
              .register("${outputName}", { scope: "./" })
              .then(() =>
                console.info('Service worker installed successfully.')
              )
              .catch(error =>
                console.warn('Service worker installation failed.', error)
              );
          }
          `
          : "console.info('Service worker installation disabled by configuration.')";
      }
      return null;
    },
    async writeBundle() {
      if (!enabled) return;
      const files = [];
      for await (const path of getPublicFiles(public_folder)) {
        files.push(relative(public_folder, path));
      }

      const { error, code } = Terser.minify(
        `
        "use strict";
        const CACHE_VERSION = "${CACHE_VERSION}";
        self.addEventListener("install", ${onInstall
          .toString()
          .replace("/* Array of files here */", JSON.stringify(files))});
        self.addEventListener("fetch", ${onFetch.toString()});
        `,
        { toplevel: true }
      );
      return error
        ? Promise.reject(error)
        : fs.writeFile(join(public_folder, outputName), code);
    },
  };
}
