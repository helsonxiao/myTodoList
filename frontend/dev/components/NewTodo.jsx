import React from 'react';


export default class NewTodo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editing: false
        }
        this.createForm = this.createForm.bind(this);
    }
    
    showForm() { // 表单制作待学习
        if (editing) {
            return (
                <form>
                    <input type="text" placeholder="I am a title." ref="titleInput" />
                    
                </form>
            );
        } else {
            return;
        }
    }
    
    createForm() {
        this.state.editing = true;
    }
    
    render() {
        return (
            <button onClick={this.createForm}>Create</button>
        );
    }
}