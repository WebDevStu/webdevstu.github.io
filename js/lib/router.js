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
    var _$mainBody = $('mainBody'),
        _routes = [{
        // about me
        path: /^\!\/about\-me(\/)?/gi,
        handler: function handler() {
            AboutMe.render(state, _$mainBody);
            return 'aboutme';
        }
    }, {
        // all projects listed
        path: /^\!\/projects(\/)?/gi,
        handler: function handler(match) {
            Projects.render(state, _$mainBody);
            return 'projects';
        }
    }, {
        // all blog articles
        path: /^\!\/blog\/(.*)?/gi,
        handler: function handler(match) {
            Article.render(state, _$mainBody, match[1]);
            return 'blog';
        }
    }, {
        // blog default route
        path: /^\!\/blog/gi,
        handler: function handler() {
            Blog.render(state, _$mainBody);
            return 'blog';
        }
    }],


    /**
     * the default fall back route
     *
     * @method _defaultRoute
     */
    _defaultRoute = function _defaultRoute() {
        location.hash = '#!/projects';
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
                match = regExp.exec(location.hash.slice(1));

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

        Navigation.render(state);
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