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
        handler: function handler(hash, match) {

            AboutMe.render(state, $('mainBody'));

            return 'aboutme';
        }
    }, {
        // all projects listed
        path: '/(\/)?projects(/)?',
        handler: function handler(hash, match) {

            Projects.render(state, $('mainBody'));

            return 'projects';
        }
    }, {
        path: '/blog/(.*)?',
        handler: function handler(hash, match) {

            Article.render(state, $('mainBody'), match[1]);

            return 'blog';
        }
    }, {
        // blog
        path: '/(\/)?blog',
        handler: function handler(hash, match) {

            console.log(match);

            Blog.render(state, $('mainBody'));

            return 'blog';
        }
    }],


    /**
     * event callback for when popstate event if fired
     *
     * @method _onHashChange
     */
    _onHashChange = function _onHashChange() {

        var hash = location.hash;

        _routes.find(function (route) {

            var regExp = new RegExp(route.path),
                match = regExp.exec(hash);

            if (match) {
                // TODO: passing the hash? code smell, extract the params
                // and pass to method
                _updateSelected(route.handler(hash, match));

                return true;
            }
        });
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
        }
    };
};