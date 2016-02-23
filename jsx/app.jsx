
;(() => {

    const React = require('react');
    // Here we put our React instance to the global scope. Make sure you do not put it
    // into production and make sure that you close and open your console if the
    // DEV-TOOLS does not display
    window.React = React;

    const fetch = require('./lib/xhr');

    // let layout = require('./components/layout.jsx');

    // fetch all dependencies
    fetch.get(['/content/projects.json', '/content/content.json']).then((config) => {

        console.log(config);
    });

    console.log('rofl');
}) ();
