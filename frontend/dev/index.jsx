import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import { TaskList } from './list';

function renderList({ match }) {
	if ( match.url === "/todo" ){
		var status = "?done=false"
	} else if ( match.url === "/done" ) {
		var status = "?done=true"
	} else {
		var status = ""
	}
	return <TaskList url={`http://127.0.0.1:8000/api/tasks/${status}`} />;
}


class NavBar extends React.Component {
	render() {
		return(
			<Router>
				<div>
					<Link to='/todo'><button>Todo</button></Link>
					<Link to='/done'><button>Completed</button></Link>
					<Link to='/all'><button>All</button></Link>

					<Route exact path="/todo" render={ renderList } />
					<Route exact path="/done" render={ renderList } />
					<Route exact path="/all" render={ renderList } />
				</div>
			</Router>
		);
	}
}

ReactDOM.render(
	<NavBar />,
	document.getElementById('app')
);






//import _ from 'lodash';
//import printMe from './print.js';
//
//function component() {
//  var element = document.createElement('div');
//  var btn = document.createElement('button');
//
//  // Lodash, now imported by this script
//  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//
//  btn.innerHTML = 'Click me and check the console!';
//  btn.onclick = printMe;
//
//  element.appendChild(btn);
//
//  return element;
//}
//
//document.body.appendChild(component());