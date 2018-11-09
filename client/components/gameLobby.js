import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {createGameThunk, getGamesThunk} from '../store/allGames'
import {Hand, Card, CardBack} from 'react-deck-o-cards'
import {createCards} from '../store/singleGame'
import socket from '../socket'

class GameLobby extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getGameList()
    console.log('new client on connect', this.props.activeGame)
    // this.props.activeGame.length === 0 && socket.emit('freshPlayer')
  }

  randomNums() {
    let cardNums = []
    for (let i = 0; i < 4; i++) {
      cardNums.push(Math.ceil(Math.random() * 10))
    }
    return cardNums
  }

  randomSuits() {
    let cardSuits = []
    for (let i = 0; i < 4; i++) {
      cardSuits.push(Math.floor(Math.random() * 4))
    }
    return cardSuits
  }
  handleSubmit(event) {}

  render() {
    let numCopy = this.randomNums()
    let suitCopy = this.randomSuits()

    const defHandStyle = {
      maxHeight: '34vh',
      minHeight: '34vh',
      maxWidth: '50vw',
      padding: 0
    }

    return (
      <div>
        <h1>Lobby</h1>
        <div />
        <button
          onClick={() => {
            this.props.createGame(this.props.currentUser)
            console.log('nums and suits on room creation', numCopy, suitCopy)
            socket.emit('setCardsForRoom', numCopy, suitCopy)
          }}
        >
          Create/connect to game
        </button>
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
      </div>
    )
  }
}

const mapState = state => ({
  games: state.allGames, //just an array with all games
  currentUser: state.user,
  activeGame: state.singleGame
})

const mapDispatch = dispatch => ({
  createGame: player => dispatch(createGameThunk(player)),
  getGameList: () => dispatch(getGamesThunk())
  // generateCards: (cardNums, cardSuits) =>
  //   dispatch(createCards(cardNums, cardSuits))
})
export default connect(
  mapState,
  mapDispatch
)(GameLobby)
