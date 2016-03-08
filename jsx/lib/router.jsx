const body      = document.getElementById('mainBody'),
    Projects    = require('../components/projects.jsx'),
    AboutMe     = require('../components/about.jsx');

module.exports = function (state) {

    // privates
    const _routes = [{
            path: '/(\/)?about\-me',
            method () {

                AboutMe.render(state, body);

                return 'aboutme';
            }
        }, {
            path: '/(\/)?projects',
            method () {

                Projects.render(state, body);

                return 'projects';
            }
        }],


        _onHashChange = () => {

            var hash = location.hash;

            _routes.forEach((route) => {

                let regExp = new RegExp(route.path);

                if (regExp.exec(hash)) {
                    _updateSelected(route.method());
                }
            });
        },

        _updateSelected = (id) => {

            var item = state.content.find((item) => item.id === id);

            if (item) {
                item.selected = true;
            }
        };



    // public methods
    return {

        start () {
            // register listener
            window.addEventListener('popstate', _onHashChange, false);

            _onHashChange();
        }
    };
};