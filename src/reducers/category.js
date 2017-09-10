import {
   GET_CATEGORIES
  } from '../actions/category'
  
  const initialCategoriesState = {
    categories: []
  };
  
  export default function category (state = initialCategoriesState, action) {
    console.log('These come from API: ',action.categories)
    switch (action.type) {
      case GET_CATEGORIES:
        return  action.categories;
      default: 
          return state;
    }
  }