import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class TodoList extends React.Component{
    render() {
        return (
            <div className="list-group">
                {this.props.todos}
            </div>
        );
    }
}