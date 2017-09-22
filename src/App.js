import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import About  from './components/About';
import NotFound  from './components/NotFound';
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
            <div>
              <Link to="/">Home</Link> | 
              <Link to="/about">About</Link> | 
            </div>
            <Switch>
              <Route exact path='/' component={PostList}/>  
              <Route path='/post/:category/:id' component={PostDetail} />
              <Route exact path='/postList' component={PostList} />
              <Route exact path='/deleted' component={PostList}/> 
              <Route exact path='/about' component={About} />
              <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
