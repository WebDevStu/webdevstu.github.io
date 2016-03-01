'use strict';

;(function () {

    // constants
    var React = require('react');
    var ReactDOM = require('react-dom');
    var fetch = require('./lib/xhr');
    // ref in global scope
    window.React = React;
    // compnents
    var Layout = require('./components/layout.jsx'),
        Navigation = require('./components/navigation.jsx');

    // fetch all dependencies
    fetch.get(['/content/projects.json', '/content/content.json']).then(function (config) {

        console.log(config);

        Layout.render(document.getElementById('content'));
        Navigation.render(config, document.getElementById('content'));
    });
})();