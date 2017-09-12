import React, { Component } from 'react'

class Comment extends Component {

  getReadableDate (timestamp) {
    return new Date(timestamp).toISOString()
  }

  render() {
    const comment = this.props.comment;

    return (
      <div className='comment'>
          <h2>{comment.title}</h2>
          <div className='body'>
           {comment.body}
           <div className='postData'>
           <i className="fa fa-star"></i> {comment.voteScore} - <i className="fa fa-user"></i> {comment.author}  -  
           - <i className="fa fa-calendar"></i> {this.getReadableDate(comment.timestamp)}
           </div>
          </div>
    
        </div>
    )
  }
}

export default Comment;
