import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux';
import CommentModal from './CommentModal';
import  { getByPostAsync, addCommentAsync, deleteCommentAsync, voteCommentAsync  }  from '../actions/comment';
import  { getPostAsync, votePostAsync }  from '../actions/post';
import Comment from './Comment';

class Post extends Component {

  state = {
    commentModalOpen: false,
    post: {}
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

  votePost = (vote) => {
    let option = {option: vote};
    this.props.votePost(this.props.post.id, option);
  }

  voteComment = (id, vote) => {
    console.log('Voting comment: ', id, vote);
    let option = {option: vote};
    this.props.voteComment(id, option);
  }

  getReadableDate (timestamp) {
    return new Date(timestamp).toISOString()
  }
  

  render() {

    const post = this.props.post;
    const comments = this.props.comments;

    return (
      <div className='post'>
          <h2>{post.title}</h2>
          <div className='category'><i className="fa fa-tag"></i>  {post.category}</div>
          <div className='body'>
           {post.body}
           <div className='postData'>
           <i className="fa fa-star"></i> {post.voteScore} - <i className="fa fa-user"></i> {post.author}  -  
           - <i className="fa fa-calendar"></i> {this.getReadableDate(post.timestamp)}
           <span className="span-button"><a  onClick={this.deletePost}><i className="fa fa-trash"></i> delete</a></span>
           <span className="span-button">
             <a  onClick={() => (this.votePost('upVote'))}><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></a>
             <a  onClick={() => (this.votePost('downVote'))}><i className="fa fa-thumbs-o-down" aria-hidden="true"></i></a>
          </span>
           </div>

          </div>

              <h4><i className="fa fa-comment"></i> Comments</h4>
              <button
                className="button primary-button"
                onClick={this.openCommentModal}>
                <i className="fa fa-comments-o"></i>+ Add Comment
              </button>
              <div className="comments">
                {   comments.map((comment) =>
                  (
                      <Comment key={comment.id} comment={comment} deleteComment={this.deleteComment} voteComment={this.voteComment} />
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
  console.log('MApping: ', props)
  return {
    post: state.post.posts.filter(p => p.id === props.match.params.id)[0],
    comments: state.comment.comments.filter(p => p.parentId === props.match.params.id)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPost: (id) => dispatch(getPostAsync(id)),
    getByPost: (id) => dispatch(getByPostAsync(id)),
    addComment: (comment) => dispatch(addCommentAsync(comment)),
    deleteComment: (id) => dispatch(deleteCommentAsync(id)),
    votePost: (id, vote) => dispatch(votePostAsync(id,vote)),
    voteComment: (id, vote) => dispatch(voteCommentAsync(id,vote))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)

