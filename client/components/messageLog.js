import React from 'react'
import {connect} from 'react-redux'
import {Collection, CollectionItem} from 'react-materialize'

const MessageLog = props => {
  return (
    <div className="message-log">
      <div className="menu" id="chat">
        <Collection>
          {props.messages.map((message, idx) => (
            <div>
              <CollectionItem>
                {message.user}: {message.message}
              </CollectionItem>
            </div>
          ))}
        </Collection>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    messages: state.messages
  }
}

export default connect(mapStateToProps)(MessageLog)
