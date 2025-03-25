__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HSScrollspy; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
* HSScrollspy Plugin
* @version: 1.0.0 (Wed, 24 Nov 2021)
* @author: HtmlStream
* @event-namespace: .HSScrollspy
* @license: Htmlstream Libraries (https://htmlstream.com/)
* Copyright 2021 Htmlstream
*/
var HSScrollspy = /*#__PURE__*/function () {
  function HSScrollspy(elem, settings) {
    _classCallCheck(this, HSScrollspy);

    this.$el = typeof elem === 'string' ? document.querySelector(elem) : elem;
    this.defaults = {
      disableCollapse: null,
      scrollOffset: 0,
      collapsibleNav: null,
      resolutionsList: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200
      },
      resetOffset: null,
      breakpoint: 'lg',
      scrollspyContainer: document.body
    };
    this.dataSettings = this.$el.hasAttribute('data-hs-scrollspy-options') ? JSON.parse(this.$el.getAttribute('data-hs-scrollspy-options')) : {}, this.settings = Object.assign({}, this.defaults, this.dataSettings, settings);
    this.init();
  }

  _createClass(HSScrollspy, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.scrollSpyInstance = bootstrap.ScrollSpy.getInstance(this.settings.scrollspyContainer);
      var nav = _typeof(this.scrollSpyInstance._config.target) === 'object' ? this.scrollSpyInstance._config.target : document.querySelector(this.scrollSpyInstance._config.target);

      if (this.settings.disableCollapse === null && this.$el.classList.contains('collapse')) {
        this.settings.disableCollapse = false;
      }

      nav.addEventListener('click', function (e) {
        if (!e.target.closest('a:not([href="#"]):not([href="#0"])') || e.target.hash === '') return;
        e.preventDefault();

        if (_this.settings.disableCollapse === false && window.innerWidth < _this.settings.resolutionsList[_this.settings.breakpoint]) {
          new bootstrap.Collapse(_this.$el).hide();
          return _this.$el.addEventListener('hidden.bs.collapse', function () {
            _this.smoothScroll(e);
          });
        } else {
          _this.smoothScroll(e);
        }
      });
    }
  }, {
    key: "smoothScroll",
    value: function smoothScroll(e) {
      var offset = this.settings.resetOffset && window.innerWidth < this.settings.resolutionsList[this.settings.resetOffset] ? 0 : this.scrollSpyInstance._config.offset;
      var target = document.querySelector(e.target.hash);

      if (target) {
        window.scroll({
          top: target.offsetTop - offset - this.settings.scrollOffset,
          left: 0,
          behavior: 'smooth'
        });
      }
    }
  }]);

  return HSScrollspy;
}();



//# sourceURL=webpack://HSScrollspy/./src/js/hs-scrollspy.js?