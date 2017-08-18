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
            show: false,
            editing: false,
            currentId: 0,
            idNum: 0
        }
        this.load = this.load.bind(this);
        this.countId = this.countId.bind(this);
        this.showDetail = this.showDetail.bind(this);
        this.showList = this.showList.bind(this);
        this.showCreate = this.showCreate.bind(this);
        this.create = this.create.bind(this);
        this.edit = this.edit.bind(this);
    }

    load() { 
		$.ajax({
			url: this.apiUrl,
			type: 'GET',
			dataType: 'JSON',
			success: function(data) {
                this.setState({
                    residue: data.results,
                    todos: data.results
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
    
    showDetail(detailState, detailId) {
        this.setState({
            show: detailState,
            currentId: detailId
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
            show: false
        });
    }

    showCreate() {
        this.setState({
            editing: true
        });
    }

    countId() {
//        this.load();
        var length = this.state.todos.length;
        var idNum = this.state.todos[length-1].id;
        this.setState({
            idNum: idNum
        });
    }

    create(newTodo) {
//        this.state.todos.push(newTodo);
//        this.setState({
//            todos: this.state.todos,
//            show: false,
//            editing: false
//        });
        $.ajax({
            url: this.apiUrl,
            type: 'POST',
            dataType: 'JSON',
            data: newTodo,
            error: function() {
                console.log('post err!')
            }.bind(this)
        });
        this.load();
        this.showList(false);
    }
    
    // 改变标记状态，待补充
    edit(todo) {
		$.ajax({
			url: `${this.apiUrl}${todo.id}`,
			type: 'PATCH',
			dataType: ' JSON',
            async: false,
            data: {
                done: todo.done
            },
			success: function(data) {
                this.setState({
                    show: false
                });
			}.bind(this)
		});
        this.showList(todo.done);
    }
    
    render() {
        return(
            <div>
                <TodoFilter
                    showList={this.showList}/>
                <NewTodo
                    create={this.create}
                    editing={this.state.editing}
                    showCreate={this.showCreate}
                    idNum={this.state.idNum}
                    countId={this.countId}/>
                <TodoList
                    residue={this.state.residue}
                    edit={this.edit}
                    show={this.state.show}
                    currentId={this.state.currentId}
                    showDetail={this.showDetail}
                    load={this.load}/>
            </div>
        );
    }
}