import {
   GET_CATEGORIES
  } from '../actions/category'
  
  const initialCategoriesState = {
    categories: []
  };
  
  export default function category (state = initialCategoriesState, action) {
    switch (action.type) {
      case GET_CATEGORIES:
        return {
              posts: action.categories
        };
      default: 
          return state;
    }
  }