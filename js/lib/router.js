'use strict';

var body = document.getElementById('mainBody'),
    Projects = require('../components/projects.jsx'),
    AboutMe = require('../components/about.jsx');

module.exports = function (state) {

    // privates
    var _routes = [{
        path: '/(\/)?about\-me',
        method: function method() {
            AboutMe.render(state, body);
        }
    }, {
        path: '/(\/)?projects',
        method: function method() {
            Projects.render(state, body);
        }
    }],
        _onHashChange = function _onHashChange() {

        var hash = location.hash;

        _routes.forEach(function (route) {

            var regExp = new RegExp(route.path);

            if (regExp.exec(hash)) {
                route.method();
            }
        });
    };

    // public methods
    return {

        start: function start() {
            // register listener
            window.addEventListener('popstate', _onHashChange, false);

            _onHashChange();
        }
    };
};