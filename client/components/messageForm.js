import React, {Component} from 'react'
import socket from '../socket'
import {connect} from 'react-redux'

class MessageForm extends Component {
  constructor(props) {
    super(props)
    this.submitMessage = this.submitMessage.bind(this)
  }

  submitMessage(event) {
    event.preventDefault()
    console.log('sending this', {
      message: event.target.message.value,
      user: this.props.user.email || 'Guest Player'
    })
    socket.emit('send-message', {
      message: event.target.message.value,
      user: this.props.user.email || 'Guest Player'
    })
  }

  render() {
    return (
      <form onSubmit={this.submitMessage}>
        <label>Your message below:</label>
        <input type="text" name="message" placeholder="Your message here" />
        <button type="submit"> Send Message </button>
      </form>
    )
  }
}

const mapState = state => ({
  user: state.user
})
export default connect(mapState)(MessageForm)
