import React from 'react';
import NewTodo from '../components/NewTodo';
import { observer } from 'mobx-react';

@observer
export default class NewTodoContainer extends React.Component{
    constructor(props){
        super(props);
        this.add = this.add.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
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
                this.props.appState.isOpening = true;
                this.props.showResidue(newTodo.done);
            }.bind(this),
            error: function() {
                console.log('add err!')
            }.bind(this)
        });
    }

    handleAddClick() {
        this.props.appState.isAdding = true;
        this.props.appState.isOpening = false;
    }

    handleSubmit(event, refs) {
        event.preventDefault();
        if (refs.deadlineInput.value === "") {
            var deadline = null;
        } else {
            var deadline = refs.deadlineInput.value;
        }
        var priority = refs.priorityInput.value;
        var newTodo = {
            "title": refs.titleInput.value,
            "priority": priority,
            "done": false,
            "text": refs.textInput.value,
            "deadline": deadline
        };
        this.add(newTodo);
        this.props.appState.isAdding = false;
    }

    render() {
        return (
            <NewTodo
                appState={this.props.appState}
                handleAddClick={this.handleAddClick}
                handleSubmit={this.handleSubmit}/>
        );
    }
}