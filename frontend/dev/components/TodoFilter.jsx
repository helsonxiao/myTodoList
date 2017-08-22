import React from 'react';

export default class TodoFilter extends React.Component{
    render() {
        return(
            <ul className="nav nav-tabs">
                <li role="presentation" onClick={this.props.onAllClick}><a href="#">All</a></li>
                <li role="presentation" onClick={this.props.onTodoClick}><a href="#">Todo</a></li>
                <li role="presentation" onClick={this.props.onCompletedClick}><a href="#">Completed</a></li>
            </ul>
        );
    }
}