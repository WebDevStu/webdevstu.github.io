'use strict';

var body = document.getElementById('body'),
    Projects = require('../components/projects.jsx');

module.exports = function (state) {

    // privates
    var _routes = [{
        path: '/(\/)?about\-me',
        method: function method() {
            console.log('about me');
        }
    }, {
        path: '/(\/)?projects',
        method: function method() {
            console.log('projects');
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