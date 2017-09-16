import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import About  from './components/About';
import PostDetail  from './components/PostDetail';
import PostList  from './PostList';
import './App.css';



class App extends Component {

  render() {

    return (
      <div className="app">
        <div className="list-books">
            <div className="list-books-title">
              <h1>Pello's MyReads</h1>
            </div>

        <Route exact path='/' component={PostList}/>  
        <Route path='/post/:id' component={PostDetail} />
        <Route path='/postList' component={PostList} />
        <Route path='/about' component={About} />
       

        <div>
          <Link to="/postList">Home</Link> | 
          <Link to="/about">About</Link> | 
        </div>
        </div>
      </div>
    );
  }
}

export default App;
