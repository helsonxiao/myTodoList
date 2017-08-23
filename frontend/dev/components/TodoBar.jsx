import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class TodoBar extends React.Component{
    render() {
        return <button onClick={this.props.handleAddClick}>Add</button>
    }
}