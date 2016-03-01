
;(() => {

    // constants
    const React     = require('react');
    const ReactDOM  = require('react-dom');
    const fetch     = require('./lib/xhr');
    // ref in global scope
    window.React    = React;
    // compnents
    let Layout      = require('./components/layout.jsx'),
        Navigation  = require('./components/navigation.jsx');

    // fetch all dependencies
    fetch.get(['/content/projects.json', '/content/content.json']).then((config) => {

        console.log(config);

        Layout.render(document.getElementById('content'));
        Navigation.render(config, document.getElementById('content'));
    });
}) ();