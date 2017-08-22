import React from 'react';
import TodoFilter from '../components/TodoFilter';

export default class TodoFilterContainer extends React.Component{
    render() {
        return(
            <TodoFilter
                onAllClick={() => this.props.showResidue('')}
                onTodoClick={() => this.props.showResidue(false)}
                onCompletedClick={() => this.props.showResidue(true)}/>
        );
    }
}