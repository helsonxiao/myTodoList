import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class TodoBar extends React.Component{
    render() {
        return (
            <div>
                <button onClick={this.props.handleAddClick}>Add</button>
                <label>优先级：</label>
                <button onClick={this.props.handlePriUp}>低的</button>
                <button onClick={this.props.handlePriDown}>高的</button>
                <label>DDL：</label>
                <button onClick={this.props.handleDDLUp}>近的</button>
                <button onClick={this.props.handleDDLDown}>远的</button>
            </div>
        );
    }
}