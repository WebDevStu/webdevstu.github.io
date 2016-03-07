
;(() => {

    // constants
    const $ = function (id) {
            return document.getElementById(id);
        },
        React       = require('react'),
        ReactDOM    = require('react-dom'),
        fetch       = require('./lib/xhr'),
        Router      = require('./lib/router'),
        // compnents
        Navigation  = require('./components/navigation.jsx'),
        Footer      = require('./components/footer.jsx');

    let router;

    // ref in global scope
    window.React = React;

    // fetch all dependencies
    fetch.get(['/content/projects.json', '/content/content.json']).then((config) => {

        // append layout components
        Navigation.render(config, $('nav'));
        Footer.render($('footer'));

        // start router
        router = Router(config);
        router.start();

        // set default hash to trigger on the router
        location.hash = location.hash || '#/projects';
    });
}) ();