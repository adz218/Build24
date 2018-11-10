import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
// import {createGameThunk, getGamesThunk, createDBGame} from '../store/allGames'
import {getCurrent, createGame, update, addSolution} from '../store/game'
import {getPlayers, addPlayer} from '../store/players'
import {Hand, Card, CardBack} from 'react-deck-o-cards'
import socket from '../socket'
import {
  Modal,
  Button,
  Icon,
  Collection,
  CollectionItem,
  Table
} from 'react-materialize'

class GameLobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      solution: ''
    }

    this.addToState = this.addToState.bind(this)
    this.clearState = this.clearState.bind(this)
    this.submitSolution = this.submitSolution.bind(this)
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

  addToState(num) {
    this.setState({
      solution: this.state.solution + num + ' '
    })
  }

  clearState() {
    this.setState({
      solution: ''
    })
  }

  submitSolution() {
    const solution = eval(this.state.solution)
    console.log('YOUR SOLUTION EVALUTES TO:', solution)
    if (solution === 24) {
      this.props.addSolutionToGameDB(this.state.solution)
    }
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
            <p>
              Rules:
              <br />
              Create the number 24 with the four randomly generated cards. You
              may use the cards in any order and apply any of the basic
              mathematic operators (addition, subtraction, multiplication,
              division) but each card must be used exactly once. <br />
              Aces can be used as either 1 or 11. <br />
              Note: Not all sets can be refactored into 24. <br />
            </p>
          </Modal>
        </div>
        <div className="cards-carousel">
          {this.props.game.numbers.length > 0 && (
            <svg viewBox="-2 -2 474 182" style={defHandStyle}>
              <Card
                rank={this.props.game.numbers[0]}
                suit={this.props.game.suits[0]}
                cardWidth="170"
                cardHeight="158"
                xOffset={0}
                yOffset={20}
                onClick={() => {
                  this.addToState(this.props.game.numbers[0])
                }}
              />
              <Card
                rank={this.props.game.numbers[1]}
                suit={this.props.game.suits[1]}
                cardWidth="170"
                cardHeight="158"
                xOffset={100}
                yOffset={20}
                onClick={() => {
                  this.addToState(this.props.game.numbers[1])
                }}
              />
              <Card
                rank={this.props.game.numbers[2]}
                suit={this.props.game.suits[2]}
                cardWidth="170"
                cardHeight="158"
                xOffset={200}
                yOffset={20}
                onClick={() => {
                  this.addToState(this.props.game.numbers[2])
                }}
              />
              <Card
                rank={this.props.game.numbers[3]}
                suit={this.props.game.suits[3]}
                cardWidth="170"
                cardHeight="158"
                xOffset={300}
                yOffset={20}
                onClick={() => {
                  this.addToState(this.props.game.numbers[3])
                }}
              />
            </svg>
          )}
        </div>
        <div className="solution-field">
          <input
            type="text"
            name="solution"
            value={this.state.solution}
            placeholder="use buttons to fill"
          />
        </div>
        <div className="buttons-bar">
          <Button onClick={() => this.addToState('+')}>+</Button>
          <Button onClick={() => this.addToState('-')}>-</Button>
          <Button onClick={() => this.addToState('*')}>*</Button>
          <Button onClick={() => this.addToState('/')}>/</Button>
          <Button onClick={() => this.addToState('(')}>(</Button>
          <Button onClick={() => this.addToState(')')}>)</Button>
        </div>
        <div className="buttons-bar">
          <Button onClick={() => this.submitSolution()}>Submit Solution</Button>
          <Button onClick={() => this.clearState()}>Clear Solution</Button>
        </div>
        <Table>
          <thead>
            <tr>Player:</tr>
          </thead>
          <tbody>
            {this.props.players.length > 0 &&
              this.props.players.map(player => {
                return (
                  <tr>
                    <td>{player.email}</td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
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
  getPlayersProp: () => dispatch(getPlayers()),

  addSolutionToGameDB: solution => dispatch(addSolution(solution))
})
export default connect(
  mapState,
  mapDispatch
)(GameLobby)
