import { u as useHead, a as useToast, _ as __nuxt_component_1 } from './server.mjs';
import { _ as _sfc_main$8 } from './BaseButton-BmqYBgHv.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, withCtx, createVNode, unref, toDisplayString, watch, createTextVNode, openBlock, createBlock, withDirectives, vModelSelect, vModelText, Fragment, renderList, createCommentVNode, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderSlot, ssrLooseContain, ssrLooseEqual, ssrRenderTeleport } from 'vue/server-renderer';
import { _ as _sfc_main$a } from './LoadingSkeleton-BZu8zmo9.mjs';
import { _ as _sfc_main$9 } from './StatusBadge-D8Eu5rRf.mjs';
import { _ as _sfc_main$b } from './BaseInput-B0Jc4KbN.mjs';
import { _ as _sfc_main$c } from './BaseTextarea-DXeX4GIo.mjs';
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

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "OrderFilters",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    sizes: {},
    sleeveTypes: {}
  },
  emits: ["update:modelValue", "reset"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const local = ref({ ...props.modelValue });
    watch(
      () => props.modelValue,
      (val) => {
        local.value = { ...val };
      },
      { deep: true }
    );
    const statusOptions = [
      { value: "", label: "All Order Statuses" },
      { value: "pending", label: "Pending" },
      { value: "confirmed", label: "Confirmed" },
      { value: "in_production", label: "In Production" },
      { value: "ready", label: "Ready" },
      { value: "delivered", label: "Delivered" },
      { value: "cancelled", label: "Cancelled" }
    ];
    const paymentOptions = [
      { value: "", label: "All Payment Statuses" },
      { value: "unpaid", label: "Unpaid" },
      { value: "partial", label: "Partial" },
      { value: "paid", label: "Paid" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-2xl border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-4" }, _attrs))}><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"><div class="relative lg:col-span-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:search",
        class: "w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", local.value.search || "")} type="text" placeholder="Search by code, customer, contact, shirt name..." class="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"></div><div><select${ssrRenderAttr("value", local.value.status || "")} class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition cursor-pointer"><!--[-->`);
      ssrRenderList(statusOptions, (opt) => {
        _push(`<option${ssrRenderAttr("value", opt.value)}>${ssrInterpolate(opt.label)}</option>`);
      });
      _push(`<!--]--></select></div><div><select${ssrRenderAttr("value", local.value.paymentStatus || "")} class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition cursor-pointer"><!--[-->`);
      ssrRenderList(paymentOptions, (opt) => {
        _push(`<option${ssrRenderAttr("value", opt.value)}>${ssrInterpolate(opt.label)}</option>`);
      });
      _push(`<!--]--></select></div></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1 border-t border-gray-100 dark:border-gray-700/40"><div><select${ssrRenderAttr("value", local.value.size || "")} class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition cursor-pointer"><option value="">All Sizes</option><!--[-->`);
      ssrRenderList(__props.sizes, (s) => {
        _push(`<option${ssrRenderAttr("value", s.label)}> Size: ${ssrInterpolate(s.label)}</option>`);
      });
      _push(`<!--]--></select></div><div><select${ssrRenderAttr("value", local.value.sleeve || "")} class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition cursor-pointer"><option value="">All Sleeve Types</option><!--[-->`);
      ssrRenderList(__props.sleeveTypes, (st) => {
        _push(`<option${ssrRenderAttr("value", st.label)}> Sleeve: ${ssrInterpolate(st.label)}</option>`);
      });
      _push(`<!--]--></select></div><div><input${ssrRenderAttr("value", local.value.dateFrom || "")} type="date" title="Date From" class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition cursor-pointer"></div><div><input${ssrRenderAttr("value", local.value.dateTo || "")} type="date" title="Date To" class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition cursor-pointer"></div><div><button type="button" class="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/60 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 transition flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:rotate-ccw",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(`<span>Reset Filters</span></button></div></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/OrderFilters.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "DataTable",
  __ssrInlineRender: true,
  props: {
    columns: {},
    rows: {},
    loading: { type: Boolean, default: false },
    emptyText: { default: "No records found" },
    selectable: { type: Boolean, default: false },
    selectedIds: { default: () => [] },
    sortBy: {},
    sortDir: { default: "desc" }
  },
  emits: ["sort", "select", "rowClick"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isAllSelected = computed(() => {
      if (!props.rows || props.rows.length === 0) return false;
      return props.rows.every((row) => props.selectedIds.includes(row.id));
    });
    const isIndeterminate = computed(() => {
      if (!props.rows || props.rows.length === 0) return false;
      const selectedCount = props.rows.filter((row) => props.selectedIds.includes(row.id)).length;
      return selectedCount > 0 && selectedCount < props.rows.length;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_BaseLoadingSkeleton = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/60 shadow-soft overflow-hidden" }, _attrs))}><div class="overflow-x-auto"><table class="w-full text-left border-collapse text-xs sm:text-sm"><thead class="bg-gray-50/80 dark:bg-gray-900/50 text-gray-600 dark:text-gray-300 font-heading border-b border-gray-100 dark:border-gray-700/60"><tr>`);
      if (__props.selectable) {
        _push(`<th class="w-10 px-4 py-3.5"><input type="checkbox"${ssrIncludeBooleanAttr(isAllSelected.value) ? " checked" : ""}${ssrRenderAttr("indeterminate", isIndeterminate.value)} class="rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer w-4 h-4" aria-label="Select all rows"></th>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.columns, (col) => {
        _push(`<th class="${ssrRenderClass([
          "px-4 py-3.5 font-bold tracking-wider uppercase text-[11px]",
          col.sortable ? "cursor-pointer select-none hover:text-primary-600 dark:hover:text-primary-400" : "",
          col.class || ""
        ])}"><div class="flex items-center gap-1.5"><span>${ssrInterpolate(col.label)}</span>`);
        if (col.sortable) {
          _push(`<span class="inline-flex">`);
          if (__props.sortBy === col.key) {
            _push(ssrRenderComponent(_component_Icon, {
              name: __props.sortDir === "asc" ? "lucide:arrow-up" : "lucide:arrow-down",
              class: "w-3.5 h-3.5 text-primary-600 dark:text-primary-400"
            }, null, _parent));
          } else {
            _push(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-up-down",
              class: "w-3.5 h-3.5 text-gray-300 dark:text-gray-600"
            }, null, _parent));
          }
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></th>`);
      });
      _push(`<!--]--></tr></thead><tbody class="divide-y divide-gray-100 dark:divide-gray-700/50">`);
      if (__props.loading) {
        _push(`<tr><td${ssrRenderAttr("colspan", __props.columns.length + (__props.selectable ? 1 : 0))} class="p-8">`);
        _push(ssrRenderComponent(_component_BaseLoadingSkeleton, {
          type: "table",
          lines: 6
        }, null, _parent));
        _push(`</td></tr>`);
      } else if (__props.rows.length === 0) {
        _push(`<tr><td${ssrRenderAttr("colspan", __props.columns.length + (__props.selectable ? 1 : 0))} class="py-12 px-4 text-center"><div class="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:inbox",
          class: "w-10 h-10 mb-2 stroke-1"
        }, null, _parent));
        _push(`<p class="text-sm font-medium">${ssrInterpolate(__props.emptyText)}</p></div></td></tr>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(__props.rows, (row, idx) => {
          _push(`<tr class="${ssrRenderClass([
            "transition-colors duration-150 cursor-pointer group",
            __props.selectedIds.includes(row.id) ? "bg-primary-50/40 dark:bg-primary-950/20" : "hover:bg-gray-50/80 dark:hover:bg-gray-700/30"
          ])}">`);
          if (__props.selectable) {
            _push(`<td class="px-4 py-3.5"><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectedIds.includes(row.id)) ? " checked" : ""} class="rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer w-4 h-4"${ssrRenderAttr("aria-label", `Select row ${row.code || idx}`)}></td>`);
          } else {
            _push(`<!---->`);
          }
          ssrRenderSlot(_ctx.$slots, "row", { row }, () => {
            _push(`<!--[-->`);
            ssrRenderList(__props.columns, (col) => {
              _push(`<td class="${ssrRenderClass(["px-4 py-3.5 text-gray-700 dark:text-gray-300", col.class || ""])}">${ssrInterpolate(row[col.key])}</td>`);
            });
            _push(`<!--]-->`);
          }, _push, _parent);
          _push(`</tr>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/DataTable.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ConfirmDialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    title: { default: "Confirm Action" },
    message: { default: "Are you sure you want to proceed?" },
    confirmText: { default: "Confirm" },
    cancelText: { default: "Cancel" },
    variant: { default: "primary" }
  },
  emits: ["confirm", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    ref(null);
    const confirmBtnRef = ref(null);
    const variantConfig = computed(() => {
      const configs = {
        danger: {
          icon: "lucide:alert-triangle",
          iconBg: "bg-red-100 dark:bg-red-900/30",
          iconColor: "text-red-600 dark:text-red-400",
          buttonVariant: "danger"
        },
        warning: {
          icon: "lucide:alert-circle",
          iconBg: "bg-amber-100 dark:bg-amber-900/30",
          iconColor: "text-amber-600 dark:text-amber-400",
          buttonVariant: "primary"
        },
        primary: {
          icon: "lucide:info",
          iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
          iconColor: "text-indigo-600 dark:text-indigo-400",
          buttonVariant: "primary"
        }
      };
      return configs[props.variant];
    });
    watch(
      () => props.open,
      (isOpen) => {
        if (isOpen) {
          nextTick(() => {
            var _a;
            (_a = confirmBtnRef.value) == null ? void 0 : _a.focus();
          });
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_BaseButton = _sfc_main$8;
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.open) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true"${ssrRenderAttr("aria-label", __props.title)}><div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div><template><div class="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 shadow-2xl p-6"><div class="flex items-start gap-4"><div class="${ssrRenderClass([[unref(variantConfig).iconBg], "shrink-0 w-10 h-10 rounded-full flex items-center justify-center"])}">`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: unref(variantConfig).icon,
            class: ["w-5 h-5", [unref(variantConfig).iconColor]],
            "aria-hidden": "true"
          }, null, _parent));
          _push2(`</div><div class="flex-1 min-w-0"><h3 class="text-lg font-heading font-semibold text-gray-900 dark:text-white">${ssrInterpolate(__props.title)}</h3><p class="mt-2 text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(__props.message)}</p></div></div><div class="mt-6 flex items-center justify-end gap-3">`);
          _push2(ssrRenderComponent(_component_BaseButton, {
            variant: "ghost",
            size: "sm",
            onClick: ($event) => emit("cancel")
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`${ssrInterpolate(__props.cancelText)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(__props.cancelText), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(_component_BaseButton, {
            ref_key: "confirmBtnRef",
            ref: confirmBtnRef,
            variant: unref(variantConfig).buttonVariant,
            size: "sm",
            onClick: ($event) => emit("confirm")
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`${ssrInterpolate(__props.confirmText)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(__props.confirmText), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></div></template></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/ConfirmDialog.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "BulkActions",
  __ssrInlineRender: true,
  props: {
    selectedCount: {},
    selectedIds: {}
  },
  emits: ["action", "clear"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const showDeleteConfirm = ref(false);
    function confirmDelete() {
      showDeleteConfirm.value = false;
      emit("action", { action: "delete" });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_BaseConfirmDialog = _sfc_main$5;
      if (__props.selectedCount > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-gray-900/95 dark:bg-gray-800/95 text-white backdrop-blur-xl px-5 py-3 rounded-2xl shadow-soft-xl border border-gray-700 flex flex-wrap items-center gap-3 animate-slide-up" }, _attrs))}><div class="flex items-center gap-2 pr-3 border-r border-gray-700"><span class="w-6 h-6 rounded-full bg-primary-500 text-white font-bold text-xs flex items-center justify-center">${ssrInterpolate(__props.selectedCount)}</span><span class="text-xs font-semibold text-gray-200">Selected</span></div><select class="text-xs font-medium bg-gray-800 dark:bg-gray-700 text-white border border-gray-600 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"><option value="" disabled selected>Change Status...</option><option value="pending">Set Pending</option><option value="confirmed">Set Confirmed</option><option value="in_production">Set In Production</option><option value="ready">Set Ready</option><option value="delivered">Set Delivered</option><option value="cancelled">Set Cancelled</option></select><select class="text-xs font-medium bg-gray-800 dark:bg-gray-700 text-white border border-gray-600 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"><option value="" disabled selected>Change Payment...</option><option value="unpaid">Set Unpaid</option><option value="partial">Set Partial</option><option value="paid">Set Paid</option></select><button type="button" class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-red-500">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:trash-2",
          class: "w-3.5 h-3.5"
        }, null, _parent));
        _push(`<span>Delete</span></button><button type="button" class="p-1 rounded-lg text-gray-400 hover:text-white transition ml-1" title="Deselect all">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:x",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button>`);
        _push(ssrRenderComponent(_component_BaseConfirmDialog, {
          open: showDeleteConfirm.value,
          title: "Delete Selected Orders?",
          message: `Are you sure you want to permanently delete ${__props.selectedCount} selected orders? This action cannot be undone.`,
          "confirm-text": "Delete Orders",
          variant: "danger",
          onConfirm: confirmDelete,
          onCancel: ($event) => showDeleteConfirm.value = false
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/BulkActions.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Drawer",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    title: { default: "" },
    width: { default: "md" }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const drawerRef = ref(null);
    const widthClasses = {
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl"
    };
    watch(
      () => props.open,
      (isOpen) => {
        if (isOpen) {
          nextTick(() => {
            var _a;
            const closeBtn = (_a = drawerRef.value) == null ? void 0 : _a.querySelector("button");
            closeBtn == null ? void 0 : closeBtn.focus();
          });
          (void 0).body.style.overflow = "hidden";
        } else {
          (void 0).body.style.overflow = "";
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.open) {
          _push2(`<div class="fixed inset-0 z-50" role="dialog" aria-modal="true"${ssrRenderAttr("aria-label", __props.title || "Drawer")}><div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div><template><div class="${ssrRenderClass([[widthClasses[__props.width]], "absolute right-0 top-0 h-full w-full bg-white dark:bg-gray-800 shadow-2xl flex flex-col"])}"><div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 shrink-0"><h2 class="text-lg font-heading font-semibold text-gray-900 dark:text-white truncate">${ssrInterpolate(__props.title)}</h2><button type="button" class="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" aria-label="Close drawer">`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "lucide:x",
            class: "w-5 h-5",
            "aria-hidden": "true"
          }, null, _parent));
          _push2(`</button></div><div class="flex-1 overflow-y-auto px-6 py-4">`);
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
          _push2(`</div>`);
          if (_ctx.$slots.footer) {
            _push2(`<div class="shrink-0 border-t border-gray-200 dark:border-gray-700 px-6 py-4">`);
            ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent);
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></template></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Drawer.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "OrderDrawer",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    orderId: {},
    sizes: {},
    sleeveTypes: {},
    currency: {}
  },
  emits: ["close", "updated", "deleted"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const toast = useToast();
    const loading = ref(false);
    const saving = ref(false);
    const deleting = ref(false);
    const showDeleteConfirm = ref(false);
    const order = ref(null);
    const form = ref({
      customerName: "",
      contact: "",
      notes: "",
      adminNotes: "",
      status: "pending",
      paymentStatus: "unpaid",
      amountPaid: 0,
      items: []
    });
    async function fetchOrderDetails() {
      if (!props.orderId) return;
      loading.value = true;
      try {
        const data = await $fetch(`/api/admin/orders/${props.orderId}`);
        order.value = data;
        form.value = {
          customerName: data.customerName,
          contact: data.contact,
          notes: data.notes || "",
          adminNotes: data.adminNotes || "",
          status: data.status,
          paymentStatus: data.paymentStatus,
          amountPaid: Number(data.amountPaid) || 0,
          items: data.items.map((i) => ({
            shirtName: i.shirtName,
            sizeLabel: i.sizeLabel,
            sleeveLabel: i.sleeveLabel,
            quantity: i.quantity
          }))
        };
      } catch (err) {
        toast.error("Failed to load order", err.message || "Server error");
      } finally {
        loading.value = false;
      }
    }
    watch(
      () => props.orderId,
      (newId) => {
        if (newId && props.open) {
          fetchOrderDetails();
        }
      },
      { immediate: true }
    );
    watch(
      () => props.open,
      (isOpen) => {
        if (isOpen && props.orderId) {
          fetchOrderDetails();
        }
      }
    );
    function addItem() {
      var _a, _b;
      if (form.value.items.length >= 20) return;
      const defaultSize = ((_a = props.sizes[0]) == null ? void 0 : _a.label) || "M";
      const defaultSleeve = ((_b = props.sleeveTypes[0]) == null ? void 0 : _b.label) || "Short Sleeve";
      form.value.items.push({
        shirtName: "",
        sizeLabel: defaultSize,
        sleeveLabel: defaultSleeve,
        quantity: 1
      });
    }
    function removeItem(idx) {
      if (form.value.items.length > 1) {
        form.value.items.splice(idx, 1);
      }
    }
    async function saveOrder() {
      var _a;
      if (!props.orderId) return;
      if (!form.value.customerName.trim()) {
        toast.error("Validation error", "Customer name is required");
        return;
      }
      if (!form.value.contact.trim()) {
        toast.error("Validation error", "Contact info is required");
        return;
      }
      saving.value = true;
      try {
        const updated = await $fetch(`/api/admin/orders/${props.orderId}`, {
          method: "PUT",
          body: form.value
        });
        order.value = updated;
        toast.success("Order updated", "Changes have been saved successfully.");
        emit("updated", updated);
        emit("close");
      } catch (err) {
        toast.error("Failed to save order", ((_a = err.data) == null ? void 0 : _a.message) || err.message);
      } finally {
        saving.value = false;
      }
    }
    async function deleteOrder() {
      if (!props.orderId) return;
      deleting.value = true;
      try {
        await $fetch(`/api/admin/orders/${props.orderId}`, { method: "DELETE" });
        toast.success("Order deleted", "Order removed successfully.");
        emit("deleted", props.orderId);
        emit("close");
      } catch (err) {
        toast.error("Failed to delete order", err.message);
      } finally {
        deleting.value = false;
        showDeleteConfirm.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseDrawer = _sfc_main$3;
      const _component_BaseLoadingSkeleton = _sfc_main$a;
      const _component_BaseStatusBadge = _sfc_main$9;
      const _component_Icon = __nuxt_component_1;
      const _component_BaseInput = _sfc_main$b;
      const _component_BaseTextarea = _sfc_main$c;
      const _component_BaseButton = _sfc_main$8;
      const _component_BaseConfirmDialog = _sfc_main$5;
      _push(ssrRenderComponent(_component_BaseDrawer, mergeProps({
        open: __props.open,
        title: "Order Details",
        width: "xl",
        onClose: ($event) => emit("close")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (loading.value) {
              _push2(`<div class="p-6"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseLoadingSkeleton, {
                type: "card",
                lines: 6
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (order.value) {
              _push2(`<div class="p-6 space-y-6"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-3 p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700"${_scopeId}><div${_scopeId}><span class="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400"${_scopeId}>Order Code</span><div class="font-mono font-extrabold text-xl text-primary-600 dark:text-primary-400"${_scopeId}>${ssrInterpolate(order.value.code)}</div><div class="text-[11px] text-gray-400 mt-0.5"${_scopeId}> Placed on ${ssrInterpolate(new Date(order.value.createdAt).toLocaleString())}</div></div><div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseStatusBadge, {
                status: form.value.status,
                type: "order"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_BaseStatusBadge, {
                status: form.value.paymentStatus,
                type: "payment"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="space-y-3"${_scopeId}><h4 class="font-heading font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:user",
                class: "w-4 h-4 text-primary-500"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Customer Information</span></h4><div class="grid grid-cols-1 sm:grid-cols-2 gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseInput, {
                modelValue: form.value.customerName,
                "onUpdate:modelValue": ($event) => form.value.customerName = $event,
                label: "Customer Name",
                placeholder: "Full Name",
                required: ""
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_BaseInput, {
                modelValue: form.value.contact,
                "onUpdate:modelValue": ($event) => form.value.contact = $event,
                label: "Contact (Phone / Email)",
                placeholder: "e.g. +60123456789 or email@domain.com",
                required: ""
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_BaseTextarea, {
                modelValue: form.value.notes,
                "onUpdate:modelValue": ($event) => form.value.notes = $event,
                label: "Customer Notes",
                placeholder: "Notes provided by customer",
                rows: 2
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-700/60"${_scopeId}><h4 class="font-heading font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:sliders",
                class: "w-4 h-4 text-primary-500"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Order &amp; Payment Status</span></h4><div class="grid grid-cols-1 sm:grid-cols-3 gap-3"${_scopeId}><div${_scopeId}><label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"${_scopeId}> Order Status </label><select class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"${_scopeId}><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "pending") : ssrLooseEqual(form.value.status, "pending")) ? " selected" : ""}${_scopeId}>Pending</option><option value="confirmed"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "confirmed") : ssrLooseEqual(form.value.status, "confirmed")) ? " selected" : ""}${_scopeId}>Confirmed</option><option value="in_production"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "in_production") : ssrLooseEqual(form.value.status, "in_production")) ? " selected" : ""}${_scopeId}>In Production</option><option value="ready"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "ready") : ssrLooseEqual(form.value.status, "ready")) ? " selected" : ""}${_scopeId}>Ready</option><option value="delivered"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "delivered") : ssrLooseEqual(form.value.status, "delivered")) ? " selected" : ""}${_scopeId}>Delivered</option><option value="cancelled"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "cancelled") : ssrLooseEqual(form.value.status, "cancelled")) ? " selected" : ""}${_scopeId}>Cancelled</option></select></div><div${_scopeId}><label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"${_scopeId}> Payment Status </label><select class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"${_scopeId}><option value="unpaid"${ssrIncludeBooleanAttr(Array.isArray(form.value.paymentStatus) ? ssrLooseContain(form.value.paymentStatus, "unpaid") : ssrLooseEqual(form.value.paymentStatus, "unpaid")) ? " selected" : ""}${_scopeId}>Unpaid</option><option value="partial"${ssrIncludeBooleanAttr(Array.isArray(form.value.paymentStatus) ? ssrLooseContain(form.value.paymentStatus, "partial") : ssrLooseEqual(form.value.paymentStatus, "partial")) ? " selected" : ""}${_scopeId}>Partial</option><option value="paid"${ssrIncludeBooleanAttr(Array.isArray(form.value.paymentStatus) ? ssrLooseContain(form.value.paymentStatus, "paid") : ssrLooseEqual(form.value.paymentStatus, "paid")) ? " selected" : ""}${_scopeId}>Paid</option></select></div><div${_scopeId}><label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"${_scopeId}> Amount Paid (${ssrInterpolate(__props.currency)}) </label><input${ssrRenderAttr("value", form.value.amountPaid)} type="number" step="0.01" min="0" class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"${_scopeId}></div></div>`);
              _push2(ssrRenderComponent(_component_BaseTextarea, {
                modelValue: form.value.adminNotes,
                "onUpdate:modelValue": ($event) => form.value.adminNotes = $event,
                label: "Internal Admin Notes",
                placeholder: "Private notes visible only to admin team",
                rows: 2
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-700/60"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><h4 class="font-heading font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:shirt",
                class: "w-4 h-4 text-primary-500"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Shirt Line Items (${ssrInterpolate(form.value.items.length)})</span></h4><button type="button"${ssrIncludeBooleanAttr(form.value.items.length >= 20) ? " disabled" : ""} class="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 flex items-center gap-1 disabled:opacity-40"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:plus",
                class: "w-3.5 h-3.5"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Add Item</span></button></div><div class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList(form.value.items, (item, idx) => {
                _push2(`<div class="p-3 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-700/70 space-y-2 text-xs"${_scopeId}><div class="flex items-center justify-between gap-2"${_scopeId}><span class="font-bold text-gray-500"${_scopeId}>#${ssrInterpolate(idx + 1)}</span>`);
                if (form.value.items.length > 1) {
                  _push2(`<button type="button" class="text-red-500 hover:text-red-700 p-1 rounded" title="Remove item"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_Icon, {
                    name: "lucide:trash-2",
                    class: "w-3.5 h-3.5"
                  }, null, _parent2, _scopeId));
                  _push2(`</button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="grid grid-cols-1 sm:grid-cols-4 gap-2"${_scopeId}><div class="sm:col-span-1"${_scopeId}><input${ssrRenderAttr("value", item.shirtName)} type="text" maxlength="20" placeholder="Name on shirt" class="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 uppercase"${_scopeId}></div><div${_scopeId}><select class="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"${_scopeId}><!--[-->`);
                ssrRenderList(__props.sizes, (s) => {
                  _push2(`<option${ssrRenderAttr("value", s.label)}${ssrIncludeBooleanAttr(Array.isArray(item.sizeLabel) ? ssrLooseContain(item.sizeLabel, s.label) : ssrLooseEqual(item.sizeLabel, s.label)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(s.label)}</option>`);
                });
                _push2(`<!--]--></select></div><div${_scopeId}><select class="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"${_scopeId}><!--[-->`);
                ssrRenderList(__props.sleeveTypes, (st) => {
                  _push2(`<option${ssrRenderAttr("value", st.label)}${ssrIncludeBooleanAttr(Array.isArray(item.sleeveLabel) ? ssrLooseContain(item.sleeveLabel, st.label) : ssrLooseEqual(item.sleeveLabel, st.label)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(st.label)}</option>`);
                });
                _push2(`<!--]--></select></div><div${_scopeId}><input${ssrRenderAttr("value", item.quantity)} type="number" min="1" max="20" class="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center font-bold"${_scopeId}></div></div></div>`);
              });
              _push2(`<!--]--></div></div><div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700"${_scopeId}><button type="button" class="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:trash-2",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Delete Order</span></button><div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseButton, {
                variant: "secondary",
                size: "md",
                onClick: ($event) => emit("close")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Cancel `);
                  } else {
                    return [
                      createTextVNode(" Cancel ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_BaseButton, {
                variant: "primary",
                size: "md",
                loading: saving.value,
                onClick: saveOrder
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Save Changes `);
                  } else {
                    return [
                      createTextVNode(" Save Changes ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_BaseConfirmDialog, {
              open: showDeleteConfirm.value,
              title: "Delete Order?",
              message: "Are you sure you want to delete this order? All associated line items will also be permanently removed.",
              "confirm-text": "Delete",
              variant: "danger",
              onConfirm: deleteOrder,
              onCancel: ($event) => showDeleteConfirm.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              loading.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "p-6"
              }, [
                createVNode(_component_BaseLoadingSkeleton, {
                  type: "card",
                  lines: 6
                })
              ])) : order.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: "p-6 space-y-6"
              }, [
                createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3 p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700" }, [
                  createVNode("div", null, [
                    createVNode("span", { class: "text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400" }, "Order Code"),
                    createVNode("div", { class: "font-mono font-extrabold text-xl text-primary-600 dark:text-primary-400" }, toDisplayString(order.value.code), 1),
                    createVNode("div", { class: "text-[11px] text-gray-400 mt-0.5" }, " Placed on " + toDisplayString(new Date(order.value.createdAt).toLocaleString()), 1)
                  ]),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode(_component_BaseStatusBadge, {
                      status: form.value.status,
                      type: "order"
                    }, null, 8, ["status"]),
                    createVNode(_component_BaseStatusBadge, {
                      status: form.value.paymentStatus,
                      type: "payment"
                    }, null, 8, ["status"])
                  ])
                ]),
                createVNode("div", { class: "space-y-3" }, [
                  createVNode("h4", { class: "font-heading font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2" }, [
                    createVNode(_component_Icon, {
                      name: "lucide:user",
                      class: "w-4 h-4 text-primary-500"
                    }),
                    createVNode("span", null, "Customer Information")
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-3" }, [
                    createVNode(_component_BaseInput, {
                      modelValue: form.value.customerName,
                      "onUpdate:modelValue": ($event) => form.value.customerName = $event,
                      label: "Customer Name",
                      placeholder: "Full Name",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_BaseInput, {
                      modelValue: form.value.contact,
                      "onUpdate:modelValue": ($event) => form.value.contact = $event,
                      label: "Contact (Phone / Email)",
                      placeholder: "e.g. +60123456789 or email@domain.com",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(_component_BaseTextarea, {
                    modelValue: form.value.notes,
                    "onUpdate:modelValue": ($event) => form.value.notes = $event,
                    label: "Customer Notes",
                    placeholder: "Notes provided by customer",
                    rows: 2
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "space-y-3 pt-3 border-t border-gray-100 dark:border-gray-700/60" }, [
                  createVNode("h4", { class: "font-heading font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2" }, [
                    createVNode(_component_Icon, {
                      name: "lucide:sliders",
                      class: "w-4 h-4 text-primary-500"
                    }),
                    createVNode("span", null, "Order & Payment Status")
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-3" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1" }, " Order Status "),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => form.value.status = $event,
                        class: "w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      }, [
                        createVNode("option", { value: "pending" }, "Pending"),
                        createVNode("option", { value: "confirmed" }, "Confirmed"),
                        createVNode("option", { value: "in_production" }, "In Production"),
                        createVNode("option", { value: "ready" }, "Ready"),
                        createVNode("option", { value: "delivered" }, "Delivered"),
                        createVNode("option", { value: "cancelled" }, "Cancelled")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, form.value.status]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1" }, " Payment Status "),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => form.value.paymentStatus = $event,
                        class: "w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      }, [
                        createVNode("option", { value: "unpaid" }, "Unpaid"),
                        createVNode("option", { value: "partial" }, "Partial"),
                        createVNode("option", { value: "paid" }, "Paid")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, form.value.paymentStatus]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1" }, " Amount Paid (" + toDisplayString(__props.currency) + ") ", 1),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => form.value.amountPaid = $event,
                        type: "number",
                        step: "0.01",
                        min: "0",
                        class: "w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [
                          vModelText,
                          form.value.amountPaid,
                          void 0,
                          { number: true }
                        ]
                      ])
                    ])
                  ]),
                  createVNode(_component_BaseTextarea, {
                    modelValue: form.value.adminNotes,
                    "onUpdate:modelValue": ($event) => form.value.adminNotes = $event,
                    label: "Internal Admin Notes",
                    placeholder: "Private notes visible only to admin team",
                    rows: 2
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "space-y-3 pt-3 border-t border-gray-100 dark:border-gray-700/60" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("h4", { class: "font-heading font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2" }, [
                      createVNode(_component_Icon, {
                        name: "lucide:shirt",
                        class: "w-4 h-4 text-primary-500"
                      }),
                      createVNode("span", null, "Shirt Line Items (" + toDisplayString(form.value.items.length) + ")", 1)
                    ]),
                    createVNode("button", {
                      type: "button",
                      disabled: form.value.items.length >= 20,
                      class: "text-xs font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 flex items-center gap-1 disabled:opacity-40",
                      onClick: addItem
                    }, [
                      createVNode(_component_Icon, {
                        name: "lucide:plus",
                        class: "w-3.5 h-3.5"
                      }),
                      createVNode("span", null, "Add Item")
                    ], 8, ["disabled"])
                  ]),
                  createVNode("div", { class: "space-y-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(form.value.items, (item, idx) => {
                      return openBlock(), createBlock("div", {
                        key: idx,
                        class: "p-3 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-700/70 space-y-2 text-xs"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                          createVNode("span", { class: "font-bold text-gray-500" }, "#" + toDisplayString(idx + 1), 1),
                          form.value.items.length > 1 ? (openBlock(), createBlock("button", {
                            key: 0,
                            type: "button",
                            class: "text-red-500 hover:text-red-700 p-1 rounded",
                            title: "Remove item",
                            onClick: ($event) => removeItem(idx)
                          }, [
                            createVNode(_component_Icon, {
                              name: "lucide:trash-2",
                              class: "w-3.5 h-3.5"
                            })
                          ], 8, ["onClick"])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-4 gap-2" }, [
                          createVNode("div", { class: "sm:col-span-1" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => item.shirtName = $event,
                              type: "text",
                              maxlength: "20",
                              placeholder: "Name on shirt",
                              class: "w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 uppercase"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, item.shirtName]
                            ])
                          ]),
                          createVNode("div", null, [
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => item.sizeLabel = $event,
                              class: "w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.sizes, (s) => {
                                return openBlock(), createBlock("option", {
                                  key: s.id,
                                  value: s.label
                                }, toDisplayString(s.label), 9, ["value"]);
                              }), 128))
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, item.sizeLabel]
                            ])
                          ]),
                          createVNode("div", null, [
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => item.sleeveLabel = $event,
                              class: "w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.sleeveTypes, (st) => {
                                return openBlock(), createBlock("option", {
                                  key: st.id,
                                  value: st.label
                                }, toDisplayString(st.label), 9, ["value"]);
                              }), 128))
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, item.sleeveLabel]
                            ])
                          ]),
                          createVNode("div", null, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => item.quantity = $event,
                              type: "number",
                              min: "1",
                              max: "20",
                              class: "w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center font-bold"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [
                                vModelText,
                                item.quantity,
                                void 0,
                                { number: true }
                              ]
                            ])
                          ])
                        ])
                      ]);
                    }), 128))
                  ])
                ]),
                createVNode("div", { class: "flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700" }, [
                  createVNode("button", {
                    type: "button",
                    class: "text-xs font-semibold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1",
                    onClick: ($event) => showDeleteConfirm.value = true
                  }, [
                    createVNode(_component_Icon, {
                      name: "lucide:trash-2",
                      class: "w-4 h-4"
                    }),
                    createVNode("span", null, "Delete Order")
                  ], 8, ["onClick"]),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode(_component_BaseButton, {
                      variant: "secondary",
                      size: "md",
                      onClick: ($event) => emit("close")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Cancel ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_BaseButton, {
                      variant: "primary",
                      size: "md",
                      loading: saving.value,
                      onClick: saveOrder
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Save Changes ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ])
                ])
              ])) : createCommentVNode("", true),
              createVNode(_component_BaseConfirmDialog, {
                open: showDeleteConfirm.value,
                title: "Delete Order?",
                message: "Are you sure you want to delete this order? All associated line items will also be permanently removed.",
                "confirm-text": "Delete",
                variant: "danger",
                onConfirm: deleteOrder,
                onCancel: ($event) => showDeleteConfirm.value = false
              }, null, 8, ["open", "onCancel"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/OrderDrawer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CreateOrderModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    sizes: {},
    sleeveTypes: {},
    basePrice: {},
    currency: {}
  },
  emits: ["close", "created"],
  setup(__props, { emit: __emit }) {
    var _a, _b;
    const props = __props;
    const emit = __emit;
    const toast = useToast();
    const submitting = ref(false);
    const form = ref({
      customerName: "",
      contact: "",
      notes: "",
      adminNotes: "",
      status: "pending",
      paymentStatus: "unpaid",
      amountPaid: 0,
      items: [
        {
          shirtName: "",
          sizeLabel: ((_a = props.sizes[0]) == null ? void 0 : _a.label) || "M",
          sleeveLabel: ((_b = props.sleeveTypes[0]) == null ? void 0 : _b.label) || "Short Sleeve",
          quantity: 1
        }
      ]
    });
    function addItem() {
      var _a2, _b2;
      if (form.value.items.length >= 20) return;
      form.value.items.push({
        shirtName: "",
        sizeLabel: ((_a2 = props.sizes[0]) == null ? void 0 : _a2.label) || "M",
        sleeveLabel: ((_b2 = props.sleeveTypes[0]) == null ? void 0 : _b2.label) || "Short Sleeve",
        quantity: 1
      });
    }
    function removeItem(idx) {
      if (form.value.items.length > 1) {
        form.value.items.splice(idx, 1);
      }
    }
    async function submitOrder() {
      var _a2, _b2, _c;
      if (!form.value.customerName.trim()) {
        toast.error("Validation error", "Customer name is required");
        return;
      }
      if (!form.value.contact.trim()) {
        toast.error("Validation error", "Contact info is required");
        return;
      }
      for (let i = 0; i < form.value.items.length; i++) {
        const item = form.value.items[i];
        if (!item.shirtName.trim()) {
          toast.error("Validation error", `Shirt #${i + 1} name is required`);
          return;
        }
      }
      submitting.value = true;
      try {
        const created = await $fetch("/api/admin/orders", {
          method: "POST",
          body: form.value
        });
        toast.success("Order created", `Order ${created.code} successfully placed.`);
        emit("created", created);
        emit("close");
        form.value = {
          customerName: "",
          contact: "",
          notes: "",
          adminNotes: "",
          status: "pending",
          paymentStatus: "unpaid",
          amountPaid: 0,
          items: [
            {
              shirtName: "",
              sizeLabel: ((_a2 = props.sizes[0]) == null ? void 0 : _a2.label) || "M",
              sleeveLabel: ((_b2 = props.sleeveTypes[0]) == null ? void 0 : _b2.label) || "Short Sleeve",
              quantity: 1
            }
          ]
        };
      } catch (err) {
        toast.error("Failed to create order", ((_c = err.data) == null ? void 0 : _c.message) || err.message);
      } finally {
        submitting.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseDrawer = _sfc_main$3;
      const _component_BaseInput = _sfc_main$b;
      const _component_BaseTextarea = _sfc_main$c;
      const _component_Icon = __nuxt_component_1;
      const _component_BaseButton = _sfc_main$8;
      _push(ssrRenderComponent(_component_BaseDrawer, mergeProps({
        open: __props.open,
        title: "Create Manual Order",
        width: "lg",
        onClose: ($event) => emit("close")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 space-y-5"${_scopeId}><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}> Create an order manually as administrator. This bypasses public deadlines and rate limits. </p><div class="space-y-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseInput, {
              modelValue: form.value.customerName,
              "onUpdate:modelValue": ($event) => form.value.customerName = $event,
              label: "Customer Full Name",
              placeholder: "e.g. Jane Doe",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseInput, {
              modelValue: form.value.contact,
              "onUpdate:modelValue": ($event) => form.value.contact = $event,
              label: "Contact (Phone / Email)",
              placeholder: "e.g. +60123456789 or email@domain.com",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseTextarea, {
              modelValue: form.value.notes,
              "onUpdate:modelValue": ($event) => form.value.notes = $event,
              label: "Customer Notes",
              placeholder: "Optional notes",
              rows: 2
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-100 dark:border-gray-700"${_scopeId}><div${_scopeId}><label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"${_scopeId}>Status</label><select class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"${_scopeId}><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "pending") : ssrLooseEqual(form.value.status, "pending")) ? " selected" : ""}${_scopeId}>Pending</option><option value="confirmed"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "confirmed") : ssrLooseEqual(form.value.status, "confirmed")) ? " selected" : ""}${_scopeId}>Confirmed</option><option value="in_production"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "in_production") : ssrLooseEqual(form.value.status, "in_production")) ? " selected" : ""}${_scopeId}>In Production</option><option value="ready"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "ready") : ssrLooseEqual(form.value.status, "ready")) ? " selected" : ""}${_scopeId}>Ready</option><option value="delivered"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "delivered") : ssrLooseEqual(form.value.status, "delivered")) ? " selected" : ""}${_scopeId}>Delivered</option></select></div><div${_scopeId}><label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"${_scopeId}>Payment</label><select class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"${_scopeId}><option value="unpaid"${ssrIncludeBooleanAttr(Array.isArray(form.value.paymentStatus) ? ssrLooseContain(form.value.paymentStatus, "unpaid") : ssrLooseEqual(form.value.paymentStatus, "unpaid")) ? " selected" : ""}${_scopeId}>Unpaid</option><option value="partial"${ssrIncludeBooleanAttr(Array.isArray(form.value.paymentStatus) ? ssrLooseContain(form.value.paymentStatus, "partial") : ssrLooseEqual(form.value.paymentStatus, "partial")) ? " selected" : ""}${_scopeId}>Partial</option><option value="paid"${ssrIncludeBooleanAttr(Array.isArray(form.value.paymentStatus) ? ssrLooseContain(form.value.paymentStatus, "paid") : ssrLooseEqual(form.value.paymentStatus, "paid")) ? " selected" : ""}${_scopeId}>Paid</option></select></div><div${_scopeId}><label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"${_scopeId}>Paid (${ssrInterpolate(__props.currency)})</label><input${ssrRenderAttr("value", form.value.amountPaid)} type="number" step="0.01" class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"${_scopeId}></div></div><div class="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-700"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><label class="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300"${_scopeId}> Shirt Items </label><button type="button" class="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:plus",
              class: "w-3.5 h-3.5"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Add Item</span></button></div><div class="space-y-2.5"${_scopeId}><!--[-->`);
            ssrRenderList(form.value.items, (item, idx) => {
              _push2(`<div class="p-3 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-700/60 space-y-2 text-xs"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="font-bold text-gray-500"${_scopeId}>Item #${ssrInterpolate(idx + 1)}</span>`);
              if (form.value.items.length > 1) {
                _push2(`<button type="button" class="text-red-500 hover:text-red-700"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "lucide:trash-2",
                  class: "w-3.5 h-3.5"
                }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="grid grid-cols-1 sm:grid-cols-4 gap-2"${_scopeId}><input${ssrRenderAttr("value", item.shirtName)} type="text" maxlength="20" placeholder="Name on shirt" class="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 uppercase"${_scopeId}><select class="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"${_scopeId}><!--[-->`);
              ssrRenderList(__props.sizes, (s) => {
                _push2(`<option${ssrRenderAttr("value", s.label)}${ssrIncludeBooleanAttr(Array.isArray(item.sizeLabel) ? ssrLooseContain(item.sizeLabel, s.label) : ssrLooseEqual(item.sizeLabel, s.label)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(s.label)}</option>`);
              });
              _push2(`<!--]--></select><select class="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"${_scopeId}><!--[-->`);
              ssrRenderList(__props.sleeveTypes, (st) => {
                _push2(`<option${ssrRenderAttr("value", st.label)}${ssrIncludeBooleanAttr(Array.isArray(item.sleeveLabel) ? ssrLooseContain(item.sleeveLabel, st.label) : ssrLooseEqual(item.sleeveLabel, st.label)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(st.label)}</option>`);
              });
              _push2(`<!--]--></select><input${ssrRenderAttr("value", item.quantity)} type="number" min="1" max="20" class="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center font-bold"${_scopeId}></div></div>`);
            });
            _push2(`<!--]--></div></div><div class="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseButton, {
              variant: "secondary",
              size: "md",
              onClick: ($event) => emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Cancel`);
                } else {
                  return [
                    createTextVNode("Cancel")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BaseButton, {
              variant: "primary",
              size: "md",
              loading: submitting.value,
              onClick: submitOrder
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Create Order `);
                } else {
                  return [
                    createTextVNode(" Create Order ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 space-y-5" }, [
                createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Create an order manually as administrator. This bypasses public deadlines and rate limits. "),
                createVNode("div", { class: "space-y-3" }, [
                  createVNode(_component_BaseInput, {
                    modelValue: form.value.customerName,
                    "onUpdate:modelValue": ($event) => form.value.customerName = $event,
                    label: "Customer Full Name",
                    placeholder: "e.g. Jane Doe",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_BaseInput, {
                    modelValue: form.value.contact,
                    "onUpdate:modelValue": ($event) => form.value.contact = $event,
                    label: "Contact (Phone / Email)",
                    placeholder: "e.g. +60123456789 or email@domain.com",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_BaseTextarea, {
                    modelValue: form.value.notes,
                    "onUpdate:modelValue": ($event) => form.value.notes = $event,
                    label: "Customer Notes",
                    placeholder: "Optional notes",
                    rows: 2
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-100 dark:border-gray-700" }, [
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1" }, "Status"),
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => form.value.status = $event,
                      class: "w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                    }, [
                      createVNode("option", { value: "pending" }, "Pending"),
                      createVNode("option", { value: "confirmed" }, "Confirmed"),
                      createVNode("option", { value: "in_production" }, "In Production"),
                      createVNode("option", { value: "ready" }, "Ready"),
                      createVNode("option", { value: "delivered" }, "Delivered")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, form.value.status]
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1" }, "Payment"),
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => form.value.paymentStatus = $event,
                      class: "w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                    }, [
                      createVNode("option", { value: "unpaid" }, "Unpaid"),
                      createVNode("option", { value: "partial" }, "Partial"),
                      createVNode("option", { value: "paid" }, "Paid")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, form.value.paymentStatus]
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1" }, "Paid (" + toDisplayString(__props.currency) + ")", 1),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => form.value.amountPaid = $event,
                      type: "number",
                      step: "0.01",
                      class: "w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [
                        vModelText,
                        form.value.amountPaid,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ])
                ]),
                createVNode("div", { class: "space-y-3 pt-3 border-t border-gray-100 dark:border-gray-700" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("label", { class: "text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300" }, " Shirt Items "),
                    createVNode("button", {
                      type: "button",
                      class: "text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1",
                      onClick: addItem
                    }, [
                      createVNode(_component_Icon, {
                        name: "lucide:plus",
                        class: "w-3.5 h-3.5"
                      }),
                      createVNode("span", null, "Add Item")
                    ])
                  ]),
                  createVNode("div", { class: "space-y-2.5" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(form.value.items, (item, idx) => {
                      return openBlock(), createBlock("div", {
                        key: idx,
                        class: "p-3 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-700/60 space-y-2 text-xs"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("span", { class: "font-bold text-gray-500" }, "Item #" + toDisplayString(idx + 1), 1),
                          form.value.items.length > 1 ? (openBlock(), createBlock("button", {
                            key: 0,
                            type: "button",
                            class: "text-red-500 hover:text-red-700",
                            onClick: ($event) => removeItem(idx)
                          }, [
                            createVNode(_component_Icon, {
                              name: "lucide:trash-2",
                              class: "w-3.5 h-3.5"
                            })
                          ], 8, ["onClick"])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-4 gap-2" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => item.shirtName = $event,
                            type: "text",
                            maxlength: "20",
                            placeholder: "Name on shirt",
                            class: "px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 uppercase"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, item.shirtName]
                          ]),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => item.sizeLabel = $event,
                            class: "px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.sizes, (s) => {
                              return openBlock(), createBlock("option", {
                                key: s.id,
                                value: s.label
                              }, toDisplayString(s.label), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, item.sizeLabel]
                          ]),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => item.sleeveLabel = $event,
                            class: "px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.sleeveTypes, (st) => {
                              return openBlock(), createBlock("option", {
                                key: st.id,
                                value: st.label
                              }, toDisplayString(st.label), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, item.sleeveLabel]
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => item.quantity = $event,
                            type: "number",
                            min: "1",
                            max: "20",
                            class: "px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center font-bold"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [
                              vModelText,
                              item.quantity,
                              void 0,
                              { number: true }
                            ]
                          ])
                        ])
                      ]);
                    }), 128))
                  ])
                ]),
                createVNode("div", { class: "flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700" }, [
                  createVNode(_component_BaseButton, {
                    variant: "secondary",
                    size: "md",
                    onClick: ($event) => emit("close")
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Cancel")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_BaseButton, {
                    variant: "primary",
                    size: "md",
                    loading: submitting.value,
                    onClick: submitOrder
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Create Order ")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/CreateOrderModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "orders",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "Orders Management | Admin"
    });
    const toast = useToast();
    const queryParams = ref({
      page: 1,
      limit: 20,
      search: "",
      status: "",
      paymentStatus: "",
      size: "",
      sleeve: "",
      dateFrom: "",
      dateTo: "",
      sortBy: "created_at",
      sortDir: "desc"
    });
    const activeOrderId = ref(null);
    const isDrawerOpen = ref(false);
    const isCreateModalOpen = ref(false);
    const selectedOrderIds = ref([]);
    const { data: settingsData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/settings",
      "$6PwM8sYKf1"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const sizes = computed(() => {
      var _a;
      return ((_a = settingsData.value) == null ? void 0 : _a.sizes) || [];
    });
    const sleeveTypes = computed(() => {
      var _a;
      return ((_a = settingsData.value) == null ? void 0 : _a.sleeveTypes) || [];
    });
    const currency = computed(() => {
      var _a;
      return ((_a = settingsData.value) == null ? void 0 : _a.currency) || "MYR";
    });
    const basePrice = computed(() => {
      var _a;
      return ((_a = settingsData.value) == null ? void 0 : _a.basePrice) || 35;
    });
    const { data: ordersData, status: loadingStatus, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/orders",
      {
        query: queryParams,
        watch: [queryParams]
      },
      "$LwpftDfeRD"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const tableColumns = [
      { key: "code", label: "Order Code", sortable: true },
      { key: "customerName", label: "Customer", sortable: true },
      { key: "contact", label: "Contact" },
      { key: "totalQuantity", label: "Shirts" },
      { key: "totalPrice", label: "Total Price", sortable: true },
      { key: "status", label: "Order Status" },
      { key: "paymentStatus", label: "Payment" },
      { key: "createdAt", label: "Created At", sortable: true }
    ];
    function handleSort(key, dir) {
      queryParams.value.sortBy = key;
      queryParams.value.sortDir = dir;
    }
    function handleRowClick(row) {
      activeOrderId.value = row.id;
      isDrawerOpen.value = true;
    }
    function handleBulkAction(payload) {
      if (selectedOrderIds.value.length === 0) return;
      $fetch("/api/admin/orders/bulk", {
        method: "POST",
        body: {
          ids: selectedOrderIds.value,
          action: payload.action,
          value: payload.value
        }
      }).then((res) => {
        toast.success("Bulk update", `Updated ${res.affected} orders successfully.`);
        selectedOrderIds.value = [];
        refresh();
      }).catch((err) => {
        var _a;
        toast.error("Bulk action failed", ((_a = err.data) == null ? void 0 : _a.message) || err.message);
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Icon = __nuxt_component_1;
      const _component_BaseButton = _sfc_main$8;
      const _component_AdminOrderFilters = _sfc_main$7;
      const _component_AdminDataTable = _sfc_main$6;
      const _component_BaseStatusBadge = _sfc_main$9;
      const _component_AdminBulkActions = _sfc_main$4;
      const _component_AdminOrderDrawer = _sfc_main$2;
      const _component_AdminCreateOrderModal = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 pb-20" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h1 class="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white"> Orders Management </h1><p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1"> View, filter, manage and export all shirt orders. </p></div><div class="flex flex-wrap items-center gap-2"><button type="button" class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:file-spreadsheet",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span>Export Excel (.xlsx)</span></button>`);
      _push(ssrRenderComponent(_component_BaseButton, {
        variant: "primary",
        size: "md",
        onClick: ($event) => isCreateModalOpen.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:plus",
              class: "w-4 h-4 mr-1.5"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Create Order</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:plus",
                class: "w-4 h-4 mr-1.5"
              }),
              createVNode("span", null, "Create Order")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_AdminOrderFilters, {
        modelValue: queryParams.value,
        "onUpdate:modelValue": ($event) => queryParams.value = $event,
        sizes: unref(sizes),
        "sleeve-types": unref(sleeveTypes),
        onReset: ($event) => queryParams.value = { page: 1, limit: 20, search: "", status: "", paymentStatus: "", size: "", sleeve: "", dateFrom: "", dateTo: "", sortBy: "created_at", sortDir: "desc" }
      }, null, _parent));
      _push(ssrRenderComponent(_component_AdminDataTable, {
        columns: tableColumns,
        rows: ((_a = unref(ordersData)) == null ? void 0 : _a.data) || [],
        loading: unref(loadingStatus) === "pending",
        selectable: "",
        "selected-ids": selectedOrderIds.value,
        "sort-by": queryParams.value.sortBy,
        "sort-dir": queryParams.value.sortDir,
        onSort: handleSort,
        onSelect: (ids) => selectedOrderIds.value = ids,
        onRowClick: handleRowClick
      }, {
        row: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<td class="px-4 py-3.5 font-mono font-bold text-primary-600 dark:text-primary-400"${_scopeId}>${ssrInterpolate(row.code)}</td><td class="px-4 py-3.5 font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(row.customerName)}</td><td class="px-4 py-3.5 text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(row.contact)}</td><td class="px-4 py-3.5 font-bold font-mono text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(row.totalQuantity)}</td><td class="px-4 py-3.5 font-heading font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(currency))} ${ssrInterpolate(Number(row.totalPrice).toFixed(2))}</td><td class="px-4 py-3.5"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseStatusBadge, {
              status: row.status,
              type: "order"
            }, null, _parent2, _scopeId));
            _push2(`</td><td class="px-4 py-3.5"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BaseStatusBadge, {
              status: row.paymentStatus,
              type: "payment"
            }, null, _parent2, _scopeId));
            _push2(`</td><td class="px-4 py-3.5 text-[11px] text-gray-400"${_scopeId}>${ssrInterpolate(new Date(row.createdAt).toLocaleDateString())}</td>`);
          } else {
            return [
              createVNode("td", { class: "px-4 py-3.5 font-mono font-bold text-primary-600 dark:text-primary-400" }, toDisplayString(row.code), 1),
              createVNode("td", { class: "px-4 py-3.5 font-semibold text-gray-900 dark:text-white" }, toDisplayString(row.customerName), 1),
              createVNode("td", { class: "px-4 py-3.5 text-gray-500 dark:text-gray-400" }, toDisplayString(row.contact), 1),
              createVNode("td", { class: "px-4 py-3.5 font-bold font-mono text-gray-700 dark:text-gray-300" }, toDisplayString(row.totalQuantity), 1),
              createVNode("td", { class: "px-4 py-3.5 font-heading font-bold text-gray-900 dark:text-white" }, toDisplayString(unref(currency)) + " " + toDisplayString(Number(row.totalPrice).toFixed(2)), 1),
              createVNode("td", { class: "px-4 py-3.5" }, [
                createVNode(_component_BaseStatusBadge, {
                  status: row.status,
                  type: "order"
                }, null, 8, ["status"])
              ]),
              createVNode("td", { class: "px-4 py-3.5" }, [
                createVNode(_component_BaseStatusBadge, {
                  status: row.paymentStatus,
                  type: "payment"
                }, null, 8, ["status"])
              ]),
              createVNode("td", { class: "px-4 py-3.5 text-[11px] text-gray-400" }, toDisplayString(new Date(row.createdAt).toLocaleDateString()), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(ordersData) && unref(ordersData).totalPages > 1) {
        _push(`<div class="flex items-center justify-between px-2 pt-2 text-xs text-gray-500 dark:text-gray-400"><div> Showing ${ssrInterpolate((unref(ordersData).page - 1) * unref(ordersData).limit + 1)} to ${ssrInterpolate(Math.min(unref(ordersData).page * unref(ordersData).limit, unref(ordersData).total))} of ${ssrInterpolate(unref(ordersData).total)} orders </div><div class="flex items-center gap-1.5"><button type="button"${ssrIncludeBooleanAttr(unref(ordersData).page <= 1) ? " disabled" : ""} class="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition"> Previous </button><span class="px-2 font-bold">${ssrInterpolate(unref(ordersData).page)} / ${ssrInterpolate(unref(ordersData).totalPages)}</span><button type="button"${ssrIncludeBooleanAttr(unref(ordersData).page >= unref(ordersData).totalPages) ? " disabled" : ""} class="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition"> Next </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_AdminBulkActions, {
        "selected-count": selectedOrderIds.value.length,
        "selected-ids": selectedOrderIds.value,
        onAction: handleBulkAction,
        onClear: ($event) => selectedOrderIds.value = []
      }, null, _parent));
      _push(ssrRenderComponent(_component_AdminOrderDrawer, {
        open: isDrawerOpen.value,
        "order-id": activeOrderId.value,
        sizes: unref(sizes),
        "sleeve-types": unref(sleeveTypes),
        currency: unref(currency),
        onClose: ($event) => isDrawerOpen.value = false,
        onUpdated: unref(refresh),
        onDeleted: unref(refresh)
      }, null, _parent));
      _push(ssrRenderComponent(_component_AdminCreateOrderModal, {
        open: isCreateModalOpen.value,
        sizes: unref(sizes),
        "sleeve-types": unref(sleeveTypes),
        "base-price": unref(basePrice),
        currency: unref(currency),
        onClose: ($event) => isCreateModalOpen.value = false,
        onCreated: unref(refresh)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/orders.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=orders-CpgmuTD9.mjs.map
