import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StatusBadge",
  __ssrInlineRender: true,
  props: {
    status: {},
    type: { default: "order" }
  },
  setup(__props) {
    const props = __props;
    const orderStatusConfig = {
      pending: {
        label: "Pending",
        classes: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      },
      confirmed: {
        label: "Confirmed",
        classes: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      },
      in_production: {
        label: "In Production",
        classes: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      },
      ready: {
        label: "Ready",
        classes: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      },
      delivered: {
        label: "Delivered",
        classes: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
      },
      cancelled: {
        label: "Cancelled",
        classes: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      }
    };
    const paymentStatusConfig = {
      unpaid: {
        label: "Unpaid",
        classes: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      },
      partial: {
        label: "Partial",
        classes: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      },
      paid: {
        label: "Paid",
        classes: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      }
    };
    const config = computed(() => {
      var _a;
      const map = props.type === "payment" ? paymentStatusConfig : orderStatusConfig;
      return (_a = map[props.status]) != null ? _a : {
        label: props.status,
        classes: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap", unref(config).classes]
      }, _attrs))}>${ssrInterpolate(unref(config).label)}</span>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/StatusBadge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=StatusBadge-D8Eu5rRf.mjs.map
