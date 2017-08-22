import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class Todo extends React.Component{
    render() {
        var currentTodo = this.props.appState.currentTodo;
        if (!this.props.appState.isEditing) {
            return (
                <div>
                    <h4>{currentTodo.title}</h4>
                    <p>{currentTodo.text}</p>
                    <p>{currentTodo.deadline}</p>
                    <button
                        onClick={this.props.toggleDone}>
                        {this.props.markAction}</button>
                    <button onClick={() => {this.props.appState.isEditing=true}}>Edit</button>
                    <button onClick={this.props.delete}>Delete</button>
                </div>
            );
        } else {
            return (
                <form onSubmit={() => this.props.handleSubmit(event, this.refs)}>
                    <label>标题：<input type="text" defaultValue={currentTodo.title} ref="titleInput" /></label>
                    <label>内容：<input type="text" defaultValue={currentTodo.text} ref="textInput" /></label>
                    <label>截止日期：<input type="date" defaultValue={currentTodo.deadline} ref="deadlineInput" /></label>
                    <label>优先级：<select ref="priorityInput">
                        <option value="1">低</option>
                        <option value="2">中</option>
                        <option value="3">高</option>
                    </select></label>
                    <input type="submit" value="Submit" />
                    <button
                        onClick={() => {this.props.appState.isEditing=false}}>
                        Cancel</button>
                </form>
            );
        }
    }
}