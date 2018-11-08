import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {createGameThunk, getGamesThunk} from '../store/allGames'

class GameLobby extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('thispropsuser', this.props.currentUser)
    this.props.getGameList()
  }

  handleSubmit(event) {}

  render() {
    return (
      <div>
        <h1>Lobby</h1>
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
