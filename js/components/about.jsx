/** @jsx React.DOM */
var React       = require('react'),
    ReactDOM    = require('react-dom'),
    parser      = require('../lib/parser'),
    AboutMe     = React.createClass({

        render: function () {

            var about = this.props.content.find(function (content) {
                return content.id === 'aboutme';
            });

            console.log(about);

            return (
                <div>
                    <h2 className="title">{about.title}</h2>
                    {
                        about.content.map(function (para, index) {
                            return <p key={index}>{parser.parse(para)}</p>;
                        })
                    }
                </div>
            );
        }
    });

module.exports = {
    render: function (props, el) {
        return ReactDOM.render(<AboutMe {...props} />, el);
    }
};