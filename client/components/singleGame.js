import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'

import {EventEmitter} from 'events'
export const gameRoom = new EventEmitter()

export const clientBroadcast = () => {
  gameRoom.emit('someoneConnected')
}

class SingleGame extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  handleSubmit(event) {}

  render() {}
}

export default connect(
  null,
  null
)(SingleGame)
