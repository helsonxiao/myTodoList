import React from 'react';
import Todo from '../components/Todo';
import NewTodo from '../components/NewTodo';
import { observer } from 'mobx-react';

@observer
export default class TodoContainer extends React.Component{
    constructor(props) {
        super(props);
        // newTodo
        this.add = this.add.bind(this);
        this.handleAddSubmit = this.handleAddSubmit.bind(this);
        // currentTodo
        this.toggleDone = this.toggleDone.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    add(newTodo) {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/tasks/',
            type: 'post',
            dataType: 'json',
            data: newTodo,
            success: function(data) {
                this.props.appState.todos.push(data);
                this.props.appState.currentTodo = data;
                this.props.showResidue(data.done);
            }.bind(this),
            error: function() {
                console.log('add err!')
            }.bind(this)
        });
    this.props.appState.isAdding = false;
    this.props.appState.isOpening = true;
    }

    handleAddSubmit(event, refs) {
        event.preventDefault();
        if (refs.contentInput.value) {
            if (refs.deadlineInput.value === "") {
                var deadline = null;
            } else {
                var deadline = refs.deadlineInput.value;
            }
            var priority = refs.priorityInput.value;
            var newTodo = {
                "content": refs.contentInput.value,
                "priority": priority,
                "done": false,
                "deadline": deadline
            };
            this.add(newTodo);
        } else {
            alert('invalid content!');
            return false;
        }
    }

/**************************************************************/

    edit() {
        var currentTodo = this.props.appState.currentTodo;
        var prevTodo = this.props.appState.todos.find(todo => todo.id === currentTodo.id);
        var prevTodoIndex = this.props.appState.todos.indexOf(prevTodo);
        this.props.appState.todos.splice(prevTodoIndex, 1, currentTodo);
        this.props.appState.isEditing = false;
        this.props.showResidue(currentTodo.done);
        $.ajax({
            url: `http://127.0.0.1:8000/api/tasks/${currentTodo.id}`,
            type: 'put',
            dataType: 'json',
            data: currentTodo,
        });
    }

    delete() {
        var msg = "Sure to delete?";
        if (confirm(msg) === true) {
            var currentTodo = this.props.appState.currentTodo;
            this.props.appState.todos = this.props.appState.todos.filter(todo => todo.id !== currentTodo.id);
            this.props.appState.isOpening = false;
            this.props.showResidue('');
            $.ajax({
                url: `http://127.0.0.1:8000/api/tasks/${currentTodo.id}`,
                type: 'delete',
            });
        }
    }

    toggleDone() {
        this.props.appState.currentTodo.done = !this.props.appState.currentTodo.done;
        this.edit();
    }

    handleEditSubmit(event, refs) {
        event.preventDefault();
        var currentTodo = this.props.appState.currentTodo;
        if (refs.deadlineInput.value === "") {
            var deadline = null;
        } else {
            var deadline = refs.deadlineInput.value;
        }
        var priority = refs.priorityInput.value;
        currentTodo.content = refs.contentInput.value;
        currentTodo.priority = priority;
        currentTodo.deadline = deadline;
        this.edit();
    }

    render() {
        if (this.props.appState.isAdding) {
            return (
                <NewTodo
                    appState={this.props.appState}
                    handleAddSubmit={this.handleAddSubmit}/>
            );
        } else if (this.props.appState.isOpening) {
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
                    handleEditSubmit={this.handleEditSubmit}/>
            );
        }
        return null;
    }
}