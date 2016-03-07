/** @jsx React.DOM */
var React = require('react'),
    ReactDOM = require('react-dom'),

    /**
     * project iterator
     *
     * @method  createClass
     */
    Project = React.createClass({

        render: function () {
            return (
                <li className="project" data-icon="&#xf02c;">
                    <h5 className="title">{this.props.project.title}</h5>

                    {
                        this.props.project.content.map(function (content, index) {
                            return <p key={index}>{content}</p>;
                        })
                    }

                    <ul className="links">
                        <li><a href="https://github.com/WebDevStu/{project.id}" data-icon="&#xf09b;">GitHub</a></li>
                        <li><a href="/demo/{project.id}{project.demo}" data-icon="&#xf0c1;">Demo</a></li>
                    </ul>
                </li>
            );
        }
    }),

    /**
     * main project wrapper
     *
     * @method  createClass
     */
    Projects = React.createClass({

        render: function () {
            return (
                <ul className="projects">
                    {
                        this.props.projects.map(function (project) {
                            return <Project project={project} key={project.id} />;
                        })
                    }
                </ul>
            );
        }
    });

// export
module.exports = {
    render: function (props, el) {
        return ReactDOM.render(<Projects {...props} />, el);
    }
};