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

export function getByPost(postId,comments) {
    return {
        type: GET_COMMENTS,
        postId,
        comments
    }
}

export function getByPostAsync(id) {
    return dispatch => (
        Comment.getByPost(id).then(comments => dispatch(getByPost(id,comments)))
    )
}

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export function addCommentAsync(comment) {
    return dispatch => (
        Comment.create(comment).then(() => dispatch(addComment(comment)))
    )
}

export function deleteComment(id) {
    return {
        type: DELETE_COMMENT,
        id
    }
}

export function deleteCommentAsync(id) {
    return dispatch => (
        Comment.delete(id).then(() => dispatch(deleteComment(id)))
    )
}

export function updateComment (comment) {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

export function updateCommentAsync(comment) {
    console.log('Updating comment : ', comment);
    return dispatch => (
        Comment.update(comment).then((comment) => dispatch(updateComment(comment)))
    )
}

export function voteComment (comment) {
    return {
        type: VOTE_COMMENT,
        comment
    }
}

export function voteCommentAsync(id, vote) {
    return dispatch => (
        Comment.vote(id, vote).then((comment) => dispatch(voteComment(comment)))
    )
}