import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class Todo extends React.Component{
    render() {
        var currentTodo = this.props.appState.currentTodo;
        if (!this.props.appState.isEditing) {
            return (
                <div>
                    <h4>标题：{currentTodo.title}</h4>
                    <p>内容：{currentTodo.text}</p>
                    <p>优先级：{currentTodo.priority}</p>
                    <p>截止日期：{currentTodo.deadline}</p>
                    <button
                        onClick={this.props.toggleDone}>
                        {this.props.markAction}</button>
                    <button onClick={() => {this.props.appState.isEditing=true}}>Edit</button>
                    <button onClick={this.props.delete}>Delete</button>
                </div>
            );
        } else {
            return (
                <form onSubmit={() => this.props.handleEditSubmit(event, this.refs)}>
                    <label>标题：</label>
                    <input type="text" defaultValue={currentTodo.title} ref="titleInput" /><br />
                    <label>内容：</label>
                    <input type="text" defaultValue={currentTodo.text} ref="textInput" /><br />
                    <label>截止日期：</label>
                    <input type="date" defaultValue={currentTodo.deadline} ref="deadlineInput" /><br />
                    <label>优先级：</label>
                    <select ref="priorityInput">
                        <option value="1">低</option>
                        <option value="2">中</option>
                        <option value="3">高</option>
                    </select><br />
                    <input type="submit" value="Submit" />
                    <button onClick={() => {this.props.appState.isEditing=false}}>Cancel</button>
                </form>
            );
        }
    }
}