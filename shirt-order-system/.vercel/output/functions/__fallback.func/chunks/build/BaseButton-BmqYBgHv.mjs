import { _ as __nuxt_component_1 } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseButton",
  __ssrInlineRender: true,
  props: {
    variant: { default: "primary" },
    size: { default: "md" },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    type: { default: "button" },
    icon: {},
    block: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const variantClasses = {
      primary: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-indigo-500",
      secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-100 dark:hover:bg-white/20 focus-visible:ring-gray-400",
      danger: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 focus-visible:ring-red-500",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10 focus-visible:ring-gray-400",
      outline: "border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-white/5 focus-visible:ring-indigo-500"
    };
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm gap-1.5",
      md: "px-5 py-2.5 text-sm gap-2",
      lg: "px-7 py-3.5 text-base gap-2.5"
    };
    const buttonClasses = computed(() => [
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none",
      variantClasses[props.variant],
      sizeClasses[props.size],
      props.block ? "w-full" : ""
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        disabled: __props.disabled || __props.loading,
        class: unref(buttonClasses),
        "aria-busy": __props.loading,
        "aria-disabled": __props.disabled || __props.loading
      }, _attrs))}>`);
      if (__props.loading) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:loader-2",
          class: ["animate-spin shrink-0", __props.size === "sm" ? "w-4 h-4" : "w-5 h-5"],
          "aria-hidden": "true"
        }, null, _parent));
      } else if (__props.icon) {
        _push(ssrRenderComponent(_component_Icon, {
          name: __props.icon,
          class: ["shrink-0", __props.size === "sm" ? "w-4 h-4" : "w-5 h-5"],
          "aria-hidden": "true"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/BaseButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=BaseButton-BmqYBgHv.mjs.map
