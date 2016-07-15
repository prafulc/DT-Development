import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import React from 'react';
import ReactDOM, { render } from "react-dom";
import App from '../imports/ui/App';
import './main.html';



Meteor.startup(() => {
	render(<App />,document.getElementById('root'));
});