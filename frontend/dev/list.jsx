import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import $ from 'jquery';

// todo 搞清楚参数传递的规则!
export class TaskList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}

	loadData() {
		$.ajax({
			url: this.props.url,
			type: 'GET',
			dataType: 'JSON',
			success: function(data) {
				this.setState({
					data: data['results']
				});
			}.bind(this),
			error: function() {
			    console.log('bad!');
			}.bind(this)
		});
	}

	componentDidMount() {
		this.loadData();
//		setInterval(this.loadData,
//				   this.props.pollInterval);
	}

	render() {
		if (this.state.data) {
			var taskNodes =
				this.state.data.map( ( task ) => {
					return (
						<li key={task.id}>
							<Link to={`/tasks/${ task.id }`}>{ task.title }</Link>
						</li>
					);
				});
		}

		return (
			<Router>
				<div>
					<ol>{taskNodes}</ol>
					<Route path="/tasks/:id"
						render={({ match }) => <TaskText id={ match.params.id } tasks={ this.state.data }/>}/>
				</div>
			</Router>
		);
	}
}


class TaskText extends React.Component {
    constructor(props){
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(taskId, task) {
        task['done'] = !task['done'];
        $.ajax({
            url: "http://127.0.0.1:8000/api/tasks/" + taskId,
            type: 'PUT',
            dataType: 'JSON',
            cache: false,
//            async: false,
            data: task,
//            crossDomain : true,
//            headers: { 'Authorization': "Token " + localStorage.token },
//            xhrFields: {
//              withCredentials: true
//            },
            success: function(data) {
                console.log(task);
                console.log('good!');
            }.bind(this),
            error: function() {
                console.log(task);
                console.log('bad!');
            }.bind(this)
        });
    }

	render() {
		var taskId = this.props.id;
		var tasks = this.props.tasks;
		var task = tasks.find( t => t.id == taskId);
		var taskText = task['text'];
		return(
		    <div>
		        <p>{ taskText }</p>
		        <button onClick={() => this.handleToggle(taskId, task)}>Toggle</button>
		    </div>
		);
	}
}
