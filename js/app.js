'use strict';

;(function () {

    // constants
    var $ = function $(id) {
        return document.getElementById(id);
    },
        React = require('react'),
        ReactDOM = require('react-dom'),
        fetch = require('./lib/xhr'),
        router = require('./lib/router'),

    // compnents
    Navigation = require('./components/navigation.jsx'),
        Footer = require('./components/footer.jsx');

    var routing = undefined;

    // ref in global scope
    window.React = React;

    // fetch all dependencies
    fetch.get(['/content/projects.json', '/content/content.json']).then(function (config) {

        // append layout components
        Navigation.render(config, $('nav'));
        Footer.render($('footer'));

        // start router
        routing = router(config).start();

        // set default hash to trigger on the router
        location.hash = location.hash || '#/projects';
    });
})();