import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {createGameThunk, getGamesThunk} from '../store/allGames'
import {Hand, Card, CardBack} from 'react-deck-o-cards'

class GameLobby extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('thispropsuser', this.props.currentUser)
    this.props.getGameList()
  }
  randomCard() {
    return Math.ceil(Math.random() * 10)
  }

  randomSuit() {
    return Math.floor(Math.random() * 4)
  }
  handleSubmit(event) {}

  render() {
    const defHandStyle = {
      maxHeight: '34vh',
      minHeight: '34vh',

      maxWidth: '50vw',
      padding: 0
    }
    return (
      <div>
        <h1>Lobby</h1>
        <div>
          <Hand
            cards={[{rank: 1, suit: 0}]}
            hidden={false}
            style={defHandStyle}
          />
        </div>
        <button onClick={() => this.props.createGame(this.props.currentUser)}>
          Create a game
        </button>
        <div>
          {this.props.games.length > 0 &&
            this.props.games.map(game => {
              return (
                <div>
                  <Link to={`/game/${game.id}`}>Game #: {game.id} </Link>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  games: state.allGames, //just an array with all games
  currentUser: state.user
})

const mapDispatch = dispatch => ({
  createGame: player => dispatch(createGameThunk(player)),
  getGameList: () => dispatch(getGamesThunk())
})
export default connect(
  mapState,
  mapDispatch
)(GameLobby)
