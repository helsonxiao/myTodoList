import React from 'react';
import Todo from '../components/Todo';

export default class TodoContainer extends React.Component{
    constructor(props) {
        super(props);
        this.toggleDone = this.toggleDone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event, currentTodo, refs) {
        event.preventDefault();
        if (refs.deadlineInput.value === "") {
            var deadline = null;
        } else {
            var deadline = refs.deadlineInput.value;
        }
        var priority = refs.priorityInput.value;
        currentTodo.title = refs.titleInput.value;
        currentTodo.priority = priority;
        currentTodo.text = refs.textInput.value;
        currentTodo.deadline = deadline;
        this.props.edit(currentTodo);
        this.props.toggleEdit();
    }

    toggleDone(currentTodo) {
        currentTodo.done = !currentTodo.done;
        this.props.edit(currentTodo);
    }

    render() {
        if (this.props.isOpening) {
            if (this.props.currentTodo.done) {
                var markAction = 'Mark as not done';
            } else {
                var markAction = 'Mark as done';
            }
            return (
                <Todo
                    markAction={markAction}
                    currentTodo={this.props.currentTodo}
                    isEditing={this.props.isEditing}
                    toggleEdit={this.props.toggleEdit}
                    delete={this.props.delete}
                    toggleDone={this.toggleDone}
                    handleSubmit={this.handleSubmit}/>
            );
        }
        return null;
    }
}