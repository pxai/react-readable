import {
    GET_COMMENT,
    GET_COMMENTS,
    ADD_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT,
    VOTE_COMMENT 
  } from '../actions/comment'
  
  const initialCommentsState = {
    comments: []
  };
  
  export default function todoList (state = initialCommentsState, action) {
  
    switch (action.type) {
      case GET_COMMENTS:
        return state;
      case GET_COMMENT:
        return state.comments.filter(elem => elem.id == action.id);
      case ADD_COMMENT:
        return {
            ...state, 
              comments: [
                ...state.comments,
                action.comments
            ]
        };
      case DELETE_COMMENT:
        return state.comments.filter(elem => elem.id !== action.id);
      case UPDATE_COMMENT:
        return state.comments.map( (elem) => {
                  if(elem.id !== action.comment.id) {
                      // This isn't the item we care about - keep it as-is
                      return elem;
                  }
                  
                  // Otherwise, this is the one we want - return an updated value
                  return {
                      ...elem,
                      ...action.comment
                  };    
              });
      default: 
          return state;
    }
  }