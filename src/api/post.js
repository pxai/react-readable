import RequestHeaders from './headers'

const url = 'http://localhost:3001';

const Post = function () {
    this.getPosts = function () {
      fetch(url + '/posts', {
          method: 'GET', 
          headers: RequestHeaders
        }
      )
      .then((result) => console.log(result.json()) )
   }

}

export default new Post();