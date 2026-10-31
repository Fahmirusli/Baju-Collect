import { _ as __nuxt_component_1 } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseInput",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: "" },
    label: { default: "" },
    placeholder: { default: "" },
    type: { default: "text" },
    error: { default: "" },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    id: { default: "" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const inputId = computed(() => props.id || `input-${Math.random().toString(36).slice(2, 9)}`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}>`);
      if (__props.label) {
        _push(`<label${ssrRenderAttr("for", unref(inputId))} class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">${ssrInterpolate(__props.label)} `);
        if (__props.required) {
          _push(`<span class="text-red-500 ml-0.5" aria-hidden="true">*</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("id", unref(inputId))}${ssrRenderAttr("type", __props.type)}${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrIncludeBooleanAttr(__props.required) ? " required" : ""}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrRenderAttr("aria-invalid", !!__props.error)}${ssrRenderAttr("aria-describedby", __props.error ? `${unref(inputId)}-error` : void 0)} class="${ssrRenderClass([[
        __props.error ? "border-red-400 dark:border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
      ], "w-full rounded-xl border px-4 py-2.5 text-sm font-body transition-all duration-200 bg-white dark:bg-white/5 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"])}">`);
      if (__props.error) {
        _push(`<p${ssrRenderAttr("id", `${unref(inputId)}-error`)} class="mt-1.5 text-xs text-red-500 dark:text-red-400 flex items-center gap-1" role="alert">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:alert-circle",
          class: "w-3.5 h-3.5 shrink-0",
          "aria-hidden": "true"
        }, null, _parent));
        _push(` ${ssrInterpolate(__props.error)}</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/BaseInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=BaseInput-B0Jc4KbN.mjs.map
