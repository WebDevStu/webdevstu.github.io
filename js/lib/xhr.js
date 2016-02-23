'use strict';

/**
 * main fetch object (overwrites native fetch if you've got it)
 *
 * @method fetch
 * @returns {Object}   [object of exposed methods]
 */
module.exports = function () {

    // privates
    var _store = {},


    /**
     * make xhr request to the target supplied
     *
     * @method  _fetch
     * @param   {String} url     [url to hit]
     * @returns {[type]} [description]
     */
    _fetch = function _fetch(url) {

        return new Promise(function (resolve, reject) {

            var xhr = new XMLHttpRequest();

            xhr.open('GET', url, true);

            xhr.onload = function () {
                resolve(JSON.parse(xhr.response));
            };

            xhr.onerror = function () {
                reject(JSON.parse(xhr.response));
            };

            xhr.send();
        });
    },


    /**
     * response manger for managing when all calls have been successfully
     * completed
     *
     * @method  _responseManager
     * @param   {Number}   expected [how many calls are registered]
     * @param   {Function} callback [method to call once all calls complete]
     * @returns {Function} [a closure function to call from each call success]
     */
    _responseManager = function _responseManager(expected, callback) {

        var called = 0;

        return function () {

            called += 1;

            if (called === expected) {
                callback(_store);
            }
        };
    },


    /**
     * handles the response from a success call and stores the response
     *
     * @method _responseHandler
     * @param   {String} type       [name of stored]
     * @param   {Function} complete [complete callback method]
     * @returns {Function}          [function for the success to hit]
     */
    _responseHandler = function _responseHandler(type, complete) {

        return function (response) {

            _store[type] = response;

            complete();
        };
    },


    /**
     * errors :(
     *
     * @method _errorHandler
     * @param   {[type]} reponse [description]
     * @returns {[type]}         [description]
     */
    _errorHandler = function _errorHandler(reponse) {
        // @TODO
        console.error('error', response);
    };

    // exposed methods
    return {

        /**
         * fetches the target url, returning Promise to chain
         *
         * @method get
         * @param   {String|Array} url  [url or array of url's to hit]
         * @returns {Promise}           [new promise to chain]
         */

        get: function get(url) {

            // make an array
            if (!(url instanceof Array)) {
                url = [url];
            }

            return new Promise(function (resolve, reject) {

                var callback = _responseManager(url.length, resolve);

                url.forEach(function (part) {

                    var descr = part.split('/').pop().replace(/\.json/g, '');

                    _fetch(part).then(_responseHandler(descr, callback));
                });
            });
        }
    };
}();