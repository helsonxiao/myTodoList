import React from 'react';
import Todo from '../components/Todo';
import { observer } from 'mobx-react';

@observer
export default class TodoContainer extends React.Component{
    constructor(props) {
        super(props);
        this.toggleDone = this.toggleDone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    handleSubmit(event, refs) {
        event.preventDefault();
        var currentTodo = this.props.appState.currentTodo;
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
        this.edit();
    }

    edit() {
        var currentTodo = this.props.appState.currentTodo;
        $.ajax({
            url: `http://127.0.0.1:8000/api/tasks/${currentTodo.id}`,
            type: 'put',
            dataType: 'json',
            data: currentTodo,
            success: function(data) {
                var currentTodoIndex = this.props.appState.todos.indexOf(data);
                this.props.appState.todos.splice(currentTodoIndex, 1, data);
                this.props.appState.isEditing = false;
                // arg should be like this because of async
                this.props.showResidue(currentTodo.done);
            }.bind(this)
        });
    }

    delete() {
        var currentTodo = this.props.appState.currentTodo;
        $.ajax({
            url: `http://127.0.0.1:8000/api/tasks/${currentTodo.id}`,
            type: 'delete',
            success: function() {
                var currentTodoIndex = this.props.appState.todos.indexOf(currentTodo);
                this.props.appState.todos.splice(currentTodoIndex, 1);
                this.props.appState.isOpening = false;
                this.props.showResidue('');
            }.bind(this)
        });
    }

    toggleDone() {
        this.props.appState.currentTodo.done = !this.props.appState.currentTodo.done;
        this.edit();
    }

    render() {
        if (this.props.appState.isOpening) {
            if (this.props.appState.currentTodo.done) {
                var markAction = 'Mark as not done';
            } else {
                var markAction = 'Mark as done';
            }
            return (
                <Todo
                    markAction={markAction}
                    appState={this.props.appState}
                    delete={this.delete}
                    toggleDone={this.toggleDone}
                    handleSubmit={this.handleSubmit}/>
            );
        }
        return null;
    }
}