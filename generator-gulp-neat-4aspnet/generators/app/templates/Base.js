var Base = Class.extend({

    mobileBreakpoint: 1024,
    object: $(),

    init: function (args) {
    },

    isMobile: function () {
        return ($(window).width() < this.mobileBreakpoint);
    },

    setMobileBreakpoint: function (number) {
        this.mobileBreakpoint = number;
    },

    lazyLoad: function () {
        if (!this.isMobile()) {
            this.object.find('.lazyload').each(function (i, item) {
                var $item = $(item),
                    style = $item.attr('style') + ";" + $item.data('background');
                $item.attr({ 'style': style });
            });
        }
    },

    // A way to handle jQuery events without loosing reference to base class
    handle: function (object, event, handler) {
        object.on(event, $.proxy(handler, this));
    }



});