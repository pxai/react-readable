import RequestHeaders from './headers'

const url = 'http://localhost:3001';

const Comment = function () {
    this.getComments = function () {
      fetch(url + '/comments', {
          method: 'GET', 
          headers: RequestHeaders
        }
      )
      .then((result) => console.log(result.json()) )
   }

   this.get = function (id) {
    fetch(url +'/comments/' + id, {
        method: 'GET', 
        headers: RequestHeaders
      }
    )
    .then((result) => console.log(result.json()) )
  }

   this.getByPost = function (id) {
    fetch(url + '/posts/'+id+'/comments', {
        method: 'GET', 
        headers: RequestHeaders
      }
    )
    .then((result) => console.log(result.json()) )
  }

  this.create = function (comment) {
    fetch(url + '/comments', {
        method: 'POST', 
        body: comment,
        headers: RequestHeaders
      }
    )
    .then((result) => console.log(result.json()) )
  }

  this.update = function (comment, id) {
    fetch(url +'/comments/' + id, {
        method: 'PUT', 
        body: comment,
        headers: RequestHeaders
      }
    )
    .then((result) => console.log(result.json()) )
  }

  this.delete = function (id) {
    fetch(url +'/comments/' + id, {
        method: 'DELETE', 
        headers: RequestHeaders
      }
    )
    .then((result) => console.log(result.json()) )
  }

}

export default new Comment();