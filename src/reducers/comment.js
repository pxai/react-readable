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
  
  export default function comment (state = initialCommentsState, action) {
  
    switch (action.type) {
      case GET_COMMENTS:
        if (action.comments.length > 0) {
          var newComments = state.comments.concat(action.comments.filter(elem => !elem.deleted));
                    return {
                        ...state,
                        comments: newComments
                    };
        } else {  
          return state;
        }
      case GET_COMMENT:
        return state.comments.filter(elem => elem.id === action.id);
      case ADD_COMMENT:
          return {
              comments: [
                ...state.comments,
                action.comment
            ]
        };
      case VOTE_COMMENT:
      return { comments: 
        state.comments.map( (elem) => {
          if(elem.id !== action.comment.id) {
              // This isn't the item we care about - keep it as-is
              return elem;
          }
          return action.comment;
          // Otherwise, this is the one we want - return an updated value
          /*return {
              ...elem,
              voteScore: 666
          };*/    
      })
    };
      case DELETE_COMMENT:
      console.log('Deleting: ', action.id);
        return { comments: state.comments.filter(elem => elem.id !== action.id) };
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