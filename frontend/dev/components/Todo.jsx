import React from 'react';

export default class Todo extends React.Component{
    constructor(props) {
        super(props);
        this.toggleDone = this.toggleDone.bind(this);
    }
    
    toggleDone(todo) {
        todo.done = !todo.done;
        this.props.edit(todo, this.props.todos);
    }
    
    render() {
        var todo = this.props.todo;
        if (todo.done) {
            var toggle = 'Mark as not done';
        } else {
            var toggle = 'Mark as done';
        }
        
        return (
            <div>
                <h3>{todo.title}</h3>
                <p>{todo.text}</p>
                <p>{todo.deadline}</p>
                <button 
                    onClick={ () => this.toggleDone(todo) }>
                    {toggle}</button>
            </div>
        );
    }
}