import React from 'react';

export default class TodoFilter extends React.Component{
    render() {
        return(
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="#">TodoList</a>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li><a href="#" onClick={this.props.onAllClick}>All</a></li>
                    <li><a href="#" onClick={this.props.onTodoClick}>Todo</a></li>
                    <li><a href="#" onClick={this.props.onCompletedClick}>Completed</a></li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                    <li><a href="#">GitHub</a></li>
                  </ul>
                </div>
              </div>
            </nav>
        );
    }
}