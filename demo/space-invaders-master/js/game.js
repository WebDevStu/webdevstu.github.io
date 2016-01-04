

(function () {

    var canvas = new SI.Canvas(),
        running = true,
        score = 0,

        /**
         * render
         */
        render = function () {

            if (running) {
                _.trigger('frame:change');

                window.requestAnimationFrame(render);
            }
        };


    // pause the game on blur
    window.addEventListener('blur', function () {
        running = false;
    });

    // start again on focus
    window.addEventListener('focus', function () {
        running = true;
        _.trigger('frame:change', window.requestAnimationFrame(render));
    });


    // DOM events
    document.addEventListener('keydown', function (evt) {
        _.trigger('key:down', evt.keyCode);
    });

    document.addEventListener('keyup', function () {
        _.trigger('key:up');
    });


    // start game
    _.trigger('frame:change', window.requestAnimationFrame(render));

    // listen for the end game
    _.listenTo('game:over', function () {
        running = false;
    });
} ());
