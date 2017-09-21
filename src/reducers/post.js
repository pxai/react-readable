import {
    GET_POST,
    GET_POSTS,
    GET_POSTS_BY_CATEGORY,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
    VOTE_POST 
  } from '../actions/post'
  
  const initialPostsState = {
    posts: []
  };
  
  export default function post (state = initialPostsState, action) {
    switch (action.type) {
      case GET_POSTS:
        return { posts: action.posts.filter(elem => !elem.deleted)};
      case GET_POST:
        return { posts: [action.post]};
      case GET_POSTS_BY_CATEGORY:
        return { posts: state.posts.filter(elem => elem.category === action.category) };
      case ADD_POST:
        return {
              posts: [
                ...state.posts,
                action.post
            ]
        };
      case VOTE_POST:
        return { posts: 
                  state.posts.map( (elem) => {
                    if(elem.id !== action.post.id) {
                        // This isn't the item we care about - keep it as-is
                        return elem;
                    }
                    return action.post;
                    // Otherwise, this is the one we want - return an updated value
                    /*return {
                        ...elem,
                        voteScore: 666
                    };*/    
                })
              };
      case DELETE_POST:
        return { posts: state.posts.filter(elem => elem.id !== action.id) };
      case UPDATE_POST:
        return { posts: 
                  state.posts.map( (elem) => {
                  if(elem.id !== action.post.id) {
                      // This isn't the item we care about - keep it as-is
                      return elem;
                  }
                  
                  // Otherwise, this is the one we want - return an updated value
                  return {
                      ...elem,
                      ...action.post
                  };    
              })
            };
      default: 
          return state;
    }
  }