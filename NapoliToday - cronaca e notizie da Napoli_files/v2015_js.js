window.$ && $(function() {
    var _ = function(event) {
        $('[data-spy="ontop"]').each(function() {
            if (!$(this).data('container') || !$($(this).data('container')).length) return;
            var iOffsetTop = $(this).data('original-top');
            if (iOffsetTop == undefined) $(this).data('original-top', iOffsetTop = $(this).offset().top);
            var iDisplacementTop = $(this).data('offset-top') ? parseInt($(this).data('offset-top'), 10) : 0;
            iDisplacementTop = !isNaN(iDisplacementTop) && iDisplacementTop > 0 ? iDisplacementTop : 0;
            if ($(window).scrollTop() > iOffsetTop - iDisplacementTop) {
                var oContainer = $($(this).data('container'));
                var iMarginTop = Math.max(0, $(window).scrollTop() - iOffsetTop + iDisplacementTop);
                if (oContainer.offset().top + oContainer.height() >= iOffsetTop + $(this).height() + iMarginTop) $(this).css('margin-top', iMarginTop);
                else $(this).css('margin-top', Math.max(0, oContainer.offset().top + oContainer.height() - $(this).height() - iOffsetTop))
            } else $(this).css('margin-top', 0)
        })
    };
    $(window).scroll(_);
    _()
});

window.$ && $(function() {
    var b = function() {
        $('[data-behaviour="sticky"]').each(function() {
            if ($(this).data("skipper")) {
                if ($(this).data("excluded")) return;
                var c = "";
                $($(this).data("skipper"), $(this).data("container") || $(this).parent()).each(function() {
                    c += "" + $(this).html()
                });
                if (~c.indexOf("//pagead2.googlesyndication.com/")) {
                    $(this).data("excluded", 1);
                    return
                }
            }
            $(this).data("initialized") || $(this).data("initialized", 1).css({
                position: "relative",
                display: "block",
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                margin: 0,
                border: 0,
                padding: 0,
                outline: 0,
                overflow: "hidden",
                visibility: "hidden",
                clear: "both"
            }).html("");
            var a = $(window).scrollTop() || 0,
                b = ($(this).offset() || {}).top || 0,
                d = $(this).data("offset-top") || 0,
                e = ($($(this).data("container") || $(this).parent()).height() || 0) - ($(this).height() || 0),
                f = $($(this).data("comparer") || $(this).parent().prev()).height() || 0;
            a + d > b ? (a = Math.max(0, a - b + d), e + a < f ? $(this).height(a) : $(this).height(Math.max(0, f - e))) : $(this).height(0)
        })
    };
    $(window).scroll(b);
    b()
});

window.$ && $(function() {
    $("[data-compose]").each(function() {
        var oThis = $(this);
        var aPattern = oThis.data("compose") || "";
        aPattern = aPattern.split(/[^ABab!]+/i);
        var iLimit = oThis.data("compose-limit") || 0;
        iLimit = parseInt(iLimit, 10) || 0;
        var iDelay = oThis.data("compose-delay") || 0;
        iDelay = parseInt(iDelay, 10) || 0;
        var fCallBack = function(oThis, aPattern, iLimit) {
            var aSourceA = [];
            $(oThis.data("compose-source-a")).each(function() {
                aSourceA.push(this)
            });
            var aSourceB = [];
            $(oThis.data("compose-source-b")).each(function() {
                aSourceB.push(this)
            });
            pattern: for (var i = 0; i < aPattern.length; ++i) {
                var sToken = aPattern[i] || "";
                if (sToken == "a" || sToken == "a!") {
                    if (aSourceA.length) {
                        oThis.append(sToken == "a!" ? aSourceA.splice(Math.floor(Math.random() * aSourceA.length), 1)[0] : aSourceA.shift());
                        if (iLimit && --iLimit <= 0) break
                    }
                } else if (sToken == "b" || sToken == "b!") {
                    if (aSourceB.length) {
                        oThis.append(sToken == "b!" ? aSourceB.splice(Math.floor(Math.random() * aSourceB.length), 1)[0] : aSourceB.shift());
                        if (iLimit && --iLimit <= 0) break
                    }
                } else if (sToken == "A" || sToken == "A!")
                    while (aSourceA.length) {
                        oThis.append(sToken ==
                            "A!" ? aSourceA.splice(Math.floor(Math.random() * aSourceA.length), 1)[0] : aSourceA.shift());
                        if (iLimit && --iLimit <= 0) break pattern
                    } else if (sToken == "B" || sToken == "B!")
                        while (aSourceB.length) {
                            oThis.append(sToken == "B!" ? aSourceB.splice(Math.floor(Math.random() * aSourceB.length), 1)[0] : aSourceB.shift());
                            if (iLimit && --iLimit <= 0) break pattern
                        }
            }
        };
        if (iDelay > 0) setTimeout(function() {
            fCallBack(oThis, aPattern, iLimit)
        }, iDelay);
        else fCallBack(oThis, aPattern, iLimit)
    })
});

