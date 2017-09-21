import React, { Component } from 'react';
import Modal from 'react-modal'
import { connect } from 'react-redux';
import Post  from './components/Post';
import PostModal from './components/PostModal';
import './App.css';
import  { getPostsAsync, addPostAsync, deletePostAsync, getPostsByCategory }  from './actions/post';
import  { getCategoriesAsync }  from './actions/category';
import AlertContainer from 'react-alert'

class PostList extends Component {
  state = {
    category: '',
    posts: {},
    postModalOpen: false,
    sortByDate: 0,
    sortByVotes: 0
  }

  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 3000,
    transition: 'scale'
  }

  openPostModal = () => { this.setState(() => ({ postModalOpen: true})) }

  setSortByDate (e) {
    e.preventDefault();
    this.setState({ sortByVotes: 0}); 
    const newValue = this.state.sortByDate===0?true:!this.state.sortByDate;
    this.setState({ sortByDate: newValue}); 
  }
  
  setSortByVotes (e) {
    e.preventDefault();
    this.setState({ sortByDate: 0}); 
    const newValue = this.state.sortByVotes===0?true:!this.state.sortByVotes;
    this.setState({ sortByVotes: newValue});
  }

  closePostModal = () => {
    this.setState(() => ({
      postModalOpen: false
    }))
  }


  addPost = (post) => {
    this.props.addPost(post);
    this.showMsg('Post successfully created!');
  }
  
  deletePost = (id) => {
    console.log('Delete post: ' , id);
    this.props.deletePost(id);
    this.showMsg('Post was deleted!');
  }

  showMsg (msg) {
    this.msg.show(msg, { time: 2000, type: 'success'});
  }
  
  getByCategory = (e,category) => {
    e.preventDefault();
   // this.props.getPostsByCategory(category);
    this.setState({category: category});
  }

  componentWillMount() {
    this.props.getCategories()
    this.props.getPosts()
  }

  render() {
    var postListByCategory = {};
    var tmpPostList = {};   
    const emptyPost = {id: 0, title: '', author: '', category: '', body: ''};

    if (this.state.category === '') {
      postListByCategory = this.props.posts;
    } else {
      postListByCategory = this.props.posts.filter(post => post.category === this.state.category);
    }

    if (this.state.sortByDate !== 0) {
      if (this.state.sortByDate) {
        tmpPostList = postListByCategory.sort((a, b) => a.timestamp < b.timestamp);
      } else {
        tmpPostList = postListByCategory.sort((a, b) => a.timestamp > b.timestamp);
      }
    } else if (this.state.sortByVotes !== 0) {
      if (this.state.sortByVotes) {
        tmpPostList = postListByCategory.sort((a, b) => a.voteScore < b.voteScore);
      } else {
        tmpPostList = postListByCategory.sort((a, b) => a.voteScore > b.voteScore);
      }
    } else {
      tmpPostList = postListByCategory;
    }

    const postList = tmpPostList;

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
              <div className="categories four columns">Sort by:  
                <span className="span-button">  <a className="category" href="" onClick={(e) => this.setSortByDate(e)}>By date</a> </span>
                <span className="span-button">  <a className="category" href="" onClick={(e) => this.setSortByVotes(e)}>By votes</a> </span>
             </div>
              <div className="categories five columns">Categories: 
                { 
                   this.props.categories.map((category) =>
                   (
                        <span key={category.name}>
                          <a className="category" href="" onClick={(e) => this.getByCategory(e,category.name)}>
                            <span>{category.name}</span>
                           </a>
                        </span>

                   ))}         
              </div>
              </div>     
              <div className="posts">
              { 
                   postList.map((post) =>
                   (
                    <Post  key={post.id} post={post} deletePost={this.deletePost} />
                   ))
                   }    

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
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
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

