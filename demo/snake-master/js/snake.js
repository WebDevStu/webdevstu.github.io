/**
 * Snake Class
 *
 * @constructor
 */
var Snake = function (ctx, food) {

    _.listenTo({
        'change:direction': 'setDirection'
    }, this);

    this.ctx = ctx;
    this.food = food;
    this.tail = [{
        x: 200,
        y: 150
    }];

    // 0 = left, 1 = up, 2 = right, 3 = down;
    this.direction = 1;

    this.createSegment();
};


/**
 * move
 * called from the Canvas class passing a direction of travel, appends a segment
 * to the start of the tail array and removes from the end
 */
Snake.prototype.move = function () {

    var first = this.tail[0],
        coordinates = {
            x: first.x,
            y: first.y
        };

    switch (this.direction) {

        case 0:
            coordinates.x = first.x - 10;
            break;

        case 1:
            coordinates.y = first.y - 10;
            break;

        case 2:
            coordinates.x = first.x + 10;
            break;

        case 3:
            coordinates.y = first.y + 10;
            break;
    }

    // add to start of tail
    this.tail.unshift(coordinates);

    if (coordinates.x === this.food.x && coordinates.y === this.food.y) {

        _.trigger('food:eaten');
        _.trigger('change:speed');

        return this.move();
    }

    // remove last if no food eaten
    this.tail.pop();

    // finally redraw
    this.drawSnake()
        .checkBoundaries(coordinates);
};


/**
 * drawSnake
 */
Snake.prototype.drawSnake = function () {

    _.forEach(this.tail, function (config) {
        this.createSegment(config.x, config.y);
    }, this);

    return this;
};


/**
 * createSegment
 * creates a section of the snake
 *
 * @param x
 * @param y
 */
Snake.prototype.createSegment = function (x, y) {

    x = (typeof x === 'number') ? x : 200;
    y = (typeof y === 'number') ? y : 150;

    this.ctx.beginPath();
    this.ctx.rect(x, y, 9, 9);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
};


/**
 * setDirection
 * sets the direction based on the key pressed
 *
 * @param keyCode {Number}
 */
Snake.prototype.setDirection = function (keyCode) {

    // 37 = left, 38 = up, 39 = right, 40 = down
    var blocks = [2, 3, 0, 1],
        index = keyCode - 37;

    if (index < 0 && index > 3) {
        return;
    }

    if (blocks[this.direction] === index) {
        return;
    }

    this.direction = index;
};


/**
 * checkBoundaries
 *
 * @param coordinates {Object}
 */
Snake.prototype.checkBoundaries = function (coordinates) {

    // keep in boundaries
    if (coordinates.y < 0 || coordinates.y > 290 || coordinates.x < 0 || coordinates.x > 390) {
        _.trigger('game:over');

        return;
    }

    if (this.isInSnakeTail(coordinates, this.tail.slice(1))) {
        _.trigger('game:over');
    }
};


/**
 * isInSnakeTail
 *
 * @param coordinates {Object}
 * @param tail {Array}
 * @returns {boolean}
 */
Snake.prototype.isInSnakeTail = function (coordinates, tail) {

    var overlaps = false;

    tail = tail || this.tail;

    _.forEach(tail, function (conf) {

        if ((conf.x === coordinates.x) && (conf.y === coordinates.y)) {
            overlaps = true;
        }
    });

    return overlaps;
};