window.$ && $(function() {
    $(".modal").on("show.bs.modal", function() {
        $("iframe.facebook-connect-iframe", $(this)).each(function() {
            if (!$(this).data("src") || $(this).data("processed")) return;
            $(this).data("processed", true);
            $(this).attr("src", $(this).data("src"))
        })
    })
});

window.$ && $(function() {
    $(window).on("resize scroll", function() {
        $(".nav-alph").affix({
            offset: {
                top: function() {
                    return $(".nav-alph-container").offset().top
                },
                bottom: function() {
                    return $(".site-footer").outerHeight() + $(".back-to-top-link").outerHeight()
                }
            }
        });
        if ($(".main-content").length) {
            $(".alph-list-link-desktop").css("left", $(".main-content").offset().left)
        }
    });
    $("#commentTextarea").focus(function() {
        $("#loginModal").modal()
    });
    $("#events-dropdown-group").on("hide.bs.dropdown", function() {
        $("html").removeClass("is-locked")
    });
    $("#events-dropdown-group").affix({
        offset: {
            top: function() {
                return ($(".offset-top").offset() || {
                    top: 0
                }).top || 0
            }
        }
    });

    $('.filters-toggle').on('click', function(event) {
        event.preventDefault();
        $('.filters-dropdown').addClass('is-open');
        $('html').toggleClass("is-locked");
    });

    $('.filters-close').on('click', function(event) {
        event.preventDefault();
        $('.filters-dropdown').removeClass('is-open');
        $('html').removeClass("is-locked");
    });

    $(".checkbox").click(function(event) {
        event.stopPropagation()
    });
    $(".mobile-nav-trigger").on("click", function(event) {
        event.preventDefault();
        $(".header").toggleClass("is-nav-open");
        $("html").toggleClass("is-locked")
    });
    $(".channel-nav-trigger").on("click", function(t) {
        t.preventDefault(), $(".channel-mobile-menu").toggleClass("is-nav-open")
    });
    $(".has-children").children("a").on("click", function(event) {
        event.preventDefault();
        $(this).next(".nav-children").removeClass("is-hidden")
    });
    $(".go-back").on("click", function(event) {
        event.preventDefault();
        $(".nav-children").addClass("is-hidden")
    });
    $(".close-btn").on("click",
        function(event) {
            event.preventDefault();
            $(".header").removeClass("is-nav-open");
            $("html").removeClass("is-locked")
        });
    $(".content-blocker").on("click", function() {
        $(".header").removeClass("is-nav-open");
        $("html").removeClass("is-locked")
    });
    $(".start-search-trigger").on("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        toggleSearch()
    });
    $(".search-overlay").on("click", function() {
        toggleSearch("close");
        $(this).removeClass("is-visible")
    });

    function toggleSearch(type) {
        if (type == "close") {
            $(".start-search").removeClass("is-visible");
            $(".start-search-trigger").removeClass("search-is-visible");
            $(".search-overlay").removeClass("search-is-visible");
            $("html").removeClass("is-locked")
        } else {
            $("html").toggleClass("is-locked");
            $(".header").removeClass("is-nav-open");
            $(".header").toggleClass("search-is-visible");
            $(".start-search").toggleClass("is-visible");
            $(".start-search-trigger").toggleClass("search-is-visible");
            $(".search-overlay").toggleClass("search-is-visible");
            $(".start-search").find('input[type="search"]').focus();
            $(".start-search").hasClass("is-visible") ?
                $(".search-overlay").addClass("is-visible") : $(".search-overlay").removeClass("is-visible")
        }
    }
    if ("ontouchstart" in window) $("body").addClass("touchevents")
});