/**
 * main fetch object (overwrites native fetch if you've got it)
 *
 * @method fetch
 * @returns {Object}   [object of exposed methods]
 */
const fetch = (() => {

    // privates
    let _store = {},

        /**
         * make xhr request to the target supplied
         *
         * @method  _fetch
         * @param   {String} url     [url to hit]
         * @returns {[type]} [description]
         */
        _fetch = (url) => {

            return new Promise((resolve, reject) => {

                let xhr = new XMLHttpRequest();

                xhr.open('GET', url, true);

                xhr.onload = () => {
                    resolve(JSON.parse(xhr.response));
                };

                xhr.onerror = () => {
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
        _responseManager = (expected, callback) => {

            let called = 0;

            return () => {

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
        _responseHandler = (type, complete) => {

            return (response) => {

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
        _errorHandler = (reponse) => {
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
        get (url) {

            // make an array
            if (!(url instanceof Array)) {
                url = [url];
            }

            return new Promise((resolve, reject) => {

                let callback = _responseManager(url.length, resolve);

                url.forEach((part) => {

                    let descr = part.split('/').pop().replace(/\.json/g, '');

                    _fetch(part).then(_responseHandler(descr, callback));
                });
            });
        }
    };
}) ();