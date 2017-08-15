import React from 'react';
import ReactDOM from 'react-dom';
import NewTodo from './NewTodo';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';

export default class TodoForm extends React.Component{
    
    render() {
        return(
            <div>
                <h1>TodoList</h1>
                <NewTodo />
                <TodoList />
                <TodoFilter />
            </div>
        );
    }
}