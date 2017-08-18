import React from 'react';
import Todo from './Todo';

export default class TodoList extends React.Component{
    render() {
        var residue = this.props.residue;
        var titles = residue.map( (todo) => {
           return (
               <li
                key={todo.id}
                onClick={ () => {
                       this.props.showDetail(true, todo.id);
                }}>
                {todo.title}</li>
            )
        });
        
        if (this.props.show) {
            var todo = residue.find(t => t.id == this.props.currentId);
            
            return (
                <div>
                    <ul>{titles}</ul>
                    <Todo
                        todo={todo}
                        edit={this.props.edit}/>
                </div>
            );
        } else {
            return (
                <div>
                    <ul>{titles}</ul>
                </div>
            );
        }
    }
}