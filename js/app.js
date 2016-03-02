'use strict';

;(function () {

    // constants
    var $ = function $(id) {
        return document.getElementById(id);
    },
        React = require('react'),
        ReactDOM = require('react-dom'),
        fetch = require('./lib/xhr'),

    // compnents
    Navigation = require('./components/navigation.jsx'),
        Footer = require('./components/footer.jsx');

    // ref in global scope
    window.React = React;

    // fetch all dependencies
    fetch.get(['/content/projects.json', '/content/content.json']).then(function (config) {

        Navigation.render(config, $('nav'));
        Footer.render($('footer'));

        // TODO: make route handler
    });
})();