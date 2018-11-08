import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import socket from '../socket'

class SingleGame extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    socket.emit('newPlayer', this.props.activeGame)
    console.log('thispropsplayers', this.props.players)
  }

  handleSubmit(event) {}

  render() {
    return (
      <div>
        <h1>please abide by the rules</h1>
        <div>
          <h2>participants:</h2>
          {this.props.players.length > 0 &&
            this.props.players.map(player => {
              for (let prop in player) {
                return <div>{prop}</div>
              }
            })}
        </div>
      </div>
    )
  }
}
const mapState = state => ({
  activeGame: state.singleGame,
  players: state.players
})
export default connect(
  mapState,
  null
)(SingleGame)
