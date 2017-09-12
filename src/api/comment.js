import RequestHeaders from './headers'

const url = 'http://localhost:3001';

const Comment = function () {
    this.getComments = function () {
      return fetch(url + '/comments', {
          method: 'GET', 
          headers: RequestHeaders
        }
      )
        .then(result => result.json())
   }

   this.get = function (id) {
    return fetch(url +'/comments/' + id, {
        method: 'GET', 
        headers: RequestHeaders
      }
    )
    .then(result => result.json())
  }

   this.getByPost = function (id) {
    return fetch(url + '/posts/'+id+'/comments', {
        method: 'GET', 
        headers: RequestHeaders
      }
    )
    .then(result => result.json())
  }

  this.create = function (comment) {
    return fetch(url + '/comments', {
        method: 'POST', 
        body: JSON.stringify(comment),
        headers: RequestHeaders
      }
    )
    .then(result => result.json())
  }


  this.vote = function (id) {
    return fetch(url + '/comments', {
        method: 'POST', 
        body: id,
        headers: RequestHeaders
      }
    )
    .then(result => result.json())
  }

  this.update = function (comment, id) {
    return fetch(url +'/comments/' + id, {
        method: 'PUT', 
        body: comment,
        headers: RequestHeaders
      }
    )
    .then(result => result.json())
  }

  this.delete = function (id) {
    return fetch(url +'/comments/' + id, {
        method: 'DELETE', 
        headers: RequestHeaders
      }
    )
    .then(result => result.json())
  }

}

export default new Comment();