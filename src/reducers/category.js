import {
   GET_CATEGORIES
  } from '../actions/category'
  
  const initialCategoriesState = {
    categories: []
  };
  
  export default function categoryList (state = initialCategoriesState, action) {
    switch (action.type) {
      case GET_CATEGORIES:
        return state;
      default: 
          return state;
    }
  }