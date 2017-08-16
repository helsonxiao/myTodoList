import React from 'react';


export default class TodoFilter extends React.Component{
    constructor(props) {
        super(props);
        this.handleAll = this.handleAll.bind(this);
        this.handleTodo = this.handleTodo.bind(this);
    }
    
    handleAll(todos) {
        this.props.show(todos);
    }
    
    handleTodo(todos) {
        var residue = [];
        todos.map( (todo) => {
            if (todo.done === false){
                residue.push(todo);
            }
        });
        this.props.show(residue);
    }
    
    handleCompleted(todos) {
        var residue = [];
        todos.map( (todo) => {
            if (todo.done === true){
                residue.push(todo);
            }
        });
        this.props.show(residue);
    }
    
    render() {
        return(
            <ul className="nav nav-tabs">
                <li role="presentation" onClick={ () => this.handleAll(this.props.todos) }><a href="#">All</a></li>
                <li role="presentation" onClick={ () => this.handleTodo(this.props.todos) }><a href="#">Todo</a></li>
                <li role="presentation" onClick={ () => this.handleCompleted(this.props.todos) }><a href="#">Completed</a></li>
            </ul>
        );
    }
}