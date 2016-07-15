import React, {Component} from 'react';
import { Mongo } from 'meteor/mongo';
import { createContainer } from 'meteor/react-meteor-data';
import {Record} from '../api/Tasks.js';



class Records extends Component {
	render() {
		/*console.log(this.props.record?this.props.record:'no record',"<<<----")*/
		return ( 
			<div>
				<ol>
					{this.props.record?this.props.record.map((record) =>{
						return (
								<li key={record._id}> 
									<p> Task: {record.task} </p>
									<p> Description: {record.desc} </p>
								</li>
						);
					})

						:' No record found.....'
					}
				</ol>
			</div>
		);
	}
}

export default createContainer(() => {
	Meteor.subscribe('record');
   	return {
  	    record: Record.find().fetch()
	};
}, Records);