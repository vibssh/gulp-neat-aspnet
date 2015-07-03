var ControllerBinder = Base.extend({

    controllers: [],

    init: function () {
        this.items = $("*[data-controller]");
        for (var i = 0; i < this.items.length; i++) {
            var item = $(this.items[i]),
                controllerName = $(this.items[i]).data("controller"),
                args = $(this.items[i]).data("args");

            if (typeof (window[controllerName]) === "function") {
                this.controllers[controllerName] = new window[controllerName](item, args);
            }
        }
    }

});

$(document).ready(function () {
    var controllerBinder = new ControllerBinder();
});

