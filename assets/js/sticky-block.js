__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HSStickyBlock; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
* HSStickyBlock Plugin
* @version: 3.0.0 (Wed, 24 Nov 2021)
* @author: HtmlStream
* @event-namespace: .HSStickyBlock
* @license: Htmlstream Libraries (https://htmlstream.com/)
* Copyright 2021 Htmlstream
*/
var isNumeric = function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
},
    offset = function offset(el) {
  el = _typeof(el) === "object" ? el : document.querySelector(el);
  return {
    top: el ? window.pageYOffset + el.getBoundingClientRect().top : 0,
    left: el ? el.getBoundingClientRect().left : 0
  };
},
    css = function css(el, style) {
  el = _typeof(el) === "object" ? el : document.querySelector(el);

  for (var property in style) {
    el.style[property] = style[property];
  }
};

var dataAttributeName = 'data-hs-sticky-block-options';
var defaults = {
  parentSelector: null,
  parentWidth: null,
  parentPaddingLeft: null,
  parentOffsetLeft: null,
  targetSelector: null,
  targetHeight: 0,
  stickyHeight: null,
  stickyOffsetTop: 0,
  stickyOffsetBottom: 0,
  windowOffsetTop: 0,
  startPoint: null,
  endPoint: null,
  resolutionsList: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  },
  breakpoint: 'lg',
  styles: {
    position: 'fixed'
  },
  classMap: {
    kill: 'hs-kill-sticky'
  }
};

var HSStickyBlock = /*#__PURE__*/function () {
  function HSStickyBlock(el, options, id) {
    _classCallCheck(this, HSStickyBlock);

    this.collection = [];
    var that = this;
    var elems;

    if (el instanceof HTMLElement) {
      elems = [el];
    } else if (el instanceof Object) {
      elems = el;
    } else {
      elems = document.querySelectorAll(el);
    }

    for (var i = 0; i < elems.length; i += 1) {
      that.addToCollection(elems[i], options, id || elems[i].id);
    }

    if (!that.collection.length) {
      return false;
    } // initialization calls


    that._init();

    return this;
  }

  _createClass(HSStickyBlock, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      var that = this;

      var _loop = function _loop(i) {
        var _$el = void 0;

        var _options = void 0;

        if (that.collection[i].hasOwnProperty('$initializedEl')) {
          return "continue";
        }

        _$el = that.collection[i].$el;
        _options = that.collection[i].options;
        Array('resize', 'scroll').forEach(function (evt) {
          return window.addEventListener(evt, function () {
            return _this.update(_$el, _options);
          }, false);
        });
        that.collection[i].$initializedEl = _options;
      };

      for (var i = 0; i < that.collection.length; i += 1) {
        var _ret = _loop(i);

        if (_ret === "continue") continue;
      }
    }
  }, {
    key: "update",
    value: function update($el, settings) {
      var that = this;

      that._setRules($el, settings);
    }
  }, {
    key: "_updateOptions",
    value: function _updateOptions($el, settings) {
      var parentSelector = document.querySelector(settings.parentSelector),
          targetSelector = document.querySelector(settings.targetSelector);
      settings.windowOffsetTop = window.pageYOffset;
      settings.startPointPos = offset(settings.startPoint).top;
      settings.endPointPos = offset(settings.endPoint).top;
      settings.parentWidth = parentSelector ? parentSelector.clientWidth : 0;
      settings.parentPaddingLeft = parentSelector ? parseInt(window.getComputedStyle(parentSelector).paddingLeft) : 0;
      settings.parentOffsetLeft = offset(parentSelector).left;
      settings.targetHeight = targetSelector ? targetSelector.offsetHeight : 0;
      settings.stickyHeight = $el.offsetHeight;
    }
  }, {
    key: "_setRules",
    value: function _setRules($el, settings) {
      var that = this;

      that._kill($el, settings);

      that._updateOptions($el, settings);

      if (!$el.classList.contains(settings.classMap.kill)) {
        if (settings.windowOffsetTop >= settings.startPointPos - settings.targetHeight - settings.stickyOffsetTop && settings.windowOffsetTop <= settings.endPointPos - settings.targetHeight - settings.stickyOffsetTop) {
          that._add($el, settings);

          that._top($el, settings);

          that._parentSetHeight($el, settings);
        } else {
          that._reset($el);

          that._parentRemoveHeight($el, settings);
        }

        if (settings.windowOffsetTop >= settings.endPointPos - settings.targetHeight - settings.stickyHeight - settings.stickyOffsetTop - settings.stickyOffsetBottom) {
          that._bottom($el, settings);
        }
      }
    }
  }, {
    key: "_add",
    value: function _add($el, settings) {
      css($el, {
        position: settings.styles.position,
        left: settings.parentOffsetLeft + settings.parentPaddingLeft + 'px',
        width: settings.parentWidth + 'px'
      });
    }
  }, {
    key: "_top",
    value: function _top($el, settings) {
      css($el, {
        top: settings.stickyOffsetTop + settings.targetHeight + 'px'
      });
    }
  }, {
    key: "_bottom",
    value: function _bottom($el, settings) {
      css($el, {
        top: settings.endPointPos - settings.windowOffsetTop - settings.stickyHeight - settings.stickyOffsetBottom + 'px'
      });
    }
  }, {
    key: "_reset",
    value: function _reset($el, settings) {
      css($el, {
        position: '',
        top: '',
        bottom: '',
        left: '',
        width: ''
      });
    }
  }, {
    key: "_kill",
    value: function _kill($el, settings) {
      var that = this;

      if (window.innerWidth < settings.resolutionsList[settings.breakpoint]) {
        $el.classList.add(settings.classMap.kill);

        that._reset($el);

        that._parentRemoveHeight($el, settings);
      } else {
        $el.classList.remove(settings.classMap.kill);
      }
    }
  }, {
    key: "_parentSetHeight",
    value: function _parentSetHeight($el, settings) {
      css(settings.parentSelector, {
        height: settings.stickyHeight + 'px'
      });
    }
  }, {
    key: "_parentRemoveHeight",
    value: function _parentRemoveHeight($el, settings) {
      css(settings.parentSelector, {
        height: ''
      });
    }
  }, {
    key: "addToCollection",
    value: function addToCollection(item, options, id) {
      this.collection.push({
        $el: item,
        id: id || null,
        options: Object.assign({}, defaults, item.hasAttribute(dataAttributeName) ? JSON.parse(item.getAttribute(dataAttributeName)) : {}, options)
      });
    }
  }, {
    key: "getItem",
    value: function getItem(item) {
      if (typeof item === 'number') {
        return this.collection[item].$initializedEl;
      } else {
        return this.collection.find(function (el) {
          return el.id === item;
        }).$initializedEl;
      }
    }
  }]);

  return HSStickyBlock;
}();



//# sourceURL=webpack://HSStickyBlock/./src/js/hs-sticky-block.js?