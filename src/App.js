import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import About  from './components/About';
import Post  from './components/Post';
import './App.css';
import  { getCategoriesAsync }  from './actions/category';
import  { getPostsAsync }  from './actions/post';

class App extends Component {
  
  componentDidMount() {
    this.props.getCategories()
    this.props.getPosts()
   /* .then((posts) => this.setState(() => ({
      posts,
      loadingFood: false,
    })))*/
  }

  render() {
    console.log('Props', this.props)

    return (
      <div className="app">
        <div className="list-books">
            <div className="list-books-title">
              <h1>Pello's MyReads</h1>
            </div>

        <Route path="/" exact render={() => (
          <div>
            <h1>Home</h1>
              <div className="categories">Categories: 
                { 
                   this.props.categories.map((category) =>
                   (
                           <span key={category.name}>{category.name}</span>
                   ))}
              </div>
            
              <div className="posts">
              { 
                  this.props.posts.map((post) =>
                (
                            <Post  post={post}  />
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
        <div className="open-search">
              <Link to='/' >Home</Link>
            </div>
            <div className="open-search">
              <Link to='/posts' >Posts</Link>
            </div>
            <div className="open-create">
              <Link to='/comments'>Comments</Link>
            </div>
            <div className="open-create">
              <Link to='/about'>About</Link>
            </div>
        </div>
      </div>
    );
  }
}

// maps Redux state to our props
function mapStateToProps (state, props) {
  return {
    posts: state.post,
    comments: state.comments,
    categories: state.category.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(getCategoriesAsync()),
    getPosts: () => dispatch(getPostsAsync())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

