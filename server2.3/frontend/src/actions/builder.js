import API from "../utils/api";

export const ACTION_TYPES = {
    BUILDER_CREATE: 'BUILDER_CREATE',
    BUILDER_UPDATE: 'BUILDER_UPDATE',
    BUILDER_DELETE: 'BUILDER_DELETE',
    BUILDER_FETCH: 'BUILDER_FETCH',
    BUILDER_FETCH_ALL: 'BUILDER_FETCH_ALL',
    BUILDER_PAGINATION: 'BUILDER_PAGINATION'
}

export const fetchAll = () => dispatch => {
    API.builder().fetchAll()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.BUILDER_FETCH_ALL,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const Pagination = (page = 1, limit = 5, name = "", deployed = "") => dispatch => {
    API.builder().fetchPagination(page, Math.abs(limit), name, deployed)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.BUILDER_PAGINATION,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchById = (id, onSuccess) => dispatch => {
    API.builder().fetchById(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.BUILDER_FETCH,
                payload: res.data
            })
            onSuccess(res.data)
        })
        .catch(err => console.log(err))
}

export const create = (input, onSuccess) => dispatch => {
    API.builder().create(input)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.BUILDER_CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, input, onSuccess) => dispatch => {
    API.builder().update(id, input)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.BUILDER_UPDATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    API.builder().delete(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.BUILDER_DELETE,
                payload: res.data.id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
