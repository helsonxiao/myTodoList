import React from 'react';
import TodoBar from '../components/TodoBar';
import { observer } from 'mobx-react';

@observer
export default class TodoBarContainer extends React.Component{
    constructor(props){
        super(props);
        this.handleAddClick = this.handleAddClick.bind(this);
    }

    handleAddClick() {
        this.props.appState.isAdding = true;
//        this.props.appState.isOpening = false;
    }

    render() {
        return (
            <TodoBar
                appState={this.props.appState}
                handleAddClick={this.handleAddClick}/>
        );
    }
}