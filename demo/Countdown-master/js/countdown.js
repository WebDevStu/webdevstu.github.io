(function () {

    "use strict";

    COUNTDOWN.CountDown = function () {

        // reference dictionary to object
        this.dictionary = COUNTDOWN.dictionary;

        // collect inputs
        this.inputs = Array.prototype.slice.call(document.countdown.letter);
        this.results = Array.prototype.slice.call(document.results.highest);

        // other dom elements
        this.submit = document.getElementById('calculate');
        this.resetter = document.getElementById('reset');
        this.possibles = document.getElementById('possibles');

        // controlling swapping the chosen words
        //this.swappers = document.querySelector('.changeWord');
        //this.resultIndex = 0;
    };


    /**
     * extend the prototype
     */
    _.extend(COUNTDOWN.CountDown.prototype, {

        /**
         * keyUp
         * call back from key up on each input, targets the focus on the next
         * input if value is correct
         *
         * @param evt {event.object}
         */
        keyUp: function (evt) {

            var target = evt.currentTarget;

            if (!target.value) {
                target.classList.remove('val');
                return;
            }

            if (target.value.length > 1) {
                target.value = target.value.substr(0, 1);
            }

            target.classList.add('val');

            try{
                this.inputs[this.inputs.indexOf(target) + 1].focus()
            } catch (e) {
                this.submit.focus();
            }
        },


        /**
         * getMatched
         * gets the values of the inputs and starts matching the desired letters
         * against the dictionary
         *
         * @param evt {Event.object}
         */
        getMatched: function (evt) {

            var inputted = this.inputs.map(function (el) {
                    return el.value
                }).join(''),
                results,
                len,
                i, j;

            evt.preventDefault();

            if (inputted.length !== 9) {
                // @TODO
                console.error('not enough letters');
                return;
            }

            this.submit.classList.add('disabled');

            results = this.lightMatch(inputted);
            results.sort(function (a, b) {
                return (a.length > b.length) ? -1 : 1;
            });

            len = results[0].length;

            for (i = 0, j = Math.floor((9 - results[0].length) / 2); i < len; i += 1, j += 1) {
                this.results[j].value = results[0].charAt(i);
                this.results[j].classList.add('val');
            }

            // extend this to list on order of no. letters
            this.possibles.appendChild(this.resultsBreakDown(results));

            this.submit.classList.remove('disabled');
        },


        /**
         * lightMatch
         * takes the letters as inputted and matches these in a first pass of
         * the dictionary. creates an array of words that contain any of the 9
         * selected letter only once
         *
         * @param letters {string}
         * @returns {Array}
         */
        lightMatch: function (letters) {

            var len = this.dictionary.length,
                results = [],
                i;

            // iterate dictionary words
            for (i = 0; i < len; i += 1) {

                // check each lightly for letter match
                if (this.findLetters(this.dictionary[i], letters)) {
                    results.push(this.dictionary[i]);
                }
            }

            return results;
        },


        /**
         * findLetters
         * each dictionary word is matched against letters. to save a bit of
         * memory, we ignore words less than three and more than nine, tests the
         * word one letter at a time, as soon as we fail, return fast on the
         * next
         *
         * @param word {string}
         * @param letters {string}
         * @returns {boolean}
         */
        findLetters: function (word, letters) {

            var len = word.length,
                regExp,
                exec,
                index,
                i;

            // ignore over and under
            if (len < 4 || len > 9) {
                return false;
            }

            // iterate word chars modify regExp on each match
            for (i = 0; i < len; i += 1) {

                regExp = new RegExp('[' + letters + ']', 'i');
                exec = regExp.exec(word.charAt(i));

                // test match in reg exp
                if (exec) {
                    index = letters.indexOf(exec.input.toLowerCase());
                    letters = letters.slice(0, index) + letters.slice(index + 1);
                } else {
                    return false;
                }
            }

            return true;
        },



        /**
         * resultsBreakDown
         * creates some dom objects to inject into the view
         *
         * @param results {Array}
         * @returns {DocumentFragment}
         */
        resultsBreakDown: function (results) {

            var len = results.length,
                index = null,
                fragment = document.createDocumentFragment(),
                item,
                list,
                i;

            for (i = 0; i < len; i += 1) {
                list = document.createElement('ul');

                if (index !== results[i].length) {
                    item = document.createElement('li');
                    item.className = 'title';
                    item.innerHTML = results[i].length + ' Letters';
                    list.appendChild(item);

                    index = results[i].length;
                }

                item = document.createElement('li');

                if (!i) {
                    item.className = 'selected';
                }

                item.innerHTML = results[i];
                list.appendChild(item);

                fragment.appendChild(list);
            }

            return fragment;
        },


        /**
         * reset
         * resets the form
         */
        reset: function () {

            var predicate = function (input) {
                input.value = '';
                input.className = '';
            };

            this.inputs.map(predicate);
            this.results.map(predicate);

            this.possibles.innerHTML = '\n';
        },


        // @TODO
    //    displayWord: function (results) {
    //        for (i = 0; i < results[this.resultIndex].length; i += 1) {
    //            this.results[i].value = results[0].charAt(i);
    //            this.results[i].classList.add('val');
    //        }
    //    },


        /**
         * scrollResults
         * @TODO
         *
         * @param evt {event.object}
         */
        scrollResults: function (evt) {

            var target = evt.currentTarget,
                direction = 1;

            evt.preventDefault();

            if (target.className.match(/prev/)) {
                direction = 0;
            }

            if (target.parentNode.className.match(/disabled/)) {
                return;
            }

            if (direction) {
                // move to next word
                console.log('move to next');
            } else {
                console.log('move to prev');
            }
        }
    });
} ());