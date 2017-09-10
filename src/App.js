import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

import './App.css';
import  { getCategoriesAsync }  from './actions/category';

class App extends Component {
  render() {
    console.log('Props', this.props)
    this.props.getCategories()
    return (
      <div className="app">
        <div className="list-books">
            <div className="list-books-title">
              <h1>Pello's MyReads</h1>
            </div>

        <Route path="/" exact render={() => (
            <h1>Home</h1>
        )}/>
        <Route path="/posts" exact render={({history}) => (
          <h1>Posts</h1>
        )}/>
        <Route path='/comments' render={({ history }) => (
          <h1>Comments</h1>
        )}/>
        
        <div className="open-search">
              <Link to='/' className='open-search'>Home</Link>
            </div>
            <div className="open-search">
              <Link to='/posts' className='open-search'>Posts</Link>
            </div>
            <div className="open-create">
              <Link to='/comments' className='add-book'>Comments</Link>
            </div>
        </div>
      </div>
    );
  }
}

// maps Redux state to our props
function mapStateToProps (state, props) {
  return {
    posts: state.posts,
    comments: state.comments,
    categories: state.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(getCategoriesAsync())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

