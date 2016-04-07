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
    const
        _$mainBody = $('mainBody'),
        _routes = [{
            // about me
            path: /^\!\/about\-me(\/)?/gi,
            handler () {
                AboutMe.render(state, _$mainBody);
                return 'about-me';
            }
        }, {
            // all projects listed
            path: /^\!\/projects(\/)?/gi,
            handler (match) {
                Projects.render(state, _$mainBody);
                return 'projects';
            }
        }, {
            // all blog articles
            path: /^\!\/blog\/(.*)?/gi,
            handler (match) {
                Article.render(state, _$mainBody, match[1]);
                return 'blog';
            }
        }, {
            // blog default route
            path: /^\!\/blog/gi,
            handler () {
                Blog.render(state, _$mainBody);
                return 'blog';
            }
        }],


        /**
         * the default fall back route
         *
         * @method _defaultRoute
         */
        _defaultRoute = () => {
            location.hash = '#!/projects';
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
                    match = regExp.exec(location.hash.slice(1));

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

            Navigation.render(state);
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