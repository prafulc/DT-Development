import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from '../imports/reducers/index.js'
import App from '../imports/components/App.js'
import './main.html'

Meteor.startup(() => {
	let store = createStore(todoApp)

	render(
	  <Provider store={store}>
	    <App />
	  </Provider>,
	  document.getElementById('root')
	)
});