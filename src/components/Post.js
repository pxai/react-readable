import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Post extends Component {

  getReadableDate (timestamp) {
    return new Date(timestamp).toISOString()
  }

  render() {
    const post = this.props.post;
    return (
      <div className='post'>
          <h2><Link to={`/post/${post.id}`}>{post.title}</Link></h2>
          <div className='category'><i className="fa fa-tag"></i>  {post.category}</div>
          <div className='body'>
           {post.body}
           <div className='postData'>
           <i className="fa fa-star"></i> {post.voteScore} - <i className="fa fa-user"></i> {post.author}  -  
           - <i className="fa fa-calendar"></i> {this.getReadableDate(post.timestamp)}
           </div>
          </div>
            <div className="comments">
            <strong><i className="fa fa-comment"></i> Comments: </strong>
              { this.props.comments.length}
              </div>
          
        </div>
    )
  }
}

// maps Redux state to our props
function mapStateToProps (state, props) {
  console.log('No comment: ', state.comment.comments);
  return {
    comments: state.comment.comments.filter(comment => comment.parentId === props.post.id )
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)

