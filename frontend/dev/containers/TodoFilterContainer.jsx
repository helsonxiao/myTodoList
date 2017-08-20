import React from 'react';
import TodoFilter from '../components/TodoFilter';

// todo 待删除
export default class TodoFilterContainer extends React.Component{
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
            <TodoFilter
                handleAll={this.handleAll}
                handleTodo={this.handleTodo}
                handleCompleted={this.handleCompleted}/>
        );
    }
}