import API from "../utils/api";

export const ACTION_TYPES = {
    MACHINE_CREATE: 'MACHINE_CREATE',
    MACHINE_UPDATE: 'MACHINE_UPDATE',
    MACHINE_DELETE: 'MACHINE_DELETE',
    MACHINE_FETCH: 'MACHINE_FETCH',
    MACHINE_FETCH_ALL: 'MACHINE_FETCH_ALL',
    MACHINE_PAGINATION: 'MACHINE_PAGINATION'
}

export const fetchAll = () => dispatch => {
    API.machine().fetchAll()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.MACHINE_FETCH_ALL,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const Pagination = (page = 1, limit = 5, name = "", ip = "") => dispatch => {
    API.machine().fetchPagination(page, Math.abs(limit), name, ip)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.MACHINE_PAGINATION,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchById = (id, onSuccess) => dispatch => {
    API.machine().fetchById(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.MACHINE_FETCH,
                payload: res.data
            })
            onSuccess(res.data)
        })
        .catch(err => console.log(err))
}

export const create = (input, onSuccess) => dispatch => {
    API.machine().create(input)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.MACHINE_CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, input, onSuccess) => dispatch => {
    API.machine().update(id, input)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.MACHINE_UPDATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    API.machine().delete(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.MACHINE_DELETE,
                payload: res.data.id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
