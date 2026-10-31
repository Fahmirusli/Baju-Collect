import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LoadingSkeleton",
  __ssrInlineRender: true,
  props: {
    lines: { default: 3 },
    type: { default: "text" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "animate-pulse w-full",
        "aria-hidden": "true",
        "aria-busy": "true"
      }, _attrs))}>`);
      if (__props.type === "card") {
        _push(`<div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700/60 shadow-soft space-y-4"><div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3"></div><div class="space-y-2"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div></div></div>`);
      } else if (__props.type === "table") {
        _push(`<div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/60 overflow-hidden shadow-soft"><div class="h-12 bg-gray-100 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-4"><div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-20"></div><div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32"></div><div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24"></div><div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16 ml-auto"></div></div><div class="divide-y divide-gray-100 dark:divide-gray-700/50"><!--[-->`);
        ssrRenderList(__props.lines, (i) => {
          _push(`<div class="h-14 px-4 flex items-center gap-4"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 ml-auto"></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<div class="space-y-2.5"><!--[-->`);
        ssrRenderList(__props.lines, (i) => {
          _push(`<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded" style="${ssrRenderStyle({ width: i === __props.lines ? "60%" : i % 2 === 0 ? "90%" : "100%" })}"></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/LoadingSkeleton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=LoadingSkeleton-BZu8zmo9.mjs.map
