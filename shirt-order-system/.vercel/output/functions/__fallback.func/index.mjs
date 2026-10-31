import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { p as parseQuery, g as getRouteRulesForPath, w as withQuery, t as toNodeListener, u as useNitroApp } from './chunks/_/nitro.mjs';
import 'bcryptjs';
import '@neondatabase/serverless';
import 'drizzle-orm/neon-http';
import 'exceljs';
import 'drizzle-orm';
import 'drizzle-orm/pg-core';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'consola';
import 'node:fs';
import 'node:path';

const ISR_URL_PARAM = "__isr_route";

const nitroApp = useNitroApp();
const handler = toNodeListener(nitroApp.h3App);
const listener = function(req, res) {
  const queryIndex = req.url.indexOf("?");
  const { [ISR_URL_PARAM]: queryURL, ...params } = queryIndex === -1 ? {} : parseQuery(req.url.slice(queryIndex));
  const xNowRouteMatches = req.headers["x-now-route-matches"];
  const headerURL = xNowRouteMatches ? parseQuery(xNowRouteMatches)[ISR_URL_PARAM] : void 0;
  const url = headerURL && typeof headerURL === "string" ? headerURL : queryURL;
  if (url && typeof url === "string") {
    const routeRules = getRouteRulesForPath(url);
    if (routeRules.isr) {
      req.url = Object.keys(params).length > 0 ? withQuery(url, params) : url;
    }
  }
  return handler(req, res);
};

export { listener as default };
//# sourceMappingURL=index.mjs.map
