
;(function () {

    var app,
        config = {
            content: null,
            projects: null
        },

        responseManager = function (expected, callback) {

            var called = 0;

            return function () {

                called += 1;

                if (called === expected) {
                    callback();
                }
            };
        },

        responseHandler = function (type, complete) {
            return function (response) {

                config[type] = response;
                complete();
            };
        },

        errorHandler = function (reponse) {
            // @TODO
            console.error('error', response);
        },


        startApp = function () {
            console.log('start app');
        },

        registerComplete = responseManager(2, startApp);


    // fetch projects
    fetch('/content/projects.json').then(responseHandler('projects', registerComplete), errorHandler);

    // fetch content
    fetch('/content/content.json').then(responseHandler('content', registerComplete), errorHandler);



} ());
