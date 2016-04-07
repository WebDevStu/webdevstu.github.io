/** @jsx React.DOM */
var React       = require('react'),
    ReactDOM    = require('react-dom'),
    parser      = require('../lib/parser'),

    /**
     * sort method for blog items
     *
     * @method  sort
     * @param   {Object} a [item in blog]
     * @param   {Object} b [item in blog]
     * @returns {Number}   [sorting instruction]
     */
    sort = function (a, b) {

        var dateA = +new Date(a.published),
            dateB = +new Date(b.published);

        if (dateA < dateB) {
            return 1;
        }

        return -1;
    },


    /**
     * Introduction view
     *
     * @method  BlogIntroduction
     */
    BlogIntroduction = React.createClass({

        render: function () {

            var introduction = this.props.content.find(function (content) {
                return content.id === 'blog';
            });

            return (
                <div>
                    <h2 className="title">Blog</h2>
                    {
                        introduction.content.map(function (para, index) {
                            return <p key={index} dangerouslySetInnerHTML={{__html: parser.parse(para)}}></p>;
                        })
                    }
                </div>
            );
        }
    }),


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
                    <a href={"/#!/blog/" + article.id}>
                        <h5 className="title">{article.title}</h5>
                        <p>{article.description}</p>

                        <ul className="links">
                            <li>{parser.date(article.published)}</li>
                        </ul>
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
                    <BlogIntroduction content={this.props.content} />
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

    /**
     * exposed render method
     *
     * @method  render
     * @param   {Object} props  [the props to apply to the views]
     * @param   {DOM.Object} el [the dom object to append them to]
     * @returns {ReactDOM}      [the render metho]
     */
    render: function (props, el) {

        props.blog.sort(sort);

        return ReactDOM.render(<Articles {...props} />, el);
    }
};