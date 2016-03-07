const body = document.getElementById('body'),
    Projects = require('../components/projects.jsx');

module.exports = function (state) {

    // privates
    const _routes = [{
            path: '/(\/)?about\-me',
            method: () => {
                console.log('about me');
            }
        }, {
            path: '/(\/)?projects',
            method: () => {
                Projects.render(state, body);
            }
        }],


        _onHashChange = () => {

            var hash = location.hash;

            _routes.forEach((route) => {

                let regExp = new RegExp(route.path);

                if (regExp.exec(hash)) {
                    route.method();
                }
            });

        };

    // public methods
    return {

        start: () => {
            // register listener
            window.addEventListener('popstate', _onHashChange, false);

            _onHashChange();
        }
    };
};