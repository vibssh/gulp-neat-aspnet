var callToAction = Controller.extend({

    init: function () {
        this.cta = $('.link-1');
        this.patient = $('.link-2');
        var w = $(window);
        this.handle(w, 'scroll', this.sticky);
    },

    sticky: function () {
        var scroll = $(window).scrollTop();
        console.log(scroll);
        // Link-1
        if (scroll >= 148) {
            this.cta.addClass('fixed');
        } else {
            this.cta.removeClass('fixed');
        }
        //Link-2
        if (scroll >= 270) {
            this.patient.addClass('fixed');
        } else {
            this.patient.removeClass('fixed');
        }
    }
});

