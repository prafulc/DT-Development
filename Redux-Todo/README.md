# Redux
	Redux is a predictable state container for JavaScript apps.
	(If you’re looking for a WordPress framework, check out Redux Framework.)

	It helps you write applications that behave consistently, run in different environments (client, server,
	and native), and are easy to test. On top of that, it provides a great developer experience, such as live
	code editing combined	with a time traveling debugger.


Important points, that should be take care
- You have to install redex in you machine and also install its supporting packages.
- It has three principles:- 
	1. Single source of truth.	

		```javascript
		console.log(store.getState())

		/* Prints
		{
		  visibilityFilter: 'SHOW_ALL',
		  todos: [
		    {
		      	text: 'Consider using Redux',
		      	completed: true,
		    },
		    {
		      	text: 'Keep all state in a single tree',
		      	completed: false
		    }
		  ]
		}
		*/
		```

	2. State is read-only.	

		```javascript
		store.dispatch({
			type: 'COMPLETE_TODO',
		  	index: 1
		})

		store.dispatch({
		  	type: 'SET_VISIBILITY_FILTER',
		  	filter: 'SHOW_COMPLETED'
		})
		```

	3. Changes are made with pure functions.
	
		```javascript
		function visibilityFilter(state = 'SHOW_ALL', action) {
		  	switch (action.type) {
		    	case 'SET_VISIBILITY_FILTER':
		      		return action.filter
		    	default:
		      		return state
		  	}
		}

		function todos(state = [], action) {
		  	switch (action.type) {
			    case 'ADD_TODO':
		      		return [
		        		...state,
		        		{
		          			text: action.text,
		          			completed: false
		        		}
		      		]
		    	case 'COMPLETE_TODO':
		      		return state.map((todo, index) => {
		        		if (index === action.index) {
		          			return Object.assign({}, todo, {
		            			completed: true
		          			})
		        		}
		        		return todo
		      		})
		    	default:
		      		return state
		  	}
		}

		import { combineReducers, createStore } from 'redux'
		let reducer = combineReducers({ visibilityFilter, todos })
		let store = createStore(reducer)
		```


- for using react, you must install ->

		npm install --save react-redux
		