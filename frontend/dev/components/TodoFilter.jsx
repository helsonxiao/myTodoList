import React from 'react';


export default class TodoFilter extends React.Component{
    constructor(props) {
        super(props);
        this.handleAll = this.handleAll.bind(this);
        this.handleTodo = this.handleTodo.bind(this);
        this.handleCompleted = this.handleCompleted.bind(this);
    }
    
    handleAll() {
        this.props.showResidue('');
    }
    
    handleTodo() {
        this.props.showResidue(false);
    }
    
    handleCompleted() {
        this.props.showResidue(true);
    }
    
    render() {
        return(
            <ul className="nav nav-tabs">
                <li role="presentation" onClick={ () => this.handleAll() }><a href="#">All</a></li>
                <li role="presentation" onClick={ () => this.handleTodo() }><a href="#">Todo</a></li>
                <li role="presentation" onClick={ () => this.handleCompleted() }><a href="#">Completed</a></li>
            </ul>
        );
    }
}