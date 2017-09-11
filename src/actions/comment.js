import  { Comment }  from '../api';

export const GET_COMMENT = 'GET_COMMENT'
export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export function getComment(id) {
    return {
        type: GET_COMMENT,
        id
    }
}

export function getByPost(comments) {
    return {
        type: GET_COMMENTS,
        comments
    }
}

export function getByPostAsync() {
    return dispatch => (
        Comment.getByPost().then(comments => dispatch(getByPost(comments)))
    )
}

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export function deleteComment(id) {
    return {
        type: DELETE_COMMENT,
        id
    }
}

export function updateComment (comment) {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

export function voteComment (id) {
    return {
        type: VOTE_COMMENT,
        id
    }
}