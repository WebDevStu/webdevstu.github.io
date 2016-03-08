/** @jsx React.DOM */
var React       = require('react'),
    ReactDOM    = require('react-dom'),
    Navigation  = React.createClass({
        render: function () {
            return (
                <nav>
                    {
                        this.props.content.map(function (item) {
                            return <a href={item.href} data-icon={item.icon} key={item.id}>{item.nav}</a>;
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