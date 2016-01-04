"use strict";

/**
 * main constructor for the game
 * @constructor
 */
var Solitaire = function () {

    this.el         = document.getElementById('game');

    this.balls      = this.el.querySelectorAll('.ball');
    this.balls      = Array.prototype.slice.call(this.balls);

    this.selected   = false;
    this.possibles  = [];

    this.trickyMode = false;
};


/**
 * bind all dom events
 */
Solitaire.prototype.bindEvents = function () {

    var scope = this;

    this.balls.forEach(function (ball) {

        ball.addEventListener('click', function (evt) {
            scope.click.call(scope, evt);
        }, false);
    }, this);

    // reset game
    document.getElementById('reset').addEventListener('click', function () {
        scope.reset.call(scope);
    }, false);

    // enable/disable tricky mode
    document.getElementById('tricky').addEventListener('click', function (evt) {
        scope.tricky.call(scope, evt.currentTarget);
    }, false);
};


/**
 * callback method from clicking on a ball in play
 *
 * @param evt {Event}
 */
Solitaire.prototype.click = function (evt) {

    var clicked = evt.currentTarget,
        gridPos = clicked.getAttribute('data-ball');

    // we have a ball selected
    if (this.selected) {

        // remove selected if set and clicked
        if (clicked.className.match(/selected/g)) {
            clicked.className = clicked.className.replace(/\ selected/g, '');

            this.selected = null;
            this.possibles.length = 0;

            return;
        }

        // check if in possibles array
        if (this.possibles.indexOf(gridPos) !== -1) {
            this.removeBall(gridPos);
        }

    } else {

        // check for a ball in the hole
        if (clicked.className.match(/empty/g)) {
            return;
        }

        clicked.className = clicked.className + ' selected';

        this.selected = clicked;

        this.getPossibles(gridPos);
    }
};


/**
 * get all possibles positions that the user could click next
 *
 * @param gridPos {string}
 */
Solitaire.prototype.getPossibles = function (gridPos) {

    var splits = gridPos.split('-'),
        x = parseFloat(splits[0]),
        y = parseFloat(splits[1]),
        xConstraints = [0, 8],
        yConstraints = [0, 8];

    this.possibles.length = 0;

    // change constraints based on pos (narrow three in a row)
    if (y < 3 || y > 5) {
        xConstraints = [2, 6];
    }

    if (x < 3 || x > 5) {
        yConstraints = [2, 6];
    }

    // check left
    if ((x - 2) > xConstraints[0]) {
        this.addPossible((x - 2) + '-' + y);
    }

    // check right
    if ((x + 2) < xConstraints[1]) {
        this.addPossible((x + 2) + '-' + y);
    }

    // check top
    if ((y - 2) > yConstraints[0]) {
        this.addPossible(x + '-' + (y - 2));
    }

    // check bottom
    if ((y + 2) < yConstraints[1]) {
        this.addPossible(x + '-' + (y + 2));
    }
};


/**
 * get the ball reference dom object based on identifier
 *
 * @param identifier {string}
 */
Solitaire.prototype.getBall = function (identifier) {

    return this.balls.find(function (ball) {
        return ball.getAttribute('data-ball') === identifier;
    });
};


/**
 * add a possible position to the possibles array if not empty
 * @param identifier
 */
Solitaire.prototype.addPossible = function (identifier) {

    var target = this.getBall(identifier);

    if (target && target.className.match(/empty/g)) {
        this.possibles.push(identifier);
    }
};


/**
 * removes the ball between the two action spots
 *
 * @param gridPos {string}
 * @todo re-write - insane to follow logic
 */
Solitaire.prototype.removeBall = function (gridPos) {

    var selectedId = this.selected.getAttribute('data-ball').split('-'),
        targetId = gridPos.split('-'),
        identifier,
        target;

    // both on the x axis, sanity check the ball is in the middle
    if (selectedId[0] === targetId[0]) {
        if (selectedId[1] > targetId[1]) {
            identifier = (targetId[0] + '-' + (parseFloat(targetId[1]) + 1));
        } else {
            identifier = (targetId[0] + '-' + (parseFloat(targetId[1]) - 1));
        }
    }

    // both on the y axis, sanity check the ball is in the middle
    if (selectedId[1] === targetId[1]) {
        if (selectedId[0] > targetId[0]) {
            identifier = ((parseFloat(targetId[0]) + 1) + '-' + targetId[1]);
        } else {
            identifier = ((parseFloat(targetId[0]) - 1) + '-' + targetId[1]);
        }
    }

    target = this.getBall(identifier);

    // if empty - bomb out
    if (target.className.match(/empty/g)) {
        return;
    }

    // place ball in new position
    this.getBall(gridPos).className = 'ball';

    // empty target
    target.className = target.className + ' empty';

    // null-ify selected
    this.selected.className = this.selected.className.replace(/selected/g, 'empty');
    this.selected = null;
};


/**
 * reset game board
 */
Solitaire.prototype.reset = function () {

    this.balls.map(function (ball) {
        ball.className = 'ball';
    });

    this.getBall('4-4').className = 'ball empty';
};


/**
 * enable a tricky mode on the game
 */
Solitaire.prototype.tricky = function (button) {

    if (this.trickyMode) {
        this.el.className = 'game';
        button.className = button.className.replace(/( )?on/g, '');
    } else {
        this.el.className = 'game tricky';
        button.className = button.className + ' on';
    }

    this.trickyMode = !this.trickyMode;
};


// start game ;)
var game = new Solitaire();

// bind events
game.bindEvents();
