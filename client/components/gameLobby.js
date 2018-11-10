import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
// import {createGameThunk, getGamesThunk, createDBGame} from '../store/allGames'
import {getCurrent, createGame, update} from '../store/game'

import {getPlayers, addPlayer} from '../store/players'
import {Hand, Card, CardBack} from 'react-deck-o-cards'
import socket from '../socket'
import {Modal, Button, Icon} from 'react-materialize'

class GameLobby extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    this.props.getCurrentGame()

    await this.props.addPlayer({email: this.props.user.email || 'Guest Player'})
    socket.emit('newPlayer')
    this.props.getPlayersProp()
    console.log('thispropsplayers', this.props.players)
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
    console.log('thispropspalyers at render', this.props.players)
    return (
      <div>
        <h1>Lobby</h1>
        <div />
        <div className="buttons-bar">
          <Button
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
            Four New Cards
          </Button>
          <Modal trigger={<Button>Rules</Button>}>
            <p>Rules for 24</p>
          </Modal>
        </div>
        <div>
          {this.props.game.numbers.length > 0 && (
            <div>
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
            </div>
          )}
        </div>
        <div>Players:</div>
        <div>
          {this.props.players.length > 0 &&
            this.props.players.map(player => {
              return <div>{player.email}</div>
            })}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  game: state.game,
  user: state.user,
  players: state.players
})

const mapDispatch = dispatch => ({
  getCurrentGame: () => dispatch(getCurrent()),
  createDBGame: (nums, suits) => dispatch(createGame(nums, suits)),
  updateAfterCreation: () => dispatch(update()),

  addPlayer: email => dispatch(addPlayer(email)),
  getPlayersProp: () => dispatch(getPlayers())
})
export default connect(
  mapState,
  mapDispatch
)(GameLobby)
