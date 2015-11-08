
"use strict";


var COUNTDOWN = {},
    _ = {

        /**
         * extend
         * extends object with properties from second supplied object
         *
         * @param object {object}
         * @param extend {object}
         */
        extend: function (object, extend) {

            for (var prop in extend) {
                if (extend.hasOwnProperty(prop)) {
                    object[prop] = object[prop] || extend[prop];
                }
            }
        }
    };
