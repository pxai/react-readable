import RequestHeaders from './headers'

const url = 'http://localhost:3001';

const Category = function () {
    this.getCategories = function () {
      fetch(url + '/categories', {
          method: 'GET', 
          headers: RequestHeaders
        }
      )
      .then((result) => console.log(result.json()) )
   }

}

export default new Category();