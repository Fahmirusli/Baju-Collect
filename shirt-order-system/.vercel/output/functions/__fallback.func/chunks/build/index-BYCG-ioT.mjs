import { u as useHead, _ as __nuxt_component_1 } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DXdMyeHc.mjs';
import { _ as _sfc_main$4 } from './BaseButton-BmqYBgHv.mjs';
import { _ as _sfc_main$5 } from './LoadingSkeleton-BZu8zmo9.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, withCtx, createVNode, unref, createTextVNode, ref, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler } from 'chart.js';
import { Doughnut, Bar } from 'vue-chartjs';
import { u as useColorMode } from './composables-DQfq7xRN.mjs';
import { _ as _sfc_main$6 } from './StatusBadge-D8Eu5rRf.mjs';
import { u as useFetch } from './fetch-CrKJXOJw.mjs';
import '../_/nitro.mjs';
import 'bcryptjs';
import '@neondatabase/serverless';
import 'drizzle-orm/neon-http';
import 'exceljs';
import 'drizzle-orm';
import 'drizzle-orm/pg-core';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "StatCard",
  __ssrInlineRender: true,
  props: {
    title: {},
    value: {},
    prefix: {},
    suffix: {},
    icon: {},
    color: {}
  },
  setup(__props) {
    const props = __props;
    const animatedValue = ref(0);
    const displayValue = computed(() => {
      if (Number.isInteger(props.value)) {
        return Math.round(animatedValue.value).toLocaleString();
      }
      return animatedValue.value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
    const colorMap = {
      primary: {
        bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
        bar: "bg-gradient-to-r from-indigo-500 to-indigo-400"
      },
      success: {
        bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        bar: "bg-gradient-to-r from-emerald-500 to-emerald-400"
      },
      warning: {
        bg: "bg-gradient-to-br from-amber-500 to-amber-600",
        bar: "bg-gradient-to-r from-amber-500 to-amber-400"
      },
      danger: {
        bg: "bg-gradient-to-br from-rose-500 to-rose-600",
        bar: "bg-gradient-to-r from-rose-500 to-rose-400"
      },
      accent: {
        bg: "bg-gradient-to-br from-violet-500 to-violet-600",
        bar: "bg-gradient-to-r from-violet-500 to-violet-400"
      }
    };
    const iconBgClass = computed(() => {
      var _a, _b;
      return (_b = (_a = colorMap[props.color]) == null ? void 0 : _a.bg) != null ? _b : colorMap.primary.bg;
    });
    const barClass = computed(() => {
      var _a, _b;
      return (_b = (_a = colorMap[props.color]) == null ? void 0 : _a.bar) != null ? _b : colorMap.primary.bar;
    });
    function animateCounter(target) {
      const duration = 1200;
      const startTime = performance.now();
      const startValue = animatedValue.value;
      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        animatedValue.value = startValue + (target - startValue) * eased;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          animatedValue.value = target;
        }
      }
      requestAnimationFrame(step);
    }
    watch(
      () => props.value,
      (newVal) => {
        animateCounter(newVal);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group relative overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-[#1A1B23]" }, _attrs))}><div class="flex items-start justify-between p-6"><div class="flex-1"><p class="font-body text-sm font-medium text-gray-500 dark:text-gray-400">${ssrInterpolate(__props.title)}</p><p class="mt-2 font-heading text-3xl font-bold tracking-tight text-gray-900 dark:text-white">`);
      if (__props.prefix) {
        _push(`<span class="text-xl font-semibold text-gray-500 dark:text-gray-400">${ssrInterpolate(__props.prefix)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(displayValue))} `);
      if (__props.suffix) {
        _push(`<span class="text-lg font-medium text-gray-500 dark:text-gray-400">${ssrInterpolate(__props.suffix)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p></div><div class="${ssrRenderClass([unref(iconBgClass), "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"])}">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: __props.icon,
        class: "h-6 w-6 text-white"
      }, null, _parent));
      _push(`</div></div><div class="${ssrRenderClass([unref(barClass), "h-1 w-full"])}"></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/StatCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ChartDonut",
  __ssrInlineRender: true,
  props: {
    title: {},
    labels: {},
    data: {},
    colors: {}
  },
  setup(__props) {
    Chart.register(ArcElement, Tooltip, Legend);
    const props = __props;
    const defaultColors = [
      "#4F46E5",
      // indigo
      "#10B981",
      // emerald
      "#F59E0B",
      // amber
      "#EF4444",
      // red
      "#8B5CF6",
      // violet
      "#06B6D4",
      // cyan
      "#EC4899",
      // pink
      "#F97316"
      // orange
    ];
    const resolvedColors = computed(() => {
      var _a;
      return (_a = props.colors) != null ? _a : defaultColors.slice(0, props.labels.length);
    });
    const total = computed(() => props.data.reduce((sum, v) => sum + v, 0));
    const colorMode = useColorMode();
    const chartData = computed(() => ({
      labels: props.labels,
      datasets: [
        {
          data: props.data,
          backgroundColor: resolvedColors.value,
          borderColor: colorMode.value === "dark" ? "#1A1B23" : "#ffffff",
          borderWidth: 3,
          hoverOffset: 6
        }
      ]
    }));
    const chartOptions = computed(() => ({
      responsive: true,
      maintainAspectRatio: true,
      cutout: "68%",
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: colorMode.value === "dark" ? "#2D2E3A" : "#1f2937",
          titleColor: "#f9fafb",
          bodyColor: "#d1d5db",
          cornerRadius: 8,
          padding: 12,
          titleFont: {
            family: "Plus Jakarta Sans, sans-serif",
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: "Inter, sans-serif",
            size: 12
          },
          callbacks: {
            label: (context) => {
              const value = context.parsed;
              const pct = total.value > 0 ? (value / total.value * 100).toFixed(1) : "0";
              return ` ${context.label}: ${value} (${pct}%)`;
            }
          }
        }
      }
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-2xl bg-white p-6 shadow-soft dark:bg-[#1A1B23]" }, _attrs))}><h3 class="mb-4 font-heading text-lg font-semibold text-gray-900 dark:text-white">${ssrInterpolate(__props.title)}</h3><div class="relative mx-auto" style="${ssrRenderStyle({ "max-width": "280px" })}">`);
      _push(ssrRenderComponent(unref(Doughnut), {
        data: unref(chartData),
        options: unref(chartOptions)
      }, null, _parent));
      _push(`<div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span class="font-heading text-2xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(unref(total))}</span><span class="text-xs text-gray-500 dark:text-gray-400">Total</span></div></div><div class="mt-6 space-y-2"><!--[-->`);
      ssrRenderList(__props.labels, (label, index) => {
        _push(`<div class="flex items-center justify-between"><div class="flex items-center gap-2"><span class="inline-block h-3 w-3 rounded-full" style="${ssrRenderStyle({ backgroundColor: unref(resolvedColors)[index] })}"></span><span class="font-body text-sm text-gray-600 dark:text-gray-300">${ssrInterpolate(label)}</span></div><span class="font-mono text-sm font-medium text-gray-900 dark:text-white">${ssrInterpolate(__props.data[index])}</span></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/ChartDonut.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ChartLine",
  __ssrInlineRender: true,
  props: {
    title: {},
    labels: {},
    data: {}
  },
  setup(__props) {
    Chart.register(
      CategoryScale,
      LinearScale,
      BarElement,
      PointElement,
      LineElement,
      Tooltip,
      Legend,
      Filler
    );
    const props = __props;
    const colorMode = useColorMode();
    const chartData = computed(() => {
      return {
        labels: props.labels,
        datasets: [
          {
            label: props.title,
            data: props.data,
            backgroundColor: createGradient(),
            borderColor: "#4F46E5",
            borderWidth: 0,
            borderRadius: 8,
            borderSkipped: false,
            hoverBackgroundColor: "#4F46E5"
          }
        ]
      };
    });
    function createGradient() {
      return props.data.map(() => "rgba(79, 70, 229, 0.7)");
    }
    const chartOptions = computed(() => {
      const isDark = colorMode.value === "dark";
      const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
      const textColor = isDark ? "#9ca3af" : "#6b7280";
      return {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2.2,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: isDark ? "#2D2E3A" : "#1f2937",
            titleColor: "#f9fafb",
            bodyColor: "#d1d5db",
            cornerRadius: 8,
            padding: 12,
            titleFont: {
              family: "Plus Jakarta Sans, sans-serif",
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: "Inter, sans-serif",
              size: 12
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: textColor,
              font: {
                family: "Inter, sans-serif",
                size: 11
              },
              maxRotation: 45
            },
            border: {
              display: false
            }
          },
          y: {
            grid: {
              color: gridColor
            },
            ticks: {
              color: textColor,
              font: {
                family: "Inter, sans-serif",
                size: 11
              },
              precision: 0
            },
            border: {
              display: false
            },
            beginAtZero: true
          }
        }
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-2xl bg-white p-6 shadow-soft dark:bg-[#1A1B23]" }, _attrs))}><h3 class="mb-4 font-heading text-lg font-semibold text-gray-900 dark:text-white">${ssrInterpolate(__props.title)}</h3><div class="relative">`);
      _push(ssrRenderComponent(unref(Bar), {
        data: unref(chartData),
        options: unref(chartOptions)
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/ChartLine.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "Dashboard | Admin"
    });
    const { data: stats, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/stats",
      "$u8cFyv4B2Y"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const sizeLabels = computed(() => {
      var _a;
      return ((_a = stats.value) == null ? void 0 : _a.shirtsBySize.map((s) => s.label)) || [];
    });
    const sizeCounts = computed(() => {
      var _a;
      return ((_a = stats.value) == null ? void 0 : _a.shirtsBySize.map((s) => s.count)) || [];
    });
    const sleeveLabels = computed(() => {
      var _a;
      return ((_a = stats.value) == null ? void 0 : _a.shirtsBySleeve.map((s) => s.label)) || [];
    });
    const sleeveCounts = computed(() => {
      var _a;
      return ((_a = stats.value) == null ? void 0 : _a.shirtsBySleeve.map((s) => s.count)) || [];
    });
    const dayLabels = computed(() => {
      var _a;
      return ((_a = stats.value) == null ? void 0 : _a.ordersByDay.map((d) => d.date)) || [];
    });
    const dayCounts = computed(() => {
      var _a;
      return ((_a = stats.value) == null ? void 0 : _a.ordersByDay.map((d) => d.count)) || [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_BaseButton = _sfc_main$4;
      const _component_BaseLoadingSkeleton = _sfc_main$5;
      const _component_AdminStatCard = _sfc_main$3;
      const _component_AdminChartDonut = _sfc_main$2;
      const _component_AdminChartLine = _sfc_main$1;
      const _component_BaseStatusBadge = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h1 class="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white"> Overview &amp; Analytics </h1><p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1"> Real-time summary of group shirt orders, inventory demand, and payments. </p></div><div class="flex items-center gap-2"><button type="button" class="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition" title="Refresh statistics">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:refresh-cw",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/orders" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_BaseButton, {
              variant: "primary",
              size: "sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "lucide:list",
                    class: "w-4 h-4 mr-1.5"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>View All Orders</span>`);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "lucide:list",
                      class: "w-4 h-4 mr-1.5"
                    }),
                    createVNode("span", null, "View All Orders")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_BaseButton, {
                variant: "primary",
                size: "sm"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, {
                    name: "lucide:list",
                    class: "w-4 h-4 mr-1.5"
                  }),
                  createVNode("span", null, "View All Orders")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (unref(status) === "pending") {
        _push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(ssrRenderComponent(_component_BaseLoadingSkeleton, {
            key: i,
            type: "card",
            lines: 2
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (unref(stats)) {
        _push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">`);
        _push(ssrRenderComponent(_component_AdminStatCard, {
          title: "Total Orders",
          value: unref(stats).totalOrders,
          icon: "lucide:shopping-bag",
          color: "primary"
        }, null, _parent));
        _push(ssrRenderComponent(_component_AdminStatCard, {
          title: "Total Shirts",
          value: unref(stats).totalShirts,
          icon: "lucide:shirt",
          color: "accent"
        }, null, _parent));
        _push(ssrRenderComponent(_component_AdminStatCard, {
          title: "Total Revenue",
          value: unref(stats).totalRevenue,
          prefix: "MYR ",
          icon: "lucide:dollar-sign",
          color: "success"
        }, null, _parent));
        _push(ssrRenderComponent(_component_AdminStatCard, {
          title: "Paid Amount",
          value: unref(stats).paidAmount,
          prefix: "MYR ",
          icon: "lucide:check-circle",
          color: "success"
        }, null, _parent));
        _push(ssrRenderComponent(_component_AdminStatCard, {
          title: "Unpaid Balance",
          value: unref(stats).unpaidAmount,
          prefix: "MYR ",
          icon: "lucide:alert-circle",
          color: "warning"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(stats)) {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft"><h3 class="font-heading font-bold text-sm text-gray-900 dark:text-white mb-4 flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:pie-chart",
          class: "w-4 h-4 text-primary-500"
        }, null, _parent));
        _push(`<span>Shirts by Size</span></h3>`);
        _push(ssrRenderComponent(_component_AdminChartDonut, {
          title: "Demand by Size",
          labels: sizeLabels.value,
          data: sizeCounts.value
        }, null, _parent));
        _push(`</div><div class="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft"><h3 class="font-heading font-bold text-sm text-gray-900 dark:text-white mb-4 flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:sparkles",
          class: "w-4 h-4 text-violet"
        }, null, _parent));
        _push(`<span>Shirts by Sleeve Type</span></h3>`);
        _push(ssrRenderComponent(_component_AdminChartDonut, {
          title: "Demand by Sleeve",
          labels: sleeveLabels.value,
          data: sleeveCounts.value
        }, null, _parent));
        _push(`</div><div class="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft"><h3 class="font-heading font-bold text-sm text-gray-900 dark:text-white mb-4 flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:trending-up",
          class: "w-4 h-4 text-emerald-500"
        }, null, _parent));
        _push(`<span>Daily Order Volume</span></h3>`);
        _push(ssrRenderComponent(_component_AdminChartLine, {
          title: "Orders per Day",
          labels: dayLabels.value,
          data: dayCounts.value
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(stats)) {
        _push(`<div class="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft p-5 sm:p-6 space-y-4"><div class="flex items-center justify-between"><h3 class="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:clock",
          class: "w-4 h-4 text-primary-500"
        }, null, _parent));
        _push(`<span>Recent Orders</span></h3>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/orders",
          class: "text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` View all \u2192 `);
            } else {
              return [
                createTextVNode(" View all \u2192 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (unref(stats).recentOrders.length === 0) {
          _push(`<div class="text-center py-8 text-gray-400 text-xs"> No orders submitted yet. </div>`);
        } else {
          _push(`<div class="divide-y divide-gray-100 dark:divide-gray-700/50"><!--[-->`);
          ssrRenderList(unref(stats).recentOrders, (o) => {
            _push(`<div class="py-3 flex flex-wrap items-center justify-between gap-3 text-xs"><div class="flex items-center gap-3"><span class="font-mono font-bold text-primary-600 dark:text-primary-400">${ssrInterpolate(o.code)}</span><span class="font-semibold text-gray-900 dark:text-white">${ssrInterpolate(o.customerName)}</span><span class="text-gray-400 text-[11px]"> (${ssrInterpolate(o.totalQuantity)} ${ssrInterpolate(o.totalQuantity === 1 ? "shirt" : "shirts")}) </span></div><div class="flex items-center gap-3">`);
            _push(ssrRenderComponent(_component_BaseStatusBadge, {
              status: o.status,
              type: "order"
            }, null, _parent));
            _push(ssrRenderComponent(_component_BaseStatusBadge, {
              status: o.paymentStatus,
              type: "payment"
            }, null, _parent));
            _push(`<span class="font-heading font-bold text-gray-900 dark:text-white"> MYR ${ssrInterpolate(Number(o.totalPrice).toFixed(2))}</span></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BYCG-ioT.mjs.map
