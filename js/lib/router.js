'use strict';

var $ = function $(id) {
    return document.getElementById(id);
},

// compnents
Navigation = require('../components/navigation.jsx'),
    Footer = require('../components/footer.jsx'),
    Projects = require('../components/projects.jsx'),
    AboutMe = require('../components/about.jsx'),
    Blog = require('../components/blog.jsx'),
    Article = require('../components/article.jsx');

module.exports = function (state) {

    // privates
    var _routes = [{
        // about me
        path: '/(\/)?about\-me(/)?',
        handler: function handler() {
            AboutMe.render(state, $('mainBody'));
        }
    }, {
        // all projects listed
        path: '/(\/)?projects(/)?',
        handler: function handler(match) {
            Projects.render(state, $('mainBody'));
        }
    }, {
        path: '/blog/(.*)?',
        handler: function handler(match) {
            Article.render(state, $('mainBody'), match[1]);
        }
    }, {
        // blog
        path: '/(\/)?blog',
        handler: function handler() {
            Blog.render(state, $('mainBody'));
        }
    }],
        _defaultRoute = function _defaultRoute() {
        location.hash = '#/projects';
    },


    /**
     * event callback for when popstate event if fired, finds the first
     * match and allows handler to run
     *
     * @method _onHashChange
     */
    _onHashChange = function _onHashChange() {

        var route = _routes.find(function (route) {

            var regExp = new RegExp(route.path),
                match = regExp.exec(location.hash);

            if (match) {
                try {
                    _updateSelected(route.handler(match));
                } catch (e) {
                    _defaultRoute();
                }
                return true;
            }
        });

        // catch all for none routes
        if (!route) {
            _defaultRoute();
        }
    },


    /**
     * updates the selected navigation item
     *
     * @method _updateSelected
     * @param  {String} id [string id of the content item]
     */
    _updateSelected = function _updateSelected(id) {

        var last = state.content.find(function (item) {
            return item.selected;
        }),
            item = state.content.find(function (item) {
            return item.id === id;
        });

        if (last) {
            last.selected = !last;
        }

        if (item) {
            item.selected = !!item;
        }

        Navigation.render(state, $('nav'));
    };

    // public methods
    return {

        /**
         * starts the router - applies the layout files
         *
         * @method  start
         */

        start: function start() {

            // layouts deps
            Navigation.render(state, $('nav'));
            Footer.render($('footer'));

            // register listener
            window.addEventListener('popstate', _onHashChange, false);

            // call first route
            _onHashChange();
        },


        /**
         * expose internal method for setting default route
         *
         * @TODO extend this idea as we'll need 404 for incorrect typed hashes
         *
         * @method defaultRoute
         */
        defaultRoute: _defaultRoute
    };
};