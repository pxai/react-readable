import  { Post }  from '../api';

export const GET_POST = 'GET_POST'
export const GET_POSTS = 'GET_POSTS'
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const VOTE_POST = 'VOTE_POST'

export function getPost(id) {
    return {
        type: GET_POST,
        id
    }
}

export function getPostAsync(id) {
    return dispatch => (
        Post.get(id).then(post => post.id)
    )
}

export function getPosts(posts) {
    return {
        type: GET_POSTS,
        posts
    }
}

export function getPostsAsync() {
    return dispatch => (
        Post.getAll().then(posts => dispatch(getPosts(posts)))
    )
}


export function getPostByCategory(category) {
    return {
        type: GET_POSTS_BY_CATEGORY,
        category
    }
}

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

export function addPostAsync(post) {
    return dispatch => (
        Post.create(post).then(() => dispatch(addPost(post)))
    )
}

export function deletePost(id) {
    return {
        type: DELETE_POST,
        id
    }
}


export function deletePostAsync(id) {
    return dispatch => (
        Post.delete(id).then(() => dispatch(deletePost(id)))
    )
}

export function updatePost (post) {
    return {
        type: UPDATE_POST,
        post
    }
}

export function votePost (id) {
    return {
        type: VOTE_POST,
        id
    }
}