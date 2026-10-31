import { _ as __nuxt_component_1 } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useColorMode } from './composables-DQfq7xRN.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DarkModeToggle",
  __ssrInlineRender: true,
  setup(__props) {
    const colorMode = useColorMode();
    const isDark = computed({
      get() {
        return colorMode.value === "dark";
      },
      set(val) {
        colorMode.preference = val ? "dark" : "light";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: "relative p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500",
        title: unref(isDark) ? "Switch to light mode" : "Switch to dark mode",
        "aria-label": unref(isDark) ? "Switch to light mode" : "Switch to dark mode"
      }, _attrs))}>`);
      if (unref(isDark)) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:sun",
          class: "w-5 h-5 text-amber-400 transition-transform duration-300 hover:rotate-45"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:moon",
          class: "w-5 h-5 text-indigo-600 transition-transform duration-300 hover:-rotate-12"
        }, null, _parent));
      }
      _push(`</button>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DarkModeToggle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=DarkModeToggle-DkqEFprZ.mjs.map
