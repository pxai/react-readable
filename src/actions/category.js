import  { Category }  from '../api';

export const GET_CATEGORIES = 'GET_CATEGORIES'

export function getCategories(categories) {
    console.log('yeah, madafaka!!')
    return {
        type: GET_CATEGORIES,
        categories
    }
}

export function getCategoriesAsync() {
    return dispatch => (
        Category.getCategories().then(categories => dispatch(getCategories(categories)))
    )
}
