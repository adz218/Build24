import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import socket from '../socket'
import {addPlayerToGame} from '../store/singleGame'
import store from '../store'
import {Hand, Card, CardBack} from 'react-deck-o-cards'
import {setCards} from '../store/singleGame'

class SingleGame extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(
      'nums and suits',
      this.props.activeGame.numbers,
      this.props.activeGame.suits
    )
    this.props.user.email &&
      socket.emit('newPlayer', {
        email: this.props.user.email
      })
    this.props.getCards()
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
              {
                rank: this.props.activeGame.numbers[0],
                suit: this.props.activeGame.suits[0]
              },
              {
                rank: this.props.activeGame.numbers[1],
                suit: this.props.activeGame.suits[1]
              },
              {
                rank: this.props.activeGame.numbers[2],
                suit: this.props.activeGame.suits[2]
              },
              {
                rank: this.props.activeGame.numbers[3],
                suit: this.props.activeGame.suits[3]
              }
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

const mapDispatch = dispatch => ({
  getCards: () => dispatch(setCards())
})
export default connect(
  mapState,
  mapDispatch
)(SingleGame)
