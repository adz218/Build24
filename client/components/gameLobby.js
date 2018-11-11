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
    this.openModal = this.openModal.bind(this)
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

  async openModal() {
    $('#solved').modal('open')
    // let numCopy = this.randomNums()
    // let suitCopy = this.randomSuits()
    // await this.props.createDBGame(numCopy, suitCopy)
    // await this.props.getCurrentGame()
    // socket.emit('setGame', this.props.game.numbers, this.props.game.suits)
  }

  async submitSolution() {
    const solution = eval(this.state.solution)

    const numbersCopy = [...this.props.game.numbers]
    const solutionCopy = this.state.solution.split(' ')

    console.log('numcopy and solcopy', numbersCopy, solutionCopy)

    let parsedIntsCount = 0
    let bool = true
    for (let i = 0; i < solutionCopy.length; i++) {
      if (numbersCopy.indexOf(parseInt(solutionCopy[i])) !== -1) {
        if (parsedIntsCount < 4) {
          parsedIntsCount += 1
          numbersCopy.splice(numbersCopy.indexOf(parseInt(solutionCopy[i])), 1)
        } else {
          bool = false
        }
      }
    }

    console.log('numcopy after check', numbersCopy, parsedIntsCount)

    if (solution === 24 && numbersCopy.length === 0 && bool) {
      await this.props.addSolutionToGameDB(
        this.state.solution,
        this.props.game.id,
        this.props.user.email || 'Guest Player'
      )
      socket.emit(
        'winner',
        this.props.user.email || 'Guest Player',
        this.state.solution
      )
    }

    console.log('dont be cheatin now')
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
        {this.props.game.winner !== '' && this.props.game.winner !== null && (
          <div>
            {this.props.game.winner} solved it with the solution:
            {this.props.game.solution}
          </div>
        )}
        <div className="buttons-bar">
          <Button
            onClick={async () => {
              await this.props.createDBGame(numCopy, suitCopy)
              await this.props.getCurrentGame()
              this.clearState()
              socket.emit(
                'setGame',
                this.props.game.numbers,
                this.props.game.suits
              )
            }}
          >
            Four New Cards
          </Button>
          <Modal trigger={<Button>Rules</Button>} header="Rules:">
            <p>
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
            placeholder="Click on the cards and use the buttons below to come up with a solution!"
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

  addSolutionToGameDB: (solution, gameId, email) =>
    dispatch(addSolution(solution, gameId, email))
})
export default connect(
  mapState,
  mapDispatch
)(GameLobby)
