import React from 'react';

export default class TodoFilter extends React.Component{
    render() {
        return(
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a className="navbar-brand" href="#">TodoList</a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li><a href="#" onClick={this.props.onAllClick}>All</a></li>
                    <li><a href="#" onClick={this.props.onTodoClick}>Todo</a></li>
                    <li><a href="#" onClick={this.props.onCompletedClick}>Completed</a></li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                    <li><a href="https://github.com/helsonxiao/myTodoList" target="_blank">GitHub</a></li>
                  </ul>
                </div>
              </div>
            </nav>
        );
    }
}