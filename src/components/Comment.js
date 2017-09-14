import React, { Component } from 'react'

class Comment extends Component {

  deleteComment= () => {
    console.log('Delete this: ' , this.props.comment.id);
    this.props.deleteComment(this.props.comment.id);
  }

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
           - <i className="fa fa-calendar"></i> {this.getReadableDate(comment.timestamp)} -
           <a onClick={this.deleteComment}><i className="fa fa-trash"></i> delete</a>
           </div>
          </div>

        </div>
    )
  }
}



export default Comment;
