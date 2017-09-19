import React, { Component } from 'react';
import Modal from 'react-modal'
import { connect } from 'react-redux';
import Post  from './components/Post';
import PostModal from './components/PostModal';
import './App.css';
import  { getPostsAsync, addPostAsync, deletePostAsync, getPostsByCategory }  from './actions/post';
import  { getCategoriesAsync }  from './actions/category';

class PostList extends Component {
  state = {
    category: '',
    postModalOpen: false
  }

  openPostModal = () => { this.setState(() => ({ postModalOpen: true})) }

  closePostModal = () => {
    this.setState(() => ({
      postModalOpen: false
    }))
  }


  addPost = (post) => {
    this.props.addPost(post);
  }
  
  deletePost = (id) => {
    console.log('Delete post: ' , id);
    this.props.deletePost(id);
  }
  
  getByCategory = (e,category) => {
    e.preventDefault();
   // this.props.getPostsByCategory(category);
    this.setState({category: category});
  }

  componentDidMount() {
    this.props.getCategories()
    this.props.getPosts()
  }

  render() {
    var postList;
    const emptyPost = {id: 0, title: '', author: '', category: '', body: ''};
    if (this.state.category === '') {
      postList = this.props.posts.map((post) => ( <Post  key={post.id} post={post} deletePost={this.deletePost} />)) ;
    } else {
      postList = this.props.posts
                        .filter(post => post.category === this.state.category)
                        .map(post => ( <Post  key={post.id} post={post} deletePost={this.deletePost} />)) ;
    }
    return (
      <div className="app">
          <div>
            <h2>Posts {this.state.category}</h2>
            <div className="row">
              <div className="three columns">
              <button
                className="buttton-primary"
                onClick={this.openPostModal}>
                 + Add Post
              </button>
              </div>
              <div className="categories eight columns">Categories: 
                { 
                   this.props.categories.map((category) =>
                   (
                        <span key={category.name}>
                          <a className="category" href="" onClick={(e) => this.getByCategory(e,category.name)}>
                            <span>{category.name}</span>
                           </a>
                        </span>

                   ))}
                   <span>  <a className="category" href="" onClick={(e) => this.getByCategory(e,'')}><span>ALL</span></a> </span>
              </div>
              </div>     
              <div className="posts">
              {postList}
              </div>
            
          </div>
      

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.postModalOpen}
          onRequestClose={this.closePostModal}
          post={emptyPost}
          contentLabel='Modal'
        >
         <PostModal  title="Create Post" onCreatePost={this.addPost} categories={this.props.categories} closePostModal={this.closePostModal} />
        </Modal>
      </div>
    );
  }
}

// maps Redux state to our props
function mapStateToProps (state, props) {
  return {
    posts: state.post.posts,
    categories: state.category.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(getCategoriesAsync()),
    getPosts: () => dispatch(getPostsAsync()),
    getPostsByCategory: (category) => dispatch(getPostsByCategory(category)),
    addPost: (post) => dispatch(addPostAsync(post)),
    deletePost: (id) => dispatch(deletePostAsync(id))
  }
}
   
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)

