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
            todoId: ''            
        }
        this.load = this.load.bind(this);
        this.showDetail = this.showDetail.bind(this);
        this.showList = this.showList.bind(this);
        this.create = this.create.bind(this);
        this.edit = this.edit.bind(this);
    }

    load() { 
		$.ajax({
			url: this.apiUrl,
			type: 'GET',
			dataType: 'JSON',
//            async: false,
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
            todoId: detailId
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
    
    // 待完成
    create(newTodo) {

    }
    
    // 改变标记状态
    edit(todo, todos) {
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
                <NewTodo create={this.create}/>
                <TodoList
                    todos={this.state.todos}
                    residue={this.state.residue}
                    edit={this.edit}
                    show={this.state.show}
                    todoId={this.state.todoId}
                    showDetail={this.showDetail}
                    load={this.load}/>
            </div>
        );
    }
}