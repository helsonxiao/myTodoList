import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class TodoBar extends React.Component{
    render() {
        return (
<div className="btn-group-vertical" role="group" aria-label="...">
  <button type="button" className="btn btn-default" onClick={this.props.handleAddClick}>新建</button>

  <div className="btn-group" role="group">
    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      优先级
      <span className="caret"></span>
    </button>
    <ul className="dropdown-menu">
      <li><a href="#" onClick={this.props.handlePriUp}>低的</a></li>
      <li><a href="#" onClick={this.props.handlePriDown}>高的</a></li>
    </ul>
  </div>

  <div className="btn-group" role="group">
    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      DDL
      <span className="caret"></span>
    </button>
    <ul className="dropdown-menu">
      <li><a href="#" onClick={this.props.handleDDLUp}>近的</a></li>
      <li><a href="#" onClick={this.props.handleDDLDown}>远的</a></li>
    </ul>
  </div>
</div>
        );
    }
}