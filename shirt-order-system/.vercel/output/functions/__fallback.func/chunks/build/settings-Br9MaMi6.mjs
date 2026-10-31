import { _ as _sfc_main$1 } from './BaseButton-BmqYBgHv.mjs';
import { u as useHead, a as useToast, _ as __nuxt_component_1 } from './server.mjs';
import { _ as _sfc_main$2 } from './BaseInput-B0Jc4KbN.mjs';
import { _ as _sfc_main$3 } from './BaseTextarea-DXeX4GIo.mjs';
import { defineComponent, ref, withAsyncContext, watch, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useFetch } from './fetch-CrKJXOJw.mjs';
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
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "settings",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "Settings | Admin"
    });
    const toast = useToast();
    const saving = ref(false);
    const changingPassword = ref(false);
    const { data: initialSettings, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/settings",
      "$_rnRz4R3EK"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const form = ref({
      eventTitle: "",
      eventDescription: "",
      currency: "MYR",
      basePrice: 35,
      deadline: "",
      isOpen: true,
      sizeChartImage: null,
      sizes: [],
      sleeveTypes: []
    });
    watch(
      initialSettings,
      (s) => {
        if (s) {
          form.value = {
            eventTitle: s.eventTitle,
            eventDescription: s.eventDescription || "",
            currency: s.currency,
            basePrice: s.basePrice,
            deadline: s.deadline ? new Date(s.deadline).toISOString().slice(0, 16) : "",
            isOpen: s.isOpen,
            sizeChartImage: s.sizeChartImage,
            sizes: JSON.parse(JSON.stringify(s.sizes)),
            sleeveTypes: JSON.parse(JSON.stringify(s.sleeveTypes))
          };
        }
      },
      { immediate: true }
    );
    async function saveSettings() {
      var _a;
      saving.value = true;
      try {
        const payload = {
          ...form.value,
          deadline: form.value.deadline ? new Date(form.value.deadline).toISOString() : null,
          sizes: form.value.sizes.map((s, idx) => ({
            id: s.id || void 0,
            label: s.label.trim(),
            surcharge: Number(s.surcharge) || 0,
            sortOrder: idx,
            isActive: s.isActive
          })),
          sleeveTypes: form.value.sleeveTypes.map((st, idx) => ({
            id: st.id || void 0,
            label: st.label.trim(),
            surcharge: Number(st.surcharge) || 0,
            sortOrder: idx,
            isActive: st.isActive
          }))
        };
        const res = await $fetch("/api/admin/settings", {
          method: "PUT",
          body: payload
        });
        toast.success("Settings saved", "Configuration updated successfully.");
        if (res.warnings && res.warnings.length > 0) {
          res.warnings.forEach((w) => toast.warning("Note", w));
        }
        refresh();
      } catch (err) {
        toast.error("Failed to save settings", ((_a = err.data) == null ? void 0 : _a.message) || err.message);
      } finally {
        saving.value = false;
      }
    }
    const passwordForm = ref({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    const newGeneratedHash = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseButton = _sfc_main$1;
      const _component_Icon = __nuxt_component_1;
      const _component_BaseInput = _sfc_main$2;
      const _component_BaseTextarea = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8 max-w-5xl pb-16" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h1 class="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white"> Event &amp; System Settings </h1><p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1"> Configure event details, base pricing, deadlines, sizes, and sleeve types. </p></div>`);
      _push(ssrRenderComponent(_component_BaseButton, {
        variant: "primary",
        size: "md",
        loading: saving.value,
        class: "shadow-glow-primary",
        onClick: saveSettings
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:save",
              class: "w-4 h-4 mr-1.5"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Save All Settings</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:save",
                class: "w-4 h-4 mr-1.5"
              }),
              createVNode("span", null, "Save All Settings")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-4"><h3 class="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:calendar",
        class: "w-5 h-5 text-primary-500"
      }, null, _parent));
      _push(`<span>Event Details &amp; Status</span></h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(_component_BaseInput, {
        modelValue: form.value.eventTitle,
        "onUpdate:modelValue": ($event) => form.value.eventTitle = $event,
        label: "Event / Campaign Title",
        placeholder: "e.g. Annual Sports Day 2026 T-Shirt",
        required: ""
      }, null, _parent));
      _push(`<div class="grid grid-cols-2 gap-3">`);
      _push(ssrRenderComponent(_component_BaseInput, {
        modelValue: form.value.currency,
        "onUpdate:modelValue": ($event) => form.value.currency = $event,
        label: "Currency (Code)",
        placeholder: "MYR",
        required: ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_BaseInput, {
        modelValue: form.value.basePrice,
        "onUpdate:modelValue": ($event) => form.value.basePrice = $event,
        modelModifiers: { number: true },
        label: "Base Price (per shirt)",
        type: "number",
        placeholder: "35",
        required: ""
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_BaseTextarea, {
        modelValue: form.value.eventDescription,
        "onUpdate:modelValue": ($event) => form.value.eventDescription = $event,
        label: "Event Description / Instructions",
        placeholder: "Details on material, pick-up dates, contact person, etc.",
        rows: 3
      }, null, _parent));
      _push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"><div><label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"> Order Deadline (Optional) </label><div class="flex items-center gap-2"><input${ssrRenderAttr("value", form.value.deadline)} type="datetime-local" class="w-full px-3.5 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500">`);
      if (form.value.deadline) {
        _push(`<button type="button" class="px-2.5 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-red-600 bg-gray-100 dark:bg-gray-700" title="Clear deadline"> Clear </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex items-center justify-between sm:justify-start gap-4 p-3 bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-gray-200 dark:border-gray-700/60 self-end"><div><div class="text-xs font-bold text-gray-900 dark:text-white">Store Open For Orders</div><div class="text-[11px] text-gray-500">Enable or disable submissions immediately</div></div><label class="relative inline-flex items-center cursor-pointer"><input${ssrIncludeBooleanAttr(Array.isArray(form.value.isOpen) ? ssrLooseContain(form.value.isOpen, null) : form.value.isOpen) ? " checked" : ""} type="checkbox" class="sr-only peer"><div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div></label></div></div></div><div class="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-4"><div class="flex items-center justify-between"><div><h3 class="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:ruler",
        class: "w-5 h-5 text-primary-500"
      }, null, _parent));
      _push(`<span>Sizes Manager</span></h3><p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5"> Configure available shirt sizes and per-size price surcharges (e.g. 2XL +2). </p></div><button type="button" class="px-3 py-1.5 rounded-xl text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/60 hover:bg-primary-100 border border-primary-200 dark:border-primary-800 flex items-center gap-1 transition">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:plus",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(`<span>Add Size</span></button></div><div class="divide-y divide-gray-100 dark:divide-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"><!--[-->`);
      ssrRenderList(form.value.sizes, (s, idx) => {
        _push(`<div class="p-3.5 bg-gray-50/50 dark:bg-gray-900/30 flex flex-wrap items-center justify-between gap-3 text-xs"><div class="flex items-center gap-2"><div class="flex flex-col"><button type="button"${ssrIncludeBooleanAttr(idx === 0) ? " disabled" : ""} class="text-gray-400 hover:text-gray-700 disabled:opacity-20">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:chevron-up",
          class: "w-3.5 h-3.5"
        }, null, _parent));
        _push(`</button><button type="button"${ssrIncludeBooleanAttr(idx === form.value.sizes.length - 1) ? " disabled" : ""} class="text-gray-400 hover:text-gray-700 disabled:opacity-20">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:chevron-down",
          class: "w-3.5 h-3.5"
        }, null, _parent));
        _push(`</button></div><input${ssrRenderAttr("value", s.label)} type="text" placeholder="Size" class="w-20 px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold uppercase text-center"></div><div class="flex items-center gap-2"><span class="text-gray-500 font-medium">Surcharge (${ssrInterpolate(form.value.currency)}):</span><input${ssrRenderAttr("value", s.surcharge)} type="number" step="0.5" min="0" class="w-20 px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center font-mono"></div><div class="flex items-center gap-3"><label class="flex items-center gap-1.5 cursor-pointer"><input${ssrIncludeBooleanAttr(Array.isArray(s.isActive) ? ssrLooseContain(s.isActive, null) : s.isActive) ? " checked" : ""} type="checkbox" class="rounded text-primary-600 focus:ring-primary-500"><span class="text-gray-700 dark:text-gray-300 font-medium">Active</span></label><button type="button" class="text-gray-400 hover:text-red-600 p-1 rounded" title="Remove size">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:trash-2",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button></div></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-4"><div class="flex items-center justify-between"><div><h3 class="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:layers",
        class: "w-5 h-5 text-violet"
      }, null, _parent));
      _push(`<span>Sleeve Types Manager</span></h3><p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5"> Manage sleeve styles (Short Sleeve, Long Sleeve, 3/4 Sleeve, Sleeveless) and surcharges. </p></div><button type="button" class="px-3 py-1.5 rounded-xl text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/60 hover:bg-primary-100 border border-primary-200 dark:border-primary-800 flex items-center gap-1 transition">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:plus",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(`<span>Add Sleeve Type</span></button></div><div class="divide-y divide-gray-100 dark:divide-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"><!--[-->`);
      ssrRenderList(form.value.sleeveTypes, (st, idx) => {
        _push(`<div class="p-3.5 bg-gray-50/50 dark:bg-gray-900/30 flex flex-wrap items-center justify-between gap-3 text-xs"><div class="flex items-center gap-2"><div class="flex flex-col"><button type="button"${ssrIncludeBooleanAttr(idx === 0) ? " disabled" : ""} class="text-gray-400 hover:text-gray-700 disabled:opacity-20">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:chevron-up",
          class: "w-3.5 h-3.5"
        }, null, _parent));
        _push(`</button><button type="button"${ssrIncludeBooleanAttr(idx === form.value.sleeveTypes.length - 1) ? " disabled" : ""} class="text-gray-400 hover:text-gray-700 disabled:opacity-20">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:chevron-down",
          class: "w-3.5 h-3.5"
        }, null, _parent));
        _push(`</button></div><input${ssrRenderAttr("value", st.label)} type="text" placeholder="e.g. Long Sleeve" class="w-40 px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-semibold"></div><div class="flex items-center gap-2"><span class="text-gray-500 font-medium">Surcharge (${ssrInterpolate(form.value.currency)}):</span><input${ssrRenderAttr("value", st.surcharge)} type="number" step="0.5" min="0" class="w-20 px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center font-mono"></div><div class="flex items-center gap-3"><label class="flex items-center gap-1.5 cursor-pointer"><input${ssrIncludeBooleanAttr(Array.isArray(st.isActive) ? ssrLooseContain(st.isActive, null) : st.isActive) ? " checked" : ""} type="checkbox" class="rounded text-primary-600 focus:ring-primary-500"><span class="text-gray-700 dark:text-gray-300 font-medium">Active</span></label><button type="button" class="text-gray-400 hover:text-red-600 p-1 rounded" title="Remove sleeve type">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:trash-2",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button></div></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-4"><h3 class="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:image",
        class: "w-5 h-5 text-accent-coral"
      }, null, _parent));
      _push(`<span>Size Chart Image</span></h3><p class="text-xs text-gray-500 dark:text-gray-400"> Upload a custom image containing garment sizing specifications. If empty, the public site falls back to a standard built-in measurement table. </p>`);
      if (form.value.sizeChartImage) {
        _push(`<div class="space-y-3"><img${ssrRenderAttr("src", form.value.sizeChartImage)} alt="Size chart preview" class="max-h-48 rounded-2xl border border-gray-200 dark:border-gray-700 object-contain bg-white"><button type="button" class="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:trash-2",
          class: "w-3.5 h-3.5"
        }, null, _parent));
        _push(`<span>Remove Image</span></button></div>`);
      } else {
        _push(`<div><label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 cursor-pointer transition">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:upload",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span>Upload Image File (PNG, JPG)</span><input type="file" accept="image/*" class="hidden"></label></div>`);
      }
      _push(`</div><div class="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-4"><h3 class="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:lock",
        class: "w-5 h-5 text-amber-500"
      }, null, _parent));
      _push(`<span>Change Admin Password</span></h3>`);
      if (newGeneratedHash.value) {
        _push(`<div class="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs space-y-2"><div class="font-bold text-emerald-800 dark:text-emerald-200"> Password Hash Generated Successfully! </div><p class="text-gray-600 dark:text-gray-300"> Because security best practices require environment variables for credentials, copy and update this in your \`.env\` or Vercel dashboard: </p><div class="font-mono bg-white dark:bg-gray-900 p-2.5 rounded-xl border border-emerald-300 select-all overflow-x-auto text-emerald-900 dark:text-emerald-300"> NUXT_ADMIN_PASSWORD_HASH=${ssrInterpolate(newGeneratedHash.value)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="grid grid-cols-1 sm:grid-cols-3 gap-3">`);
      _push(ssrRenderComponent(_component_BaseInput, {
        modelValue: passwordForm.value.currentPassword,
        "onUpdate:modelValue": ($event) => passwordForm.value.currentPassword = $event,
        label: "Current Password",
        type: "password",
        required: ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_BaseInput, {
        modelValue: passwordForm.value.newPassword,
        "onUpdate:modelValue": ($event) => passwordForm.value.newPassword = $event,
        label: "New Password (min 8 chars)",
        type: "password",
        required: ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_BaseInput, {
        modelValue: passwordForm.value.confirmPassword,
        "onUpdate:modelValue": ($event) => passwordForm.value.confirmPassword = $event,
        label: "Confirm New Password",
        type: "password",
        required: ""
      }, null, _parent));
      _push(`<div class="sm:col-span-3 flex justify-end">`);
      _push(ssrRenderComponent(_component_BaseButton, {
        variant: "secondary",
        size: "md",
        loading: changingPassword.value,
        type: "submit"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Update Password `);
          } else {
            return [
              createTextVNode(" Update Password ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=settings-Br9MaMi6.mjs.map
