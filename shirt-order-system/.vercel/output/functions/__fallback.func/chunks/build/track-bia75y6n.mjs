import { u as useHead, a as useToast, _ as __nuxt_component_1 } from './server.mjs';
import { _ as _sfc_main$1 } from './BaseButton-BmqYBgHv.mjs';
import { _ as _sfc_main$2 } from './StatusBadge-D8Eu5rRf.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "track",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Track Order"
    });
    useToast();
    const code = ref("");
    const contact = ref("");
    const loading = ref(false);
    const order = ref(null);
    const searched = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_BaseButton = _sfc_main$1;
      const _component_BaseStatusBadge = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-8 sm:py-16 px-4 sm:px-6 max-w-3xl mx-auto space-y-8" }, _attrs))}><div class="text-center space-y-2"><div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 mb-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:package-search",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</div><h1 class="font-heading font-extrabold text-2xl sm:text-4xl text-gray-900 dark:text-white"> Track Your Order </h1><p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto"> Enter your order code and the contact number or email address used when placing your order. </p></div><div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft-lg space-y-5"><form class="space-y-4"><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"> Order Code </label><div class="relative">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:tag",
        class: "w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", code.value)} type="text" placeholder="e.g. SHIRT-7K2M9" class="w-full pl-10 pr-4 py-2.5 rounded-xl font-mono text-sm uppercase bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:normal-case placeholder:font-body focus:outline-none focus:ring-2 focus:ring-primary-500 transition" required></div></div><div><label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"> Contact (Phone or Email) </label><div class="relative">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:contact",
        class: "w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", contact.value)} type="text" placeholder="e.g. +60123456789 or email@domain.com" class="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition" required></div></div></div>`);
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
              name: "lucide:search",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Look Up Order</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:search",
                class: "w-4 h-4 mr-2"
              }),
              createVNode("span", null, "Look Up Order")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form></div>`);
      if (order.value) {
        _push(`<div class="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft-xl space-y-6 animate-scale-in"><div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-700"><div><span class="text-xs uppercase tracking-wider font-semibold text-gray-400">Order Reference</span><div class="font-mono font-extrabold text-2xl text-primary-600 dark:text-primary-400">${ssrInterpolate(order.value.code)}</div><div class="text-xs text-gray-500 dark:text-gray-400 mt-1"> Ordered by <span class="font-semibold text-gray-900 dark:text-white">${ssrInterpolate(order.value.customerName)}</span> on ${ssrInterpolate(new Date(order.value.createdAt).toLocaleDateString())}</div></div><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_BaseStatusBadge, {
          status: order.value.status,
          type: "order"
        }, null, _parent));
        _push(ssrRenderComponent(_component_BaseStatusBadge, {
          status: order.value.paymentStatus,
          type: "payment"
        }, null, _parent));
        _push(`</div></div><div class="space-y-3"><h3 class="font-heading font-bold text-sm text-gray-900 dark:text-white"> Ordered Shirts (${ssrInterpolate(order.value.totalQuantity)}) </h3><div class="divide-y divide-gray-100 dark:divide-gray-700/60 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"><!--[-->`);
        ssrRenderList(order.value.items, (item, idx) => {
          _push(`<div class="p-4 bg-gray-50/50 dark:bg-gray-900/30 flex items-center justify-between text-xs sm:text-sm"><div><div class="font-heading font-bold text-gray-900 dark:text-white uppercase"> &quot;${ssrInterpolate(item.shirtName)}&quot; </div><div class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1"><span class="font-semibold text-primary-600 dark:text-primary-400">Size: ${ssrInterpolate(item.sizeLabel)}</span><span>\u2022</span><span>${ssrInterpolate(item.sleeveLabel)}</span><span>\u2022</span><span>Qty: ${ssrInterpolate(item.quantity)}</span></div></div><div class="text-right"><span class="font-heading font-bold text-gray-900 dark:text-white text-sm sm:text-base"> MYR ${ssrInterpolate(Number(item.lineTotal).toFixed(2))}</span></div></div>`);
        });
        _push(`<!--]--></div></div><div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700"><span class="font-heading font-bold text-base text-gray-900 dark:text-white">Total Amount</span><span class="font-heading font-extrabold text-2xl text-primary-600 dark:text-primary-400"> MYR ${ssrInterpolate(Number(order.value.totalPrice).toFixed(2))}</span></div></div>`);
      } else if (searched.value && !loading.value && !order.value) {
        _push(`<div class="text-center py-10 bg-white/60 dark:bg-gray-800/60 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 p-8">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:file-question",
          class: "w-12 h-12 text-gray-400 mx-auto mb-3"
        }, null, _parent));
        _push(`<h3 class="font-heading font-bold text-base text-gray-900 dark:text-white">No Order Found</h3><p class="text-xs text-gray-500 dark:text-gray-400 mt-1"> Please double check the code and contact info. If you need assistance, please contact the organizer. </p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/track.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=track-bia75y6n.mjs.map
