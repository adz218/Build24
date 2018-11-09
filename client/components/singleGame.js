import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import socket from '../socket'
import {addPlayerToGame} from '../store/singleGame'
import store from '../store'

class SingleGame extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('thispropsplayers at time of mount', this.props.players)
    this.props.user.email &&
      socket.emit('newPlayer', {
        email: this.props.user.email
      })
  }

  handleSubmit(event) {}

  render() {
    return (
      <div>
        <h1>please abide by the rules</h1>
        <div>
          <h2>participants:</h2>
          <div>
            {this.props.players.length > 0 &&
              this.props.players.map(player => {
                return <div>{player.email}</div>
              })}
          </div>
        </div>
      </div>
    )
  }
}
const mapState = state => ({
  activeGame: state.singleGame,
  players: state.singleGame.players,
  user: state.user
})
export default connect(
  mapState,
  null
)(SingleGame)
