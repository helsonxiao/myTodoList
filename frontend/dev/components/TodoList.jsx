import React from 'react';
import Todo from './Todo';

export default class TodoList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showDetail: false,
            todoId: '',
            todo: ''
        }
    }
    
    getTodos() {
        var todos = this.props.todos;
        var titles = todos.map( (todo) => {
           return <li 
                    key={todo.id}
                    onClick={ () => this.handleClick(todo)} >
                    {todo.title}</li>
        });
        return titles;
    }
    
    render() {
        var todos = this.props.todos;
        var titles = todos.map( (todo) => {
           return (
               <li
                key={todo.id}
                onClick={ () => {
                       this.setState({
                           showDetail: !this.state.showDetail,
                           todoId: todo.id
                       });
                }}>
                {todo.title}</li>
            )
        });
        
        if (this.state.showDetail) {
            var todo = todos.find(t => t.id == this.state.todoId);
            
            console.log(todo);
            
            return (
                <div>
                    <ul>{titles}</ul>
                    <Todo todo={todo} edit={this.props.edit} />
                </div>
            );
        } else {
            return (
                <div>
                    <ul>{titles}</ul>
                </div>
            );
        }
    }
}