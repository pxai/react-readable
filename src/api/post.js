import RequestHeaders from './headers'

const url = 'http://localhost:3001';

const Post = function () {

    this.getAll = function () {
      return fetch(url + '/posts', {
          method: 'GET', 
          headers: RequestHeaders
        }
      )
      .then(result => result.json())
   }
   
   this.get = function (id) {
    return fetch(url +'/posts/' + id, {
        method: 'GET', 
        headers: RequestHeaders
      }
    )
    .then(result => result.json() )
  }

   this.getByCategory = function (category) {
    return fetch(url + '/'+category+'/posts', {
        method: 'GET', 
        headers: RequestHeaders
      }
    )
    .then(result => result.json() )
  }

  this.create = function (post) {
    return fetch(url + '/posts', {
        method: 'POST',        
        body: JSON.stringify(post),
        headers: RequestHeaders
      }
    )
    .then(result => result.json() )
  }

  this.vote = function (id, vote) {
    return fetch(url + '/posts/' + id, {
        method: 'POST',        
        body: JSON.stringify(vote),
        headers: RequestHeaders
      }
    )
    .then(result => result.json() )
  }

  this.update = function (post, option) {
    return fetch(url +'/posts/' + post.id, {
        method: 'PUT',         
        body: JSON.stringify(post),
        headers: RequestHeaders
      }
    )
    .then(result => result.json() )
  }

  this.delete = function (id) {
    return fetch(url +'/posts/' + id, {
        method: 'DELETE', 
        headers: RequestHeaders
      }
    );
  }
}

export default new Post();