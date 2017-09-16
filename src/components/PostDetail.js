import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CommentModal from './CommentModal';
import  { getByPostAsync, addCommentAsync, deleteCommentAsync  }  from '../actions/comment';
import  { getPostAsync }  from '../actions/post';
import Comment from './Comment';

class Post extends Component {

  state = {
    commentModalOpen: false,
    post: 0,
    test: ''
  }

  constructor ({match}) {
    super();
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
  
  deleteComment = (id) => {
    console.log('Delete this: ' , id);
    this.props.deleteComment(id);
  }

  deletePost= () => {
    console.log('Delete this post: ' , this.props.post.id);
    this.props.deletePost(this.props.post.id);
  }

  getReadableDate (timestamp) {
    return new Date(timestamp).toISOString()
  }
  
  onCreateComment() {
  }

  render() {
    console.log('Props[render]: ', this.props.match.params);
    console.log('Id post: ', this.props.match.params.id);
    const comments = this.props.getByPost(this.props.match.params.id);
    const post = this.props.posts.filter(elem => elem.id === this.props.match.params.id)[0];

    return (
      <div className='post'>
          <h2>{post.title}</h2>
          <div className='category'><i className="fa fa-tag"></i>  {post.category}</div>
          <div className='body'>
           {post.body}
           <div className='postData'>
           <i className="fa fa-star"></i> {post.voteScore} - <i className="fa fa-user"></i> {post.author}  -  
           - <i className="fa fa-calendar"></i> this.getReadableDate(post.timestamp)
           <a  onClick={this.deletePost}><i className="fa fa-trash"></i> delete</a>
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
    posts: state.post.posts,
    comments: state.comment.comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPost: (id) => dispatch(getPostAsync(id)),
    getByPost: (id) => dispatch(getByPostAsync(id)),
    addComment: (comment) => dispatch(addCommentAsync(comment)),
    deleteComment: (id) => dispatch(deleteCommentAsync(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)

