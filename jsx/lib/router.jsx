const
    $ = function (id) {
        return document.getElementById(id);
    },
    // compnents
    Navigation  = require('../components/navigation.jsx'),
    Footer      = require('../components/footer.jsx'),
    Projects    = require('../components/projects.jsx'),
    AboutMe     = require('../components/about.jsx'),
    Blog        = require('../components/blog.jsx'),
    Article     = require('../components/article.jsx');

module.exports = function (state) {

    // privates
    const _routes = [{
            // about me
            path: '/(\/)?about\-me(/)?',
            handler () {
                AboutMe.render(state, $('mainBody'));
            }
        }, {
            // all projects listed
            path: '/(\/)?projects(/)?',
            handler (match) {
                Projects.render(state, $('mainBody'));
            }
        }, {
            // all blog articles
            path: '/blog/(.*)?',
            handler (match) {
                Article.render(state, $('mainBody'), match[1]);
            }
        }, {
            // blog default route
            path: '/(\/)?blog',
            handler () {
                Blog.render(state, $('mainBody'));
            }
        }],


        /**
         * the default fall back route
         *
         * @method _defaultRoute
         */
        _defaultRoute = () => {
            location.hash = '#/projects';
        },


        /**
         * event callback for when popstate event if fired, finds the first
         * match and allows handler to run
         *
         * @method _onHashChange
         */
        _onHashChange = () => {

            let route = _routes.find((route) => {

                let regExp = new RegExp(route.path),
                    match = regExp.exec(location.hash);

                if (match) {
                    try{
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
        _updateSelected = (id) => {

            let last = state.content.find((item) => item.selected),
                item = state.content.find((item) => item.id === id);

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
        start () {

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