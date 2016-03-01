/** @jsx React.DOM */
var React = require('react'),
    ReactDOM = require('react-dom'),
    Layout = React.createClass({
        render: function () {
            return (
                <div className="layout">
                    lol
                </div>
            );
        }
    });

module.exports = {
    render: function (el) {
        return ReactDOM.render(<Layout />, el);
    }
};