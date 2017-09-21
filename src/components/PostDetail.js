import React, { Component } from 'react'
import { Redirect } from 'react-router';
import Modal from 'react-modal'
import { connect } from 'react-redux';
import CommentModal from './CommentModal';
import PostModal from './PostModal';
import  { getByPostAsync, addCommentAsync, deleteCommentAsync, voteCommentAsync, updateCommentAsync  }  from '../actions/comment';
import  { getPostAsync, votePostAsync, updatePostAsync, deletePostAsync }  from '../actions/post';
import  { getCategoriesAsync }  from '../actions/category';
import Comment from './Comment';
import AlertContainer from 'react-alert'

class Post extends Component {

  state = {
    postModalOpen: false,
    commentModalOpen: false,
    post: {},
    comment: {},
    commentUpdate: false,
    redirectAfterDelete: false
  }

  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 2000,
    transition: 'scale'
  }

  constructor ({match}) {
    super();        
  }

  openPostModal = () => {
    this.setState(() => ({
      postModalOpen: true
    }))
  }

  closePostModal = () => {
    this.setState(() => ({
      postModalOpen: false
    }))
  }


  openCommentModal = (comment, isUpdate) => {
    this.setState(() => ({
      commentModalOpen: true,
      comment,
      commentUpdate: isUpdate
    }))
  }

  closeCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: false,
      comment: {},
      commentUpdate: false
    }))
  }

  addComment = (comment) => {
    if (this.state.commentUpdate) {
      this.props.updateComment(comment);
      this.showMsg('Comment updated');
    } else {
      this.props.addComment(comment);
      this.showMsg('Comment added');
    }
  }  

  showMsg (msg) {
    this.msg.show(msg, { time: 2000, type: 'success'});
  }
  
  deleteComment = (id) => {
    this.props.deleteComment(id);
    this.showMsg('Comment deleted');
  }

  updatePost = (post) => {
    this.props.updatePost(post);
    this.showMsg('Post updated');
  }

  deletePost = (id) => {
    this.props.deletePost(id);
    console.log('Deleted...', id);
    this.setState({redirectAfterDelete: true});
  }

  votePost = (vote) => {
    let option = {option: vote};
    this.props.votePost(this.props.posts[0].id, option);
  }

  voteComment = (id, vote) => {
    let option = {option: vote};
    this.props.voteComment(id, option);
  }

  getReadableDate (timestamp) {
    return new Date(timestamp).toISOString()
  }


  componentWillMount() {
    this.props.getCategories()
    this.props.getPost(this.props.match.params.id);
  }
  
  componentDidMount() {
    console.log('In Did mount ');
  }

  render() {

    if (this.state.redirectAfterDelete) {
      return <Redirect push to="/deleted"/>;
    }

    const post = this.props.posts[0];
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
           <span className="span-button"><a  onClick={() => this.deletePost(post.id)}><i className="fa fa-trash"></i> delete</a></span>
           <span className="span-button">
             <a  onClick={() => (this.votePost('upVote'))} title="vote up"><i className="fa fa-thumbs-o-up" aria-hidden="true" ></i>Up</a>
             <a  onClick={() => (this.votePost('downVote'))} title="vote down"><i className="fa fa-thumbs-o-down" aria-hidden="true" ></i>Down</a>
          </span>
          <span className="span-button">
             <a  onClick={this.openPostModal}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Update</a>
          </span>
           </div>

          </div>

              <h4><i className="fa fa-comment"></i> Comments</h4>
              <button
                className="button primary-button"
                onClick={() => this.openCommentModal({},false)}>
                <i className="fa fa-comments-o"></i>+ Add Comment
              </button>
              <div className="comments">
                {   comments.map((comment) =>
                  (
                      <Comment key={comment.id} comment={comment} deleteComment={this.deleteComment} openCommentModal={(comment) => this.openCommentModal(comment, true)} voteComment={this.voteComment} />
                ))}
              </div>
          
          <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.postModalOpen}
          onRequestClose={this.closePostModal}
          contentLabel='Modal'
        >
         <PostModal title="Update Post" onCreatePost={this.updatePost} categories={this.props.categories} post={post} closePostModal={this.closePostModal} />
        </Modal>

          <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.commentModalOpen}
          onRequestClose={this.closeCommentModal}
          contentLabel='Modal'
        >
         <CommentModal post={post} comment={this.state.comment} onCreateComment={this.addComment} closeCommentModal={this.closeCommentModal} />
        </Modal>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        </div>
    )
  }
}

// maps Redux state to our props
function mapStateToProps (state, props) {
  console.log('In map state to props', state.post.posts);
  return {
    posts: state.post.posts,
    comments: state.comment.comments.filter(p => p.parentId === props.match.params.id),
    categories: state.category.categories
  }
}

function mapDispatchToProps (dispatch) {
  console.log('In dispatc to props');
  return {
    getCategories: () => dispatch(getCategoriesAsync()),
    getPost: (id) => dispatch(getPostAsync(id)),
    getByPost: (id) => dispatch(getByPostAsync(id)),
    addComment: (comment) => dispatch(addCommentAsync(comment)),
    updateComment: (comment) => dispatch(updateCommentAsync(comment)),
    deleteComment: (id) => dispatch(deleteCommentAsync(id)),
    deletePost: (id) => dispatch(deletePostAsync(id)),
    votePost: (id, vote) => dispatch(votePostAsync(id,vote)),
    voteComment: (id, vote) => dispatch(voteCommentAsync(id,vote)),
    updatePost: (post) => dispatch(updatePostAsync(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)

