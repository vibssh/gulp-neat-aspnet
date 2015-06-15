var bannerJumbotron = Controller.extend({

    init: function () {
        var w = $(window);
        this.hero = $('.hero');
        this.heroInner = $('.hero-inner');
        this.handle(w, 'load resize', this.banner);
    },

    banner: function () {
        var minHeight = $(window).height() * 0.65;
            if ($(window).width() > 1024) {
                this.hero.css('height', minHeight);
            } else {
                this.hero.css('height', 'auto');
            }
        }
 });

