import React from 'react';
import TodoFilter from '../components/TodoFilter';
import { observer } from 'mobx-react';

@observer
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