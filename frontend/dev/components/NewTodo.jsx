import React from 'react';


export default class NewTodo extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.toggleAdd();
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.refs.deadlineInput.value === "") {
            var deadline = null;
        } else {
            var deadline = this.refs.deadlineInput.value;
        }
        var priority = parseInt(this.refs.priorityInput.value);
        var newTodo = {
            "title": this.refs.titleInput.value,
            "priority": priority,
            "done": false,
            "text": this.refs.textInput.value,
            "deadline": deadline
        };
        this.props.add(newTodo);
    }

    render() {
        if (!this.props.isAdding){
            return <button onClick={this.handleClick}>Add</button>
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Title" ref="titleInput" />
                    <input type="text" placeholder="Text" ref="textInput" />
                    <input type="date" ref="deadlineInput" />
                    <select ref="priorityInput">
                        <option value="1">一般</option>
                        <option value="2">重要</option>
                        <option value="3">紧急</option>
                    </select>
                    <input type="submit" value="Submit" />
                    <button onClick={this.props.toggleAdd}>Cancel</button>
                </form>
            );
        }
    }
}