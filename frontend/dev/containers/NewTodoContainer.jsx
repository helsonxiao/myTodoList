import React from 'react';
import NewTodo from '../components/NewTodo';

export default class NewTodoContainer extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd() {
        this.props.toggleAdd();
        this.props.hideDetail();
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
        this.props.add(newTodo);
        this.props.toggleAdd();
    }

    render() {
        return (
            <NewTodo
                isAdding={this.props.isAdding}
                handleAdd={this.handleAdd}
                handleSubmit={this.handleSubmit}
                toggleAdd={this.props.toggleAdd}/>
        );
    }
}