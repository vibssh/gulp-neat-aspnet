/*
 * Base Controller class
 * Extend it if you want to make your automatic Controller
 * Controller binding for specified areas is done in ControllerBinder Class
 */

var Controller = Base.extend({

    settings: {}, // Declare a list of values that are allowed to be passed as parameters
    object: $(), // A reference for the object that Controller is attached to

    init: function (object, args) {
        this.object = object;
        this.applyArguments(args);
    },

    applyArguments: function (args) {
        if (typeof (args) == "object") {
            for (var i in args) {
                this.setValue(i, args[i]);
            }
        }
    },

    setValue: function (name, value) {
        //console.log(typeof this.settings[name] === 'undefined');
        this.settings[name] = value;
    }

});