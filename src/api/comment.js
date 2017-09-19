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


  this.vote = function (id, vote) {
    return fetch(url + '/comments/' + id, {
        method: 'POST', 
        body: JSON.stringify(vote),
        headers: RequestHeaders
      }
    )
    .then(result => result.json())
  }

  this.update = function (comment) {
    return fetch(url +'/comments/' + comment.id, {
        method: 'PUT', 
        body: JSON.stringify(comment),
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
    );
  }

}

export default new Comment();