import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NewTodo from './NewTodo';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';


export default class TodoForm extends React.Component{
    constructor(props) {
        super(props);
        this.apiUrl = 'http://127.0.0.1:8000/api/tasks/';
        this.state = {
            data: [],
            dataCache: []
        }
        this.load = this.load.bind(this);
        this.show = this.show.bind(this);
        this.create = this.create.bind(this);
        this.edit = this.edit.bind(this);
    }

    load() {
        axios.get(this.apiUrl)
        .then( (response) => {
            this.setState({
                data: response.data.results,
                dataCache: response.data.results
            });
        })
        .catch( (error) => {
           console.log('load err!');
        });
        
    }

    componentDidMount() {
        this.load();
    }
    
    show(residue) {
        this.setState({data:residue});
    }
    
    create(newTodo) { // 待测试
        axios.post(this.apiUrl, newTodo)
            .then( (response) => {
                console.log(response.data);
                this.setState({
                    data: this.state.data.push(response.data),
                    dataCache: this.state.dataCache.push(response.data)
                });
            })
            .catch( (error) => {
                console.log('create err!');
            });
    }
    
    edit(todo) {
        axios({
          method: 'patch',
          url: `${this.apiUrl}${todo.id}`,
          data: {
            done: todo.done
          }
        })
        .then( (response) => {
           console.log(response.data);
        })
        .catch( (error) => {
            console.log('edit err!');
        });
        this.load();
    }
    
    render() {
        return(
            <div>
                <TodoFilter 
                    todos={this.state.dataCache}
                    show={this.show} />
                <NewTodo create={this.create} />
                <TodoList 
                    todos={this.state.data}
                    edit={this.edit} />
            </div>
        );
    }
}