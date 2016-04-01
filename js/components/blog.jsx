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

            var article = this.props.article;

            return (
                <li className="project" data-icon="&#xe600;">
                    <a href={"/#/blog/" + article.id}>
                        <h5 className="title">{article.title}</h5>
                        <p>{article.description}</p>
                    </a>
                </li>
            );
        }
    }),


    /**
     * main blog wrapper
     *
     * @method  Articles
     */
    Articles = React.createClass({

        render: function () {

            return (
                <div>
                    <ul className="projects">
                        {
                            this.props.blog.map(function (article) {
                                return <Article article={article} key={article.id} />;
                            })
                        }
                    </ul>
                </div>
            );
        }
    });

// export
module.exports = {
    render: function (props, el) {
        return ReactDOM.render(<Articles {...props} />, el);
    }
};