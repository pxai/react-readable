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
        body: post,
        headers: RequestHeaders
      }
    )
    .then(result => result.json() )
  }

  this.vote = function (id) {
    return fetch(url + '/posts', {
        method: 'POST',        
        body: id,
        headers: RequestHeaders
      }
    )
    .then(result => result.json() )
  }

  this.update = function (post, id) {
    return fetch(url +'/posts/' + id, {
        method: 'PUT',         
        body: post,
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
    )
    .then(result => result.json() )
  }
}

export default new Post();