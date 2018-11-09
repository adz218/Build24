import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
// import {createGameThunk, getGamesThunk, createDBGame} from '../store/allGames'
import {getCurrent, createGame, update} from '../store/game'
import {Hand, Card, CardBack} from 'react-deck-o-cards'
import {createCards} from '../store/singleGame'
import socket from '../socket'

class GameLobby extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getCurrentGame()
  }

  randomNums() {
    let cardNums = []
    for (let i = 0; i < 4; i++) cardNums.push(Math.ceil(Math.random() * 10))

    return cardNums
  }

  randomSuits() {
    let cardSuits = []
    for (let i = 0; i < 4; i++) cardSuits.push(Math.floor(Math.random() * 4))
    return cardSuits
  }

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
          onClick={async () => {
            await this.props.createDBGame(numCopy, suitCopy)
            console.log(
              'onclick sending out to socket',
              this.props.game.numbers,
              this.props.game.suits
            )
            await this.props.getCurrentGame()

            socket.emit(
              'setGame',
              this.props.game.numbers,
              this.props.game.suits
            )
          }}
        >
          Create/connect to game
        </button>
        <div>
          {this.props.game.numbers.length > 0 && (
            <Hand
              cards={[
                {
                  rank: this.props.game.numbers[0],
                  suit: this.props.game.suits[0]
                },
                {
                  rank: this.props.game.numbers[1],
                  suit: this.props.game.suits[1]
                },
                {
                  rank: this.props.game.numbers[2],
                  suit: this.props.game.suits[2]
                },
                {
                  rank: this.props.game.numbers[3],
                  suit: this.props.game.suits[3]
                }
              ]}
              hidden={false}
              style={defHandStyle}
            />
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  game: state.game
})

const mapDispatch = dispatch => ({
  getCurrentGame: () => dispatch(getCurrent()),
  createDBGame: (nums, suits) => dispatch(createGame(nums, suits)),
  updateAfterCreation: () => dispatch(update())
})
export default connect(
  mapState,
  mapDispatch
)(GameLobby)
