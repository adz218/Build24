import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'

class GameLobby extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('state at time of mount:', this.props.players)
  }

  handleSubmit(event) {}

  render() {
    return (
      <div>
        <h1>Lobby</h1>
        <div>
          {this.props.players.map(player => {
            return <div>{player.username}</div>
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  players: state.players
})

export default connect(
  mapState,
  null
)(GameLobby)
