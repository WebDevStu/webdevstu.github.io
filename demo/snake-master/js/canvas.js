/**
 * Canvas class
 *
 * @constructor
 */
var Canvas = function () {

    // listen events
    _.listenTo({
        'frame:change': 'draw',
        'food:eaten':   'setFood',
        'change:speed': 'speedUpSnake',
        'change:score': 'updateScore',
        'game:over':    'gameOver'
    }, this);

    // config
    this.frame = 0;
    this.speed = 10;
    this.food = {
        x: null,
        y: null
    };
    this.gameScore = 0;
    this.highScore = localStorage.getItem('highScore') || 0;
    this.scores = {};

    // canvas
    this.canvas = document.createElement('canvas');
    // attrs
    this.canvas.width = 400;
    this.canvas.height = 300;
    this.canvas.className = 'board';

    // context
    this.ctx = this.canvas.getContext('2d');

    // new snake for the board
    this.snake = new Snake(this.ctx, this.food);
};


/**
 * drawScoreBoard
 *
 * @returns {Canvas}
 */
Canvas.prototype.drawBoard = function () {

    var list = document.createElement('ul');

    list.className = 'score';

    _.forEach(['highScore', 'gameScore'], function (key) {

        this.scores[key] = document.createElement('li');
        this.scores[key].className = key;
        this.scores[key].innerHTML = 0;

        list.appendChild(this.scores[key]);
    }, this);

    this.scores.highScore.innerHTML = 'High score: ' + this.highScore;

    document.body.appendChild(list);
    document.body.appendChild(this.canvas);

    return this;
};


/**
 * reset
 * @returns {Canvas}
 */
Canvas.prototype.reset = function () {

    this.clear();

    // resets
    this.gameScore = 0;
    this.speed = 10;
    this.snake = new Snake(this.ctx, this.food);

    _.trigger('change:score', 'gameScore', '0');

    return this;
};

/**
 * clear
 */
Canvas.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};


/**
 * draw
 */
Canvas.prototype.draw = function () {

    this.frame += 1;

    if (this.frame >= this.speed) {
        this.frame = 0;

        this.clear();
        this.snake.move();

        this.drawFood()
    }
};


/**
 * setFood
 *
 * @returns {Canvas}
 */
Canvas.prototype.setFood = function () {

    var coordinates = {
        x: _.random(20, 380, 10),
        y: _.random(20, 280, 10)
    };

    while (this.snake.isInSnakeTail(coordinates)) {
        coordinates.x = _.random(20, 380, 10);
        coordinates.y = _.random(20, 280, 10);
    }

    this.food.x = coordinates.x;
    this.food.y = coordinates.y;

    return this.drawFood();
};


/**
 * drawFood
 *
 * @returns {Canvas}
 */
Canvas.prototype.drawFood = function () {

    var draw = false,
        x,
        y,
        i;

    for (i = 0; i < 9; i += 1) {

        y = Math.floor(i / 3) * 3;
        x = (i % 3) * 3;

        if (draw) {
            this.ctx.beginPath();
            this.ctx.rect((this.food.x + x), (this.food.y + y), 3, 3);
            this.ctx.fillStyle = 'black';
            this.ctx.fill();
        }

        draw = !draw;
    }

    return this;
};


/**
 * speedUpSnake
 * speeds up the refresh rate and in turn speeds up the snake
 */
Canvas.prototype.speedUpSnake = function () {
    this.speed -= 0.1;
};


/**
 * updateScore
 *
 * @param type {String}
 * @param score {Number}
 */
Canvas.prototype.updateScore = function (type, score) {

    var el = this.scores[type],
        prefix = '';

    if (type === 'highScore') {
        prefix = 'High score: ';
    }

    if (el) {
        el.innerHTML = prefix + (score || this[type].toString());
    }
};

/**
 * gameOver
 */
Canvas.prototype.gameOver = function () {

    this.clear();

    this.ctx.font = "70px Arial";
    this.ctx.fillText("Game Over!", 10, 150);

    this.ctx.font = "20px Arial";
    this.ctx.fillText("click to try again", 130, 200);

    if (+this.gameScore > +this.highScore) {
        _.trigger('change:score', 'highScore', this.gameScore);

        localStorage.setItem('highScore', this.gameScore);
    }
};
