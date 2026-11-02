import { ACTION_TYPES } from "../actions/builder";

const initialState = {
    builders: [],
    metaBuilder: {}
}

export const builder = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.MACHINE_FETCH_ALL:
            return {
                ...state,
                builders: [...action.payload]
            }
        case ACTION_TYPES.MACHINE_CREATE:
            return {
                ...state,
                builders: [...state.builders, action.payload]
            }
        case ACTION_TYPES.MACHINE_UPDATE:
            return {
                ...state,
                builders: state.builders.map(x => x.id === action.payload.id ? action.payload : x)
            }
        case ACTION_TYPES.MACHINE_DELETE:
            return {
                ...state,
                builders:state.builders.filter(x => x.id !== action.payload)
            }
        case ACTION_TYPES.MACHINE_PAGINATION:
            return {
                ...state,
                builders: [...action.payload.builders],
                metaBuilder: action.payload.meta
            }
        default:
            return state;
    }
}
