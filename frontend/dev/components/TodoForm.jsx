import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import NewTodo from './NewTodo';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';


export default class TodoForm extends React.Component{
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
        this.showList = this.showList.bind(this);
        this.showAdd = this.showAdd.bind(this);
        this.showEdit = this.showEdit.bind(this);
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
//                    residue: data.results,
//                    todos: data.results
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
                    isAdding: false
                });
                this.showList(false);
            }.bind(this),
            error: function() {
                console.log('add err!')
            }.bind(this)
        });
    }

    edit(todo) {
		$.ajax({
			url: `${this.apiUrl}${todo.id}`,
			type: 'put',
			dataType: 'json',
            data: todo,
			success: function(data) {
			    var currentTodoIndex = this.state.todos.indexOf(this.state.currentTodo);
			    this.state.todos.splice(currentTodoIndex, 1, data);
                this.setState({
                    todos: this.state.todos,
                    currentTodo: data
                });
                this.showList(todo.done);
			}.bind(this)
		});
    }

    delete(todo) {
        $.ajax({
            url: `${this.apiUrl}${todo.id}`,
            type: 'delete',
            success: function() {
                var todoIndex = this.state.todos.indexOf(todo);
                this.state.todos.splice(todoIndex, 1);
                this.setState({
                    todos: this.state.todos,
                    isOpening: false
                });
                this.showList('');
            }.bind(this)
        });
    }

    showDetail(isOpening, currentTodo) {
        this.setState({
            isOpening: isOpening,
            currentTodo: currentTodo
        });
    }
    
    showList(TOF) {
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
//            isOpening: false
        });
    }

    showEdit() {
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    showAdd() {
        this.setState({
            isAdding: !this.state.isAdding
        });
    }

    render() {
        return(
            <div>
                <TodoFilter
                    showList={this.showList}/>
                <NewTodo
                    add={this.add}
                    isAdding={this.state.isAdding}
                    showAdd={this.showAdd}/>
                <TodoList
                    residue={this.state.residue}
                    edit={this.edit}
                    isEditing={this.state.isEditing}
                    showEdit={this.showEdit}
                    isOpening={this.state.isOpening}
                    currentTodo={this.state.currentTodo}
                    showDetail={this.showDetail}
                    load={this.load}
                    delete={this.delete}/>
            </div>
        );
    }
}