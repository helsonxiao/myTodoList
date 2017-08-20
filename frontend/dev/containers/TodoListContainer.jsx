import React from 'react';
import TodoList from '../components/TodoList';

export default class TodoListContainer extends React.Component{
    render() {
        var titles = this.props.residue.map( (todo) => {
           return (
               <li
                key={todo.id}
                onClick={ () => this.props.showDetail(todo) }>
                {todo.title}</li>
            )
        });
        return <TodoList titles={titles}/>
    }
}