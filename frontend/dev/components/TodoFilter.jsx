import React from 'react';

export default class TodoFilter extends React.Component{
    render() {
        return(
            <ul className="nav nav-tabs">
                <li role="presentation" onClick={this.props.handleAll}><a href="#">All</a></li>
                <li role="presentation" onClick={this.props.handleTodo}><a href="#">Todo</a></li>
                <li role="presentation" onClick={this.props.handleCompleted}><a href="#">Completed</a></li>
            </ul>
        );
    }
}