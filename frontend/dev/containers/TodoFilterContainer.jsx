import React from 'react';
import TodoFilter from '../components/TodoFilter';

export default class TodoFilterContainer extends React.Component{
    render() {
        return(
            <TodoFilter
                handleAll={() => this.props.showResidue('')}
                handleTodo={() => this.props.showResidue(false)}
                handleCompleted={() => this.props.showResidue(true)}/>
        );
    }
}