

(function () {

    var board = new Canvas(),
        gameInPlay = true,


        /**
         * render
         */
        render = function () {

            if (gameInPlay) {

                _.trigger('frame:change');
                window.requestAnimationFrame(render);
            }
        },


        /**
         * stopGame
         */
        stopGame = function () {
            gameInPlay = false;
        },


        /**
         * startGame
         */
        startGame = function () {
            gameInPlay = true;
            window.requestAnimationFrame(render);
        },


        /**
         * changeDirection
         *
         * @param evt {Event.Object}
         */
        changeDirection = function (evt) {
            _.trigger('change:direction', evt.keyCode);
        },


        /**
         * changeScore
         */
        changeScore = function () {

            board.gameScore += 1;

            _.trigger('change:score', 'gameScore');
        },


        /**
         * tryNewGame
         */
        tryNewGame = function () {

            if (gameInPlay) {
                return;
            }

            // new Game
            board.reset()
                .setFood();

            startGame();
        };

    // pause the game on blur
    window.addEventListener('blur', stopGame, false);
    // start again on focus
    window.addEventListener('focus', startGame, false);
    // get key down events
    window.addEventListener('keydown', changeDirection, false);
    // click the board
    board.canvas.addEventListener('click', tryNewGame, false);


    // subscribed events
    _.listenTo({
        'food:eaten':   changeScore,
        'game:over':    stopGame
    });

    // set the first food
    board.drawBoard()
        .setFood();

    // start the game
    window.requestAnimationFrame(render);
} ());
