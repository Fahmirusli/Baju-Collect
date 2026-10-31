import { _ as __nuxt_component_0 } from './nuxt-link-DXdMyeHc.mjs';
import { _ as __nuxt_component_1 } from './server.mjs';
import { _ as _sfc_main$1 } from './DarkModeToggle-DkqEFprZ.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import '../_/nitro.mjs';
import 'bcryptjs';
import '@neondatabase/serverless';
import 'drizzle-orm/neon-http';
import 'exceljs';
import 'drizzle-orm';
import 'drizzle-orm/pg-core';
import '@aws-sdk/client-s3';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'consola';
import 'node:fs';
import 'node:path';
import 'vue-router';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './composables-DQfq7xRN.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      const _component_DarkModeToggle = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#0F1115] text-gray-800 dark:text-gray-100 overflow-x-hidden transition-colors duration-300" }, _attrs))}><div class="gradient-blob w-[450px] h-[450px] bg-gradient-to-tr from-primary-500/20 to-violet/20 -top-40 -left-20" aria-hidden="true"></div><div class="gradient-blob w-[400px] h-[400px] bg-gradient-to-br from-accent-coral/15 to-amber-400/15 top-80 -right-20" aria-hidden="true"></div><header class="sticky top-0 z-40 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/60 shadow-sm transition-colors"><div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-2.5 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-violet flex items-center justify-center text-white shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform duration-200"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:shirt",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><span class="font-heading font-extrabold text-base sm:text-lg text-gray-900 dark:text-white tracking-tight"${_scopeId}> Group<span class="text-primary-600 dark:text-primary-400"${_scopeId}>Shirt</span></span></div>`);
          } else {
            return [
              createVNode("div", { class: "w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-violet flex items-center justify-center text-white shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform duration-200" }, [
                createVNode(_component_Icon, {
                  name: "lucide:shirt",
                  class: "w-5 h-5"
                })
              ]),
              createVNode("div", null, [
                createVNode("span", { class: "font-heading font-extrabold text-base sm:text-lg text-gray-900 dark:text-white tracking-tight" }, [
                  createTextVNode(" Group"),
                  createVNode("span", { class: "text-primary-600 dark:text-primary-400" }, "Shirt")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-3 sm:gap-5">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/track",
        class: "text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition flex items-center gap-1.5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:search",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Track Order</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:search",
                class: "w-4 h-4"
              }),
              createVNode("span", null, "Track Order")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition hidden sm:inline-flex items-center gap-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:shield",
              class: "w-3.5 h-3.5"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Admin</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:shield",
                class: "w-3.5 h-3.5"
              }),
              createVNode("span", null, "Admin")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="h-4 w-[1px] bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>`);
      _push(ssrRenderComponent(_component_DarkModeToggle, null, null, _parent));
      _push(`</div></div></header><main class="relative z-10 flex-1">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="relative z-10 border-t border-gray-200/60 dark:border-gray-800/80 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md py-6 transition-colors"><div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400"><p>\xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Group Shirt Order System. All rights reserved.</p><div class="flex items-center gap-4 font-medium">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/track",
        class: "hover:text-primary-600 dark:hover:text-primary-400 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Check Status `);
          } else {
            return [
              createTextVNode(" Check Status ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span>\u2022</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "hover:text-primary-600 dark:hover:text-primary-400 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Admin Portal `);
          } else {
            return [
              createTextVNode(" Admin Portal ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-21dmq2gl.mjs.map
