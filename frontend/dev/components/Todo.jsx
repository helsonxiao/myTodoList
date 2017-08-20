import React from 'react';

export default class Todo extends React.Component{
    constructor(props) {
        super(props);
        this.toggleDone = this.toggleDone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event, todo) {
        event.preventDefault();
        if (this.refs.deadlineInput.value === "") {
            var deadline = null;
        } else {
            var deadline = this.refs.deadlineInput.value;
        }
        var priority = this.refs.priorityInput.value;
        todo.title = this.refs.titleInput.value;
        todo.priority = priority;
        todo.text = this.refs.textInput.value;
        todo.deadline = deadline;
        this.props.edit(todo);
        this.props.toggleEdit();
    }

    toggleDone(todo) {
        todo.done = !todo.done;
        this.props.edit(todo);
    }
    
    render() {
        var todo = this.props.todo;
        if (todo.done) {
            var toggle = 'Mark as not done';
        } else {
            var toggle = 'Mark as done';
        }
        if (!this.props.isEditing) {
            return (
                <div>
                    <h3>{todo.title}</h3>
                    <p>{todo.text}</p>
                    <p>{todo.deadline}</p>
                    <button
                        onClick={ () => this.toggleDone(todo) }>
                        {toggle}</button>
                    <button onClick={this.props.toggleEdit}>Edit</button>
                    <button onClick={ () => this.props.delete(todo) }>Delete</button>
                </div>
            );
        } else {
            return (
                <form onSubmit={ () => this.handleSubmit(event, todo) }>
                    <label>标题：<input type="text" defaultValue={todo.title} ref="titleInput" /></label>
                    <label>内容：<input type="text" defaultValue={todo.text} ref="textInput" /></label>
                    <label>截止日期：<input type="date" defaultValue={todo.deadline} ref="deadlineInput" /></label>
                    <label>优先级：<select ref="priorityInput">
                        <option value="1">低</option>
                        <option value="2">中</option>
                        <option value="3">高</option>
                    </select></label>
                    <input type="submit" value="Submit" />
                    <button onClick={this.props.toggleEdit}>Cancel</button>
                </form>
            );
        }

    }
}