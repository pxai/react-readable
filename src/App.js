import React, { Component } from 'react';
import Modal from 'react-modal'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import About  from './components/About';
import Post  from './components/Post';
import PostModal from './components/PostModal';
import './App.css';
import  { getCategoriesAsync }  from './actions/category';
import  { getPostsAsync, addPostAsync, deletePostAsync }  from './actions/post';


class App extends Component {
  state = {
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
  
  /*
  deletePost = (id) => {
    console.log('Deleting post ', id);
    this.props.deletePost(id);
  }*/

  componentDidMount() {
    this.props.getCategories()
    this.props.getPosts()

  }

  render() {

    return (
      <div className="app">
        <div className="list-books">
            <div className="list-books-title">
              <h1>Pello's MyReads</h1>
            </div>

        <Route path="/" exact render={() => (
          <div>
            <h2>Posts</h2>
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
                          <a className="category" href="">
                            <span>{category.name}</span>
                           </a>
                        </span>

                   ))}
              </div>
              </div>     
              <div className="posts">
              { 
                this.props.posts.map((post) =>
                    (
                                <Post  key={post.id} post={post} />
            ))}
              </div>
            
          </div>
        )}/>

        <Route path="/posts" exact render={({history}) => (
          <h1>Posts</h1>
        )}/>
        <Route path='/comments' render={({ history }) => (
          <h1>Comments</h1>
        )}/>
        <Route path='/about' render={({ history }) => (
          <About />
        )}/>
        <span >
              <Link to='/'>Home</Link>
            </span>
            <span >
              <Link to='/posts' >Posts</Link>
              </span>
            <span >
              <Link to='/comments'>Comments</Link>
              </span>
            <span >
              <Link to='/about'>About</Link>
              </span>
        </div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.postModalOpen}
          onRequestClose={this.closePostModal}
          contentLabel='Modal'
        >
         <PostModal onCreatePost={this.addPost} categories={this.props.categories} closePostModal={this.closePostModal} />
        </Modal>
      </div>
    );
  }
}

// maps Redux state to our props
function mapStateToProps (state, props) {
  return {
    posts: state.post.posts,
    comments: state.comment.comments,
    categories: state.category.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(getCategoriesAsync()),
    getPosts: () => dispatch(getPostsAsync()),
    addPost: (post) => dispatch(addPostAsync(post)),
    deletePost: (id) => dispatch(deletePostAsync(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

