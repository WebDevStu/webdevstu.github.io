
;(function () {

    var config = {
            content: null,
            projects: null
        },

        

        responseHandler = function (type) {
            return function (response) {
                config[type] = reponse;
            };
        },

        errorHandler = function (reponse) {
            // @TODO
            console.error('error', response);
        };


    // fetch projects
    fetch('/content/projects.json').then(responseHandler('projects'), errorHandler);

    // fetch content
    fetch('/content/content.json').then(responseHandler('content'), errorHandler);



} ());
