/** @jsx React.DOM */
var React = require('react'),
    ReactDOM = require('react-dom'),
    Navigation = React.createClass({
        render: function () {

            var content = [];

            return (
                <nav>
                    {
                        this.props.map(function () {
                            return <a href={href} data-icon={icon}>{nav}</a>;
                        })
                    }
                </nav>
            );
        }
    });

module.exports = {
    render: function (props, el) {
        return ReactDOM.render(<Navigation {...props} />, el);
    }
};