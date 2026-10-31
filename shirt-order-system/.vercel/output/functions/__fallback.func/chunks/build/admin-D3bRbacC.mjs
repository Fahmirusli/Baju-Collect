import { e as useRoute, _ as __nuxt_component_1 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-DXdMyeHc.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, useSSRContext, ref, watch, Transition, openBlock, createBlock, toDisplayString, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { u as useColorMode } from './composables-DQfq7xRN.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-8jYXDYbZ.mjs';
import { _ as _sfc_main$2 } from './DarkModeToggle-DkqEFprZ.mjs';
import '../_/nitro.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdminSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const colorMode = useColorMode();
    const mobileOpen = ref(false);
    const collapsed = ref(false);
    const navItems = [
      { label: "Dashboard", icon: "lucide:layout-dashboard", to: "/admin" },
      { label: "Orders", icon: "lucide:shopping-bag", to: "/admin/orders" },
      { label: "Settings", icon: "lucide:settings", to: "/admin/settings" }
    ];
    function isActive(to) {
      if (to === "/admin") {
        return route.path === "/admin" || route.path === "/admin/";
      }
      return route.path.startsWith(to);
    }
    watch(
      () => route.path,
      () => {
        mobileOpen.value = false;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<!--[-->`);
      if (unref(mobileOpen)) {
        _push(`<div class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" data-v-661164a0></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-lg transition-colors hover:bg-gray-50 dark:bg-[#1A1B23] dark:hover:bg-[#24252F] lg:hidden" aria-label="Toggle navigation menu" data-v-661164a0>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: unref(mobileOpen) ? "lucide:x" : "lucide:menu",
        class: "h-5 w-5 text-gray-700 dark:text-gray-300"
      }, null, _parent));
      _push(`</button><aside class="${ssrRenderClass([
        "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-gray-200/80 bg-white transition-all duration-300 dark:border-gray-800/50 dark:bg-[#13141B]",
        unref(mobileOpen) ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        unref(collapsed) ? "w-20" : "w-64"
      ])}" data-v-661164a0><div class="flex h-16 flex-shrink-0 items-center gap-3 border-b border-gray-200/80 px-4 dark:border-gray-800/50" data-v-661164a0><div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-md" data-v-661164a0>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:shirt",
        class: "h-5 w-5 text-white"
      }, null, _parent));
      _push(`</div>`);
      if (!unref(collapsed)) {
        _push(`<div class="overflow-hidden" data-v-661164a0><h1 class="font-heading text-lg font-bold text-gray-900 dark:text-white" data-v-661164a0> ShirtOrder </h1><p class="text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500" data-v-661164a0> Admin Panel </p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><nav class="flex-1 space-y-1 overflow-y-auto p-3" data-v-661164a0><!--[-->`);
      ssrRenderList(navItems, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.to,
          to: item.to,
          class: [
            "group flex items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm font-medium transition-all duration-200",
            isActive(item.to) ? "bg-gradient-to-r from-indigo-500/10 to-indigo-500/5 text-indigo-600 dark:from-indigo-500/20 dark:to-indigo-500/10 dark:text-indigo-400" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200"
          ],
          onClick: ($event) => mobileOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass([
                "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors",
                isActive(item.to) ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/30" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700 dark:bg-white/5 dark:text-gray-400 dark:group-hover:bg-white/10 dark:group-hover:text-gray-300"
              ])}" data-v-661164a0${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: item.icon,
                class: "h-[18px] w-[18px]"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              if (!unref(collapsed)) {
                _push2(`<span data-v-661164a0${_scopeId}>${ssrInterpolate(item.label)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (isActive(item.to)) {
                _push2(`<div class="absolute right-0 h-8 w-1 rounded-l-full bg-indigo-500" data-v-661164a0${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("div", {
                  class: [
                    "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors",
                    isActive(item.to) ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/30" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700 dark:bg-white/5 dark:text-gray-400 dark:group-hover:bg-white/10 dark:group-hover:text-gray-300"
                  ]
                }, [
                  createVNode(_component_Icon, {
                    name: item.icon,
                    class: "h-[18px] w-[18px]"
                  }, null, 8, ["name"])
                ], 2),
                createVNode(Transition, { name: "fade-slide" }, {
                  default: withCtx(() => [
                    !unref(collapsed) ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(item.label), 1)) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1024),
                isActive(item.to) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "absolute right-0 h-8 w-1 rounded-l-full bg-indigo-500"
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="flex-shrink-0 border-t border-gray-200/80 p-3 dark:border-gray-800/50" data-v-661164a0><button class="${ssrRenderClass([
        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200"
      ])}" data-v-661164a0><div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400" data-v-661164a0>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: unref(colorMode).value === "dark" ? "lucide:sun" : "lucide:moon",
        class: "h-[18px] w-[18px]"
      }, null, _parent));
      _push(`</div>`);
      if (!unref(collapsed)) {
        _push(`<span data-v-661164a0>${ssrInterpolate(unref(colorMode).value === "dark" ? "Light Mode" : "Dark Mode")}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><button class="mt-1 hidden w-full items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200 lg:flex" data-v-661164a0><div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400" data-v-661164a0>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: unref(collapsed) ? "lucide:chevrons-right" : "lucide:chevrons-left",
        class: "h-[18px] w-[18px]"
      }, null, _parent));
      _push(`</div>`);
      if (!unref(collapsed)) {
        _push(`<span data-v-661164a0>Collapse</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><div class="mt-2 border-t border-gray-200/80 pt-3 dark:border-gray-800/50" data-v-661164a0><div class="flex items-center gap-3 rounded-xl px-3 py-2" data-v-661164a0><div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white" data-v-661164a0> A </div>`);
      if (!unref(collapsed)) {
        _push(`<div class="min-w-0 flex-1" data-v-661164a0><p class="truncate font-body text-sm font-medium text-gray-900 dark:text-white" data-v-661164a0> Admin </p><p class="truncate text-xs text-gray-500 dark:text-gray-400" data-v-661164a0> Administrator </p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10" data-v-661164a0><div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400" data-v-661164a0>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:log-out",
        class: "h-[18px] w-[18px]"
      }, null, _parent));
      _push(`</div>`);
      if (!unref(collapsed)) {
        _push(`<span data-v-661164a0>Logout</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></div></aside><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminSidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-661164a0"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const pageTitle = computed(() => {
      if (route.path === "/admin") return "Dashboard";
      if (route.path.startsWith("/admin/orders")) return "Orders Management";
      if (route.path.startsWith("/admin/settings")) return "Event & Store Settings";
      return "Admin";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminSidebar = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1;
      const _component_DarkModeToggle = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-[#0F1115] text-gray-800 dark:text-gray-100 flex transition-colors duration-300" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_AdminSidebar, null, null, _parent));
      _push(`<div class="flex-1 flex flex-col min-w-0 lg:pl-64"><header class="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-800/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 transition-colors"><div class="flex items-center gap-2 pl-12 lg:pl-0"><span class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Admin</span><span class="text-gray-300 dark:text-gray-700">/</span><h2 class="font-heading font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">${ssrInterpolate(unref(pageTitle))}</h2></div><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        target: "_blank",
        class: "text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100/70 dark:bg-gray-800/70"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:external-link",
              class: "w-3.5 h-3.5"
            }, null, _parent2, _scopeId));
            _push2(`<span class="hidden sm:inline"${_scopeId}>View Public Store</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:external-link",
                class: "w-3.5 h-3.5"
              }),
              createVNode("span", { class: "hidden sm:inline" }, "View Public Store")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_DarkModeToggle, null, null, _parent));
      _push(`</div></header><main class="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-D3bRbacC.mjs.map
