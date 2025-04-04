/*
* HSCore
* @version: 2.0.0 (Mon, 25 Nov 2019)
* @requires: jQuery v3.0 or later
* @author: HtmlStream
* @event-namespace: .HSCore
* @license: Htmlstream Libraries (https://htmlstream.com/licenses)
* Copyright 2020 Htmlstream
*/
"use strict";
$.extend({
    HSCore: {
        init: function() {
            $(document).ready((function() {
                $('[data-toggle="tooltip"]').tooltip(),
                $('[data-toggle="popover"]').popover()
            }
            ))
        },
        components: {}
    }
}),
$.HSCore.init(),
function(t) {
    t.HSCore.components.HSValidation = {
        defaults: {
            errorElement: "div",
            errorClass: "invalid-feedback"
        },
        init: function(e, s) {
            if (e.length) {
                var a = Object.assign({}, this.defaults)
                  , i = e.attr("data-hs-validation-options") ? JSON.parse(e.attr("data-hs-validation-options")) : {}
                  , n = {
                    errorPlacement: this.errorPlacement,
                    highlight: this.highlight,
                    unhighlight: this.unHighlight,
                    submitHandler: this.submitHandler,
                    onkeyup: function(e) {
                        t(e).valid()
                    }
                };
                n = t.extend(!0, a, n, i, s),
                e.hasClass("js-step-form") ? t.validator.setDefaults({
                    ignore: ":hidden:not(.active select)"
                }) : t.validator.setDefaults({
                    ignore: ":hidden:not(select)"
                });
                var o = e.validate(n);
                return e.find("select").length && e.find("select").change((function() {
                    t(this).valid()
                }
                )),
                o
            }
        },
        rules: function(e) {
            var s = Array.prototype.slice.call(arguments, 1);
            t.fn.rules.apply(e, s)
        },
        errorPlacement: function(e, s) {
            var a = t(s).data("error-msg-classes");
            e.addClass(a),
            e.appendTo(s.parents(".js-form-message"))
        },
        highlight: function(e) {
            var s = t(e)
              , a = s.data("error-class") ? s.data("error-class") : "is-invalid"
              , i = s.data("success-class") ? s.data("error-class") : "is-valid"
              , n = s.parents(".js-form-message").first()
              , o = s;
            void 0 !== n.data("validate-state") ? o = n : n.find("[data-validate-state]").length && (o = n.find("[data-validate-state]")),
            o.removeClass(i).addClass(a)
        },
        unHighlight: function(e) {
            var s = t(e)
              , a = s.data("error-class") ? s.data("error-class") : "is-invalid"
              , i = s.data("success-class") ? s.data("error-class") : "is-valid"
              , n = s.parents(".js-form-message").first()
              , o = s;
            void 0 !== n.data("validate-state") ? o = n : n.find("[data-validate-state]").length && (o = n.find("[data-validate-state]")),
            o.removeClass(a).addClass(i)
        },
        submitHandler: function(t) {
            t.submit()
        }
    }
}(jQuery),
function(t) {
    t.HSCore.components.HSSelect2 = {
        defaults: {
            data: [],
            width: "100%",
            customClass: "custom-select",
            searchInputPlaceholder: !1,
            singleMultiple: !1,
            singleMultipleActiveClass: "active",
            singleMultiplePostfix: " item(s) selected",
            singleMultiplePrefix: null
        },
        init: function(e, s) {
            if (e.length) {
                var a = this
                  , i = Object.assign({}, a.defaults)
                  , n = e.attr("data-hs-select2-options") ? JSON.parse(e.attr("data-hs-select2-options")) : {}
                  , o = {
                    templateResult: a.formatData,
                    templateSelection: a.formatData,
                    escapeMarkup: function(t) {
                        return t
                    }
                };
                o = t.extend(!0, i, o, n, s);
                var r = e.select2(o);
                return e.siblings(".select2").find(".select2-selection").removeClass("select2-selection--single").addClass(o.customClass),
                o.singleMultiple && (a.singleMultiple(e, o),
                r.on("select2:select", (function(t) {
                    a.singleMultiple(e, o)
                }
                )),
                r.on("select2:unselect", (function(t) {
                    a.singleMultiple(e, o)
                }
                ))),
                a.safariAutoWidth(r, o),
                a.leftOffset(r, o),
                a.dropdownWidth(r, o),
                o.searchInputPlaceholder && a.searchPlaceholder(r, o),
                r
            }
        },
        dropdownWidth: function(e, s) {
            var a = s;
            e.on("select2:open", (function() {
                t(".select2-container--open").last().css({
                    width: a.dropdownWidth
                })
            }
            ))
        },
        safariAutoWidth: function(e, s) {
            e.on("select2:open", (function() {
                t(".select2-container--open").css({
                    top: 0
                })
            }
            ))
        },
        singleMultiple: function(e, s) {
            var a = s;
            let i = t(e).next(".select2").find(".select2-selection")
              , n = e.find(":selected").length > 0 ? a.singleMultiplePrefix + e.find(":selected").length + a.singleMultiplePostfix : a.placeholder;
            i.removeClass("select2-selection--multiple"),
            e.find(":selected").length > 0 ? i.addClass(a.singleMultipleActiveClass) : i.removeClass(a.singleMultipleActiveClass),
            i.find(".select2-selection__rendered").replaceWith('<span class="select2-selection__rendered" role="textbox" aria-readonly="true"><span class="select2-selection__placeholder">' + n + '</span></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>')
        },
        formatData: function(e) {
            var s, a = e;
            return a.element ? (s = a.element.dataset.optionTemplate ? a.element.dataset.optionTemplate : "<span>" + a.text + "</span>",
            t.parseHTML(s)) : a.text
        },
        leftOffset: function(e, s) {
            var a = s;
            e.on("select2:open", (function() {
                if (a.leftOffset) {
                    let e = t(".select2-container--open").last();
                    e.css({
                        opacity: 0
                    }),
                    setTimeout((function() {
                        e.css({
                            left: parseInt(e.position().left) + a.leftOffset,
                            opacity: 1
                        })
                    }
                    ), 1)
                }
            }
            ))
        },
        searchPlaceholder: function(e, s) {
            var a = s;
            e.on("select2:open", (function() {
                t(".select2-container--open .select2-search__field").last().attr("placeholder", a.searchInputPlaceholder)
            }
            ))
        }
    }
}(jQuery),
function(t) {
    t.HSCore.components.HSMask = {
        defaults: {
            template: null
        },
        init: function(e, s) {
            if (e.length && void 0 !== e.attr("data-hs-mask-options")) {
                var a = Object.assign({}, this.defaults)
                  , i = e.attr("data-hs-mask-options") ? JSON.parse(e.attr("data-hs-mask-options")) : {}
                  , n = {};
                return n = t.extend(!0, a, n, i, s),
                e.mask(n.template, n)
            }
        }
    }
}(jQuery),
function(t) {
    t.HSCore.components.HSQuill = {
        __proto__: t.fn.quill,
        defaults: {
            theme: "snow"
        },
        init: function(e, s) {
            if (t(e).length) {
                var a = t(e)
                  , i = Object.assign({}, this.defaults)
                  , n = a.attr("data-hs-quill-options") ? JSON.parse(a.attr("data-hs-quill-options")) : {}
                  , o = {};
                return o = Object.assign({}, i, o, n, s),
                new Quill(e,o)
            }
        }
    }
}(jQuery),
function(t) {
    t.HSCore.components.HSClipboard = {
        defaults: {
            type: null,
            contentTarget: null,
            classChangeTarget: null,
            defaultClass: null,
            successText: null,
            successClass: null,
            originalTitle: null
        },
        init: function(e, s) {
            if (t(e).length) {
                var a = t(e)
                  , i = Object.assign({}, this.defaults)
                  , n = a.attr("data-hs-clipboard-options") ? JSON.parse(a.attr("data-hs-clipboard-options")) : {}
                  , o = {
                    shortcodes: {},
                    windowWidth: t(window).width(),
                    defaultText: a.get(0).lastChild.nodeValue,
                    title: a.attr("title"),
                    container: !!n.container && document.querySelector(n.container),
                    text: function(e) {
                        var s = JSON.parse(t(e).attr("data-hs-clipboard-options"));
                        return o.shortcodes[s.contentTarget]
                    }
                };
                o = t.extend(!0, i, n, o, s),
                n.contentTarget && this.setShortcodes(a, o);
                var r = new ClipboardJS(e,o);
                return r.on("success", (function() {
                    (o.successText || o.successClass) && (o.successText && ("tooltip" === o.type ? (a.attr("data-original-title", o.successText).tooltip("show"),
                    a.on("mouseleave", (function() {
                        a.attr("data-original-title", o.title)
                    }
                    ))) : "popover" === o.type ? (a.attr("data-original-title", o.successText).popover("show"),
                    a.on("mouseleave", (function() {
                        a.attr("data-original-title", o.title).popover("hide")
                    }
                    ))) : (a.get(0).lastChild.nodeValue = " " + o.successText + " ",
                    setTimeout((function() {
                        a.get(0).lastChild.nodeValue = o.defaultText
                    }
                    ), 800))),
                    o.successClass && (o.classChangeTarget ? (t(o.classChangeTarget).removeClass(o.defaultClass).addClass(o.successClass),
                    setTimeout((function() {
                        t(o.classChangeTarget).removeClass(o.successClass).addClass(o.defaultClass)
                    }
                    ), 800)) : (a.removeClass(o.defaultClass).addClass(o.successClass),
                    setTimeout((function() {
                        a.removeClass(o.successClass).addClass(o.defaultClass)
                    }
                    ), 800))))
                }
                )),
                r
            }
        },
        setShortcodes: function(e, s) {
            var a = s;
            t(a.contentTarget).is("input, textarea, select") ? a.shortcodes[a.contentTarget] = t(a.contentTarget).val() : a.shortcodes[a.contentTarget] = t(a.contentTarget).html()
        }
    }
}(jQuery),
function(t) {
    t.HSCore.components.HSSlickCarousel = {
        defaults: {
            infinite: !1,
            pauseOnHover: !1,
            centerPadding: 0,
            lazyLoad: !1,
            prevArrow: null,
            nextArrow: null,
            autoplaySpeed: 3e3,
            speed: 300,
            initialDelay: 600,
            isThumbs: !1,
            isThumbsProgressCircle: !1,
            thumbsProgressContainer: null,
            thumbsProgressOptions: {
                color: "#000",
                width: 4
            },
            animationIn: null,
            animationOut: null,
            dotsWithIcon: null,
            dotsFromTitles: null,
            dotsAsProgressLine: !1,
            hasDotsHelper: !1,
            counterSelector: null,
            counterDivider: "/",
            counterClassMap: {
                current: "slick-counter-current",
                total: "slick-counter-total",
                divider: "slick-counter-divider"
            }
        },
        init: function(e, s) {
            if (e.length) {
                var a = this
                  , i = Object.assign({}, a.defaults)
                  , n = e.attr("data-hs-slick-carousel-options") ? JSON.parse(e.attr("data-hs-slick-carousel-options")) : {}
                  , o = {
                    id: e.attr("id")
                };
                o = t.extend(i, o, n),
                o = t.extend(o, {
                    customPaging: function(e, s) {
                        var a = t(e.$slides[s]).data("hs-slick-carousel-slide-title");
                        return a && o.dotsWithIcon ? "<span>" + a + "</span>" + o.dotsWithIcon : o.dotsWithIcon ? "<span></span>" + o.dotsWithIcon : a && o.dotsFromTitles ? "<span>" + a + "</span>" : a && !o.dotsFromTitles ? '<span></span><strong class="dot-title">' + a + "</strong>" : "<span></span>"
                    }
                }, s),
                e.find("[data-slide-type]").length && a.videoSupport(e),
                e.on("init", (function(t, s) {
                    a.transformOff(e, o, t, s)
                }
                )),
                e.on("init", (function(t, e) {
                    a.setCustomAnimation(t, e)
                }
                )),
                o.animationIn && o.animationOut && e.on("init", (function(t, e) {
                    a.setSingleClass(t, e)
                }
                )),
                o.dotsAsProgressLine && e.on("init", (function() {
                    a.setCustomLineDots(e, o)
                }
                )),
                o.hasDotsHelper && e.on("init", (function(t, e, s) {
                    a.setCustomDots(t, e, s)
                }
                )),
                o.isThumbs && (o.isThumbsProgressCircle && e.on("init", (function(t, s) {
                    a.setCustomProgressCircle(e, o, t, s)
                }
                )),
                t("#" + o.id).on("click", ".slick-slide", (function(e) {
                    e.stopPropagation(),
                    a.goToTargetSlide(t(this), o)
                }
                ))),
                e.on("init", (function(t, s) {
                    a.setCustomCurrentClass(e, t, s)
                }
                )),
                e.on("init", (function(t, e) {
                    a.setInitialCustomAnimation(t, e)
                }
                )),
                o.counterSelector && e.on("init", (function(t, e) {
                    a.setCounter(o, t, e)
                }
                ));
                var r = e.slick(o);
                return t(o.asNavFor)[0] && t(o.asNavFor)[0].dataset.hsSlickCarouselOptions && JSON.parse(t(o.asNavFor)[0].dataset.hsSlickCarouselOptions).isThumbsProgress && a.setInitialDelay(e, o),
                e.on("beforeChange", (function(t, s, i, n) {
                    a.setCustomClasses(e, t, s, i, n)
                }
                )),
                o.counterSelector && e.on("beforeChange", (function(t, e, s, i) {
                    a.counting(o, t, e, s, i)
                }
                )),
                e.on("afterChange", (function(t, e) {
                    a.setCustomAnimation(t, e)
                }
                )),
                o.animationIn && o.animationOut && (e.on("afterChange", (function(t, e, s, i) {
                    a.animationIn(o, t, e, s, i)
                }
                )),
                e.on("beforeChange", (function(t, e, s) {
                    a.animationOut(o, t, e, s)
                }
                )),
                e.on("setPosition", (function(t, e) {
                    a.setPosition(o, t, e)
                }
                ))),
                r
            }
        },
        transformOff: function(e, s, a, i) {
            var n = s;
            t(i.$slides).css("height", "auto"),
            n.isThumbs && n.slidesToShow >= t(i.$slides).length && e.addClass("slick-transform-off")
        },
        setCustomAnimation: function(e, s) {
            var a = t(s.$slides)[s.currentSlide]
              , i = t(a).find("[data-hs-slick-carousel-animation]");
            s.$slides.each((function(e) {
                if (e !== s.currentSlide) {
                    var a = t(this).find("[data-hs-slick-carousel-animation]");
                    t(a).each((function() {
                        t(this).css({
                            opacity: 0
                        })
                    }
                    ))
                }
            }
            )),
            t(i).each((function() {
                var e = t(this).data("hs-slick-carousel-animation")
                  , s = t(this).data("hs-slick-carousel-animation-delay")
                  , a = t(this).data("hs-slick-carousel-animation-duration");
                t(this).css({
                    "animation-delay": s + "ms",
                    "animation-duration": a + "ms"
                }),
                t(this).addClass("animated " + e).css({
                    opacity: 1
                })
            }
            ))
        },
        setInitialCustomAnimation: function(e, s) {
            var a = t(s.$slides)[0]
              , i = t(a).find("[data-hs-slick-carousel-animation]");
            t(i).each((function() {
                var e = t(this).data("hs-slick-carousel-animation");
                t(this).addClass("animated " + e).css("opacity", 1)
            }
            ))
        },
        setSingleClass: function(e, s) {
            t(s.$slides).addClass("single-slide")
        },
        setCustomDots: function(t) {
            var e = t.find(".js-dots");
            e.length && e.append('<span class="dots-helper"></span>')
        },
        setCustomLineDots: function(e, s) {
            var a = e.find('[class="' + s.dotsClass + '"]')
              , i = a.find("li");
            a.length && (setTimeout((function() {
                e.addClass("slick-line-dots-ready")
            }
            )),
            i.each((function() {
                t(this).append('<span class="dot-line"><span class="dot-line-helper" style="transition-duration: ' + (s.autoplaySpeed + s.speed) + 'ms;"></span></span>')
            }
            )))
        },
        setCustomProgressCircle: function(e, s, a, i) {
            var n = s
              , o = 0
              , r = t('<style type="text/css"></style>');
            t(i.$slides).each((function(e) {
                var s = t('<span class="slick-thumb-progress"><svg version="1.1" viewBox="0 0 160 160"><path class="slick-thumb-progress__path" d="M 79.98452083651917 4.000001576345426 A 76 76 0 1 1 79.89443752470656 4.0000733121155605 Z"></path></svg></span>')
                  , a = s.find("svg path");
                o = parseInt(a[0].getTotalLength()),
                t(i.$slides[e]).children(n.thumbsProgressContainer).append(s)
            }
            )),
            r.text(".slick-thumb-progress .slick-thumb-progress__path {opacity: 0;fill: transparent;stroke: " + n.thumbsProgressOptions.color + ";stroke-width: " + n.thumbsProgressOptions.width + ";stroke-dashoffset: " + o + ";stroke-dashoffset: 0px;}.slick-current .slick-thumb-progress .slick-thumb-progress__path {opacity: 1;-webkit-animation: " + (i.options.autoplaySpeed + i.options.speed) + "ms linear 0ms forwards dash;-moz-animation: " + (i.options.autoplaySpeed + i.options.speed) + "ms linear 0ms forwards dash;-o-animation: " + (i.options.autoplaySpeed + i.options.speed) + "ms linear 0ms forwards dash;animation: " + (i.options.autoplaySpeed + i.options.speed) + "ms linear 0ms forwards dash;}@-webkit-keyframes dash {from {stroke-dasharray: 0 " + o + ";} to {stroke-dasharray: " + o + " " + o + ";}}@-moz-keyframes dash {from {stroke-dasharray: 0 " + o + ";} to {stroke-dasharray: " + o + " " + o + ";}}@-moz-keyframes dash {from {stroke-dasharray: 0 " + o + ";} to {stroke-dasharray: " + o + " " + o + ";}}@keyframes dash {from {stroke-dasharray: 0 " + o + ";} to {stroke-dasharray: " + o + " " + o + ";}}"),
            r.appendTo(e)
        },
        goToTargetSlide: function(e, s) {
            var a = s
              , i = e.data("slick-index");
            t("#" + a.id).slick("slickCurrentSlide") !== i && t("#" + a.id).slick("slickGoTo", i)
        },
        setCustomCurrentClass: function(e) {
            var s = e.find(".js-dots");
            s.length && t(s[0].children[0]).addClass("slick-current")
        },
        setCounter: function(e, s, a) {
            var i = e;
            t(i.counterSelector).html('<span class="' + i.counterClassMap.current + '">1</span><span class="' + i.counterClassMap.divider + '">' + i.counterDivider + '</span><span class="' + i.counterClassMap.total + '">' + a.slideCount + "</span>")
        },
        setInitialDelay: function(t, e) {
            var s = e;
            t.slick("slickPause"),
            setTimeout((function() {
                t.slick("slickPlay")
            }
            ), s.initialDelay)
        },
        setCustomClasses: function(e, s, a, i, n) {
            var o = t(a.$slides)[n]
              , r = t(a.$slides)[i]
              , l = e.find(".js-dots")
              , d = t(o).find("[data-hs-slick-carousel-animation]")
              , c = t(r).find("[data-hs-slick-carousel-animation]");
            t(c).each((function() {
                var e = t(this).data("hs-slick-carousel-animation");
                t(this).removeClass("animated " + e)
            }
            )),
            t(d).each((function() {
                t(this).css({
                    opacity: 0
                })
            }
            )),
            l.length && (i > n ? (t(l[0].children).removeClass("slick-active-right"),
            t(l[0].children[n]).addClass("slick-active-right")) : t(l[0].children).removeClass("slick-active-right"),
            t(l[0].children).removeClass("slick-current"),
            setTimeout((function() {
                t(l[0].children[n]).addClass("slick-current")
            }
            ), .25))
        },
        animationIn: function(e, s, a, i, n) {
            var o = e;
            t(a.$slides).removeClass("animated set-position " + o.animationIn + " " + o.animationOut)
        },
        animationOut: function(e, s, a, i) {
            var n = e;
            t(a.$slides[i]).addClass("animated " + n.animationOut)
        },
        setPosition: function(e, s, a) {
            var i = e;
            t(a.$slides[a.currentSlide]).addClass("animated set-position " + i.animationIn)
        },
        counting: function(e, s, a, i, n) {
            var o = e
              , r = (n || 0) + 1;
            t(o.counterSelector).html('<span class="' + o.counterClassMap.current + '">' + r + '</span><span class="' + o.counterClassMap.divider + '">' + o.counterDivider + '</span><span class="' + o.counterClassMap.total + '">' + a.slideCount + "</span>")
        },
        videoSupport: function(e) {
            e.length && e.on("beforeChange", (function(e, s, a, i) {
                var n, o = t(s.$slides[a]).data("slide-type"), r = t(s.$slides[a]).find("iframe").get(0);
                if ("vimeo" === o)
                    n = {
                        method: "pause",
                        value: "true"
                    };
                else {
                    if ("youtube" !== o)
                        return !1;
                    n = {
                        event: "command",
                        func: "pauseVideo"
                    }
                }
                void 0 !== r && r.contentWindow.postMessage(JSON.stringify(n), "*")
            }
            ))
        },
        initTextAnimation: function(e, s) {
            if (window.TextFx && window.anime && e.length) {
                var a = e.find(s);
                a.length && (a.each((function(e, s) {
                    var a = t(s);
                    a.data("TextFx") || a.data("TextFx", new TextFx(a.get(0)))
                }
                )),
                e.on("beforeChange", (function(t, e, a, i) {
                    var n = e.$slider.find(".slick-track").children()
                      , o = n.eq(a)
                      , r = n.eq(i);
                    o = o.find(s),
                    r = r.find(s),
                    o.length && o.data("TextFx").hide(o.data("effect") ? o.data("effect") : "fx1"),
                    r.length && r.data("TextFx").show(r.data("effect") ? r.data("effect") : "fx1")
                }
                )))
            }
        }
    }
}(jQuery),
function(t) {
    t.HSCore.components.HSCubeportfolio = {
        defaults: {
            defaultFilter: "*",
            displayTypeSpeed: 100,
            sortToPreventGaps: !0,
            lightboxGallery: !0,
            singlePageInlineInFocus: !0,
            singlePageDeeplinking: !0,
            singlePageStickyNavigation: !0,
            gridAdjustment: "responsive",
            displayType: "sequentially",
            singlePageInlinePosition: "below",
            lightboxTitleSrc: "data-title",
            lightboxDelegate: ".cbp-lightbox",
            singlePageInlineDelegate: ".cbp-singlePageInline",
            singlePageDelegate: ".cbp-singlePage",
            lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
            appendItems: '<div class="logo cbp-item">my awesome content to append to plugin</div> <div class="logo cbp-item">my second awesome content to append to plugin</div>',
            singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
            mediaQueries: [{
                width: 1500,
                cols: 3
            }, {
                width: 1100,
                cols: 3
            }, {
                width: 800,
                cols: 3
            }, {
                width: 480,
                cols: 2,
                options: {
                    caption: "",
                    gapHorizontal: 10,
                    gapVertical: 10
                }
            }],
            caption: "overlayBottomAlong"
        },
        init: function(e, s) {
            if (e.length) {
                var a = t(e)
                  , i = Object.assign({}, this.defaults)
                  , n = a.attr("data-hs-cbp-options") ? JSON.parse(a.attr("data-hs-cbp-options")) : {}
                  , o = {
                    singlePageInlineCallback: function(e) {
                        var s = this;
                        t.ajax({
                            url: e,
                            type: "GET",
                            dataType: "html",
                            timeout: 3e4
                        }).done((function(t) {
                            s.updateSinglePageInline(t)
                        }
                        )).fail((function() {
                            s.updateSinglePageInline("AJAX Error! Please refresh the page!")
                        }
                        ))
                    },
                    singlePageCallback: function(e) {
                        var s = this;
                        t.ajax({
                            url: e,
                            type: "GET",
                            dataType: "html",
                            timeout: 1e4
                        }).done((function(t) {
                            s.updateSinglePage(t)
                        }
                        )).fail((function() {
                            s.updateSinglePage("AJAX Error! Please refresh the page!")
                        }
                        ))
                    }
                };
                return o = t.extend(i, o, n, s),
                e.cubeportfolio(o)
            }
        }
    }
}(jQuery),
function(t) {
    t.HSCore.components.HSTyped = {
        __proto__: t.fn.typed,
        defaults: {},
        init: function(e, s) {
            if (t(e).length) {
                var a = t(e)
                  , i = Object.assign({}, this.defaults)
                  , n = a.attr("data-hs-typed-options") ? JSON.parse(a.attr("data-hs-typed-options")) : {}
                  , o = {};
                return o = Object.assign({}, i, o, n, s),
                new Typed(e,o)
            }
        }
    }
}(jQuery),
function(t) {
    t.HSCore.components.HSFancyBox = {
        defaults: {
            parentEl: "body",
            baseClass: "fancybox-custom",
            slideClass: "fancybox-slide",
            speed: 2e3,
            animationEffect: "fade",
            slideSpeedCoefficient: 1,
            infobar: !1,
            slideShow: {
                autoStart: !1,
                speed: 2e3
            },
            transitionEffect: "slide",
            baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div>  <div class="fancybox-inner">    <div class="fancybox-infobar">      <span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>    </div>    <div class="fancybox-toolbar">{{buttons}}</div>    <div class="fancybox-navigation">{{arrows}}</div>    <div class="fancybox-slider-wrap">      <div class="fancybox-stage"></div>    </div>    <div class="fancybox-caption-wrap">      <div class="fancybox-caption">        <div class="fancybox-caption__body"></div>      </div>    </div>  </div></div>'
        },
        init: function(e, s) {
            if (e.length) {
                var a = t(e)
                  , i = Object.assign({}, this.defaults)
                  , n = a.attr("data-hs-fancybox-options") ? JSON.parse(a.attr("data-hs-fancybox-options")) : {}
                  , o = {
                    beforeShow: function(e) {
                        var s = t(e.$refs.bg[0])
                          , a = t(e.current.$slide)
                          , i = e.current.opts.$orig[0].dataset.hsFancyboxOptions ? JSON.parse(e.current.opts.$orig[0].dataset.hsFancyboxOptions) : {}
                          , n = !!i.transitionEffectCustom && i.transitionEffectCustom
                          , o = i.overlayBg
                          , r = i.overlayBlurBg;
                        n && a.css("visibility", "hidden"),
                        o && s.css({
                            backgroundColor: o
                        }),
                        r && t("body").addClass("fancybox-blur")
                    },
                    afterShow: function(e) {
                        var s = t(e.current.$slide)
                          , a = void 0 !== e.group[e.prevPos] && t(e.group[e.prevPos].$slide) ? t(e.group[e.prevPos].$slide) : null
                          , i = e.current.opts.$orig[0].dataset.hsFancyboxOptions ? JSON.parse(e.current.opts.$orig[0].dataset.hsFancyboxOptions) : {}
                          , n = !!i.transitionEffectCustom && i.transitionEffectCustom;
                        n && (s.css("visibility", "visible"),
                        s.hasClass("animated") || s.addClass("animated"),
                        a && !a.hasClass("animated") && a.addClass("animated"),
                        t("body").hasClass("fancybox-opened") ? (s.addClass(n.onShow),
                        s.on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", (function(t) {
                            s.removeClass(n.onShow)
                        }
                        )),
                        a && (a.addClass(n.onHide),
                        a.on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", (function(t) {
                            a.removeClass(n.onHide)
                        }
                        )))) : (s.addClass(n.onShow),
                        s.on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", (function(e) {
                            s.removeClass(n.onShow),
                            t("body").addClass("fancybox-opened")
                        }
                        ))))
                    },
                    beforeClose: function(e) {
                        var s = t(e.current.$slide)
                          , a = e.current.opts.$orig[0].dataset.hsFancyboxOptions ? JSON.parse(e.current.opts.$orig[0].dataset.hsFancyboxOptions) : {}
                          , i = !!a.transitionEffectCustom && a.transitionEffectCustom;
                        a.overlayBlurBg;
                        i && (s.removeClass(i.onShow).addClass(i.onHide),
                        t("body").removeClass("fancybox-opened")),
                        t("body").removeClass("fancybox-blur")
                    }
                };
                return o = t.extend(!0, i, o, n, s),
                t(e).fancybox(o)
            }
        }
    }
}(jQuery),
function(t) {
    t.HSCore.components.HSIonRangeSlider = {
        defaults: {
            type: "single",
            hide_min_max: !0,
            hide_from_to: !0,
            foreground_target_el: null,
            secondary_target_el: null,
            secondary_val: {
                steps: null,
                values: null
            },
            result_min_target_el: null,
            result_max_target_el: null,
            cusOnChange: null
        },
        init: function(e, s) {
            if (e.length && void 0 !== e.attr("data-hs-ion-range-slider-options")) {
                var a = Object.assign({}, this.defaults)
                  , i = e.attr("data-hs-ion-range-slider-options") ? JSON.parse(e.attr("data-hs-ion-range-slider-options")) : {}
                  , n = {
                    onStart: function(e) {
                        if (n.foreground_target_el) {
                            var s = 100 - (e.from_percent + (100 - e.to_percent));
                            t(n.foreground_target_el).css({
                                left: e.from_percent + "%",
                                width: s + "%"
                            }),
                            t(n.foreground_target_el + " > *").css({
                                width: t(n.foreground_target_el).parent().width(),
                                marginLeft: -t(n.foreground_target_el).parent().width() / 100 * e.from_percent
                            })
                        }
                        if (n.result_min_target_el && "single" === n.type ? t(n.result_min_target_el).is("input") ? t(n.result_min_target_el).val(e.from) : t(n.result_min_target_el).text(e.from) : (n.result_min_target_el || n.result_max_target_el && "double" === n.type) && (t(n.result_min_target_el).is("input") ? t(n.result_min_target_el).val(e.from) : t(n.result_min_target_el).text(e.from),
                        t(n.result_min_target_el).is("input") ? t(n.result_max_target_el).val(e.to) : t(n.result_max_target_el).text(e.to)),
                        n.grid && "single" === n.type && t(e.slider).find(".irs-grid-text").each((function(s) {
                            var a = t(this);
                            t(a).text() === e.from && (t(e.slider).find(".irs-grid-text").removeClass("current"),
                            t(a).addClass("current"))
                        }
                        )),
                        n.secondary_target_el) {
                            n.secondary_val.steps.push(e.max + 1),
                            n.secondary_val.values.push(n.secondary_val.values[n.secondary_val.values.length - 1] + 1);
                            for (var a = 0; a < n.secondary_val.steps.length; a++)
                                e.from >= n.secondary_val.steps[a] && e.from < n.secondary_val.steps[a + 1] && (t(n.secondary_target_el).is("input") ? t(n.secondary_target_el).val(n.secondary_val.values[a]) : t(n.secondary_target_el).text(n.secondary_val.values[a]))
                        }
                    },
                    onChange: function(e) {
                        if (n.foreground_target_el) {
                            var a = 100 - (e.from_percent + (100 - e.to_percent));
                            t(n.foreground_target_el).css({
                                left: e.from_percent + "%",
                                width: a + "%"
                            }),
                            t(n.foreground_target_el + "> *").css({
                                width: t(n.foreground_target_el).parent().width(),
                                marginLeft: -t(n.foreground_target_el).parent().width() / 100 * e.from_percent
                            })
                        }
                        if (n.result_min_target_el && "single" === n.type ? t(n.result_min_target_el).is("input") ? t(n.result_min_target_el).val(e.from) : t(n.result_min_target_el).text(e.from) : (n.result_min_target_el || n.result_max_target_el && "double" === n.type) && (t(n.result_min_target_el).is("input") ? t(n.result_min_target_el).val(e.from) : t(n.result_min_target_el).text(e.from),
                        t(n.result_min_target_el).is("input") ? t(n.result_max_target_el).val(e.to) : t(n.result_max_target_el).text(e.to)),
                        n.grid && "single" === n.type && t(e.slider).find(".irs-grid-text").each((function(s) {
                            var a = t(this);
                            t(a).text() === e.from && (t(e.slider).find(".irs-grid-text").removeClass("current"),
                            t(a).addClass("current"))
                        }
                        )),
                        n.secondary_target_el)
                            for (var i = 0; i < n.secondary_val.steps.length; i++)
                                e.from >= n.secondary_val.steps[i] && e.from < n.secondary_val.steps[i + 1] && (t(n.secondary_target_el).is("input") ? t(n.secondary_target_el).val(n.secondary_val.values[i]) : t(n.secondary_target_el).text(n.secondary_val.values[i]));
                        s && s.cusOnChange && "function" == typeof s.cusOnChange && s.cusOnChange()
                    }
                };
                n = t.extend(!0, a, n, i, s);
                var o = e.ionRangeSlider(n)
                  , r = e.data("ionRangeSlider");
                return n.result_min_target_el && "single" === n.type && t(n.result_min_target_el).is("input") ? t(n.result_min_target_el).on("change", (function() {
                    r.update({
                        from: t(this).val()
                    })
                }
                )) : (n.result_min_target_el || n.result_max_target_el && "double" === n.type && t(n.result_min_target_el).is("input") || t(n.result_max_target_el).is("input")) && (t(n.result_min_target_el).on("change", (function() {
                    r.update({
                        from: t(this).val()
                    })
                }
                )),
                t(n.result_max_target_el).on("change", (function() {
                    r.update({
                        to: t(this).val()
                    })
                }
                ))),
                t(window).on("resize", (function() {
                    t(n.foreground_target_el + " > *").css({
                        width: t(n.foreground_target_el).parent().width()
                    })
                }
                )),
                o
            }
        }
    }
}(jQuery),
function(t) {
    t.HSCore.components.HSCircles = {
        defaults: {
            radius: 80,
            duration: 1e3,
            wrpClass: "circles-wrap",
            colors: ["#377dff", "#e7eaf3"],
            bounds: -100,
            debounce: 10,
            rtl: !1,
            isHideValue: !1,
            dividerSpace: null,
            isViewportInit: !1,
            fgStrokeLinecap: null,
            fgStrokeMiterlimit: null,
            additionalTextType: null,
            additionalText: null,
            textFontSize: null,
            textFontWeight: null,
            textColor: null,
            secondaryText: null,
            secondaryTextFontWeight: null,
            secondaryTextFontSize: null,
            secondaryTextColor: null
        },
        init: function(e, s) {
            if (e.length) {
                var a = Object.assign({}, this.defaults)
                  , i = e.attr("data-hs-circles-options") ? JSON.parse(e.attr("data-hs-circles-options")) : {}
                  , n = {
                    id: "circle-" + Math.random().toString().slice(2),
                    value: 0,
                    text: function(t) {
                        return "iconic" === i.type ? i.icon : "prefix" === i.additionalTextType ? i.secondaryText ? (i.additionalText || "") + (i.isHideValue ? "" : t) + '<div style="margin-top: ' + (i.dividerSpace / 2 + "px" || "0") + "; margin-bottom: " + (i.dividerSpace / 2 + "px" || "0") + ';"></div><div style="font-weight: ' + i.secondaryTextFontWeight + "; font-size: " + i.secondaryTextFontSize + "px; color: " + i.secondaryTextColor + ';">' + i.secondaryText + "</div>" : (i.additionalText || "") + (i.isHideValue ? "" : t) : i.secondaryText ? (i.isHideValue ? "" : t) + (i.additionalText || "") + '<div style="margin-top: ' + (i.dividerSpace / 2 + "px" || "0") + "; margin-bottom: " + (i.dividerSpace / 2 + "px" || "0") + ';"></div><div style="font-weight: ' + i.secondaryTextFontWeight + "; font-size: " + i.secondaryTextFontSize + "px; color: " + i.secondaryTextColor + ';">' + i.secondaryText + "</div>" : (i.isHideValue ? "" : t) + (i.additionalText || "")
                    }
                };
                (n = t.extend(a, n, i, s)).isViewportInit && (n.value = 0),
                this.setId(e, n.id);
                var o = Circles.create(n);
                return e.data("circle", o),
                this.setTextStyles(e, o, n),
                n.rtl && this.setRtl(e),
                n.fgStrokeLinecap && this.setStrokeLineCap(e, o, n),
                n.fgStrokeMiterlimit && this.setStrokeMiterLimit(e, o, n),
                n.isViewportInit && this.initAppear(o, n),
                o
            }
        },
        setId: function(t, e) {
            t.attr("id", e)
        },
        setTextStyles: function(t, e, s) {
            var a = s;
            t.find('[class="' + (a.textClass || e._textClass) + '"]').css({
                "font-size": a.textFontSize,
                "font-weight": a.textFontWeight,
                color: a.textColor,
                "line-height": "normal",
                height: "auto",
                top: "",
                left: ""
            })
        },
        setRtl: function(t) {
            t.find("svg").css("transform", "matrix(-1, 0, 0, 1, 0, 0)")
        },
        setStrokeLineCap: function(t, e, s) {
            var a = s;
            t.find('[class="' + e._valClass + '"]').attr("stroke-linecap", a.fgStrokeLinecap)
        },
        setStrokeMiterLimit: function(t, e, s) {
            var a = s;
            t.find('[class="' + e._valClass + '"]').attr("stroke-miterlimit", a.fgStrokeMiterlimit)
        },
        initAppear: function(e, s) {
            var a = s;
            appear({
                bounds: a.bounds,
                debounce: a.debounce,
                elements: function() {
                    return document.querySelectorAll("#" + a.id)
                },
                appear: function(s) {
                    e.update(JSON.parse(t(s).attr("data-hs-circles-options")).value)
                }
            })
        }
    }
}(jQuery),
function(t) {
    t.HSCore.components.HSLeaflet = {
        defaults: {
            map: {
                coords: [51.505, -.09],
                zoom: 13
            },
            layer: {
                token: "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
                id: "mapbox/streets-v11",
                maxZoom: 18
            },
            marker: null
        },
        init: function(e, s) {
            if (t(e).length) {
                var a = t(e)
                  , i = a.attr("data-hs-leaflet-options") ? JSON.parse(a.attr("data-hs-leaflet-options")) : {}
                  , n = {};
                n = t.extend(!0, this.defaults, i, n, s);
                var o = L.map(e, n.map);
                if (o.setView(n.map.coords, n.map.zoom),
                L.tileLayer(n.layer.token, n.layer).addTo(o),
                n.marker)
                    for (var r = 0; r < n.marker.length; r++) {
                        n.marker[r].icon = L.icon(n.marker[r].icon);
                        let t = L.marker(n.marker[r].coords, n.marker[r]).addTo(o);
                        n.marker[r].popup && t.bindPopup(n.marker[r].popup.text)
                    }
                return o
            }
        }
    }
}(jQuery),
function(t) {
    t.HSCore.components.HSDropzone = {
        defaults: {
            url: "index.html",
            thumbnailWidth: 300,
            thumbnailHeight: 300,
            previewTemplate: t('<div>  <div class="col test h-100 px-1 mb-2">    <div class="dz-preview dz-file-preview">      <div class="d-flex justify-content-end dz-close-icon">        <small class="fa fa-times" data-dz-remove></small>      </div>      <div class="dz-details media">        <div class="dz-img">         <img class="img-fluid dz-img-inner" data-dz-thumbnail>        </div>        <div class="media-body dz-file-wrapper">         <h6 class="dz-filename">          <span class="dz-title" data-dz-name></span>         </h6>         <div class="dz-size" data-dz-size></div>        </div>      </div>      <div class="dz-progress progress" style="height: 4px;">        <div class="dz-upload progress-bar bg-success" role="progressbar" style="width: 0" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>      </div>      <div class="d-flex align-items-center">        <div class="dz-success-mark">          <span class="fa fa-check-circle"></span>        </div>        <div class="dz-error-mark">          <span class="fa fa-times-circle"></span>        </div>        <div class="dz-error-message">          <small data-dz-errormessage></small>        </div>      </div>    </div>  </div></div>').html()
        },
        init: function(e, s) {
            if (e.length) {
                var a = t(e)
                  , i = Object.assign({}, this.defaults)
                  , n = a.attr("data-hs-dropzone-options") ? JSON.parse(a.attr("data-hs-dropzone-options")) : {}
                  , o = {
                    init: function() {
                        var e = this
                          , s = t(e.element).find(".dz-message");
                        e.on("addedfile", (function(e) {
                            "image/" !== String(e.type).slice(0, 6) && t(e.previewElement).find(".dz-img").replaceWith('<span class="dz-file-initials">' + e.name.substring(0, 1).toUpperCase() + "</span>"),
                            s.hide()
                        }
                        )),
                        e.on("removedfile", (function() {
                            e.files.length <= 0 && s.show()
                        }
                        ))
                    }
                };
                return "#" === (o = Object.assign({}, i, o, n, s)).previewTemplate[0] && (o.previewTemplate = t(o.previewTemplate).html()),
                new Dropzone(e,o)
            }
        }
    }
}(jQuery),
function(t) {
    t.HSCore.components.HSCountdown = {
        defaults: {
            yearsElSelector: ".js-cd-years",
            monthsElSelector: ".js-cd-months",
            daysElSelector: ".js-cd-days",
            hoursElSelector: ".js-cd-hours",
            minutesElSelector: ".js-cd-minutes",
            secondsElSelector: ".js-cd-seconds",
            yearsFormat: "%Y",
            monthsFormat: "%m",
            daysFormat: "%d",
            hoursFormat: "%H",
            minutesFormat: "%M",
            secondsFormat: "%S",
            circles: !1,
            circlesIds: [],
            fgColor: "#000000",
            bgColor: "#cccccc",
            additionalText: null,
            fontSize: 16,
            radius: 80,
            value: 0,
            maxValue: 100,
            width: 10,
            duration: 0
        },
        init: function(e, s) {
            if (e.length) {
                var a = Object.assign({}, this.defaults)
                  , i = e.attr("data-hs-countdown-options") ? JSON.parse(e.attr("data-hs-countdown-options")) : {}
                  , n = {
                    endDate: i.endDate ? new Date(i.endDate) : new Date,
                    startDate: i.startDate ? new Date(i.startDate) : new Date
                };
                return (n = t.extend(!0, a, i, n, s)).yearsEl = e.find(n.yearsElSelector),
                n.monthsEl = e.find(n.monthsElSelector),
                n.daysEl = e.find(n.daysElSelector),
                n.hoursEl = e.find(n.hoursElSelector),
                n.minutesEl = e.find(n.minutesElSelector),
                n.secondsEl = e.find(n.secondsElSelector),
                n.circles ? this._initPiesImplementation(e, n) : this._initBaseImplementation(e, n)
            }
        },
        _initBaseImplementation: function(t, e) {
            var s = e;
            return t.countdown(s.endDate, (function(t) {
                console.log(t),
                s.yearsEl.length && s.yearsEl.text(t.strftime(s.yearsFormat)),
                s.monthsEl.length && s.monthsEl.text(t.strftime(s.monthsFormat)),
                s.daysEl.length && s.daysEl.text(t.strftime(s.daysFormat)),
                s.hoursEl.length && s.hoursEl.text(t.strftime(s.hoursFormat)),
                s.minutesEl.length && s.minutesEl.text(t.strftime(s.minutesFormat)),
                s.secondsEl.length && s.secondsEl.text(t.strftime(s.secondsFormat))
            }
            ))
        },
        _initPiesImplementation: function(t, e) {
            var s = e;
            return s.yearsEl.length && this._preparePieItem(s.yearsEl, {
                maxValue: s.endDate.getFullYear() - s.startDate.getFullYear(),
                radius: s.radius,
                width: s.strokeWidth,
                fgColor: s.fgColor,
                bgColor: s.bgColor,
                additionalText: s.additionalText,
                fontSize: s.fontSize
            }),
            s.monthsEl.length && this._preparePieItem(s.monthsEl, {
                maxValue: Math.round(Math.abs((s.endDate.getTime() - s.startDate.getTime()) / 864e5)) / 12,
                radius: s.radius,
                width: s.strokeWidth,
                fgColor: s.fgColor,
                bgColor: s.bgColor,
                additionalText: s.additionalText,
                fontSize: s.fontSize
            }),
            s.daysEl.length && this._preparePieItem(s.daysEl, {
                maxValue: this._getDaysMaxValByFormat(s.daysFormat, s.startDate, s.endDate),
                radius: s.radius,
                width: s.strokeWidth,
                fgColor: s.fgColor,
                bgColor: s.bgColor,
                additionalText: s.additionalText,
                fontSize: s.fontSize
            }),
            s.hoursEl.length && this._preparePieItem(s.hoursEl, {
                maxValue: 60,
                radius: s.radius,
                width: s.strokeWidth,
                fgColor: s.fgColor,
                bgColor: s.bgColor,
                additionalText: s.additionalText,
                fontSize: s.fontSize
            }),
            s.minutesEl.length && this._preparePieItem(s.minutesEl, {
                maxValue: 60,
                radius: s.radius,
                width: s.strokeWidth,
                fgColor: s.fgColor,
                bgColor: s.bgColor,
                additionalText: s.additionalText,
                fontSize: s.fontSize
            }),
            s.secondsEl.length && this._preparePieItem(s.secondsEl, {
                maxValue: 60,
                radius: s.radius,
                width: s.strokeWidth,
                fgColor: s.fgColor,
                bgColor: s.bgColor,
                additionalText: s.additionalText,
                fontSize: s.fontSize
            }),
            t.countdown(s.endDate, (function(t) {
                s.yearsEl.length && s.yearsEl.data("circle").update(t.strftime(s.yearsFormat)),
                s.monthsEl.length && s.monthsEl.data("circle").update(t.strftime(s.monthsFormat)),
                s.daysEl.length && s.daysEl.data("circle").update(t.strftime(s.daysFormat)),
                s.hoursEl.length && s.hoursEl.data("circle").update(t.strftime(s.hoursFormat)),
                s.minutesEl.length && s.minutesEl.data("circle").update(t.strftime(s.minutesFormat)),
                s.secondsEl.length && s.secondsEl.data("circle").update(t.strftime(s.secondsFormat))
            }
            ))
        },
        _preparePieItem: function(e, s) {
            var a = Math.random().toString().slice(2)
              , i = {
                id: "hs-countdown-element-" + a,
                text: function(t) {
                    return Math.round(t) + (s.additionalText || "")
                },
                colors: [s.bgColor, s.fgColor]
            };
            i = t.extend(i, s),
            this.defaults.circlesIds.push(a),
            e.attr("id", "hs-countdown-element-" + a);
            var n = Circles.create(i);
            e.data("circle", n),
            i.fontSize && e.find("." + n._textClass).css("font-size", i.fontSize + "px")
        },
        _getDaysMaxValByFormat: function(t, e, s) {
            switch (t) {
            case "%D":
                return Math.round(Math.abs((s.getTime() - e.getTime()) / 864e5));
            default:
                return 31
            }
        }
    }
}(jQuery),
function(t) {
    t.HSCore.components.HSChartJS = {
        defaults: {
            options: {
                responsive: !0,
                maintainAspectRatio: !1,
                legend: {
                    display: !1
                },
                tooltips: {
                    enabled: !1,
                    mode: "nearest",
                    prefix: "",
                    postfix: "",
                    hasIndicator: !1,
                    indicatorWidth: "8px",
                    indicatorHeight: "8px",
                    transition: "0.2s",
                    lineWithLineColor: null,
                    yearStamp: !0
                },
                gradientPosition: {
                    x0: 0,
                    y0: 0,
                    x1: 0,
                    y1: 0
                }
            }
        },
        init: function(e, s) {
            if (e.length) {
                var a = Object.assign({}, this.defaults)
                  , i = e.attr("data-hs-chartjs-options") ? JSON.parse(e.attr("data-hs-chartjs-options")) : {}
                  , n = {};
                n = t.extend(!0, i.type, a, "line" === i.type ? {
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    callback: function(t, e, s) {
                                        var a = n.options.scales.yAxes[0].ticks.metric
                                          , i = n.options.scales.yAxes[0].ticks.prefix
                                          , o = n.options.scales.yAxes[0].ticks.postfix;
                                        return a && t > 100 && (t = t < 1e6 ? t / 1e3 + "k" : t / 1e6 + "kk"),
                                        i && o ? i + t + o : i ? i + t : o ? t + o : t
                                    }
                                }
                            }]
                        },
                        elements: {
                            line: {
                                borderWidth: 3
                            },
                            point: {
                                pointStyle: "circle",
                                radius: 5,
                                hoverRadius: 7,
                                borderWidth: 3,
                                hoverBorderWidth: 3,
                                backgroundColor: "#ffffff",
                                hoverBackgroundColor: "#ffffff"
                            }
                        }
                    }
                } : "bar" === i.type ? {
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    callback: function(t, e, s) {
                                        var a = n.options.scales.yAxes[0].ticks.metric
                                          , i = n.options.scales.yAxes[0].ticks.prefix
                                          , o = n.options.scales.yAxes[0].ticks.postfix;
                                        return a && t > 100 && (t = t < 1e6 ? t / 1e3 + "k" : t / 1e6 + "kk"),
                                        i && o ? i + t + o : i ? i + t : o ? t + o : t
                                    }
                                }
                            }]
                        }
                    }
                } : {}),
                "line" === (n = t.extend(!0, n, {
                    options: {
                        tooltips: {
                            custom: function(t) {
                                var s = document.getElementById("chartjsTooltip");
                                if (s || ((s = document.createElement("div")).id = "chartjsTooltip",
                                s.style.opacity = 0,
                                s.classList.add("hs-chartjs-tooltip-wrap"),
                                s.innerHTML = '<div class="hs-chartjs-tooltip"></div>',
                                n.options.tooltips.lineMode ? e.parent(".chartjs-custom").append(s) : document.body.appendChild(s)),
                                0 === t.opacity)
                                    return s.style.opacity = 0,
                                    void s.parentNode.removeChild(s);
                                if (s.classList.remove("above", "below", "no-transform"),
                                t.yAlign ? s.classList.add(t.yAlign) : s.classList.add("no-transform"),
                                t.body) {
                                    var a = t.title || []
                                      , i = t.body.map((function(t) {
                                        return t.lines
                                    }
                                    ))
                                      , o = new Date
                                      , r = '<header class="hs-chartjs-tooltip-header">';
                                    a.forEach((function(t) {
                                        r += n.options.tooltips.yearStamp ? t + ", " + o.getFullYear() : t
                                    }
                                    )),
                                    r += '</header><div class="hs-chartjs-tooltip-body">',
                                    i.forEach((function(e, s) {
                                        r += "<div>";
                                        var a = e[0]
                                          , i = a
                                          , o = t.labelColors[s].backgroundColor instanceof Object ? t.labelColors[s].borderColor : t.labelColors[s].backgroundColor;
                                        r += (n.options.tooltips.hasIndicator ? '<span class="d-inline-block rounded-circle mr-1" style="width: ' + n.options.tooltips.indicatorWidth + "; height: " + n.options.tooltips.indicatorHeight + "; background-color: " + o + '"></span>' : "") + n.options.tooltips.prefix + (a.length > 3 ? i : e) + n.options.tooltips.postfix,
                                        r += "</div>"
                                    }
                                    )),
                                    r += "</div>",
                                    s.querySelector(".hs-chartjs-tooltip").innerHTML = r
                                }
                                var l = this._chart.canvas.getBoundingClientRect();
                                s.style.opacity = 1,
                                n.options.tooltips.lineMode ? s.style.left = t.caretX + "px" : s.style.left = l.left + window.pageXOffset + t.caretX - s.offsetWidth / 2 - 3 + "px",
                                s.style.top = l.top + window.pageYOffset + t.caretY - s.offsetHeight - 25 + "px",
                                s.style.pointerEvents = "none",
                                s.style.transition = n.options.tooltips.transition
                            }
                        }
                    }
                }, i, n, s)).type && n.data.datasets.forEach((function(t) {
                    if (Array.isArray(t.backgroundColor)) {
                        var s = e[0].getContext("2d").createLinearGradient(n.options.gradientPosition.x0, n.options.gradientPosition.y0, n.options.gradientPosition.x1, n.options.gradientPosition.y1);
                        for (let e = 0; e < t.backgroundColor.length; e++)
                            s.addColorStop(e, t.backgroundColor[e]);
                        t.backgroundColor = s
                    }
                }
                ));
                var o = new Chart(e,n);
                if ("line" === n.type && n.options.tooltips.lineMode) {
                    var r = o.draw;
                    o.draw = function(e) {
                        if (r.call(this, e),
                        this.chart.tooltip._active && this.chart.tooltip._active.length) {
                            this.chart.tooltip._active[0];
                            var s = t(this.chart.canvas)
                              , a = t(".hs-chartjs-tooltip-wrap")
                              , i = t("#chartjsTooltipLine")
                              , o = n.options.tooltips.lineWithLineTopOffset >= 0 ? n.options.tooltips.lineWithLineTopOffset : 7
                              , l = n.options.tooltips.lineWithLineBottomOffset >= 0 ? n.options.tooltips.lineWithLineBottomOffset : 43;
                            t("#chartjsTooltip #chartjsTooltipLine").length || t("#chartjsTooltip").append('<div id="chartjsTooltipLine"></div>'),
                            a.css({
                                top: s.height() / 2 - a.height()
                            }),
                            i.css({
                                top: -(a.offset().top - s.offset().top) + o
                            }),
                            a.offset().left + a.width() > s.offset().left + s.width() - 100 ? t(".hs-chartjs-tooltip").removeClass("hs-chartjs-tooltip-right").addClass("hs-chartjs-tooltip-left") : t(".hs-chartjs-tooltip").addClass("hs-chartjs-tooltip-right").removeClass("hs-chartjs-tooltip-left"),
                            i.length && i.css({
                                position: "absolute",
                                width: "2px",
                                height: s.height() - l,
                                backgroundColor: n.options.tooltips.lineWithLineColor,
                                left: 0,
                                transform: "translateX(-50%)",
                                zIndex: 0,
                                transition: "100ms"
                            })
                        }
                    }
                    ,
                    e.on("mouseleave", (function() {
                        t("#lineTooltipChartJSStyles").attr("media", "max-width: 1px")
                    }
                    )),
                    e.on("mouseenter", (function() {
                        t("#lineTooltipChartJSStyles").removeAttr("media")
                    }
                    )),
                    e.on("mousemove", (function(s) {
                        s.pageY - e.offset().top > t(".hs-chartjs-tooltip-wrap").height() / 2 && s.pageY - e.offset().top + t(".hs-chartjs-tooltip-wrap").outerHeight() / 2 < e.height() && (console.log(s.pageY + t(".hs-chartjs-tooltip-wrap").height() / 2 - (e.offset().top + e.height() / 2)),
                        t(".hs-chartjs-tooltip").css({
                            top: s.pageY + t(".hs-chartjs-tooltip-wrap").height() / 2 - (e.offset().top + e.height() / 2)
                        }))
                    }
                    ))
                }
                return o
            }
        }
    }
}(jQuery);
