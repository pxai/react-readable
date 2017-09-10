import  { Category }  from '../api';

export const GET_CATEGORIES = 'GET_CATEGORIES'

export const getCategories = (categories) => {
    console.log('yeah, madafaka!!')
    return {
        type: GET_CATEGORIES
    }
}

export function getCategoriesAsync() {
    return dispatch => (
        Category.getAll().then((categories) => dispatch(getCategories(categories)))
    )
}
/*
export const getCategoriesAsync = () => dispatch => (
        Category.getAll().then((categories) => dispatch(getCategories(categories)))
)*/
