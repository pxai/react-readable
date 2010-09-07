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

}

export default new Comment();