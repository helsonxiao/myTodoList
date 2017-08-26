import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class NewTodo extends React.Component{
    render() {
        return (
            <form className='new-todo'
                onSubmit={() => this.props.handleAddSubmit(event, this.refs)}>
                <label>内容：</label>
                <input type="text" name="Content" ref="contentInput" /><br />
                <label>截止日期：</label>
                <input type="date" name="Deadline" ref="deadlineInput" /><br />
                <label>优先级：</label>
                <select name="Priority" ref="priorityInput">
                    <option value="1">低</option>
                    <option value="2">中</option>
                    <option value="3">高</option>
                </select><br />
                <input type="submit" value="Submit" />
                <button onClick={() => {this.props.appState.isAdding=false}}>Cancel</button>
            </form>
        );
    }
}