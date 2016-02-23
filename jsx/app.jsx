
;(function () {

    var app,
        config = {
            content: null,
            projects: null
        },

        responseManager = (expected, callback) => {

            let called = 0;

            return function () {

                called += 1;

                if (called === expected) {
                    callback();
                }
            };
        },

        responseHandler = (type, complete) => {

            return (response) => {

                config[type] = response;
                complete();
            };
        },

        errorHandler = (reponse) => {
            // @TODO
            console.error('error', response);
        },


        startApp =  () => {
            console.log('start app');
        },

        registerComplete = responseManager(2, startApp);


    // fetch projects
    fetch('/content/projects.json').then(responseHandler('projects', registerComplete), errorHandler);

    // fetch content
    fetch('/content/content.json').then(responseHandler('content', registerComplete), errorHandler);



} ());
