import React from 'react';
import TodoBar from '../components/TodoBar';
import { observer } from 'mobx-react';

@observer
export default class TodoBarContainer extends React.Component{
    constructor(props){
        super(props);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handlePriUp = this.handlePriUp.bind(this);
        this.handlePriDown = this.handlePriDown.bind(this);
        this.handleDDLUp = this.handleDDLUp.bind(this);
        this.handleDDLDown = this.handleDDLDown.bind(this);
    }

    handleAddClick() {
        this.props.appState.isAdding = true;
        this.props.appState.isOpening = false;
    }

    handlePriUp() {
        this.props.appState.residue = this.props.appState.residue.sort((x, y) => {
            if (x.priority < y.priority) {
                return -1;
            }
            if (x.priority > y.priority) {
                return 1;
            }
            return 0;
        });
    }

    handlePriDown() {
        this.props.appState.residue = this.props.appState.residue.sort((x, y) => {
            if (x.priority < y.priority) {
                return 1;
            }
            if (x.priority > y.priority) {
                return -1;
            }
            return 0;
        });
    }

    handleDDLUp() {
        this.props.appState.residue = this.props.appState.residue.sort((x, y) => {
            if (x.deadline < y.deadline) {
                return -1;
            }
            if (x.deadline > y.deadline) {
                return 1;
            }
            return 0;
        });
    }

    handleDDLDown() {
        this.props.appState.residue = this.props.appState.residue.sort((x, y) => {
            if (x.deadline < y.deadline) {
                return 1;
            }
            if (x.deadline > y.deadline) {
                return -1;
            }
            return 0;
        });
    }

    render() {
        return (
            <TodoBar
                appState={this.props.appState}
                handleAddClick={this.handleAddClick}
                handlePriUp={this.handlePriUp}
                handlePriDown={this.handlePriDown}
                handleDDLUp={this.handleDDLUp}
                handleDDLDown={this.handleDDLDown}/>
        );
    }
}