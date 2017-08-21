import React from 'react';

export default class Todo extends React.Component{
    constructor(props) {
        super(props)
    };

    render() {
        if (!this.props.isEditing) {
            return (
                <div>
                    <h4>{this.props.currentTodo.title}</h4>
                    <p>{this.props.currentTodo.text}</p>
                    <p>{this.props.currentTodo.deadline}</p>
                    <button
                        onClick={this.props.toggleDone}>
                        {this.props.markAction}</button>
                    <button onClick={this.props.toggleEdit}>Edit</button>
                    <button onClick={this.props.delete}>Delete</button>
                </div>
            );
        } else {
            return (
                <form onSubmit={ () => this.props.handleSubmit(event, this.refs) }>
                    <label>标题：<input type="text" defaultValue={this.props.currentTodo.title} ref="titleInput" /></label>
                    <label>内容：<input type="text" defaultValue={this.props.currentTodo.text} ref="textInput" /></label>
                    <label>截止日期：<input type="date" defaultValue={this.props.currentTodo.deadline} ref="deadlineInput" /></label>
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