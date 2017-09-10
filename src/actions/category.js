import  { Category }  from '../api';

export const GET_CATEGORIES = 'GET_CATEGORIES'

export function getCategories(categories) {
    return {
        type: GET_CATEGORIES,
        categories
    }
}

export function getCategoriesAsync() {
    return dispatch => (
        Category.getAll().then(categories => dispatch(getCategories(categories)))
    )
}
/*
// The other way, I'm using the old skwel style
export const getCategoriesAsync = () => dispatch => (
        Category.getAll().then((categories) => dispatch(getCategories(categories)))
)*/
