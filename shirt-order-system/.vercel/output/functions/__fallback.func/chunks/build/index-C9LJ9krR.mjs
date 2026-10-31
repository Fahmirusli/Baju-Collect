import { _ as _sfc_main$a } from './LoadingSkeleton-BZu8zmo9.mjs';
import { a as useToast, _ as __nuxt_component_1 } from './server.mjs';
import { _ as _sfc_main$b } from './BaseButton-BmqYBgHv.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DXdMyeHc.mjs';
import { defineComponent, withAsyncContext, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, isRef, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderStyle, ssrRenderTeleport, ssrRenderClass } from 'vue/server-renderer';
import { _ as _sfc_main$c } from './BaseInput-B0Jc4KbN.mjs';
import { _ as _sfc_main$d } from './BaseTextarea-DXeX4GIo.mjs';
import { f as createOrderSchema } from '../_/schemas.mjs';
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
import 'zod';
import '@vue/shared';

const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "SuccessScreen",
  __ssrInlineRender: true,
  props: {
    orderCode: {},
    order: {},
    currency: {}
  },
  emits: ["newOrder"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const copied = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_BaseButton = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto p-4 sm:p-8 animate-scale-in" }, _attrs))}><div class="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl border border-gray-100 dark:border-gray-700 shadow-soft-xl overflow-hidden p-6 sm:p-10 text-center"><div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mb-4 animate-bounce-gentle">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:check-circle-2",
        class: "w-9 h-9"
      }, null, _parent));
      _push(`</div><h2 class="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white mb-2"> Order Placed Successfully! </h2><p class="text-sm text-gray-600 dark:text-gray-400 mb-6"> Thank you, <span class="font-semibold text-gray-900 dark:text-white">${ssrInterpolate(__props.order.customerName)}</span>. Your group order has been submitted. </p><div class="p-5 bg-gradient-to-r from-primary-50 to-violet-50 dark:from-primary-950/30 dark:to-violet-950/30 rounded-2xl border border-primary-200 dark:border-primary-800/60 mb-8"><div class="text-xs uppercase tracking-wider font-semibold text-primary-600 dark:text-primary-400 mb-1"> Your Order Tracking Code </div><div class="flex items-center justify-center gap-3"><span class="font-mono font-extrabold text-2xl sm:text-3xl text-primary-700 dark:text-primary-300 tracking-wider">${ssrInterpolate(__props.orderCode)}</span><button type="button" class="p-2 rounded-xl bg-white dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/50 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 shadow-sm transition flex items-center gap-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: copied.value ? "lucide:check" : "lucide:copy",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(copied.value ? "Copied!" : "Copy")}</span></button></div><p class="text-[11px] text-gray-500 dark:text-gray-400 mt-2"> Save this code to check your order status at `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/track",
        class: "underline text-primary-600 dark:text-primary-400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`/track`);
          } else {
            return [
              createTextVNode("/track")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`. </p></div><div class="text-left border-t border-gray-100 dark:border-gray-700 pt-6 mb-8"><h4 class="font-heading font-bold text-sm text-gray-900 dark:text-white mb-3"> Order Summary (${ssrInterpolate(__props.order.totalQuantity)} ${ssrInterpolate(__props.order.totalQuantity === 1 ? "shirt" : "shirts")}) </h4><div class="divide-y divide-gray-100 dark:divide-gray-700/60 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"><!--[-->`);
      ssrRenderList(__props.order.items, (item, idx) => {
        _push(`<div class="p-3.5 flex items-center justify-between text-xs sm:text-sm bg-gray-50/50 dark:bg-gray-800/40"><div><div class="font-heading font-bold text-gray-900 dark:text-white uppercase"> &quot;${ssrInterpolate(item.shirtName)}&quot; </div><div class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-0.5"><span class="font-semibold text-primary-600 dark:text-primary-400">${ssrInterpolate(item.sizeLabel)}</span><span>\u2022</span><span>${ssrInterpolate(item.sleeveLabel)}</span><span>\u2022</span><span>Qty: ${ssrInterpolate(item.quantity)}</span></div></div>`);
        if (item.lineTotal !== void 0) {
          _push(`<div class="font-heading font-bold text-gray-900 dark:text-white">${ssrInterpolate(__props.currency)} ${ssrInterpolate(Number(item.lineTotal).toFixed(2))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="flex items-center justify-between pt-4 px-1"><span class="font-heading font-bold text-base text-gray-900 dark:text-white">Total Amount</span><span class="font-heading font-extrabold text-xl text-primary-600 dark:text-primary-400">${ssrInterpolate(__props.currency)} ${ssrInterpolate(Number(__props.order.totalPrice).toFixed(2))}</span></div></div><div class="flex flex-col sm:flex-row items-center justify-center gap-3">`);
      _push(ssrRenderComponent(_component_BaseButton, {
        variant: "primary",
        size: "lg",
        class: "w-full sm:w-auto",
        onClick: ($event) => emit("newOrder")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:plus",
              class: "w-4 h-4 mr-1.5"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Place Another Order</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:plus",
                class: "w-4 h-4 mr-1.5"
              }),
              createVNode("span", null, "Place Another Order")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/track",
        class: "w-full sm:w-auto"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_BaseButton, {
              variant: "secondary",
              size: "lg",
              class: "w-full"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "lucide:search",
                    class: "w-4 h-4 mr-1.5"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Track My Order</span>`);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "lucide:search",
                      class: "w-4 h-4 mr-1.5"
                    }),
                    createVNode("span", null, "Track My Order")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_BaseButton, {
                variant: "secondary",
                size: "lg",
                class: "w-full"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, {
                    name: "lucide:search",
                    class: "w-4 h-4 mr-1.5"
                  }),
                  createVNode("span", null, "Track My Order")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/order/SuccessScreen.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Countdown",
  __ssrInlineRender: true,
  props: {
    deadline: {}
  },
  emits: ["expired"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const now = ref(Date.now());
    const deadlineTime = computed(() => {
      if (!props.deadline) return null;
      const parsed = new Date(props.deadline).getTime();
      return isNaN(parsed) ? null : parsed;
    });
    const timeLeft = computed(() => {
      if (!deadlineTime.value) return 0;
      return Math.max(0, deadlineTime.value - now.value);
    });
    const isExpired = computed(() => {
      return deadlineTime.value !== null && timeLeft.value <= 0;
    });
    watch(isExpired, (val) => {
      if (val) emit("expired");
    });
    const days = computed(() => Math.floor(timeLeft.value / (1e3 * 60 * 60 * 24)));
    const hours = computed(() => Math.floor(timeLeft.value % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)));
    const minutes = computed(() => Math.floor(timeLeft.value % (1e3 * 60 * 60) / (1e3 * 60)));
    const seconds = computed(() => Math.floor(timeLeft.value % (1e3 * 60) / 1e3));
    function pad(num) {
      return String(num).padStart(2, "0");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      if (deadlineTime.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}>`);
        if (!isExpired.value) {
          _push(`<div class="flex items-center justify-center gap-2 sm:gap-4" role="timer" aria-label="Order deadline countdown"><div class="flex flex-col items-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-2.5 sm:p-3 min-w-[54px] sm:min-w-[68px] shadow-soft border border-gray-100 dark:border-gray-700/50"><span class="font-heading font-extrabold text-xl sm:text-2xl text-primary-600 dark:text-primary-400">${ssrInterpolate(pad(days.value))}</span><span class="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"> Days </span></div><span class="text-xl font-bold text-gray-400 dark:text-gray-500 -mt-3">:</span><div class="flex flex-col items-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-2.5 sm:p-3 min-w-[54px] sm:min-w-[68px] shadow-soft border border-gray-100 dark:border-gray-700/50"><span class="font-heading font-extrabold text-xl sm:text-2xl text-primary-600 dark:text-primary-400">${ssrInterpolate(pad(hours.value))}</span><span class="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"> Hours </span></div><span class="text-xl font-bold text-gray-400 dark:text-gray-500 -mt-3">:</span><div class="flex flex-col items-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-2.5 sm:p-3 min-w-[54px] sm:min-w-[68px] shadow-soft border border-gray-100 dark:border-gray-700/50"><span class="font-heading font-extrabold text-xl sm:text-2xl text-primary-600 dark:text-primary-400">${ssrInterpolate(pad(minutes.value))}</span><span class="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"> Mins </span></div><span class="text-xl font-bold text-gray-400 dark:text-gray-500 -mt-3">:</span><div class="flex flex-col items-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-2.5 sm:p-3 min-w-[54px] sm:min-w-[68px] shadow-soft border border-gray-100 dark:border-gray-700/50"><span class="font-heading font-extrabold text-xl sm:text-2xl text-accent-coral">${ssrInterpolate(pad(seconds.value))}</span><span class="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"> Secs </span></div></div>`);
        } else {
          _push(`<div class="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl font-medium text-sm border border-red-200 dark:border-red-800/50">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:clock-alert",
            class: "w-4 h-4 shrink-0 text-red-500"
          }, null, _parent));
          _push(`<span>The deadline for this order has passed.</span></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Countdown.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "SleevePills",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    sleeveTypes: {},
    currency: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    function getIcon(label) {
      const l = label.toLowerCase();
      if (l.includes("long")) return "lucide:layers";
      if (l.includes("3/4") || l.includes("three")) return "lucide:scissors";
      if (l.includes("sleeveless") || l.includes("tank")) return "lucide:circle-slash";
      return "lucide:shirt";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "flex flex-wrap gap-2",
        role: "radiogroup",
        "aria-label": "Select sleeve type"
      }, _attrs))}><!--[-->`);
      ssrRenderList(__props.sleeveTypes, (st) => {
        _push(`<button type="button" role="radio"${ssrRenderAttr("aria-checked", __props.modelValue === st.label)} class="${ssrRenderClass([
          "px-3.5 py-1.5 rounded-xl font-heading text-xs sm:text-sm font-semibold transition-all duration-200 border flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500",
          __props.modelValue === st.label ? "bg-gradient-to-r from-primary-600 to-violet text-white border-transparent shadow-md scale-105" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-950/20"
        ])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: getIcon(st.label),
          class: "w-3.5 h-3.5"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(st.label)}</span>`);
        if (st.surcharge > 0) {
          _push(`<span class="${ssrRenderClass([
            "text-[10px] font-mono px-1 py-0.2 rounded",
            __props.modelValue === st.label ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
          ])}"> +${ssrInterpolate(st.surcharge)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/order/SleevePills.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "SizePills",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    sizes: {},
    currency: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "flex flex-wrap gap-2",
        role: "radiogroup",
        "aria-label": "Select shirt size"
      }, _attrs))}><!--[-->`);
      ssrRenderList(__props.sizes, (s) => {
        _push(`<button type="button" role="radio"${ssrRenderAttr("aria-checked", __props.modelValue === s.label)} class="${ssrRenderClass([
          "px-3.5 py-1.5 rounded-xl font-heading text-xs sm:text-sm font-semibold transition-all duration-200 border flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500",
          __props.modelValue === s.label ? "bg-gradient-to-r from-primary-600 to-violet text-white border-transparent shadow-md scale-105" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-950/20"
        ])}"><span>${ssrInterpolate(s.label)}</span>`);
        if (s.surcharge > 0) {
          _push(`<span class="${ssrRenderClass([
            "text-[10px] font-mono px-1 py-0.2 rounded",
            __props.modelValue === s.label ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
          ])}"> +${ssrInterpolate(s.surcharge)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/order/SizePills.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "QtyStepper",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    min: { default: 1 },
    max: { default: 20 }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "inline-flex items-center rounded-xl bg-gray-100 dark:bg-gray-800 p-1 border border-gray-200 dark:border-gray-700/60 shadow-inner" }, _attrs))}><button type="button"${ssrIncludeBooleanAttr(__props.modelValue <= __props.min) ? " disabled" : ""} class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition disabled:opacity-40 disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500" aria-label="Decrease quantity">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:minus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button><span class="w-10 text-center font-heading font-bold text-sm sm:text-base text-gray-900 dark:text-white" aria-live="polite">${ssrInterpolate(__props.modelValue)}</span><button type="button"${ssrIncludeBooleanAttr(__props.modelValue >= __props.max) ? " disabled" : ""} class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition disabled:opacity-40 disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500" aria-label="Increase quantity">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/order/QtyStepper.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ShirtRow",
  __ssrInlineRender: true,
  props: {
    item: {},
    index: {},
    sizes: {},
    sleeveTypes: {},
    basePrice: {},
    currency: {},
    canRemove: { type: Boolean },
    isFocused: { type: Boolean }
  },
  emits: ["update", "remove", "duplicate", "focus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const currentSize = computed(() => {
      return props.sizes.find((s) => s.label === props.item.sizeLabel);
    });
    const currentSleeve = computed(() => {
      return props.sleeveTypes.find((st) => st.label === props.item.sleeveLabel);
    });
    const unitPrice = computed(() => {
      var _a, _b;
      const sizeSurcharge = ((_a = currentSize.value) == null ? void 0 : _a.surcharge) || 0;
      const sleeveSurcharge = ((_b = currentSleeve.value) == null ? void 0 : _b.surcharge) || 0;
      return Number((props.basePrice + sizeSurcharge + sleeveSurcharge).toFixed(2));
    });
    const rowTotal = computed(() => {
      return Number((unitPrice.value * props.item.quantity).toFixed(2));
    });
    function updateSize(size) {
      emit("update", { ...props.item, sizeLabel: size });
    }
    function updateSleeve(sleeve) {
      emit("update", { ...props.item, sleeveLabel: sleeve });
    }
    function updateQuantity(qty) {
      emit("update", { ...props.item, quantity: qty });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_OrderSleevePills = _sfc_main$7;
      const _component_OrderSizePills = _sfc_main$6;
      const _component_OrderQtyStepper = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          "relative p-4 sm:p-5 rounded-2xl transition-all duration-300 border shadow-soft bg-white/90 dark:bg-gray-800/90 backdrop-blur-md",
          __props.isFocused ? "border-primary-500 ring-2 ring-primary-500/20 shadow-soft-lg" : "border-gray-100 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600"
        ]
      }, _attrs))}><div class="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-gray-100 dark:border-gray-700/50"><div class="flex items-center gap-2"><span class="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-950/80 text-primary-600 dark:text-primary-400 font-heading font-bold text-xs flex items-center justify-center">${ssrInterpolate(__props.index + 1)}</span><span class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"> Shirt Item </span></div><div class="flex items-center gap-2"><div class="text-right mr-1"><span class="text-xs text-gray-400 font-medium mr-1">${ssrInterpolate(__props.currency)} ${ssrInterpolate(unitPrice.value.toFixed(2))} ea \u2022</span><span class="font-heading font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">${ssrInterpolate(__props.currency)} ${ssrInterpolate(rowTotal.value.toFixed(2))}</span></div><button type="button" class="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950/40 transition" title="Duplicate this shirt" aria-label="Duplicate this shirt row">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:copy",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button>`);
      if (__props.canRemove) {
        _push(`<button type="button" class="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition" title="Remove this shirt" aria-label="Remove this shirt row">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:trash-2",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="space-y-3.5"><div><div class="flex items-center justify-between mb-1"><label class="block text-xs font-semibold text-gray-700 dark:text-gray-300"> Name on Shirt <span class="text-red-500">*</span></label><span class="text-[11px] font-mono text-gray-400">${ssrInterpolate(__props.item.shirtName.length)}/20 </span></div><input${ssrRenderAttr("value", __props.item.shirtName)} type="text" maxlength="20" placeholder="e.g. ALEX or CAPTAIN" class="w-full px-3.5 py-2 rounded-xl text-sm font-medium bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white uppercase placeholder:normal-case placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"></div><div><label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5"> Sleeve Style </label>`);
      _push(ssrRenderComponent(_component_OrderSleevePills, {
        "model-value": __props.item.sleeveLabel,
        "sleeve-types": __props.sleeveTypes,
        currency: __props.currency,
        "onUpdate:modelValue": updateSleeve
      }, null, _parent));
      _push(`</div><div><label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5"> Size </label>`);
      _push(ssrRenderComponent(_component_OrderSizePills, {
        "model-value": __props.item.sizeLabel,
        sizes: __props.sizes,
        currency: __props.currency,
        "onUpdate:modelValue": updateSize
      }, null, _parent));
      _push(`</div><div class="flex items-center justify-between pt-1"><label class="text-xs font-semibold text-gray-700 dark:text-gray-300"> Quantity </label>`);
      _push(ssrRenderComponent(_component_OrderQtyStepper, {
        "model-value": __props.item.quantity,
        min: 1,
        max: 20,
        "onUpdate:modelValue": updateQuantity
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/order/ShirtRow.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ShirtPreview",
  __ssrInlineRender: true,
  props: {
    shirtName: { default: "YOUR NAME" },
    sleeveType: { default: "Short Sleeve" },
    sizeLabel: { default: "M" },
    color: { default: "indigo" }
  },
  setup(__props) {
    const props = __props;
    const normalizedSleeve = computed(() => {
      const s = (props.sleeveType || "").toLowerCase();
      if (s.includes("sleeveless") || s.includes("tank")) return "sleeveless";
      if (s.includes("long")) return "long";
      if (s.includes("3/4") || s.includes("three")) return "three-quarter";
      return "short";
    });
    const shirtPaths = {
      // Sleeveless / Tank Top
      sleeveless: "M 115 35 Q 150 55 185 35 L 205 50 Q 185 100 215 130 L 215 270 L 85 270 L 85 130 Q 115 100 95 50 Z",
      // Standard Short Sleeve
      short: "M 120 35 Q 150 55 180 35 L 235 60 L 265 115 L 225 135 L 215 120 L 215 270 L 85 270 L 85 120 L 75 135 L 35 115 L 65 60 Z",
      // 3/4 Sleeve
      "three-quarter": "M 120 35 Q 150 55 180 35 L 240 55 L 280 165 L 245 178 L 220 120 L 215 270 L 85 270 L 80 120 L 55 178 L 20 165 L 60 55 Z",
      // Long Sleeve
      long: "M 120 35 Q 150 55 180 35 L 240 55 L 295 220 L 260 230 L 222 120 L 215 270 L 85 270 L 78 120 L 40 230 L 5 220 L 60 55 Z"
    };
    const currentPath = computed(() => {
      return shirtPaths[normalizedSleeve.value] || shirtPaths.short;
    });
    const displayName = computed(() => {
      const trimmed = (props.shirtName || "").trim();
      return trimmed || "YOUR NAME";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft-xl overflow-hidden w-full max-w-[340px] mx-auto" }, _attrs))}><div class="flex items-center justify-between w-full px-3 py-1 mb-2"><span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-semibold bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/40">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:sparkles",
        class: "w-3 h-3 text-primary-500"
      }, null, _parent));
      _push(` ${ssrInterpolate(__props.sleeveType || "Short Sleeve")}</span><span class="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">${ssrInterpolate(__props.sizeLabel || "M")}</span></div><div class="relative w-full aspect-square max-w-[270px] flex items-center justify-center"><svg viewBox="0 0 300 300" class="w-full h-full drop-shadow-xl transition-all duration-300" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="shirtGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4F46E5"></stop><stop offset="50%" stop-color="#6366F1"></stop><stop offset="100%" stop-color="#7C3AED"></stop></linearGradient><linearGradient id="foldShadow" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.25"></stop><stop offset="100%" stop-color="#000000" stop-opacity="0.2"></stop></linearGradient></defs><path${ssrRenderAttr("d", currentPath.value)} fill="url(#shirtGradient)" stroke="#3730A3" stroke-width="2.5" stroke-linejoin="round" class="transition-all duration-500 ease-out"></path><path${ssrRenderAttr("d", currentPath.value)} fill="url(#foldShadow)" class="transition-all duration-500 ease-out pointer-events-none"></path><path d="M 120 35 Q 150 55 180 35 Q 150 48 120 35 Z" fill="#312E81" stroke="#1E1B4B" stroke-width="1.5"></path><rect x="142" y="42" width="16" height="12" rx="2" fill="#E0E7FF" opacity="0.9"></rect><text x="150" y="51" font-family="monospace" font-size="7" font-weight="bold" fill="#3730A3" text-anchor="middle">${ssrInterpolate(__props.sizeLabel || "M")}</text><rect x="105" y="110" width="90" height="45" rx="6" fill="white" fill-opacity="0.08" stroke="white" stroke-opacity="0.2" stroke-dasharray="2,2"></rect><text x="150" y="138" text-anchor="middle" class="font-heading font-extrabold tracking-wide uppercase transition-all duration-200" fill="#FFFFFF" font-size="14" letter-spacing="1" style="${ssrRenderStyle({ "text-shadow": "0 2px 4px rgba(0,0,0,0.4)" })}">${ssrInterpolate(displayName.value)}</text></svg></div><div class="mt-2 text-center"><p class="text-xs font-medium text-gray-500 dark:text-gray-400"> Live Preview <span class="text-primary-500 font-semibold">\u2022 100% Cotton</span></p></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/order/ShirtPreview.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "OrderSummaryBar",
  __ssrInlineRender: true,
  props: {
    totalShirts: {},
    totalPrice: {},
    currency: {},
    loading: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["submit"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseButton = _sfc_main$b;
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-0 inset-x-0 z-40 sm:static bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t sm:border border-gray-200/80 dark:border-gray-800 p-4 sm:p-5 sm:rounded-2xl shadow-soft-xl transition-all" }, _attrs))}><div class="max-w-4xl mx-auto flex items-center justify-between gap-4"><div><div class="text-xs text-gray-500 dark:text-gray-400 font-medium"> Total: <span class="font-bold text-gray-900 dark:text-white">${ssrInterpolate(__props.totalShirts)}</span> ${ssrInterpolate(__props.totalShirts === 1 ? "shirt" : "shirts")}</div><div class="font-heading font-extrabold text-xl sm:text-2xl text-primary-600 dark:text-primary-400">${ssrInterpolate(__props.currency)} ${ssrInterpolate(__props.totalPrice.toFixed(2))}</div></div>`);
      _push(ssrRenderComponent(_component_BaseButton, {
        variant: "primary",
        size: "lg",
        loading: __props.loading,
        disabled: __props.disabled || __props.totalShirts === 0,
        type: "button",
        class: "min-w-[140px] sm:min-w-[180px] shadow-glow-primary",
        onClick: ($event) => emit("submit")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="flex items-center gap-2"${_scopeId}><span${_scopeId}>Submit Order</span>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-right",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", { class: "flex items-center gap-2" }, [
                createVNode("span", null, "Submit Order"),
                createVNode(_component_Icon, {
                  name: "lucide:arrow-right",
                  class: "w-4 h-4"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/order/OrderSummaryBar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SizeChartModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    imageUrl: {},
    sizes: {}
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const defaultChartData = [
      { size: "XS", chestIn: '34-36"', chestCm: "86-91 cm", lengthIn: '26"', lengthCm: "66 cm" },
      { size: "S", chestIn: '36-38"', chestCm: "91-96 cm", lengthIn: '27"', lengthCm: "69 cm" },
      { size: "M", chestIn: '38-40"', chestCm: "96-101 cm", lengthIn: '28"', lengthCm: "71 cm" },
      { size: "L", chestIn: '40-42"', chestCm: "101-106 cm", lengthIn: '29"', lengthCm: "74 cm" },
      { size: "XL", chestIn: '42-44"', chestCm: "106-111 cm", lengthIn: '30"', lengthCm: "76 cm" },
      { size: "2XL", chestIn: '44-46"', chestCm: "111-116 cm", lengthIn: '31"', lengthCm: "79 cm" },
      { size: "3XL", chestIn: '46-48"', chestCm: "116-121 cm", lengthIn: '32"', lengthCm: "81 cm" },
      { size: "4XL", chestIn: '48-50"', chestCm: "121-127 cm", lengthIn: '33"', lengthCm: "84 cm" },
      { size: "5XL", chestIn: '50-52"', chestCm: "127-132 cm", lengthIn: '34"', lengthCm: "86 cm" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_BaseButton = _sfc_main$b;
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.open) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true" aria-label="Size chart modal"><div class="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-soft-xl border border-gray-100 dark:border-gray-700 animate-scale-in flex flex-col"><div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center justify-between"><div class="flex items-center gap-2">`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "lucide:ruler",
            class: "w-5 h-5 text-primary-500"
          }, null, _parent));
          _push2(`<h3 class="font-heading font-bold text-lg text-gray-900 dark:text-white"> Size Chart &amp; Measurements </h3></div><button type="button" class="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition" aria-label="Close modal">`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "lucide:x",
            class: "w-5 h-5"
          }, null, _parent));
          _push2(`</button></div><div class="p-6 overflow-y-auto space-y-4">`);
          if (__props.imageUrl) {
            _push2(`<div class="flex justify-center mb-4"><img${ssrRenderAttr("src", __props.imageUrl)} alt="Size Chart" class="max-w-full max-h-[60vh] rounded-xl object-contain border border-gray-200 dark:border-gray-700 shadow-sm"></div>`);
          } else {
            _push2(`<div class="space-y-4"><p class="text-xs text-gray-500 dark:text-gray-400"> All measurements are approximate and subject to standard \xB10.5&quot; (\xB11.5 cm) garment manufacturing tolerances. </p><div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700"><table class="w-full text-left text-xs sm:text-sm"><thead class="bg-primary-50 dark:bg-primary-950/40 text-primary-900 dark:text-primary-200 font-heading"><tr><th class="px-4 py-3 font-bold">Size</th><th class="px-4 py-3 font-semibold">Chest (Inches)</th><th class="px-4 py-3 font-semibold">Chest (CM)</th><th class="px-4 py-3 font-semibold">Body Length</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700"><!--[-->`);
            ssrRenderList(defaultChartData, (row, idx) => {
              _push2(`<tr class="${ssrRenderClass(idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50/60 dark:bg-gray-800/50")}"><td class="px-4 py-2.5 font-bold font-heading text-primary-600 dark:text-primary-400">${ssrInterpolate(row.size)}</td><td class="px-4 py-2.5 text-gray-700 dark:text-gray-300 font-mono">${ssrInterpolate(row.chestIn)}</td><td class="px-4 py-2.5 text-gray-600 dark:text-gray-400 font-mono">${ssrInterpolate(row.chestCm)}</td><td class="px-4 py-2.5 text-gray-700 dark:text-gray-300 font-mono">${ssrInterpolate(row.lengthIn)} (${ssrInterpolate(row.lengthCm)}) </td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div>`);
          }
          _push2(`</div><div class="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700/60 flex justify-end">`);
          _push2(ssrRenderComponent(_component_BaseButton, {
            variant: "secondary",
            size: "sm",
            onClick: ($event) => emit("close")
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(` Close `);
              } else {
                return [
                  createTextVNode(" Close ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/order/SizeChartModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
function useOrderForm(sizes, sleeveTypes, basePrice) {
  const customerName = ref("");
  const contact = ref("");
  const notes = ref("");
  const honeypot = ref("");
  const focusedRowIndex = ref(0);
  const sizesRef = isRef(sizes) ? sizes : ref(sizes);
  const sleevesRef = isRef(sleeveTypes) ? sleeveTypes : ref(sleeveTypes);
  const basePriceRef = isRef(basePrice) ? basePrice : ref(basePrice);
  function createEmptyRow() {
    var _a, _b;
    return {
      _key: "item_" + Math.random().toString(36).slice(2, 9),
      shirtName: "",
      sizeLabel: ((_a = sizesRef.value[0]) == null ? void 0 : _a.label) || "M",
      sleeveLabel: ((_b = sleevesRef.value[0]) == null ? void 0 : _b.label) || "Short Sleeve",
      quantity: 1
    };
  }
  const items = ref([createEmptyRow()]);
  function addRow() {
    if (items.value.length < 20) {
      items.value.push(createEmptyRow());
      focusedRowIndex.value = items.value.length - 1;
    }
  }
  function removeRow(index) {
    if (items.value.length > 1) {
      items.value.splice(index, 1);
      if (focusedRowIndex.value >= items.value.length) {
        focusedRowIndex.value = Math.max(0, items.value.length - 1);
      }
    }
  }
  function duplicateRow(index) {
    if (items.value.length < 20 && items.value[index]) {
      const source = items.value[index];
      items.value.splice(index + 1, 0, {
        _key: "item_" + Math.random().toString(36).slice(2, 9),
        shirtName: source.shirtName,
        sizeLabel: source.sizeLabel,
        sleeveLabel: source.sleeveLabel,
        quantity: source.quantity
      });
      focusedRowIndex.value = index + 1;
    }
  }
  function updateRow(index, updated) {
    if (items.value[index]) {
      items.value[index] = updated;
    }
  }
  const focusedRow = computed(() => {
    return items.value[focusedRowIndex.value] || items.value[0];
  });
  const totalQuantity = computed(() => {
    return items.value.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  });
  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => {
      var _a, _b;
      const sizeSurcharge = ((_a = sizesRef.value.find((s) => s.label === item.sizeLabel)) == null ? void 0 : _a.surcharge) || 0;
      const sleeveSurcharge = ((_b = sleevesRef.value.find((st) => st.label === item.sleeveLabel)) == null ? void 0 : _b.surcharge) || 0;
      const unit = basePriceRef.value + sizeSurcharge + sleeveSurcharge;
      return sum + unit * (Number(item.quantity) || 0);
    }, 0);
  });
  function reset() {
    customerName.value = "";
    contact.value = "";
    notes.value = "";
    honeypot.value = "";
    items.value = [createEmptyRow()];
    focusedRowIndex.value = 0;
  }
  return {
    customerName,
    contact,
    notes,
    honeypot,
    items,
    focusedRowIndex,
    focusedRow,
    totalQuantity,
    totalPrice,
    addRow,
    removeRow,
    duplicateRow,
    updateRow,
    reset
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const toast = useToast();
    const { data: config, status, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/public/config",
      "$sE654L2RTl"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const showSizeChart = ref(false);
    const submitting = ref(false);
    const submittedOrder = ref(null);
    const idempotencyKey = ref("");
    const sizes = computed(() => {
      var _a;
      return ((_a = config.value) == null ? void 0 : _a.sizes) || [];
    });
    const sleeveTypes = computed(() => {
      var _a;
      return ((_a = config.value) == null ? void 0 : _a.sleeveTypes) || [];
    });
    const basePrice = computed(() => {
      var _a;
      return ((_a = config.value) == null ? void 0 : _a.basePrice) || 35;
    });
    const currency = computed(() => {
      var _a;
      return ((_a = config.value) == null ? void 0 : _a.currency) || "MYR";
    });
    const {
      customerName,
      contact,
      notes,
      honeypot,
      items,
      focusedRowIndex,
      focusedRow,
      totalQuantity,
      totalPrice,
      removeRow,
      duplicateRow,
      updateRow,
      reset
    } = useOrderForm(sizes, sleeveTypes, basePrice);
    const isClosed = computed(() => {
      if (!config.value) return false;
      if (!config.value.isOpen) return true;
      if (config.value.deadline) {
        const deadlineTime = new Date(config.value.deadline).getTime();
        return Date.now() > deadlineTime;
      }
      return false;
    });
    async function handleSubmit() {
      var _a, _b;
      if (isClosed.value) {
        toast.error("Ordering Closed", "This order is currently closed and no longer accepting submissions.");
        return;
      }
      const payload = {
        customerName: customerName.value,
        contact: contact.value,
        notes: notes.value,
        honeypot: honeypot.value,
        idempotencyKey: idempotencyKey.value,
        items: items.value.map((i) => ({
          shirtName: i.shirtName.trim(),
          sizeLabel: i.sizeLabel,
          sleeveLabel: i.sleeveLabel,
          quantity: Number(i.quantity)
        }))
      };
      const validation = createOrderSchema.safeParse(payload);
      if (!validation.success) {
        const firstError = ((_a = validation.error.errors[0]) == null ? void 0 : _a.message) || "Please check your order details.";
        toast.error("Validation error", firstError);
        return;
      }
      submitting.value = true;
      try {
        const res = await $fetch("/api/public/orders", {
          method: "POST",
          body: payload
        });
        submittedOrder.value = res.order;
        toast.success("Order placed!", `Your order code is ${res.order.code}`);
      } catch (err) {
        const msg = ((_b = err.data) == null ? void 0 : _b.message) || err.message || "Failed to submit order. Please try again.";
        toast.error("Order submission failed", msg);
      } finally {
        submitting.value = false;
      }
    }
    function handleNewOrder() {
      submittedOrder.value = null;
      reset();
      idempotencyKey.value = crypto.randomUUID ? crypto.randomUUID() : "idemp_" + Math.random().toString(36).slice(2);
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_BaseLoadingSkeleton = _sfc_main$a;
      const _component_Icon = __nuxt_component_1;
      const _component_BaseButton = _sfc_main$b;
      const _component_OrderSuccessScreen = _sfc_main$9;
      const _component_BaseCountdown = _sfc_main$8;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_BaseInput = _sfc_main$c;
      const _component_BaseTextarea = _sfc_main$d;
      const _component_OrderShirtRow = _sfc_main$4;
      const _component_OrderShirtPreview = _sfc_main$3;
      const _component_OrderSummaryBar = _sfc_main$2;
      const _component_OrderSizeChartModal = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-6 sm:py-12 px-4 sm:px-6" }, _attrs))}>`);
      if (unref(status) === "pending") {
        _push(`<div class="max-w-4xl mx-auto py-12">`);
        _push(ssrRenderComponent(_component_BaseLoadingSkeleton, {
          type: "card",
          lines: 6
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(error) || !unref(config)) {
        _push(`<div class="max-w-md mx-auto text-center py-12"><div class="bg-red-50 dark:bg-red-950/40 rounded-2xl p-6 border border-red-200 dark:border-red-800">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:alert-circle",
          class: "w-10 h-10 text-red-500 mx-auto mb-3"
        }, null, _parent));
        _push(`<h3 class="font-heading font-bold text-lg text-red-800 dark:text-red-200">Unable to load order form</h3><p class="text-xs text-red-600 dark:text-red-300 mt-1 mb-4">Please check your database connection or try refreshing.</p>`);
        _push(ssrRenderComponent(_component_BaseButton, {
          variant: "secondary",
          size: "sm",
          onClick: () => unref(refresh)()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Try Again`);
            } else {
              return [
                createTextVNode("Try Again")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else if (submittedOrder.value) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_OrderSuccessScreen, {
          "order-code": submittedOrder.value.code,
          order: submittedOrder.value,
          currency: currency.value,
          onNewOrder: handleNewOrder
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="max-w-6xl mx-auto space-y-8 pb-24 sm:pb-8"><div class="text-center max-w-3xl mx-auto space-y-4"><div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 text-xs font-semibold border border-primary-200/60 dark:border-primary-800/40">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:sparkles",
          class: "w-3.5 h-3.5 text-primary-500"
        }, null, _parent));
        _push(`<span>Starting at only ${ssrInterpolate(currency.value)} ${ssrInterpolate(basePrice.value.toFixed(2))} per shirt</span></div><h1 class="font-heading font-extrabold text-3xl sm:text-5xl text-gray-900 dark:text-white tracking-tight">${ssrInterpolate(unref(config).eventTitle || "Group Shirt Order")}</h1>`);
        if (unref(config).eventDescription) {
          _push(`<p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">${ssrInterpolate(unref(config).eventDescription)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="pt-2">`);
        if (isClosed.value) {
          _push(`<div class="inline-flex items-center gap-2 px-5 py-2.5 bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 rounded-2xl font-heading font-bold text-sm border border-red-200 dark:border-red-800/60 shadow-sm">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:lock",
            class: "w-4 h-4 text-red-500"
          }, null, _parent));
          _push(`<span>Ordering is currently closed</span></div>`);
        } else if (unref(config).deadline) {
          _push(`<div class="max-w-md mx-auto"><div class="text-[11px] uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500 mb-2"> Time Remaining Until Order Closes </div>`);
          _push(ssrRenderComponent(_component_BaseCountdown, {
            deadline: unref(config).deadline
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (isClosed.value) {
          _push(`<div class="max-w-xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-3xl border border-gray-200 dark:border-gray-700 text-center shadow-soft-lg space-y-4"><div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:calendar-x",
            class: "w-6 h-6"
          }, null, _parent));
          _push(`</div><h3 class="font-heading font-bold text-xl text-gray-900 dark:text-white">Submissions are Closed</h3><p class="text-sm text-gray-500 dark:text-gray-400"> The deadline for this shirt order has passed or the organizer has closed submissions. If you have already placed an order, you can still track it. </p>`);
          _push(ssrRenderComponent(_component_NuxtLink, { to: "/track" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_BaseButton, {
                  variant: "primary",
                  size: "md"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_Icon, {
                        name: "lucide:search",
                        class: "w-4 h-4 mr-1.5"
                      }, null, _parent3, _scopeId2));
                      _push3(`<span${_scopeId2}>Track Existing Order</span>`);
                    } else {
                      return [
                        createVNode(_component_Icon, {
                          name: "lucide:search",
                          class: "w-4 h-4 mr-1.5"
                        }),
                        createVNode("span", null, "Track Existing Order")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_BaseButton, {
                    variant: "primary",
                    size: "md"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "lucide:search",
                        class: "w-4 h-4 mr-1.5"
                      }),
                      createVNode("span", null, "Track Existing Order")
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-7 space-y-6"><div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-4"><h3 class="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:user",
            class: "w-5 h-5 text-primary-500"
          }, null, _parent));
          _push(`<span>1. Your Information</span></h3><div class="space-y-3">`);
          _push(ssrRenderComponent(_component_BaseInput, {
            modelValue: unref(customerName),
            "onUpdate:modelValue": ($event) => isRef(customerName) ? customerName.value = $event : null,
            label: "Full Name",
            placeholder: "e.g. Sarah Jenkins",
            required: ""
          }, null, _parent));
          _push(ssrRenderComponent(_component_BaseInput, {
            modelValue: unref(contact),
            "onUpdate:modelValue": ($event) => isRef(contact) ? contact.value = $event : null,
            label: "Phone Number or Email",
            placeholder: "e.g. +60123456789 or sarah@example.com",
            required: ""
          }, null, _parent));
          _push(`<div class="hidden" aria-hidden="true"><label for="order-website">Leave this field blank</label><input id="order-website"${ssrRenderAttr("value", unref(honeypot))} type="text" tabindex="-1" autocomplete="off"></div>`);
          _push(ssrRenderComponent(_component_BaseTextarea, {
            modelValue: unref(notes),
            "onUpdate:modelValue": ($event) => isRef(notes) ? notes.value = $event : null,
            label: "Special Notes or Delivery Instructions (Optional)",
            placeholder: "Any special remarks for the organizer...",
            rows: 2
          }, null, _parent));
          _push(`</div></div><div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-5"><div class="flex items-center justify-between"><div><h3 class="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:shirt",
            class: "w-5 h-5 text-primary-500"
          }, null, _parent));
          _push(`<span>2. Shirt Selection</span></h3><p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5"> Customize each shirt with a custom printed name, size, and sleeve style. </p></div><button type="button" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50 hover:bg-primary-100 dark:hover:bg-primary-900/60 border border-primary-200 dark:border-primary-800 transition">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:ruler",
            class: "w-3.5 h-3.5"
          }, null, _parent));
          _push(`<span>Size Chart</span></button></div><div class="space-y-4"><!--[-->`);
          ssrRenderList(unref(items), (item, idx) => {
            _push(ssrRenderComponent(_component_OrderShirtRow, {
              key: item._key,
              item,
              index: idx,
              sizes: sizes.value,
              "sleeve-types": sleeveTypes.value,
              "base-price": basePrice.value,
              currency: currency.value,
              "can-remove": unref(items).length > 1,
              "is-focused": unref(focusedRowIndex) === idx,
              onUpdate: (updated) => unref(updateRow)(idx, updated),
              onRemove: () => unref(removeRow)(idx),
              onDuplicate: () => unref(duplicateRow)(idx),
              onFocus: ($event) => focusedRowIndex.value = idx
            }, null, _parent));
          });
          _push(`<!--]--></div><div class="pt-2"><button type="button"${ssrIncludeBooleanAttr(unref(items).length >= 20) ? " disabled" : ""} class="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary-500 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-200 disabled:opacity-40">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:plus-circle",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`<span>Add Another Shirt (${ssrInterpolate(unref(items).length)}/20)</span></button></div></div></div><div class="lg:col-span-5 lg:sticky lg:top-24 space-y-4"><div class="text-xs uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500 px-1"> Live Preview of Item #${ssrInterpolate(unref(focusedRowIndex) + 1)}</div>`);
          _push(ssrRenderComponent(_component_OrderShirtPreview, {
            "shirt-name": (_a = unref(focusedRow)) == null ? void 0 : _a.shirtName,
            "sleeve-type": (_b = unref(focusedRow)) == null ? void 0 : _b.sleeveLabel,
            "size-label": (_c = unref(focusedRow)) == null ? void 0 : _c.sizeLabel
          }, null, _parent));
          _push(`<div class="hidden sm:block bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-5 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-4"><h4 class="font-heading font-bold text-sm text-gray-900 dark:text-white"> Order Total Summary </h4><div class="space-y-2 text-xs text-gray-600 dark:text-gray-300"><div class="flex justify-between"><span>Total Shirts</span><span class="font-bold text-gray-900 dark:text-white font-mono">${ssrInterpolate(unref(totalQuantity))}</span></div><div class="flex justify-between"><span>Base Price</span><span class="font-mono">${ssrInterpolate(currency.value)} ${ssrInterpolate(basePrice.value.toFixed(2))}</span></div><div class="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white"><span>Estimated Total</span><span class="font-heading text-primary-600 dark:text-primary-400 text-lg">${ssrInterpolate(currency.value)} ${ssrInterpolate(unref(totalPrice).toFixed(2))}</span></div></div>`);
          _push(ssrRenderComponent(_component_BaseButton, {
            variant: "primary",
            size: "lg",
            block: "",
            loading: submitting.value,
            disabled: unref(totalQuantity) === 0,
            class: "shadow-glow-primary",
            onClick: handleSubmit
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="flex items-center justify-center gap-2"${_scopeId}><span${_scopeId}>Submit Order</span>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "lucide:check",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`</span>`);
              } else {
                return [
                  createVNode("span", { class: "flex items-center justify-center gap-2" }, [
                    createVNode("span", null, "Submit Order"),
                    createVNode(_component_Icon, {
                      name: "lucide:check",
                      class: "w-4 h-4"
                    })
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div></div>`);
        }
        _push(ssrRenderComponent(_component_OrderSummaryBar, {
          "total-shirts": unref(totalQuantity),
          "total-price": unref(totalPrice),
          currency: currency.value,
          loading: submitting.value,
          onSubmit: handleSubmit
        }, null, _parent));
        _push(ssrRenderComponent(_component_OrderSizeChartModal, {
          open: showSizeChart.value,
          "image-url": unref(config).sizeChartImage,
          sizes: sizes.value,
          onClose: ($event) => showSizeChart.value = false
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C9LJ9krR.mjs.map
