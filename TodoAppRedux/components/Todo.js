import React, { PropTypes } from 'react'
import ReactEmoji from '/src/react-emoji'

import { $ } from 'meteor/jquery'

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none',
      color: completed ? 'green' : 'black'
    }}
  >
    {ReactEmoji.emojify(text)}
    {/*<button className="check">
    	<span className="glyphicon glyphicon-ok"></span>
    </button>
    <button className="delete">
    	<span className="glyphicon glyphicon-remove"></span>
    </button>*/}
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo