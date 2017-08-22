import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class NewTodo extends React.Component{
    render() {
        if (!this.props.appState.isAdding){
            return <button onClick={this.props.handleAddClick}>Add</button>
        } else {
            return (
                <form onSubmit={ () => this.props.handleSubmit(event, this.refs) }>
                    <input type="text" name="Title" ref="titleInput" />
                    <input type="text" name="Text" ref="textInput" />
                    <input type="date" name="Deadline" ref="deadlineInput" />
                    <select name="Priority" ref="priorityInput">
                        <option value="1">一般</option>
                        <option value="2">重要</option>
                        <option value="3">紧急</option>
                    </select>
                    <input type="submit" value="Submit" />
                    <button onClick={() => {this.props.appState.isAdding=false}}>Cancel</button>
                </form>
            );
        }
    }
}