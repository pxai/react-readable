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

export function getComments(id) {
    return {
        type: GET_COMMENTS,
        id
    }
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
        comment
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