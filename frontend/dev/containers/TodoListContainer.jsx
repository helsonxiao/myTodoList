import React from 'react';
import TodoList from '../components/TodoList';
import { observer } from 'mobx-react';

@observer
export default class TodoListContainer extends React.Component{
    constructor(props) {
        super(props);
        this.showDetail = this.showDetail.bind(this);
    }

    showDetail(todo) {
        this.props.appState.isOpening = true;
        this.props.appState.currentTodo = todo;
    }

    render() {
        var titles = this.props.appState.residue.map((todo) => {
           return (
               <li
                key={todo.id}
                onClick={() => this.showDetail(todo)}>
                {todo.title}</li>
            );
        });
        return <TodoList titles={titles}/>
    }
}