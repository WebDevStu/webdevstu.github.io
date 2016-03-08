const
    $ = function (id) {
        return document.getElementById(id);
    },
    // compnents
    Navigation  = require('../components/navigation.jsx'),
    Footer      = require('../components/footer.jsx'),
    Projects    = require('../components/projects.jsx'),
    AboutMe     = require('../components/about.jsx');

module.exports = function (state) {

    // privates
    const _routes = [{
            path: '/(\/)?about\-me',
            method () {

                AboutMe.render(state, $('mainBody'));

                return 'aboutme';
            }
        }, {
            path: '/(\/)?projects',
            method () {

                Projects.render(state, $('mainBody'));

                return 'projects';
            }
        }],


        /**
         * event callback for when popstate event if fired
         *
         * @method _onHashChange
         */
        _onHashChange = () => {

            var hash = location.hash;

            _routes.forEach((route) => {

                let regExp = new RegExp(route.path);

                if (regExp.exec(hash)) {
                    _updateSelected(route.method());
                }
            });
        },


        /**
         * updates the selected navigation item
         *
         * @method _updateSelected
         * @param  {String} id [string id of the content item]
         */
        _updateSelected = (id) => {

            var last = state.content.find((item) => item.selected),
                item = state.content.find((item) => item.id === id);

            if (last) {
                last.selected = false;
            }

            if (item) {
                item.selected = true;
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
        }
    };
};