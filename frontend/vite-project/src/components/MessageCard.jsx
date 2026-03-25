import React from 'react'

const MessageCard = ({ message, type }) => {
  return (
    <div className={`message-card message-${type}`}>
      <div className="message-content">
        <p>{message}</p>
      </div>
    </div>
  )
}

export default MessageCard
