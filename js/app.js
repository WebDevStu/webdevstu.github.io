'use strict';

;(function () {
    // constants
    var fetch = require('./lib/xhr'),
        router = require('./lib/router');

    // fetch all dependencies
    fetch.get(['/content/projects.json', '/content/content.json', 'content/blog.json']).then(function (config) {

        console.log(config);
        // start router
        router(config).start();

        // set default hash to trigger on the router
        location.hash = location.hash || '#/projects';
    });
})();