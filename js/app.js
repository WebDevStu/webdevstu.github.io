'use strict';

;(function () {

    var app = undefined;

    // fetch all dependencies
    fetch.get(['/content/projects.json', '/content/content.json']).then(function (config) {

        console.log(config);
    });
})();