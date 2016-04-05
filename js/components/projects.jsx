/** @jsx React.DOM */
var React       = require('react'),
    ReactDOM    = require('react-dom'),
    parser      = require('../lib/parser'),

    /**
     * introduction to the projects
     *
     * @method  ProjectIntroduction
     */
    ProjectIntroduction = React.createClass({

        render: function () {

            var introduction = this.props.content.find(function (content) {
                return content.id === 'projects';
            });

            return (
                <div>
                    <h2 className="title">Projects</h2>
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
     * project iterator
     *
     * @method  Project
     */
    Project = React.createClass({

        render: function () {

            var project = this.props.project;

            return (
                <li className="project" data-icon="&#xf02c;">
                    <h5 className="title">{project.title}</h5>

                    {
                        this.props.project.content.map(function (content, index) {
                            return <p key={index} dangerouslySetInnerHTML={{__html: parser.parse(content)}}></p>;
                        })
                    }

                    <ul className="links">
                        <li><a href={"https://github.com/WebDevStu/" + project.id} data-icon="&#xf09b;">GitHub</a></li>
                        {
                            (project.demo) ? <li><a href={"/demo/" + project.id + project.demo} data-icon="&#xf0c1;">Demo</a></li> : ''
                        }
                    </ul>
                </li>
            );
        }
    }),

    /**
     * main project wrapper
     *
     * @method  Projects
     */
    Projects = React.createClass({

        render: function () {

            return (
                <div>
                    <ProjectIntroduction content={this.props.content} />
                    <ul className="projects">
                        {
                            this.props.projects.map(function (project) {
                                return <Project project={project} key={project.id} />;
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
        return ReactDOM.render(<Projects {...props} />, el);
    }
};