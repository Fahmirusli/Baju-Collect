import { X as executeAsync } from '../_/nitro.mjs';
import { d as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
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
import 'vue';
import 'vue-router';
import '@iconify/vue';
import 'vue/server-renderer';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const admin = defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  if (to.path === "/admin/login") {
    return;
  }
  try {
    const { user } = ([__temp, __restore] = executeAsync(() => $fetch("/api/admin/me")), __temp = await __temp, __restore(), __temp);
    if (!user || user.role !== "admin") {
      return navigateTo("/admin/login");
    }
  } catch (err) {
    return navigateTo("/admin/login");
  }
});

export { admin as default };
//# sourceMappingURL=admin-CgWI3uLl.mjs.map
