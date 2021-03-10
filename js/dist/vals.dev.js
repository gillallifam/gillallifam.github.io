"use strict";

var _this3 = void 0,
    _allAvaliators;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vals =
/*#__PURE__*/
function () {
  function Vals(form, options) {
    var _this = this;

    _classCallCheck(this, Vals);

    this.options = options;

    if (form) {
      this.form = form;

      form.onsubmit = function (e) {
        console.log("Submiting");
        e.preventDefault();
        var data = Object.fromEntries(new FormData(e.target));
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = form.querySelectorAll('input[type="checkbox"]')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var box = _step.value;
            data[box.name] = box.checked;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = form.querySelectorAll('input[type="radio"]')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var radio = _step2.value;
            if (radio.checked) data[radio.name] = radio.value;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = document.querySelectorAll('select')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var sel = _step3.value;
            if (sel.multiple) data[sel.name] = Array.from(sel.querySelectorAll('option:checked')).map(function (el) {
              return el.value;
            });else data[sel.name] = sel.value;
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        _this.validate(data);
      };
    }

    this.schema = {};
    this.rgx = {
      onlyNumbers: /^\d+$/
    };
    this.errors = {};
    this.avaliators = {};
  }

  _createClass(Vals, [{
    key: "validate",
    value: function validate(obj) {
      var _this2 = this;

      console.log("Validate");
      var result = {
        pass: true
      };

      var _loop = function _loop() {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            oe = _Object$entries$_i[0],
            ov = _Object$entries$_i[1];

        var fs = _this2.schema[oe];

        var el = _this2.form.querySelector("*[name=".concat(oe, "]"));

        if (fs) {
          for (var _i2 = 0, _Object$entries2 = Object.entries(fs); _i2 < _Object$entries2.length; _i2++) {
            var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
                r = _Object$entries2$_i[0],
                v = _Object$entries2$_i[1];

            if (!_this2.avaliators[r]) result.pass = false; //must be warning

            if (!_this2.avaliators[r](ov, v)) {
              result.pass = false;
              result.error = _this2.errors[oe] ? "".concat(_this2.errors[oe](oe, r, v)) : "".concat(oe, " ").concat(r, " ").concat(v);
              el.style.backgroundColor = _this2.options.colorError;
              var cv = "An error here!"; //?

              if (_this2.errors[oe]) cv = _this2.errors[oe]();
              el.setCustomValidity(cv);
              el.reportValidity();

              el.oninput = function () {
                return el.setCustomValidity("");
              };

              return {
                v: result
              }; //not pass
            } else {
              el.style.backgroundColor = _this2.options.colorSuccess;
            }
          }
        }
      };

      for (var _i = 0, _Object$entries = Object.entries(obj); _i < _Object$entries.length; _i++) {
        var _ret = _loop();

        if (_typeof(_ret) === "object") return _ret.v;
      }

      if (result.pass) this.toast(result.pass);
      return result;
    }
  }, {
    key: "validateAll",
    value: function validateAll(objs) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = objs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var obj = _step4.value;
          if (!this.validate(obj)) return false;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return true;
    }
  }, {
    key: "toast",
    value: function toast(success, msg) {
      var bar = document.getElementById("snackbar");

      if (success) {
        bar.innerHTML = this.options.msgSuccess;
        bar.style.backgroundColor = this.options.colorSuccess;
      } else {
        bar.style.backgroundColor = this.options.colorError;
        bar.innerHTML = msg;
      }

      bar.className = "show";
      setTimeout(function () {
        bar.className = bar.className.replace("show", "");
      }, 3000);
    }
  }]);

  return Vals;
}();

function isObj(x) {
  return _typeof(x) === 'object' && x !== null && !Array.isArray(x);
}

var allAvaliators = (_allAvaliators = {
  //the boring part
  isArray: function isArray(o, f) {
    return Array.isArray(o) === f;
  },
  minElems: function minElems(a, n) {
    return Array.isArray(a) && a.length >= n;
  },
  empty: function empty(s, f) {
    return s === "" === f;
  },
  notEqual: function notEqual(s1, s2) {
    return s1 !== s2;
  },
  mustContains: function mustContains(s, v) {
    return s.toLowerCase().includes(v.toLowerCase());
  },
  mustNotContains: function mustNotContains(s, v) {
    return !s.toLowerCase().includes(v.toLowerCase());
  },
  maxLen: function maxLen(s, v) {
    return s.length <= v;
  },
  minLen: function minLen(s, v) {
    return s.length >= v;
  },
  max: function max(n, v) {
    return n <= v;
  },
  min: function min(n, v) {
    return n >= v;
  },
  onlyNumbers: function onlyNumbers(s, b) {
    return _this3.rgx.onlyNumbers.test(s) === b;
  }
}, _defineProperty(_allAvaliators, "minLen", function minLen(s, v) {
  return s.length >= v;
}), _defineProperty(_allAvaliators, "isPositive", function isPositive(n, b) {
  return Number.isInteger(n) & n > 0;
}), _defineProperty(_allAvaliators, "isEmail", function isEmail(m, b) {
  var p = m.split("@");
  if (p.length != 2) return false;
  return _this3.rgx.emailUser.test(p[0]) && _this3.rgx.emailDomain.test(p[1]);
}), _allAvaliators);