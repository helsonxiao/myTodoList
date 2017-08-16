import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NewTodo from './NewTodo';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';


export default class TodoForm extends React.Component{
    constructor(props) {
        super(props);
        this.apiUrl = 'http://127.0.0.1:8000/api/tasks';
        this.state = {
            data: [],
            dataCache: []
        }
        this.show = this.show.bind(this);
        this.create = this.create.bind(this);
    }

    componentDidMount() {
        axios.get(this.apiUrl).then( (res) => {
            this.setState({
                data: res.data.results,
                dataCache: res.data.results
            });
        });
    }
    
    show(residue) {
        this.setState({data:residue});
    }
    
    create(newTodo) { // 待测试
        axios.post(this.apiUrl, newTodo)
            .then( (res) => { this.setState({
                data: this.state.data.push(res.data),
                dataCache: this.state.dataCache.push(res.data)
            })
            .catch( (err) => {
                console.log(err);
            });
        });
    }
    
    render() {
        return(
            <div>
                <TodoFilter 
                    todos={this.state.dataCache}
                    show={this.show} />
                <NewTodo create={this.create} />
                <TodoList todos={this.state.data} />
            </div>
        );
    }
}