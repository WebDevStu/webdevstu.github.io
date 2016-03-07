/** @jsx React.DOM */
var React = require('react'),
    ReactDOM = require('react-dom'),


    AboutMe = React.createClass({

        render: function () {

            return (
                <div>
                    About me yo
                </div>
            );
        }
    });

module.exports = {
    render: function (props, el) {
        return ReactDOM.render(<AboutMe />, el);
    }
};