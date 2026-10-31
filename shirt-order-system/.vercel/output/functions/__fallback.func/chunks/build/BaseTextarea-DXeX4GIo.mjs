import { _ as __nuxt_component_1 } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseTextarea",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: "" },
    label: { default: "" },
    placeholder: { default: "" },
    error: { default: "" },
    required: { type: Boolean, default: false },
    rows: { default: 4 },
    maxlength: { default: void 0 },
    id: { default: "" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const textareaId = computed(() => props.id || `textarea-${Math.random().toString(36).slice(2, 9)}`);
    const charCount = computed(() => {
      var _a, _b;
      return (_b = (_a = props.modelValue) == null ? void 0 : _a.length) != null ? _b : 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}>`);
      if (__props.label) {
        _push(`<label${ssrRenderAttr("for", unref(textareaId))} class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">${ssrInterpolate(__props.label)} `);
        if (__props.required) {
          _push(`<span class="text-red-500 ml-0.5" aria-hidden="true">*</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<textarea${ssrRenderAttr("id", unref(textareaId))}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrIncludeBooleanAttr(__props.required) ? " required" : ""}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrRenderAttr("rows", __props.rows)}${ssrRenderAttr("maxlength", __props.maxlength)}${ssrRenderAttr("aria-invalid", !!__props.error)}${ssrRenderAttr("aria-describedby", __props.error ? `${unref(textareaId)}-error` : void 0)} class="${ssrRenderClass([[
        __props.error ? "border-red-400 dark:border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
      ], "w-full rounded-xl border px-4 py-2.5 text-sm font-body transition-all duration-200 resize-y bg-white dark:bg-white/5 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"])}">${ssrInterpolate(__props.modelValue)}</textarea><div class="flex items-center justify-between mt-1.5">`);
      if (__props.error) {
        _push(`<p${ssrRenderAttr("id", `${unref(textareaId)}-error`)} class="text-xs text-red-500 dark:text-red-400 flex items-center gap-1" role="alert">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:alert-circle",
          class: "w-3.5 h-3.5 shrink-0",
          "aria-hidden": "true"
        }, null, _parent));
        _push(` ${ssrInterpolate(__props.error)}</p>`);
      } else {
        _push(`<span></span>`);
      }
      if (__props.maxlength) {
        _push(`<span class="text-xs text-gray-400 dark:text-gray-500 tabular-nums">${ssrInterpolate(unref(charCount))}/${ssrInterpolate(__props.maxlength)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/BaseTextarea.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=BaseTextarea-DXeX4GIo.mjs.map
