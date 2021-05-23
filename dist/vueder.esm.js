import validate from 'validate.js';

//
var script = {
    props: {
        form: {}
    },
    data: function data() {
        return {
            model: {}
        }
    },
    mounted: function mounted() {
        if(sessionStorage.form) {
            this.form = JSON.parse(sessionStorage.form);
        }
    },
    methods: {
        validate: function validate$1(field) {
            return validate.single(field.value, field.validations)
        },
        parse: function parse(input, params) {
            if(typeof input == 'function') {
                return input(params)
            }
            return input
        }
    },
    watch: {
        form: {
            deep: true,
            handler: function handler() {
                sessionStorage.form = JSON.stringify(this.form);
                this.$emit('modified', this.model);
            }
        }
    }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "form-builder" }, [
    _c(
      "form",
      _vm._g(
        _vm._b(
          {},
          "form",
          _vm.parse(_vm.form.attrs, { model: _vm.model }),
          false
        ),
        _vm.parse(_vm.form.events, { form: _vm.form, model: _vm.model })
      ),
      _vm._l(
        _vm.parse(_vm.form.fieldsets, { form: _vm.form, model: _vm.model }),
        function(fieldset, key) {
          return _c(
            "fieldset",
            _vm._g(
              _vm._b(
                { key: key },
                "fieldset",
                _vm.parse(fieldset.attrs, {
                  form: _vm.form,
                  fieldset: fieldset,
                  model: _vm.model
                }),
                false
              ),
              _vm.parse(fieldset.events, {
                form: _vm.form,
                fieldset: fieldset,
                model: _vm.model
              })
            ),
            [
              fieldset.legend
                ? _c(
                    "legend",
                    _vm._g(
                      _vm._b(
                        {},
                        "legend",
                        _vm.parse(fieldset.legend.attrs, {
                          form: _vm.form,
                          fieldset: fieldset,
                          model: _vm.model
                        }),
                        false
                      ),
                      _vm.parse(fieldset.events, {
                        form: _vm.form,
                        fieldset: fieldset,
                        model: _vm.model
                      })
                    ),
                    [_vm._v(_vm._s(fieldset.legend.text))]
                  )
                : _vm._e(),
              _vm._v(" "),
              fieldset && fieldset.fields
                ? [
                    _c(
                      "div",
                      { staticClass: "fields" },
                      _vm._l(
                        _vm.parse(fieldset.fields, {
                          form: _vm.form,
                          fieldset: fieldset,
                          model: _vm.model
                        }),
                        function(field, key_field) {
                          return _c(
                            "div",
                            _vm._g(
                              _vm._b(
                                {
                                  key: key_field,
                                  staticClass: "field",
                                  attrs: { "data-error": _vm.validate(field) }
                                },
                                "div",
                                _vm.parse(field.attrs, {
                                  form: _vm.form,
                                  fieldset: fieldset,
                                  field: field,
                                  model: _vm.model
                                }),
                                false
                              ),
                              _vm.parse(field.events, {
                                form: _vm.form,
                                fieldset: fieldset,
                                field: field,
                                model: _vm.model
                              })
                            ),
                            [
                              field.label && field.type != "button"
                                ? _c(
                                    "label",
                                    _vm._g(
                                      _vm._b(
                                        {
                                          domProps: {
                                            innerHTML: _vm._s(field.label.text)
                                          }
                                        },
                                        "label",
                                        _vm.parse(field.attrs, {
                                          form: _vm.form,
                                          fieldset: fieldset,
                                          field: field,
                                          model: _vm.model
                                        }),
                                        false
                                      ),
                                      _vm.parse(field.label.events, {
                                        form: _vm.form,
                                        fieldset: fieldset,
                                        field: field,
                                        model: _vm.model
                                      })
                                    )
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _c(
                                "div",
                                _vm._g(
                                  _vm._b(
                                    {},
                                    "div",
                                    _vm.parse(field.container_attrs, {
                                      form: _vm.form,
                                      fieldset: fieldset,
                                      field: field,
                                      model: _vm.model
                                    }),
                                    false
                                  ),
                                  _vm.parse(field.container_attrs, {
                                    form: _vm.form,
                                    fieldset: fieldset,
                                    field: field,
                                    model: _vm.model
                                  })
                                ),
                                [
                                  field.type == "select"
                                    ? [
                                        _c(
                                          "select",
                                          _vm._g(
                                            _vm._b(
                                              {
                                                directives: [
                                                  {
                                                    name: "model",
                                                    rawName: "v-model",
                                                    value: field.value,
                                                    expression: "field.value"
                                                  }
                                                ],
                                                attrs: {
                                                  name: field.name || key_field
                                                },
                                                on: {
                                                  change: [
                                                    function($event) {
                                                      var $$selectedVal = Array.prototype.filter
                                                        .call(
                                                          $event.target.options,
                                                          function(o) {
                                                            return o.selected
                                                          }
                                                        )
                                                        .map(function(o) {
                                                          var val =
                                                            "_value" in o
                                                              ? o._value
                                                              : o.value;
                                                          return val
                                                        });
                                                      _vm.$set(
                                                        field,
                                                        "value",
                                                        $event.target.multiple
                                                          ? $$selectedVal
                                                          : $$selectedVal[0]
                                                      );
                                                    },
                                                    function($event) {
                                                      _vm.model[field.name] =
                                                        field.value;
                                                    }
                                                  ]
                                                }
                                              },
                                              "select",
                                              field.input_attrs,
                                              false
                                            ),
                                            _vm.parse(field.events, {
                                              form: _vm.form,
                                              fieldset: fieldset,
                                              field: field,
                                              model: _vm.model
                                            })
                                          ),
                                          [
                                            field.options
                                              ? _vm._l(
                                                  _vm.parse(field.options, {
                                                    form: _vm.form,
                                                    fieldset: fieldset,
                                                    field: field,
                                                    model: _vm.model
                                                  }),
                                                  function(option, key_option) {
                                                    return _c(
                                                      "option",
                                                      {
                                                        key: key_option,
                                                        domProps: {
                                                          value: option.value
                                                        }
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                                            " +
                                                            _vm._s(
                                                              option.label.text
                                                            ) +
                                                            "\n                                        "
                                                        )
                                                      ]
                                                    )
                                                  }
                                                )
                                              : _vm._e()
                                          ],
                                          2
                                        )
                                      ]
                                    : _vm._e(),
                                  _vm._v(" "),
                                  field.type == "radio" && field.options
                                    ? _vm._l(
                                        _vm.parse(field.options, {
                                          form: _vm.form,
                                          fieldset: fieldset,
                                          field: field,
                                          model: _vm.model
                                        }),
                                        function(option, key_option) {
                                          return _c(
                                            "label",
                                            _vm._g(
                                              _vm._b(
                                                {
                                                  key: key_option,
                                                  attrs: { value: option.value }
                                                },
                                                "label",
                                                _vm.parse(option.attrs, {
                                                  form: _vm.form,
                                                  fieldset: fieldset,
                                                  field: field,
                                                  model: _vm.model,
                                                  option: option
                                                }),
                                                false
                                              ),
                                              _vm.parse(option.events, {
                                                form: _vm.form,
                                                fieldset: fieldset,
                                                field: field,
                                                model: _vm.model,
                                                option: option
                                              })
                                            ),
                                            [
                                              _c(
                                                "input",
                                                _vm._g(
                                                  _vm._b(
                                                    {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value: field.value,
                                                          expression:
                                                            "field.value"
                                                        }
                                                      ],
                                                      attrs: { type: "radio" },
                                                      domProps: {
                                                        value: option.value,
                                                        checked: _vm._q(
                                                          field.value,
                                                          option.value
                                                        )
                                                      },
                                                      on: {
                                                        input: function(
                                                          $event
                                                        ) {
                                                          _vm.model[
                                                            field.name
                                                          ] = field.value;
                                                        },
                                                        change: function(
                                                          $event
                                                        ) {
                                                          return _vm.$set(
                                                            field,
                                                            "value",
                                                            option.value
                                                          )
                                                        }
                                                      }
                                                    },
                                                    "input",
                                                    _vm.parse(
                                                      field.input_attrs,
                                                      {
                                                        form: _vm.form,
                                                        fieldset: fieldset,
                                                        field: field,
                                                        model: _vm.model
                                                      }
                                                    ),
                                                    false
                                                  ),
                                                  _vm.parse(field.events, {
                                                    form: _vm.form,
                                                    fieldset: fieldset,
                                                    field: field,
                                                    model: _vm.model
                                                  })
                                                )
                                              ),
                                              _vm._v(" "),
                                              _c("span", [
                                                _vm._v(
                                                  _vm._s(option.label.text)
                                                )
                                              ])
                                            ]
                                          )
                                        }
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  field.type == "text" ||
                                  field.type == "password" ||
                                  field.type == "email" ||
                                  field.type == "tel" ||
                                  field.type == "number"
                                    ? [
                                        field.type === "checkbox"
                                          ? _c(
                                              "input",
                                              _vm._g(
                                                _vm._b(
                                                  {
                                                    directives: [
                                                      {
                                                        name: "model",
                                                        rawName: "v-model",
                                                        value: field.value,
                                                        expression:
                                                          "field.value"
                                                      }
                                                    ],
                                                    attrs: { type: "checkbox" },
                                                    domProps: {
                                                      checked: Array.isArray(
                                                        field.value
                                                      )
                                                        ? _vm._i(
                                                            field.value,
                                                            null
                                                          ) > -1
                                                        : field.value
                                                    },
                                                    on: {
                                                      input: function($event) {
                                                        _vm.model[field.name] =
                                                          field.value;
                                                      },
                                                      change: function($event) {
                                                        var $$a = field.value,
                                                          $$el = $event.target,
                                                          $$c = $$el.checked
                                                            ? true
                                                            : false;
                                                        if (
                                                          Array.isArray($$a)
                                                        ) {
                                                          var $$v = null,
                                                            $$i = _vm._i(
                                                              $$a,
                                                              $$v
                                                            );
                                                          if ($$el.checked) {
                                                            $$i < 0 &&
                                                              _vm.$set(
                                                                field,
                                                                "value",
                                                                $$a.concat([
                                                                  $$v
                                                                ])
                                                              );
                                                          } else {
                                                            $$i > -1 &&
                                                              _vm.$set(
                                                                field,
                                                                "value",
                                                                $$a
                                                                  .slice(0, $$i)
                                                                  .concat(
                                                                    $$a.slice(
                                                                      $$i + 1
                                                                    )
                                                                  )
                                                              );
                                                          }
                                                        } else {
                                                          _vm.$set(
                                                            field,
                                                            "value",
                                                            $$c
                                                          );
                                                        }
                                                      }
                                                    }
                                                  },
                                                  "input",
                                                  _vm.parse(field.input_attrs, {
                                                    form: _vm.form,
                                                    fieldset: fieldset,
                                                    field: field,
                                                    model: _vm.model
                                                  }),
                                                  false
                                                ),
                                                _vm.parse(field.events, {
                                                  form: _vm.form,
                                                  fieldset: fieldset,
                                                  field: field,
                                                  model: _vm.model
                                                })
                                              )
                                            )
                                          : field.type === "radio"
                                          ? _c(
                                              "input",
                                              _vm._g(
                                                _vm._b(
                                                  {
                                                    directives: [
                                                      {
                                                        name: "model",
                                                        rawName: "v-model",
                                                        value: field.value,
                                                        expression:
                                                          "field.value"
                                                      }
                                                    ],
                                                    attrs: { type: "radio" },
                                                    domProps: {
                                                      checked: _vm._q(
                                                        field.value,
                                                        null
                                                      )
                                                    },
                                                    on: {
                                                      input: function($event) {
                                                        _vm.model[field.name] =
                                                          field.value;
                                                      },
                                                      change: function($event) {
                                                        return _vm.$set(
                                                          field,
                                                          "value",
                                                          null
                                                        )
                                                      }
                                                    }
                                                  },
                                                  "input",
                                                  _vm.parse(field.input_attrs, {
                                                    form: _vm.form,
                                                    fieldset: fieldset,
                                                    field: field,
                                                    model: _vm.model
                                                  }),
                                                  false
                                                ),
                                                _vm.parse(field.events, {
                                                  form: _vm.form,
                                                  fieldset: fieldset,
                                                  field: field,
                                                  model: _vm.model
                                                })
                                              )
                                            )
                                          : _c(
                                              "input",
                                              _vm._g(
                                                _vm._b(
                                                  {
                                                    directives: [
                                                      {
                                                        name: "model",
                                                        rawName: "v-model",
                                                        value: field.value,
                                                        expression:
                                                          "field.value"
                                                      }
                                                    ],
                                                    attrs: { type: field.type },
                                                    domProps: {
                                                      value: field.value
                                                    },
                                                    on: {
                                                      input: [
                                                        function($event) {
                                                          if (
                                                            $event.target
                                                              .composing
                                                          ) {
                                                            return
                                                          }
                                                          _vm.$set(
                                                            field,
                                                            "value",
                                                            $event.target.value
                                                          );
                                                        },
                                                        function($event) {
                                                          _vm.model[
                                                            field.name
                                                          ] = field.value;
                                                        }
                                                      ]
                                                    }
                                                  },
                                                  "input",
                                                  _vm.parse(field.input_attrs, {
                                                    form: _vm.form,
                                                    fieldset: fieldset,
                                                    field: field,
                                                    model: _vm.model
                                                  }),
                                                  false
                                                ),
                                                _vm.parse(field.events, {
                                                  form: _vm.form,
                                                  fieldset: fieldset,
                                                  field: field,
                                                  model: _vm.model
                                                })
                                              )
                                            )
                                      ]
                                    : _vm._e(),
                                  _vm._v(" "),
                                  field.type == "textarea"
                                    ? [
                                        _c(
                                          "textarea",
                                          _vm._g(
                                            _vm._b(
                                              {
                                                directives: [
                                                  {
                                                    name: "model",
                                                    rawName: "v-model",
                                                    value: field.value,
                                                    expression: "field.value"
                                                  }
                                                ],
                                                domProps: {
                                                  value: field.value
                                                },
                                                on: {
                                                  input: [
                                                    function($event) {
                                                      if (
                                                        $event.target.composing
                                                      ) {
                                                        return
                                                      }
                                                      _vm.$set(
                                                        field,
                                                        "value",
                                                        $event.target.value
                                                      );
                                                    },
                                                    function($event) {
                                                      _vm.model[field.name] =
                                                        field.value;
                                                    }
                                                  ]
                                                }
                                              },
                                              "textarea",
                                              _vm.parse(field.input_attrs, {
                                                form: _vm.form,
                                                fieldset: fieldset,
                                                field: field,
                                                model: _vm.model
                                              }),
                                              false
                                            ),
                                            _vm.parse(field.events, {
                                              form: _vm.form,
                                              fieldset: fieldset,
                                              field: field,
                                              model: _vm.model
                                            })
                                          )
                                        )
                                      ]
                                    : _vm._e(),
                                  _vm._v(" "),
                                  field.type == "component"
                                    ? [
                                        _c(
                                          field.component,
                                          _vm._g(
                                            _vm._b(
                                              { tag: "component" },
                                              "component",
                                              _vm.parse(field.input_attrs, {
                                                form: _vm.form,
                                                fieldset: fieldset,
                                                field: field,
                                                model: _vm.model
                                              }),
                                              false
                                            ),
                                            _vm.parse(field.events, {
                                              form: _vm.form,
                                              fieldset: fieldset,
                                              field: field,
                                              model: _vm.model
                                            })
                                          )
                                        )
                                      ]
                                    : _vm._e(),
                                  _vm._v(" "),
                                  field.type == "button"
                                    ? [
                                        _c(
                                          "button",
                                          _vm._g(
                                            _vm._b(
                                              {
                                                domProps: {
                                                  innerHTML: _vm._s(
                                                    field.label.text
                                                  )
                                                }
                                              },
                                              "button",
                                              _vm.parse(field.input_attrs, {
                                                form: _vm.form,
                                                fieldset: fieldset,
                                                field: field,
                                                model: _vm.model
                                              }),
                                              false
                                            ),
                                            _vm.parse(field.events, {
                                              form: _vm.form,
                                              fieldset: fieldset,
                                              field: field,
                                              model: _vm.model
                                            })
                                          )
                                        )
                                      ]
                                    : _vm._e()
                                ],
                                2
                              )
                            ]
                          )
                        }
                      ),
                      0
                    )
                  ]
                : _vm._e()
            ],
            2
          )
        }
      ),
      0
    )
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-08913a9e_0", { source: ".form-builder *[data-v-08913a9e] {\n  box-sizing: border-box;\n}\n.row[data-v-08913a9e] {\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n}\n[class*=\"col-\"][data-v-08913a9e] {\n  width: 100%;\n}\n.col-1[data-v-08913a9e] {\n  max-width: 8.333333333333332%;\n  padding: 15px;\n}\n.col-2[data-v-08913a9e] {\n  max-width: 16.666666666666664%;\n  padding: 15px;\n}\n.col-3[data-v-08913a9e] {\n  max-width: 25%;\n  padding: 15px;\n}\n.col-4[data-v-08913a9e] {\n  max-width: 33.33333333333333%;\n  padding: 15px;\n}\n.col-5[data-v-08913a9e] {\n  max-width: 41.66666666666667%;\n  padding: 15px;\n}\n.col-6[data-v-08913a9e] {\n  max-width: 50%;\n  padding: 15px;\n}\n.col-7[data-v-08913a9e] {\n  max-width: 58.333333333333336%;\n  padding: 15px;\n}\n.col-8[data-v-08913a9e] {\n  max-width: 66.66666666666666%;\n  padding: 15px;\n}\n.col-9[data-v-08913a9e] {\n  max-width: 75%;\n  padding: 15px;\n}\n.col-10[data-v-08913a9e] {\n  max-width: 83.33333333333334%;\n  padding: 15px;\n}\n.col-11[data-v-08913a9e] {\n  max-width: 91.66666666666666%;\n  padding: 15px;\n}\n.col-12[data-v-08913a9e] {\n  max-width: 100%;\n  padding: 15px;\n}\nform fieldset[data-v-08913a9e] {\n  margin-bottom: 15px;\n}\nform fieldset .fields[data-v-08913a9e] {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap;\n}\nform fieldset .fields .field label[data-v-08913a9e] {\n  display: block;\n  margin-bottom: 5px;\n}\nform fieldset .fields .field[data-error] input[data-v-08913a9e],\nform fieldset .fields .field[data-error] select[data-v-08913a9e],\nform fieldset .fields .field[data-error] textarea[data-v-08913a9e] {\n  background: #faa;\n}\nform fieldset .fields .field[data-error][data-v-08913a9e]:after {\n  content: attr(data-error);\n  color: #f00;\n}\nform fieldset .fields select[data-v-08913a9e],\nform fieldset .fields [type=\"text\"][data-v-08913a9e],\nform fieldset .fields [type=\"password\"][data-v-08913a9e],\nform fieldset .fields [type=\"number\"][data-v-08913a9e],\nform fieldset .fields [type=\"email\"][data-v-08913a9e],\nform fieldset .fields [type=\"tel\"][data-v-08913a9e] {\n  height: 30px;\n  width: 100%;\n  border: 1px solid #aaa;\n}\n", map: {"version":3,"sources":["/home/everaldoreis/public_html/wordpress/vueder/src/Vueder.vue","Vueder.vue"],"names":[],"mappings":"AAuFA;EACA,sBAAA;ACtFA;ADuFA;EACA,aAAA;EACA,eAAA;EACA,WAAA;ACrFA;ADsFA;EACA,WAAA;ACpFA;ADsFA;EACA,6BAAA;EACA,aAAA;ACpFA;ADkFA;EACA,8BAAA;EACA,aAAA;AChFA;AD8EA;EACA,cAAA;EACA,aAAA;AC5EA;AD0EA;EACA,6BAAA;EACA,aAAA;ACxEA;ADsEA;EACA,6BAAA;EACA,aAAA;ACpEA;ADkEA;EACA,cAAA;EACA,aAAA;AChEA;AD8DA;EACA,8BAAA;EACA,aAAA;AC5DA;AD0DA;EACA,6BAAA;EACA,aAAA;ACxDA;ADsDA;EACA,cAAA;EACA,aAAA;ACpDA;ADkDA;EACA,6BAAA;EACA,aAAA;AChDA;AD8CA;EACA,6BAAA;EACA,aAAA;AC5CA;AD0CA;EACA,eAAA;EACA,aAAA;ACxCA;AD0CA;EACA,mBAAA;ACxCA;ADyCA;EACA,WAAA;EACA,aAAA;EACA,eAAA;ACvCA;ADyCA;EACA,cAAA;EACA,kBAAA;ACvCA;ADyCA;;;EAGA,gBAAA;ACvCA;ADwCA;EACA,yBAAA;EACA,WAAA;ACtCA;ADuCA;;;;;;EAMA,YAAA;EACA,WAAA;EACA,sBAAA;ACrCA","file":"Vueder.vue","sourcesContent":["<template>\n    <div class=\"form-builder\">\n        <form v-bind=\"parse(form.attrs, {model})\" v-on=\"parse(form.events, {form, model})\">\n            <fieldset v-for=\"(fieldset, key) in parse(form.fieldsets, {form, model})\" :key=\"key\" v-bind=\"parse(fieldset.attrs, {form, fieldset, model})\" v-on=\"parse(fieldset.events, {form, fieldset, model})\">\n                <legend v-if=\"fieldset.legend\" v-bind=\"parse(fieldset.legend.attrs, {form, fieldset, model})\" v-on=\"parse(fieldset.events, {form, fieldset, model})\">{{fieldset.legend.text}}</legend>\n                <template v-if=\"fieldset && fieldset.fields\">\n                    <div class=\"fields\">\n                        <div class=\"field\" :data-error=\"validate(field)\" v-for=\"(field, key_field) in parse(fieldset.fields, {form, fieldset, model})\" :key=\"key_field\" v-bind=\"parse(field.attrs, {form, fieldset, field, model})\" v-on=\"parse(field.events, {form, fieldset, field, model})\">\n                            <label v-bind=\"parse(field.attrs, {form, fieldset, field, model})\" v-on=\"parse(field.label.events, {form, fieldset, field, model})\" v-if=\"field.label && field.type != 'button'\" v-html=\"field.label.text\"></label>\n                            <div v-bind=\"parse(field.container_attrs, {form, fieldset, field, model})\" v-on=\"parse(field.container_attrs, {form, fieldset, field, model})\">\n                                <template v-if=\"field.type == 'select'\">\n                                    <select v-bind=\"field.input_attrs\" v-on=\"parse(field.events, {form, fieldset, field, model})\" :name=\"field.name || key_field\" v-model=\"field.value\" @change=\"model[field.name] = field.value\">\n                                        <template v-if=\"field.options\">\n                                            <option v-for=\"(option, key_option) in parse(field.options, {form, fieldset, field, model})\" :key=\"key_option\" :value=\"option.value\">\n                                                {{option.label.text}}\n                                            </option>\n                                        </template>\n                                    </select>\n                                </template>\n                                <template v-if=\"field.type == 'radio' && field.options\">\n                                    <label v-for=\"(option, key_option) in parse(field.options, {form, fieldset, field, model})\" :key=\"key_option\" :value=\"option.value\" v-bind=\"parse(option.attrs, {form, fieldset, field, model, option})\" v-on=\"parse(option.events, {form, fieldset, field, model, option})\">\n                                        <input v-bind=\"parse(field.input_attrs, {form, fieldset, field, model})\" v-on=\"parse(field.events, {form, fieldset, field, model})\" type=\"radio\" :value=\"option.value\" v-model=\"field.value\" @input=\"model[field.name] = field.value\" /> <span>{{option.label.text}}</span>\n                                    </label>\n                                </template>\n                                <template v-if=\"field.type == 'text' || field.type == 'password' || field.type == 'email' || field.type == 'tel' || field.type == 'number'\">\n                                    <input v-bind=\"parse(field.input_attrs, {form, fieldset, field, model})\" v-on=\"parse(field.events, {form, fieldset, field, model})\"  :type=\"field.type\" v-model=\"field.value\" @input=\"model[field.name] = field.value\" />\n                                </template>\n                                <template v-if=\"field.type == 'textarea'\">\n                                    <textarea v-bind=\"parse(field.input_attrs, {form, fieldset, field, model})\" v-on=\"parse(field.events, {form, fieldset, field, model})\" v-model=\"field.value\" @input=\"model[field.name] = field.value\"></textarea>\n                                </template>\n                                <template v-if=\"field.type == 'component'\">\n                                    <component v-bind=\"parse(field.input_attrs, {form, fieldset, field, model})\" v-on=\"parse(field.events, {form, fieldset, field, model})\" :is=\"field.component\" />\n                                </template>\n                                <template v-if=\"field.type == 'button'\">\n                                    <button v-bind=\"parse(field.input_attrs, {form, fieldset, field, model})\" v-on=\"parse(field.events, {form, fieldset, field, model})\" v-html=\"field.label.text\"></button>\n                                </template>\n                            </div>\n                        </div>\n                    </div>\n                </template>\n            </fieldset>\n        </form>\n    </div>\n</template>\n\n<script>\n/* eslint-disable */\nimport validate from 'validate.js'\nexport default {\n    props: {\n        form: {}\n    },\n    data() {\n        return {\n            model: {}\n        }\n    },\n    mounted() {\n        if(sessionStorage.form) {\n            this.form = JSON.parse(sessionStorage.form)\n        }\n    },\n    methods: {\n        validate(field) {\n            return validate.single(field.value, field.validations)\n        },\n        parse(input, params) {\n            if(typeof input == 'function') {\n                return input(params)\n            }\n            return input\n        }\n    },\n    watch: {\n        form: {\n            deep: true,\n            handler() {\n                sessionStorage.form = JSON.stringify(this.form)\n                this.$emit('modified', this.model)\n            }\n        }\n    }\n}\n</script>\n\n<style lang=\"stylus\" scoped>\n.form-builder\n    *\n        box-sizing border-box\n.row\n  display flex\n  flex-wrap wrap \n  width 100%\n[class*=\"col-\"]\n  width 100%\nfor i in 1..12\n  .col-{i}\n    max-width unit(100% * (i / 12), '%')\n    padding 15px\nform\n    fieldset\n        margin-bottom 15px\n        .fields\n            width 100%\n            display flex\n            flex-wrap wrap\n            .field\n                label\n                    display block\n                    margin-bottom 5px\n                &[data-error]\n                    input\n                    select\n                    textarea\n                        background #faa\n                    &:after\n                        content attr(data-error)\n                        color red\n            select\n            [type=\"text\"]\n            [type=\"password\"]\n            [type=\"number\"]\n            [type=\"email\"]\n            [type=\"tel\"]\n                height 30px\n                width 100%\n                border 1px solid #aaa\n</style>",".form-builder * {\n  box-sizing: border-box;\n}\n.row {\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n}\n[class*=\"col-\"] {\n  width: 100%;\n}\n.col-1 {\n  max-width: 8.333333333333332%;\n  padding: 15px;\n}\n.col-2 {\n  max-width: 16.666666666666664%;\n  padding: 15px;\n}\n.col-3 {\n  max-width: 25%;\n  padding: 15px;\n}\n.col-4 {\n  max-width: 33.33333333333333%;\n  padding: 15px;\n}\n.col-5 {\n  max-width: 41.66666666666667%;\n  padding: 15px;\n}\n.col-6 {\n  max-width: 50%;\n  padding: 15px;\n}\n.col-7 {\n  max-width: 58.333333333333336%;\n  padding: 15px;\n}\n.col-8 {\n  max-width: 66.66666666666666%;\n  padding: 15px;\n}\n.col-9 {\n  max-width: 75%;\n  padding: 15px;\n}\n.col-10 {\n  max-width: 83.33333333333334%;\n  padding: 15px;\n}\n.col-11 {\n  max-width: 91.66666666666666%;\n  padding: 15px;\n}\n.col-12 {\n  max-width: 100%;\n  padding: 15px;\n}\nform fieldset {\n  margin-bottom: 15px;\n}\nform fieldset .fields {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap;\n}\nform fieldset .fields .field label {\n  display: block;\n  margin-bottom: 5px;\n}\nform fieldset .fields .field[data-error] input,\nform fieldset .fields .field[data-error] select,\nform fieldset .fields .field[data-error] textarea {\n  background: #faa;\n}\nform fieldset .fields .field[data-error]:after {\n  content: attr(data-error);\n  color: #f00;\n}\nform fieldset .fields select,\nform fieldset .fields [type=\"text\"],\nform fieldset .fields [type=\"password\"],\nform fieldset .fields [type=\"number\"],\nform fieldset .fields [type=\"email\"],\nform fieldset .fields [type=\"tel\"] {\n  height: 30px;\n  width: 100%;\n  border: 1px solid #aaa;\n}\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-08913a9e";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

// Import vue component

// Declare install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;
	Vue.component('Vueder', __vue_component__);
}

// Create module definition for Vue.use()
var plugin = {
	install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

export default __vue_component__;
export { install };
