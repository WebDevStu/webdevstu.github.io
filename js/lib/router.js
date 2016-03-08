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

            return 'aboutme';
        }
    }, {
        path: '/(\/)?projects',
        method: function method() {

            Projects.render(state, body);

            return 'projects';
        }
    }],
        _onHashChange = function _onHashChange() {

        var hash = location.hash;

        _routes.forEach(function (route) {

            var regExp = new RegExp(route.path);

            if (regExp.exec(hash)) {
                _updateSelected(route.method());
            }
        });
    },
        _updateSelected = function _updateSelected(id) {

        var item = state.content.find(function (item) {
            return item.id === id;
        });

        if (item) {
            item.selected = true;
        }
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