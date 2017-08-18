import React from 'react';


export default class NewTodo extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.showCreate();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.countId();
        var newTodo = {
            title: this.refs.titleInput.value,
            text: this.refs.textInput.value,
            priority: this.refs.priorityInput.value,
            deadline: this.refs.deadlineInput.value,
            done: false,
            id: this.props.idNum,
            url: `http://127.0.0.1:8000/api/tasks/${this.props.idNum}`
        }
        this.props.create(newTodo);
    }

    render() {
        if (!this.props.editing){
            return <button onClick={this.handleClick}>Create</button>
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
                </form>
            );
        }
    }
}