import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TodoFilterContainer from './TodoFilterContainer';
import NewTodoContainer from './NewTodoContainer';
import TodoListContainer from './TodoListContainer';
import TodoContainer from './TodoContainer';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

var appState = observable({
    residue: [],
    todos: [],
    isOpening: false,
    isAdding: false,
    isEditing: false,
    currentTodo: {}
});

@observer
class AppContainer extends React.Component{
    constructor(props) {
        super(props);
        this.load = this.load.bind(this);
        this.showResidue = this.showResidue.bind(this);
    }

    load() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/tasks/',
            type: 'get',
            dataType: 'json',
            success: function(data) {
                this.props.appState.residue = data;
                this.props.appState.todos = data;
            }.bind(this),
            error: function() {
                console.log('load err!');
            }.bind(this)
        });
    }

    componentDidMount() {
        this.load();
    }

    showResidue(TOF) {
        if (TOF === ''){
            this.props.appState.residue = this.props.appState.todos;
        } else {
            this.props.appState.residue = this.props.appState.todos.filter((todo) => todo.done === TOF);
        }
    }

    render() {
        return(
            <div>
                <TodoFilterContainer
                    showResidue={this.showResidue}/>
                <NewTodoContainer
                    appState={this.props.appState}
                    showResidue={this.showResidue}/>
                <TodoListContainer
                    appState={this.props.appState}/>
                <TodoContainer
                    appState={this.props.appState}
                    showResidue={this.showResidue}/>
            </div>
        );
    }
}

ReactDOM.render(
    <AppContainer appState={appState}/>,
    document.getElementById('app')
);