import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux';
import CommentModal from './CommentModal';
import  { getByPostAsync, addCommentAsync }  from '../actions/comment';
import {deleteCommentAsync} from '../actions/comment'
import Comment from './Comment';

class Post extends Component {
  state = {
    commentModalOpen: false
  }


  openCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: true
    }))
  }

  closeCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: false
    }))
  }

  addComment = (comment) => {
    this.props.addComment(comment);
  }  
  
  deleteComment= (id) => {
    console.log('Delete this: ' , id);
    this.props.deleteComment(id);
  }


  

  getReadableDate (timestamp) {
    return new Date(timestamp).toISOString()
  }
  componentDidMount() {
    this.props.getByPost(this.props.post.id)
  }

  render() {
    const post = this.props.post;
    return (
      <div className='post'>
          <h2>{post.title}</h2>
          <div className='category'><i className="fa fa-tag"></i>  {post.category}</div>
          <div className='body'>
           {post.body}
           <div className='postData'>
           <i className="fa fa-star"></i> {post.voteScore} - <i className="fa fa-user"></i> {post.author}  -  
           - <i className="fa fa-calendar"></i> {this.getReadableDate(post.timestamp)}
           </div>

          </div>

              <h4><i className="fa fa-comment"></i> Comments</h4>
              <button
                className="button primary-button"
                onClick={this.openCommentModal}>
                <i className="fa fa-comments-o"></i>+ Add Comment
              </button>
              <div className="comments">
              { 
                this.props.comments.map((comment) =>
                    (
                                <Comment key={comment.id} comment={comment} deleteComment={this.deleteComment} />
            ))}
              </div>
          
          <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.commentModalOpen}
          onRequestClose={this.closeCommentModal}
          contentLabel='Modal'
        >
         <CommentModal post={post} onCreateComment={this.addComment} closeCommentModal={this.closeCommentModal} />
        </Modal>
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
    getByPost: (id) => dispatch(getByPostAsync(id)),
    addComment: (comment) => dispatch(addCommentAsync(comment)),
    deleteComment: (id) => dispatch(deleteCommentAsync(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)

