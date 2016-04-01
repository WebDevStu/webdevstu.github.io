/** @jsx React.DOM */
var React       = require('react'),
    ReactDOM    = require('react-dom'),
    parser      = require('../lib/parser'),

    /**
     * article iterator
     *
     * @method  Article
     */
    Article = React.createClass({

        render: function () {

            return (
                <div>
                    <h2 className="title">{this.props.title}</h2>
                    {
                        this.props.content.map(function (para, index) {
                            return <p key={index} dangerouslySetInnerHTML={{__html: parser.parse(para)}}></p>;
                        })
                    }
                </div>
            );
        }
    });

// export
module.exports = {
    
    render: function (props, el, key) {

        var item = props.blog.find(function (article) {
            return article.id === key;
        });

        return ReactDOM.render(<Article {...item} />, el);
    }
};