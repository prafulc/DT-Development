import React, {Component} from 'react';



class InputData extends Component {
	add(event) {
		event.preventDefault();
		var task = this.refs.task.value;
		var desc = this.refs.desc.value;
		console.log(task,"--------",desc)
		Meteor.call('add',task,desc);
		this.refs.task.value = '';
		this.refs.desc.value = '';
	}
	render() {
		return ( 
			<div>
				<form onSubmit={this.add.bind(this)}>
					<p>Task: <input type='text' ref='task' /> </p>
					<br />
					<p>Description: <input type='text' ref='desc' /> </p>
					<br />
					<button type='submit'>Save</button>
				</form>
			</div>
		);
	}
}

export default InputData;