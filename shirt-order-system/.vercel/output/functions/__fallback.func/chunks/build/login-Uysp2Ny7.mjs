import { _ as _sfc_main$1 } from './DarkModeToggle-DkqEFprZ.mjs';
import { u as useHead, a as useToast, _ as __nuxt_component_1 } from './server.mjs';
import { _ as _sfc_main$2 } from './BaseInput-B0Jc4KbN.mjs';
import { _ as _sfc_main$3 } from './BaseButton-BmqYBgHv.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DXdMyeHc.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderDynamicModel, ssrRenderAttr } from 'vue/server-renderer';
import './composables-DQfq7xRN.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Admin Login"
    });
    useToast();
    const username = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const loading = ref(false);
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DarkModeToggle = _sfc_main$1;
      const _component_Icon = __nuxt_component_1;
      const _component_BaseInput = _sfc_main$2;
      const _component_BaseButton = _sfc_main$3;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center p-4 bg-[#FAF8F5] dark:bg-[#0F1115] relative overflow-hidden transition-colors" }, _attrs))}><div class="gradient-blob w-96 h-96 bg-primary-500/20 top-10 -left-10" aria-hidden="true"></div><div class="gradient-blob w-96 h-96 bg-violet/20 bottom-10 -right-10" aria-hidden="true"></div><div class="absolute top-6 right-6 z-20">`);
      _push(ssrRenderComponent(_component_DarkModeToggle, null, null, _parent));
      _push(`</div><div class="relative z-10 w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl p-8 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft-xl space-y-6 animate-scale-in"><div class="text-center space-y-2"><div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary-600 to-violet flex items-center justify-center text-white mx-auto shadow-md shadow-primary-500/30">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:shield-check",
        class: "w-7 h-7"
      }, null, _parent));
      _push(`</div><h1 class="font-heading font-extrabold text-2xl text-gray-900 dark:text-white"> Admin Portal </h1><p class="text-xs text-gray-500 dark:text-gray-400"> Sign in to manage group shirt orders and settings </p></div>`);
      if (errorMessage.value) {
        _push(`<div class="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 flex items-center gap-2.5 text-xs text-red-700 dark:text-red-300 animate-shake">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:alert-circle",
          class: "w-4 h-4 shrink-0 text-red-500"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(errorMessage.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="space-y-4">`);
      _push(ssrRenderComponent(_component_BaseInput, {
        modelValue: username.value,
        "onUpdate:modelValue": ($event) => username.value = $event,
        label: "Username",
        placeholder: "admin",
        required: ""
      }, null, _parent));
      _push(`<div class="space-y-1"><label class="block text-xs font-semibold text-gray-700 dark:text-gray-300"> Password </label><div class="relative"><input${ssrRenderDynamicModel(showPassword.value ? "text" : "password", password.value, null)}${ssrRenderAttr("type", showPassword.value ? "text" : "password")} placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" class="w-full px-3.5 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition pr-10" required><button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: showPassword.value ? "lucide:eye-off" : "lucide:eye",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button></div></div>`);
      _push(ssrRenderComponent(_component_BaseButton, {
        variant: "primary",
        size: "lg",
        block: "",
        loading: loading.value,
        type: "submit",
        class: "shadow-glow-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:log-in",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Sign In</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:log-in",
                class: "w-4 h-4 mr-2"
              }),
              createVNode("span", null, "Sign In")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form><div class="text-center pt-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-left",
              class: "w-3.5 h-3.5"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Return to public order page</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:arrow-left",
                class: "w-3.5 h-3.5"
              }),
              createVNode("span", null, "Return to public order page")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-Uysp2Ny7.mjs.map
