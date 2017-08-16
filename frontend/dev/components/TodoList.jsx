import React from 'react';

export default class TodoList extends React.Component{
    getTodos() {
        var todos = this.props.todos;
        var titles = todos.map( (todo) => {
           return <li key={todo.id}>{todo.title}</li>
        });
        return titles;
    }
    
    render() {
        
        return (
            <ul>{this.getTodos()}</ul>
        );
    }
}