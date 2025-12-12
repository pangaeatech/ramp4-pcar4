import { defineComponent as ie, ref as b, watch as ge, toRef as je, createElementBlock as g, openBlock as c, createElementVNode as s, toDisplayString as y, unref as o, inject as he, useTemplateRef as ee, reactive as re, onMounted as we, onBeforeUnmount as ce, resolveDirective as Ie, createCommentVNode as F, createVNode as $, withCtx as M, withDirectives as ye, normalizeClass as se, createTextVNode as Se, Fragment as Ye, renderList as Ke, vShow as Ae, Transition as Je, renderSlot as Te, computed as H, provide as Ze, useId as Qe, onErrorCaptured as Xe, resolveComponent as el, createBlock as _, withModifiers as $e, nextTick as ll } from "vue";
import { ColorPicker as tl } from "vue-accessible-color-picker";
import { _ as ve, I as al, L as S, a2 as K, G as Oe, a0 as fe } from "./main-DC1g0E4v.js";
import "@arcgis/core/Color";
import "@arcgis/core/config";
import "@arcgis/core/core/reactiveUtils.js";
import "@arcgis/core/geometry/Extent";
import "@arcgis/core/geometry/Multipoint";
import "@arcgis/core/geometry/Point";
import "@arcgis/core/geometry/Polygon";
import "@arcgis/core/geometry/Polyline";
import "@arcgis/core/geometry/SpatialReference";
import "@arcgis/core/geometry/support/jsonUtils";
import "@arcgis/core/Graphic";
import "@arcgis/core/request";
import "@arcgis/core/symbols/PictureMarkerSymbol";
import "@arcgis/core/symbols/SimpleFillSymbol";
import "@arcgis/core/symbols/SimpleLineSymbol";
import "@arcgis/core/symbols/SimpleMarkerSymbol";
import "@arcgis/core/symbols/support/jsonUtils";
import "@arcgis/map-components/components/arcgis-swipe";
import "deepmerge";
import "@terraformer/spatial";
import "proj4";
import "pinia";
import { useI18n as xe } from "vue-i18n";
import "screenfull";
import "lodash.clonedeep";
import "vue-tippy";
import "linkify-html";
import "@popperjs/core";
import "throttle-debounce";
import "@terraformer/arcgis";
import "csv2geojson";
import "redaxios";
import "await-to-js";
import "svg.js";
import ol from "@ramp4-pcar4/vue3-treeselect";
import "@ramp4-pcar4/vue3-treeselect/dist/vue3-treeselect.css";
const nl = { class: "flex justify-end mb-20" }, sl = ["disabled", "animation"], rl = { class: "button-text" }, il = /* @__PURE__ */ ie({
  __name: "form-footer",
  props: {
    animation: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !0
    }
  },
  setup(n) {
    const { t: v } = xe(), t = n, w = b();
    ge(je(t, "disabled"), (h) => {
      !h && w.value.classList.contains("button--loading") && w.value.classList.remove("button--loading");
    });
    const E = () => {
      t.animation && w.value.classList.toggle("button--loading");
    };
    return (h, m) => (c(), g("div", nl, [
      s("button", {
        class: "hover:bg-gray-200 text-gray-600 font-bold py-8 px-16 m-2",
        type: "button",
        onClick: m[0] || (m[0] = (O) => h.$emit("cancel"))
      }, y(o(v)("wizard.step.cancel")), 1),
      s("button", {
        class: "button bg-blue-700 hover:bg-blue-700 text-white font-bold py-8 px-16 m-2 disabled:bg-gray-200 disabled:cursor-default disabled:text-gray-400",
        ref_key: "submitButton",
        ref: w,
        type: "button",
        disabled: n.disabled,
        animation: n.animation,
        onClick: m[1] || (m[1] = (O) => {
          h.$emit("submit"), E();
        })
      }, [
        s("span", rl, y(o(v)("wizard.step.continue")), 1)
      ], 8, sl)
    ]));
  }
}), me = /* @__PURE__ */ ve(il, [["__scopeId", "data-v-5e77d8d6"]]), ul = { key: 0 }, dl = { class: "text-base font-bold" }, cl = {
  class: "relative py-8 mb-0.5 h-75 hover:bg-gray-200 focus-within:bg-gray-200",
  "data-type": "file"
}, vl = ["aria-label"], pl = { class: "text-gray-500 text-xs mb-1" }, fl = { key: 1 }, ml = { class: "text-base font-bold" }, bl = {
  class: "mb-0.5",
  "data-type": "url"
}, yl = ["value", "aria-label"], gl = {
  key: 0,
  class: "text-red-900 text-xs"
}, hl = { key: 2 }, wl = { class: "text-base font-bold" }, Sl = {
  class: "relative mb-0.5",
  "data-type": "select"
}, xl = { key: 0 }, zl = {
  key: 0,
  class: "text-red-900 text-xs"
}, El = { key: 1 }, Fl = ["size", "value", "aria-label"], kl = ["value"], Vl = {
  key: 0,
  class: "text-red-900 text-xs"
}, Ll = {
  key: 1,
  class: "text-red-900 text-xs"
}, Al = { key: 3 }, $l = ["aria-label"], Ol = { class: "text-base font-bold" }, Il = { key: 4 }, Tl = { class: "text-base font-bold" }, Cl = { class: "relative mb-0.5" }, Ml = ["value", "aria-label"], Rl = {
  key: 0,
  class: "text-red-900 text-xs"
}, Nl = /* @__PURE__ */ ie({
  __name: "form-input",
  props: {
    activeStep: {
      type: Number,
      default: 0
    },
    defaultOption: {
      type: Boolean,
      default: !1
    },
    formatError: {
      type: Boolean,
      default: !1
    },
    failureError: {
      type: Boolean,
      default: !1
    },
    help: {
      type: [String, Boolean],
      default: !1
    },
    label: {
      type: [String, Boolean],
      default: !1
    },
    modelValue: {
      type: [String, Array],
      default: ""
    },
    name: {
      type: [String, Boolean],
      default: !1
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    selectedValues: {
      type: Array,
      default: () => []
    },
    size: {
      type: [Number, String],
      default: 0
    },
    sublayerOptions: {
      type: Function,
      default() {
        return [];
      }
    },
    multiple: {
      type: Boolean,
      default: !1
    },
    searchable: {
      type: Boolean,
      default: !1
    },
    step: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: "text"
    },
    url: {
      type: [String, Boolean],
      default: !1
    },
    validation: {
      type: Boolean,
      default: !1
    },
    validationMessages: {
      type: Object
    },
    ariaLabel: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue", "link", "select", "upload", "text", "nested", "focusElement"],
  setup(n, { expose: v, emit: t }) {
    const w = he("iApi"), { t: E } = xe(), h = t, m = n, O = b(), L = ee("textInput"), N = ee("selectInput"), B = ee("urlInput");
    v({ selectInput: N, textInput: L, urlInput: B });
    const z = b(!1), D = b(!1), W = b(!1), le = b(!1), q = b([...m.selectedValues]), P = b("value-label"), J = b("option-label"), R = b(void 0), T = b(null), G = re([]);
    if (m.defaultOption && m.modelValue === "" && m.options.length) {
      let u = m.options[0].value;
      if (m.name === "latField") {
        const i = new RegExp(/^(y|lat.*)$/i);
        u = m.options.find((p) => i.test(p.label))?.value || u;
      } else if (m.name === "longField") {
        const i = new RegExp(/^(x|long.*)$/i);
        u = m.options.find((p) => i.test(p.label))?.value || u;
      }
      h("update:modelValue", u);
    }
    const Z = (u) => {
      u.trim() !== "" ? z.value = !0 : (z.value = !1, w.updateAlert(E("wizard.configure.name.error.required")));
    }, te = (u) => {
      let i;
      try {
        i = new URL(u);
      } catch {
        return z.value = !1, !1;
      }
      z.value = i.protocol === "http:" || i.protocol === "https:";
    }, ue = (u) => {
      h("upload", u.target.files[0]), u.target.value = "";
    }, Q = (u) => {
      te(u.target.value), h("link", u.target.value, z), D.value = !1;
    }, x = (u, i) => {
      h(u ? "select" : "update:modelValue", i.target.value);
    }, ae = (u) => {
      h("nested", u.target.checked);
    }, oe = (u) => {
      Z(u.target.value), h("link", u.target.value, z), W.value = !1;
    }, A = () => {
      h("select", m.sublayerOptions(q.value)), le.value = q.value && q.value.length === 0;
    }, j = (u) => u.length > 5 ? `${u.slice(0, 5)}...` : u;
    function k() {
      R.value = new ResizeObserver(function() {
        a();
      }), R.value.observe(w.$vApp.$el.querySelector(".vue-treeselect__control")), R.value.observe(w.$vApp.$el.querySelector(".vue-treeselect__menu"));
    }
    const a = () => {
      const i = w.$vApp.$el.querySelector(".vue-treeselect__menu")?.clientHeight ?? 0, p = w.$vApp.$el.querySelector(".vue-treeselect__control")?.clientHeight ?? 0;
      O.value.style.height = `${i + p + 30}px`;
    };
    G.push(
      ge(T, (u) => {
        u && de();
      })
    );
    const de = () => {
      if (T.value) {
        const u = T.value.querySelector('input[type="text"]');
        u && u.setAttribute("aria-label", E("wizard.configure.sublayers.select"));
      }
    };
    return we(() => {
      m.step === 2 && m.step === m.activeStep && h("focusElement");
    }), ce(() => {
      R.value.disconnect(), G.forEach((u) => u());
    }), (u, i) => {
      const U = Ie("truncate");
      return c(), g("div", {
        class: "input-wrapper mb-12",
        ref_key: "el",
        ref: O
      }, [
        n.type === "file" ? (c(), g("div", ul, [
          s("label", dl, y(n.label), 1),
          s("div", cl, [
            s("input", {
              class: "absolute w-full opacity-0 inset-0 cursor-pointer",
              type: "file",
              name: "file",
              accept: ".geojson,.json,.csv,.zip",
              "aria-label": m.ariaLabel,
              onInput: i[0] || (i[0] = (p) => {
                ue(p);
              })
            }, null, 40, vl),
            i[11] || (i[11] = s("div", { class: "upload-mask absolute inset-0 flex border-dashed border-2 border-gray-400 pointer-events-none justify-center" }, [
              s("svg", {
                class: "w-30 h-30 m-auto",
                fill: "#a8a8a8",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 58 58"
              }, [
                s("path", { d: "M29,58A29,29,0,1,0,0,29,29,29,0,0,0,29,58ZM29,4A25,25,0,1,1,4,29,25,25,0,0,1,29,4Z" }),
                s("polygon", { points: "27 22 27 44.4 31 44.4 31 22 41.7 31.1 44.3 28.1 29 15 13.7 28.1 16.3 31.1 27 22" })
              ])
            ], -1))
          ]),
          s("div", pl, y(n.help), 1)
        ])) : n.type === "url" ? (c(), g("div", fl, [
          s("label", ml, y(n.label), 1),
          s("div", bl, [
            s("input", {
              class: "text-sm w-full border-solid border-gray-300 mb-5 focus:border-green-500",
              type: "url",
              name: "url",
              value: n.modelValue,
              "aria-label": m.ariaLabel,
              onChange: i[1] || (i[1] = (p) => z.value ? D.value = !1 : D.value = !0),
              onInput: i[2] || (i[2] = (p) => {
                Q(p);
              }),
              ref_key: "urlInput",
              ref: B
            }, null, 40, yl)
          ]),
          D.value ? (c(), g("div", gl, y(n.modelValue ? n.validationMessages?.invalid : n.validationMessages?.required), 1)) : F("", !0)
        ])) : n.type === "select" ? (c(), g("div", hl, [
          s("label", wl, y(n.label), 1),
          s("div", Sl, [
            n.multiple ? (c(), g("div", xl, [
              s("div", {
                ref_key: "treeWrapper",
                ref: T
              }, [
                $(o(ol), {
                  modelValue: q.value,
                  "onUpdate:modelValue": i[3] || (i[3] = (p) => q.value = p),
                  multiple: !0,
                  options: n.options,
                  "default-expand-level": 1,
                  "always-open": !0,
                  "open-direction": "bottom",
                  "max-height": 300,
                  limit: 4,
                  disableFuzzyMatching: !0,
                  searchable: n.searchable,
                  childrenIgnoreDisabled: !0,
                  placeholder: o(E)("wizard.configure.sublayers.select"),
                  noResultsText: o(E)("wizard.configure.sublayers.results"),
                  clearAllText: o(E)("wizard.configure.sublayers.clearAll"),
                  onSelect: i[4] || (i[4] = (p) => {
                    u.$nextTick(() => {
                      A();
                    });
                  }),
                  onDeselect: i[5] || (i[5] = (p) => {
                    u.$nextTick(() => {
                      A();
                    });
                  }),
                  onOpen: i[6] || (i[6] = (p) => {
                    u.$nextTick(() => {
                      k();
                    });
                  })
                }, {
                  [P.value]: M(({ node: p }) => [
                    s("label", null, y(j(p.label)), 1)
                  ]),
                  [J.value]: M(({ node: p, labelClassName: ne }) => [
                    ye((c(), g("label", {
                      class: se(ne)
                    }, [
                      Se(y(p.label), 1)
                    ], 2)), [
                      [U, {
                        options: {
                          placement: "top",
                          hideOnClick: !1,
                          theme: "ramp4",
                          animation: "scale"
                        }
                      }]
                    ])
                  ]),
                  _: 2
                }, 1032, ["modelValue", "options", "searchable", "placeholder", "noResultsText", "clearAllText"])
              ], 512),
              n.validation && le.value ? (c(), g("div", zl, y(n.validationMessages?.required), 1)) : F("", !0)
            ])) : (c(), g("div", El, [
              s("select", {
                class: se(["block border-solid border-gray-300 w-full p-3 overflow-y-auto", n.size && "configure-select"]),
                size: n.size,
                value: n.modelValue,
                onInput: i[7] || (i[7] = (p) => x(n.size, p)),
                "aria-label": m.ariaLabel,
                ref_key: "selectInput",
                ref: N
              }, [
                (c(!0), g(Ye, null, Ke(n.options, (p) => (c(), g("option", {
                  class: "p-6",
                  key: p.label,
                  value: p.value
                }, y(p.label), 9, kl))), 128))
              ], 42, Fl),
              n.validation && n.formatError ? (c(), g("div", Vl, y(n.validationMessages?.invalid), 1)) : F("", !0),
              n.validation && n.failureError ? (c(), g("div", Ll, y(n.validationMessages?.failure), 1)) : F("", !0)
            ]))
          ])
        ])) : n.type === "checkbox" ? (c(), g("div", Al, [
          s("input", {
            class: "text-sm border-solid border-gray-300 mb-5 focus:border-green-500 mr-10",
            type: "checkbox",
            name: "nested",
            checked: !0,
            "aria-label": m.ariaLabel,
            onChange: i[8] || (i[8] = (p) => {
              ae(p);
            })
          }, null, 40, $l),
          s("label", Ol, y(n.label), 1)
        ])) : (c(), g("div", Il, [
          s("label", Tl, y(n.label), 1),
          s("div", Cl, [
            s("input", {
              class: se(["border-solid border-gray-300 p-3 w-full", { "error-border": !z.value && !n.modelValue }]),
              type: "text",
              value: n.modelValue,
              "aria-label": m.ariaLabel,
              onChange: i[9] || (i[9] = (p) => z.value ? W.value = !1 : W.value = !0),
              onInput: i[10] || (i[10] = (p) => {
                oe(p);
              }),
              ref_key: "textInput",
              ref: L
            }, null, 42, Ml)
          ]),
          n.validation && !n.modelValue ? (c(), g("div", Rl, y(n.validationMessages?.required), 1)) : F("", !0)
        ]))
      ], 512);
    };
  }
}), C = /* @__PURE__ */ ve(Nl, [["__scopeId", "data-v-e4aa1c54"]]), Ul = { class: "step relative flex flex-col px-12" }, _l = { class: "stepper-header flex pb-24" }, Bl = {
  key: 1,
  class: "flex-none stepper-check w-24 h-24 text-gray-400"
}, ql = { class: "flex flex-col overflow-hidden" }, Hl = { class: "pl-12 flex items-center text-md" }, Dl = { class: "pl-12 text-xs transition-opacity duration-1000 ease-out" }, Wl = /* @__PURE__ */ ie({
  __name: "stepper-item",
  props: {
    title: {
      type: String,
      required: !0
    },
    summary: {
      type: String
    }
  },
  emits: ["focusPanel", "focusFirstElement"],
  setup(n, { emit: v }) {
    const t = he("stepper"), w = b(), E = v, h = b(-1), m = (N) => {
      L() || (N.stopPropagation(), E("focusPanel"), E("focusFirstElement"));
    };
    we(() => {
      h.value = t.numSteps++, w.value?.addEventListener("focusout", m);
    }), ce(() => {
      w.value?.removeEventListener("focusout", m);
    });
    const O = () => t.activeIndex > h.value, L = () => t.activeIndex === h.value;
    return (N, B) => {
      const z = Ie("truncate");
      return c(), g("div", Ul, [
        s("div", _l, [
          O() ? (c(), g("div", Bl, B[0] || (B[0] = [
            s("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              height: "100%",
              width: "100%",
              preserveAspectRatio: "xMidYMid meet",
              viewBox: "0 0 24 24",
              focusable: "false"
            }, [
              s("g", { id: "check_circle" }, [
                s("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })
              ])
            ], -1)
          ]))) : (c(), g("div", {
            key: 0,
            class: se(["w-24 h-24 bg-gray-500 rounded-full flex justify-center items-center text-white text-xs font-semibold", { "bg-blue-500": L }])
          }, y(h.value + 1), 3)),
          s("div", ql, [
            s("div", Hl, y(n.title), 1),
            ye((c(), g("div", Dl, [
              Se(y(n.summary), 1)
            ])), [
              [Ae, !L()],
              [z]
            ])
          ])
        ]),
        $(Je, {
          name: "step",
          mode: "out-in"
        }, {
          default: M(() => [
            ye(s("div", {
              class: "pl-36",
              ref_key: "stepItem",
              ref: w
            }, [
              Te(N.$slots, "default", {}, void 0, !0)
            ], 512), [
              [Ae, L()]
            ])
          ]),
          _: 3
        })
      ]);
    };
  }
}), be = /* @__PURE__ */ ve(Wl, [["__scopeId", "data-v-53b5c8d8"]]), Pl = { class: "py-12 h-auto stepper" }, Gl = /* @__PURE__ */ ie({
  __name: "stepper",
  props: {
    activeStep: {
      type: Number,
      default: 0
    }
  },
  setup(n) {
    const v = n, t = H(() => v.activeStep), w = re([]), E = re({
      activeIndex: v.activeStep,
      numSteps: 0
    });
    return Ze("stepper", E), w.push(
      ge(t, () => {
        E.activeIndex = v.activeStep;
      })
    ), ce(() => {
      w.forEach((h) => h());
    }), (h, m) => (c(), g("div", Pl, [
      Te(h.$slots, "default")
    ]));
  }
}), jl = {
  key: 0,
  class: "inline-flex items-center mb-10"
}, Yl = { class: "px-5 text-xs" }, Kl = { key: 6 }, Jl = ["for"], Zl = {
  key: 7,
  class: "text-base font-bold"
}, Ql = { class: "sr-only" }, Xl = { class: "sr-only" }, et = /* @__PURE__ */ ie({
  __name: "screen",
  props: {
    panel: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const v = al(), { t } = xe(), w = he("iApi"), E = b(), h = Qe(), m = b([]), O = H(() => v.layerSource), L = H(() => v.currStep), N = b(), B = b(0), z = b(!1), D = b(), W = ee("stepOneStart"), le = ee("stepTwoStart"), q = ee("stepThreeStart"), P = b(!1), J = b(!1), R = b(!1), T = b(!1), G = b(!1), Z = b(!1), te = b(!0), ue = b(""), Q = b(""), x = b([]), ae = re([
      {
        value: S.FEATURE,
        label: t("wizard.layerType.esriFeature")
      },
      {
        value: S.MAPIMAGE,
        label: t("wizard.layerType.esriMapImage")
      },
      {
        value: S.TILE,
        label: t("wizard.layerType.esriTile")
      },
      {
        value: S.IMAGERY,
        label: t("wizard.layerType.esriImagery")
      },
      {
        value: S.WMS,
        label: t("wizard.layerType.ogcWms")
      },
      {
        value: S.WFS,
        label: t("wizard.layerType.ogcWfs")
      }
    ]), oe = re([
      {
        value: S.GEOJSON,
        label: t("wizard.fileType.geojson")
      },
      {
        value: S.SHAPEFILE,
        label: t("wizard.fileType.shapefile")
      },
      { value: S.CSV, label: t("wizard.fileType.csv") }
    ]), A = H({
      get() {
        return v.url;
      },
      set(l) {
        v.url = l;
      }
    }), j = H({
      get() {
        return v.fileData;
      },
      set(l) {
        v.fileData = l;
      }
    }), k = H({
      get() {
        return v.typeSelection;
      },
      set(l) {
        v.typeSelection = l;
      }
    }), a = H({
      get() {
        return v.layerInfo;
      },
      set(l) {
        v.layerInfo = l;
      }
    }), de = H(() => {
      const l = w.geo.proxy !== "";
      switch (k.value) {
        // ESRI ArcGIS Server
        // required only if no proxy is set
        case S.FEATURE:
        case S.MAPIMAGE:
        case S.TILE:
        case S.IMAGERY:
          return !l;
        // WFS Server
        // always required
        case S.WFS:
          return !0;
        // WMS Server
        // required only if proxy is set
        case S.WMS:
          return !l;
        // Files
        // always required for files from hosted services
        case S.GEOJSON:
        case S.SHAPEFILE:
        case S.CSV:
          return !!(Y() && !j.value);
        default:
          return !1;
      }
    });
    Xe(() => ((L.value === K.FORMAT || L.value === K.CONFIGURE) && (P.value = !0, v.goToStep(K.FORMAT)), !1)), we(() => {
      m.value.push(
        w.event.on(Oe.LAYER_LAYERSTATECHANGE, (l) => {
          l.layer.userAdded && (ue.value = l.layer.name, Z.value = l.state !== fe.LOADING && l.state !== fe.NEW, te.value = Z.value && l.state === fe.LOADED);
        })
      ), L.value === K.CONFIGURE && (a.value?.configOptions.includes("colour") && Le(), T.value = !a.value?.configOptions.includes("sublayers") && !!a.value?.config.name);
    }), ce(() => {
      m.value.forEach((l) => w.event.off(l));
    });
    const u = () => {
      D.value.el.dispatchEvent(new MouseEvent("click"));
    }, i = () => {
      switch (L.value) {
        case 0:
          U(W);
          break;
        case 1:
          U(le);
          break;
        case 2:
          U(q);
          break;
      }
    };
    function U(l) {
      l.value?.$el.querySelectorAll("input, select")[0]?.focus();
    }
    const p = async (l) => {
      const e = new FileReader();
      e.onload = (d) => {
        j.value = e.result, A.value = l.name, ne(d);
      }, e.readAsArrayBuffer(l);
    }, ne = (l) => {
      l?.preventDefault(), k.value = O.value.guessFormatFromURL(A.value), v.goToStep(K.FORMAT);
    }, ze = async (l) => {
      l?.preventDefault(), z.value = !0, J.value = !1, G.value = !0, v.goToStep(K.CONFIGURE), Q.value = Y() ? oe.find((d) => d.value === k.value)?.label : ae.find((d) => d.value === k.value)?.label;
      try {
        a.value = Y() ? await O.value.fetchFileInfo(A.value, k.value, j.value) : await O.value.fetchServiceInfo(
          A.value,
          k.value,
          v.nested
        ), Y() && j.value && (a.value.config.url = "");
      } catch {
        z.value = !1, J.value = !0;
        return;
      }
      const e = k.value === S.FEATURE && !(a.value && a.value.fields);
      if (!a.value || e) {
        P.value = !0, a.value = {
          config: {
            id: "Placeholder",
            layerType: S.UNKNOWN,
            url: ""
          },
          configOptions: []
        }, z.value = !1;
        return;
      }
      Le(), T.value = !(a.value.configOptions.includes("sublayers") || !a.value.config.name), z.value = !1, G.value = !1;
    }, Ee = async (l) => {
      l?.preventDefault();
      const e = Object.assign(a.value.config, l);
      x.value = [], Q.value = "";
      const d = w.geo.layer.createLayer(e);
      w.geo.map.addLayer(d).catch(() => {
      }), d.userAdded = !0, w.event.emit(Oe.USER_LAYER_ADDED, d), R.value = !1, v.goToStep(K.UPLOAD);
    }, pe = () => a.value?.fields.map((l) => ({
      value: l.name,
      label: l.alias || l.name
    })), Fe = (l) => a.value?.latLonFields[l].map((e) => ({
      value: e,
      label: e
    })), Y = () => j.value || A.value.match(/\.(zip|csv|json|geojson)$/), Ce = (l) => {
      p(l), A.value = "";
    }, Me = (l, e) => {
      A.value = l.trim(), R.value = e;
    }, Re = (l) => {
      k.value = l, P.value = !1;
    }, Ne = (l) => {
      a.value.config.name = l.trim();
      const e = a.value?.config.sublayers, d = e ? l && e.length > 0 : l.trim();
      T.value = !!d;
    }, ke = (l) => {
      a.value.config.sublayers = l, T.value = !!(l.length > 0 && a.value?.config.name);
    }, Ue = (l) => {
      if (v.nested = l, x.value = [], B.value += 1, k.value === S.MAPIMAGE) {
        a.value.layers = O.value.createLayerHierarchy(
          a.value.layersRaw,
          v.nested
        );
        const e = new Set(
          (a.value?.config?.sublayers ?? []).map((d) => d.index)
        );
        v.nested ? _e(a, e) : qe(a, e);
      } else if (k.value === S.WMS) {
        a.value.layers = O.value.mapWmsLayerList(
          a.value.layersRaw,
          v.nested
        );
        const e = new Set((a.value?.config?.sublayers ?? []).map((d) => d.id));
        v.nested ? Be(a, e) : He(a, e);
      }
      ke(Ve(x.value));
    }, _e = (l, e) => {
      const d = /* @__PURE__ */ new Map();
      for (const r of l.value.layersRaw)
        if (r.parentLayerId !== -1) {
          const I = d.get(r.parentLayerId) || [];
          I.push(r.id), d.set(r.parentLayerId, I);
        }
      const f = (r) => {
        const I = d.get(r);
        return I ? I.every((X) => d.has(X) ? f(X) : e.has(X)) : !1;
      }, V = (r) => {
        if (f(r))
          x.value.push(r);
        else {
          const I = d.get(r);
          if (I)
            for (const X of I)
              e.has(X) && x.value.push(X);
        }
      };
      for (const r of d.keys()) V(r);
      for (const r of l.value.layersRaw)
        r.parentLayerId === -1 && !d.has(r.id) && e.has(r.id) && x.value.push(r.id);
      x.value = Array.from(new Set(x.value));
    }, Be = (l, e) => {
      const d = (r) => !r.layers || r.layers.length === 0 ? e.has(r.name) : r.layers.every((I) => d(I)), f = (r) => {
        d(r) ? x.value.push(r.name) : r.layers && r.layers.forEach(f);
      }, V = l.value.layersRaw[0];
      V && V.layers && V.layers.forEach((r) => f(r)), x.value = Array.from(new Set(x.value));
    }, qe = (l, e) => {
      const d = (f) => {
        const V = l.value.layersRaw.filter((r) => r.parentLayerId === f);
        if (V.length > 0)
          for (const r of V)
            e.has(r.id) ? x.value.push(r.id) : d(r.id);
        else x.value.push(f);
      };
      for (const f of l.value.layersRaw)
        e.has(f.id) && d(f.id);
      x.value = Array.from(new Set(x.value));
    }, He = (l, e) => {
      const d = (V) => {
        V.layers && V.layers.length > 0 ? V.layers.forEach(d) : x.value.push(V.name);
      }, f = l.value.layersRaw[0];
      for (const V of e) {
        const r = f.layers.find((I) => I.name === V);
        r && r.layers && r.layers.length > 0 ? d(r) : r && x.value.push(r.name);
      }
      x.value = Array.from(new Set(x.value));
    }, Ve = (l) => l.map((e) => {
      switch (k.value) {
        case S.MAPIMAGE:
          return {
            index: e,
            state: { opacity: 1, visibility: !0 }
          };
        case S.WMS: {
          const d = e.lastIndexOf("#");
          return { id: e.substring(0, d) };
        }
        default:
          return {
            id: e
          };
      }
    }), Le = () => {
      N.value = a.value?.config.colour ?? "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    }, De = (l) => {
      a.value.config.colour = l.colors.hex.substring(0, 7), ll(() => {
        E.value.querySelector(".vacp-copy-button").style.backgroundColor = a.value?.config.colour;
      });
    }, We = () => {
      R.value = !1, v.goToStep(0), U(W);
    }, Pe = () => {
      z.value = !1, P.value = !1, J.value = !1, R.value = !!A.value, G.value = !1, v.goToStep(0), Q.value = "";
    }, Ge = () => {
      x.value = [], T.value = !1, v.goToStep(1);
    };
    return (l, e) => {
      const d = el("panel-screen");
      return c(), _(d, {
        panel: n.panel,
        ref_key: "thePanel",
        ref: D
      }, {
        header: M(() => [
          Se(y(o(t)("wizard.title")), 1)
        ]),
        content: M(() => [
          $(Gl, { activeStep: L.value }, {
            default: M(() => [
              $(be, {
                title: o(t)("wizard.upload.title"),
                summary: A.value,
                onFocusPanel: u,
                onFocusFirstElement: i
              }, {
                default: M(() => [
                  s("form", {
                    name: "upload",
                    onSubmit: ne,
                    onClick: e[1] || (e[1] = (f) => Z.value = !1)
                  }, [
                    $(C, {
                      type: "file",
                      name: "file",
                      label: o(t)("wizard.upload.file.label"),
                      help: o(t)("wizard.upload.file.help"),
                      onUpload: Ce,
                      "aria-label": o(t)("wizard.upload.file.label")
                    }, null, 8, ["label", "help", "aria-label"]),
                    e[12] || (e[12] = s("span", { class: "block text-center mb-10" }, "or", -1)),
                    $(C, {
                      type: "url",
                      name: "url",
                      modelValue: A.value,
                      "onUpdate:modelValue": e[0] || (e[0] = (f) => A.value = f),
                      label: o(t)("wizard.upload.url.label"),
                      onLink: Me,
                      validation: !0,
                      "validation-messages": {
                        required: o(t)("wizard.upload.url.error.required"),
                        invalid: o(t)("wizard.upload.url.error.url")
                      },
                      "aria-label": o(t)("wizard.upload.url.label"),
                      ref_key: "stepOneStart",
                      ref: W
                    }, null, 8, ["modelValue", "label", "validation-messages", "aria-label"]),
                    $(me, {
                      onSubmit: ne,
                      onCancel: We,
                      disabled: !R.value
                    }, null, 8, ["disabled"])
                  ], 32)
                ]),
                _: 1
              }, 8, ["title", "summary"]),
              $(be, {
                title: o(t)("wizard.format.title"),
                summary: Q.value,
                onFocusFirstElement: i
              }, {
                default: M(() => [
                  s("form", {
                    name: "format",
                    onSubmit: ze
                  }, [
                    de.value ? (c(), g("div", jl, [
                      e[13] || (e[13] = s("svg", {
                        class: "inline-block fill-current w-16 h-16",
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                      }, [
                        s("path", {
                          d: "M0 0h24v24H0z",
                          fill: "none"
                        }),
                        s("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" })
                      ], -1)),
                      s("span", Yl, y(o(t)("wizard.format.info.cors")), 1)
                    ])) : F("", !0),
                    $(C, {
                      type: "select",
                      name: "type",
                      modelValue: k.value,
                      "onUpdate:modelValue": e[2] || (e[2] = (f) => k.value = f),
                      onSelect: Re,
                      size: Y() ? oe.length : ae.length,
                      label: Y() ? o(t)("wizard.format.type.file") : o(t)("wizard.format.type.service"),
                      options: Y() ? oe : ae,
                      formatError: P.value,
                      failureError: J.value,
                      validation: G.value,
                      "validation-messages": {
                        required: o(t)("wizard.format.type.error.required"),
                        invalid: o(t)("wizard.format.type.error.invalid"),
                        failure: `${o(t)("wizard.format.type.error.failure")}.${de.value ? " " + o(t)("wizard.format.warn.cors") + "." : ""}${" " + o(t)("wizard.format.warn.vpn") + "."}`
                      },
                      onKeydown: e[3] || (e[3] = $e(() => {
                      }, ["stop"])),
                      "aria-label": o(t)("wizard.format.type.service"),
                      ref_key: "stepTwoStart",
                      ref: le
                    }, null, 8, ["modelValue", "size", "label", "options", "formatError", "failureError", "validation", "validation-messages", "aria-label"]),
                    $(me, {
                      onSubmit: ze,
                      onCancel: Pe,
                      animation: !0,
                      disabled: z.value
                    }, null, 8, ["disabled"])
                  ], 32)
                ]),
                _: 1
              }, 8, ["title", "summary"]),
              $(be, {
                title: o(t)("wizard.configure.title"),
                onFocusFirstElement: i
              }, {
                default: M(() => [
                  s("form", {
                    name: "configure",
                    onSubmit: Ee,
                    ref_key: "formElement",
                    ref: E
                  }, [
                    a.value?.configOptions.includes("name") ? (c(), _(C, {
                      key: 0,
                      type: "text",
                      name: "name",
                      modelValue: a.value.config.name,
                      "onUpdate:modelValue": e[4] || (e[4] = (f) => a.value.config.name = f),
                      onLink: Ne,
                      label: o(t)("wizard.configure.name.label"),
                      "aria-label": o(t)("wizard.configure.name.label"),
                      validation: !0,
                      "validation-messages": {
                        required: o(t)("wizard.configure.name.error.required")
                      },
                      ref_key: "stepThreeStart",
                      ref: q,
                      onFocusElement: i,
                      activeStep: L.value,
                      step: 2
                    }, null, 8, ["modelValue", "label", "aria-label", "validation-messages", "activeStep"])) : F("", !0),
                    a.value?.configOptions.includes("nameField") ? (c(), _(C, {
                      key: 1,
                      type: "select",
                      name: "nameField",
                      modelValue: a.value.config.nameField,
                      "onUpdate:modelValue": e[5] || (e[5] = (f) => a.value.config.nameField = f),
                      label: o(t)("wizard.configure.nameField.label"),
                      "aria-label": o(t)("wizard.configure.nameField.label"),
                      defaultOption: !0,
                      options: pe()
                    }, null, 8, ["modelValue", "label", "aria-label", "options"])) : F("", !0),
                    a.value?.configOptions.includes("tooltipField") ? (c(), _(C, {
                      key: 2,
                      type: "select",
                      name: "tooltipField",
                      modelValue: a.value.config.tooltipField,
                      "onUpdate:modelValue": e[6] || (e[6] = (f) => a.value.config.tooltipField = f),
                      label: o(t)("wizard.configure.tooltipField.label"),
                      "aria-label": o(t)("wizard.configure.tooltipField.label"),
                      options: pe()
                    }, null, 8, ["modelValue", "label", "aria-label", "options"])) : F("", !0),
                    a.value?.configOptions.includes("legendField") ? (c(), _(C, {
                      key: 3,
                      type: "select",
                      name: "legendField",
                      modelValue: a.value.config.legendField,
                      "onUpdate:modelValue": e[7] || (e[7] = (f) => a.value.config.legendField = f),
                      label: o(t)("wizard.configure.legendField.label"),
                      "aria-label": o(t)("wizard.configure.legendField.label"),
                      defaultOption: !0,
                      options: pe()
                    }, null, 8, ["modelValue", "label", "aria-label", "options"])) : F("", !0),
                    a.value?.configOptions.includes("latField") ? (c(), _(C, {
                      key: 4,
                      type: "select",
                      name: "latField",
                      modelValue: a.value.config.latField,
                      "onUpdate:modelValue": e[8] || (e[8] = (f) => a.value.config.latField = f),
                      defaultOption: !0,
                      label: o(t)("wizard.configure.latField.label"),
                      "aria-label": o(t)("wizard.configure.latField.label"),
                      options: Fe("lat")
                    }, null, 8, ["modelValue", "label", "aria-label", "options"])) : F("", !0),
                    a.value?.configOptions.includes("longField") ? (c(), _(C, {
                      key: 5,
                      type: "select",
                      name: "longField",
                      modelValue: a.value.config.longField,
                      "onUpdate:modelValue": e[9] || (e[9] = (f) => a.value.config.longField = f),
                      defaultOption: !0,
                      label: o(t)("wizard.configure.longField.label"),
                      "aria-label": o(t)("wizard.configure.longField.label"),
                      options: Fe("lon")
                    }, null, 8, ["modelValue", "label", "aria-label", "options"])) : F("", !0),
                    a.value?.configOptions.includes("sublayers") ? (c(), g("div", Kl, [
                      $(C, {
                        type: "checkbox",
                        name: "nested",
                        onNested: Ue,
                        label: o(t)("wizard.configure.sublayers.nested"),
                        "aria-label": o(t)("wizard.configure.sublayers.nested")
                      }, null, 8, ["label", "aria-label"]),
                      (c(), _(C, {
                        type: "select",
                        key: B.value,
                        name: "sublayers",
                        modelValue: a.value.config.sublayers,
                        "onUpdate:modelValue": e[10] || (e[10] = (f) => a.value.config.sublayers = f),
                        onSelect: ke,
                        label: o(t)("wizard.configure.sublayers.label"),
                        "aria-label": o(t)("wizard.configure.sublayers.label"),
                        options: a.value.layers,
                        selectedValues: x.value,
                        sublayerOptions: Ve,
                        multiple: !0,
                        searchable: !0,
                        validation: !0,
                        "validation-messages": {
                          required: o(t)("wizard.configure.sublayers.error.required")
                        },
                        onKeydown: e[11] || (e[11] = $e(() => {
                        }, ["stop"]))
                      }, null, 8, ["modelValue", "label", "aria-label", "options", "selectedValues", "validation-messages"]))
                    ])) : F("", !0),
                    s("label", {
                      class: "sr-only",
                      for: `${o(h)}-color-hex`
                    }, y(o(t)("wizard.configure.colour.hex")), 9, Jl),
                    a.value?.configOptions.includes("colour") ? (c(), g("label", Zl, y(o(t)("wizard.configure.colour.label")), 1)) : F("", !0),
                    a.value?.configOptions.includes("colour") ? (c(), _(o(tl), {
                      key: 8,
                      "alpha-channel": "hide",
                      "visible-formats": ["hex"],
                      "default-format": "hex",
                      id: o(h) + "-hue-slider",
                      color: N.value,
                      onColorChange: De
                    }, {
                      "hue-range-input-label": M(() => [
                        s("span", Ql, y(o(t)("wizard.configure.colour.hue")), 1)
                      ]),
                      "copy-button": M(() => [
                        s("span", Xl, y(o(t)("wizard.configure.colour.copy")), 1),
                        e[14] || (e[14] = s("svg", {
                          "aria-hidden": "true",
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "15",
                          height: "15",
                          viewBox: "0 0 15 15"
                        }, [
                          s("path", {
                            d: "M5 0v2H1v13h12v-3h-1v2H2V5h10v3h1V2H9V0zm1 1h2v2h3v1H3V3h3z",
                            fill: "currentColor"
                          }),
                          s("path", {
                            d: "M10 7v2h5v2h-5v2l-3-3zM3 6h5v1H3zm0 2h3v1H3zm0 2h3v1H3zm0 2h5v1H3z",
                            fill: "currentColor"
                          })
                        ], -1))
                      ]),
                      _: 1
                    }, 8, ["id", "color"])) : F("", !0),
                    $(me, {
                      onSubmit: Ee,
                      onCancel: Ge,
                      disabled: !T.value
                    }, null, 8, ["disabled"])
                  ], 544)
                ]),
                _: 1
              }, 8, ["title"])
            ]),
            _: 1
          }, 8, ["activeStep"]),
          Z.value ? (c(), g("div", {
            key: 0,
            class: se(["p-3 border-solid border-2", te.value ? "bg-green-100 !border-green-900" : "bg-red-100 !border-red-900"])
          }, y(ue.value) + " " + y(o(t)(`wizard.upload.${te.value ? "success" : "fail"}`)), 3)) : F("", !0)
        ]),
        _: 1
      }, 8, ["panel"]);
    };
  }
}), Bt = /* @__PURE__ */ ve(et, [["__scopeId", "data-v-a44d6850"]]);
export {
  Bt as default
};
