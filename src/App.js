import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import  { Category, Comment, Post }  from './api';

class App extends Component {
  render() {
    Category.getAll();
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

export default App;
