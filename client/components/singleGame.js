import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import socket from '../socket'
import {addPlayerToGame} from '../store/singleGame'
import store from '../store'
import {Hand, Card, CardBack} from 'react-deck-o-cards'

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

  randomCard() {
    return Math.ceil(Math.random() * 10)
  }

  randomSuit() {
    return Math.floor(Math.random() * 4)
  }

  render() {
    const defHandStyle = {
      maxHeight: '34vh',
      minHeight: '34vh',
      maxWidth: '50vw',
      padding: 0
    }
    return (
      <div>
        <h1>Make 24 with the following cards</h1>
        <div>
          <Hand
            cards={[
              {rank: this.randomCard(), suit: this.randomSuit()},
              {rank: this.randomCard(), suit: this.randomSuit()},
              {rank: this.randomCard(), suit: this.randomSuit()},
              {rank: this.randomCard(), suit: this.randomSuit()}
            ]}
            hidden={false}
            style={defHandStyle}
          />
        </div>
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
