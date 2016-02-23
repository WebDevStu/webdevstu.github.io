/**
  * @jsx React.DOM
  */

var Layout = React.createClass({
  render: function () {
      return (
          <div className="layout">
              yolo fish
          </div>
      );
  }
});


console.log('yolo');

module.exports = {
    render: function () {
        ReactDOM.render(
          <Layout />,
          document.getElementById('content')
        );
    }
};