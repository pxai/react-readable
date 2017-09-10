import RequestHeaders from './headers'

const url = 'http://localhost:3001';

const Post = function () {

    this.getAll = function () {
      fetch(url + '/posts', {
          method: 'GET', 
          headers: RequestHeaders
        }
      )
      .then((result) => console.log(result.json()) )
   }
   
   this.get = function (id) {
    fetch(url +'/posts/' + id, {
        method: 'GET', 
        headers: RequestHeaders
      }
    )
    .then((result) => console.log(result.json()) )
  }

   this.getByCategory = function (category) {
    fetch(url + '/'+category+'/posts', {
        method: 'GET', 
        headers: RequestHeaders
      }
    )
    .then((result) => console.log(result.json()) )
  }

  this.create = function (post) {
    fetch(url + '/posts', {
        method: 'POST',        
        body: post,
        headers: RequestHeaders
      }
    )
    .then((result) => console.log(result.json()) )
  }

  this.vote = function (id) {
    fetch(url + '/posts', {
        method: 'POST',        
        body: id,
        headers: RequestHeaders
      }
    )
    .then((result) => console.log(result.json()) )
  }

  this.update = function (post, id) {
    fetch(url +'/posts/' + id, {
        method: 'PUT',         
        body: post,
        headers: RequestHeaders
      }
    )
    .then((result) => console.log(result.json()) )
  }

  this.delete = function (id) {
    fetch(url +'/posts/' + id, {
        method: 'DELETE', 
        headers: RequestHeaders
      }
    )
    .then((result) => console.log(result.json()) )
  }
}

export default new Post();