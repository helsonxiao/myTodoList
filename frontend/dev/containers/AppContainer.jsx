import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TodoFilterContainer from './TodoFilterContainer';
import NewTodoContainer from './NewTodoContainer';
import TodoListContainer from './TodoListContainer';
import TodoContainer from './TodoContainer';

class AppContainer extends React.Component{
    constructor(props) {
        super(props);
        this.apiUrl = 'http://127.0.0.1:8000/api/tasks/';
        this.state = {
            residue: [],
            todos: [],
            isOpening: false,
            isAdding: false,
            isEditing: false,
            currentTodo: {}
        }
        this.load = this.load.bind(this);
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.showDetail = this.showDetail.bind(this);
        this.showResidue = this.showResidue.bind(this);
        this.toggleAdd = this.toggleAdd.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.hideDetail = this.hideDetail.bind(this);
    }

    load() {
        $.ajax({
            url: this.apiUrl,
            type: 'get',
            dataType: 'json',
            success: function(data) {
                this.setState({
                    residue: data,
                    todos: data
                });
            }.bind(this),
            error: function() {
                console.log('load err!');
            }.bind(this)
        });
    }

    componentDidMount() {
        this.load();
    }

    add(newTodo) {
        $.ajax({
            url: this.apiUrl,
            type: 'post',
            dataType: 'json',
            data: newTodo,
            success: function(data) {
                // 必须用 data ，否则缺少 id
                this.state.todos.push(data);
                this.setState({
                    todos: this.state.todos,
                    isOpening: true,
                    currentTodo: data
                });
                this.showResidue(newTodo.done);
            }.bind(this),
            error: function() {
                console.log('add err!')
            }.bind(this)
        });
    }

    edit(currentTodo) {
        $.ajax({
            url: `${this.apiUrl}${currentTodo.id}`,
            type: 'put',
            dataType: 'json',
            data: currentTodo,
            success: function(data) {
                var currentTodoIndex = this.state.todos.indexOf(currentTodo);
                this.state.todos.splice(currentTodoIndex, 1, data);
                this.setState({
                    todos: this.state.todos,
                    currentTodo: data
                });
                this.showResidue(currentTodo.done);
            }.bind(this)
        });
    }

    delete() {
        var currentTodo=this.state.currentTodo;
        $.ajax({
            url: `${this.apiUrl}${currentTodo.id}`,
            type: 'delete',
            success: function() {
                var currentTodoIndex = this.state.todos.indexOf(currentTodo);
                this.state.todos.splice(currentTodoIndex, 1);
                this.setState({
                    todos: this.state.todos,
                    isOpening: false
                });
                this.showResidue('');
            }.bind(this)
        });
    }

    showDetail(currentTodo) {
        this.setState({
            isOpening: true,
            currentTodo: currentTodo
        });
    }

    showResidue(TOF) {
        var residue = [];
        if (TOF === ''){
            residue = this.state.todos;
        } else {
            this.state.todos.map( (todo) => {
                if (todo.done === TOF){
                    residue.push(todo);
                }
            });
        }
        this.setState({
            residue: residue,
        });
    }

    toggleEdit() {
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    toggleAdd() {
        this.setState({
            isAdding: !this.state.isAdding
        });
    }
    
    hideDetail() {
        this.setState({
            isOpening: false
        });
    }

    render() {
        return(
            <div>
                <TodoFilterContainer
                    showResidue={this.showResidue}/>
                <NewTodoContainer
                    add={this.add}
                    isAdding={this.state.isAdding}
                    toggleAdd={this.toggleAdd}
                    hideDetail={this.hideDetail}/>
                <TodoListContainer
                    residue={this.state.residue}
                    showDetail={this.showDetail}/>
                <TodoContainer
                    isOpening={this.state.isOpening}
                    currentTodo={this.state.currentTodo}
                    isEditing={this.state.isEditing}
                    toggleEdit={this.toggleEdit}
                    delete={this.delete}
                    edit={this.edit}/>
            </div>
        );
    }
}

ReactDOM.render(
    <AppContainer />,
    document.getElementById('app')
);