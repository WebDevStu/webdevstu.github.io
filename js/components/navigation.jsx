/** @jsx React.DOM */
var React       = require('react'),
    ReactDOM    = require('react-dom'),

    navigationEl = null,

    Navigation  = React.createClass({

        render: function () {
            return (
                <nav>
                    {
                        this.props.content.map(function (item) {
                            return <a className={(item.selected) ? 'selected' : ''} href={item.href} data-icon={item.icon} key={item.id}>{item.nav}</a>;
                        })
                    }
                </nav>
            );
        }
    });

module.exports = {

    render: function (props, el) {

        el = el || navigationEl;
        navigationEl = el;
        
        return ReactDOM.render(<Navigation {...props} />, el);
    }
};