/** @jsx React.DOM */
var React = require('react'),
    ReactDOM = require('react-dom'),
    Footer = React.createClass({

        render: function () {

            var year = new Date().getFullYear();
            
            return (
                &copy; Stewart Anderson {year}
            );
        }
    });

module.exports = {
    render: function (el) {
        return ReactDOM.render(<Footer />, el);
    }
};