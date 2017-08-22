import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class TodoList extends React.Component{
    render() {
        return <ul>{this.props.titles}</ul>
    }
}