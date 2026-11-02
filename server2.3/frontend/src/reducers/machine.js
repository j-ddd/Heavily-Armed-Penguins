import { ACTION_TYPES } from "../actions/machine";

const initialState = {
    machines: [],
    metaMachine: {}
}

export const machine = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.MACHINE_FETCH_ALL:
            return {
                ...state,
                machines: [...action.payload]
            }
        case ACTION_TYPES.MACHINE_CREATE:
            return {
                ...state,
                machines: [...state.machines, action.payload]
            }
        case ACTION_TYPES.MACHINE_UPDATE:
            return {
                ...state,
                machines: state.machines.map(x => x.id === action.payload.id ? action.payload : x)
            }
        case ACTION_TYPES.MACHINE_DELETE:
            return {
                ...state,
                machines:state.machines.filter(x => x.id !== action.payload)
            }
        case ACTION_TYPES.MACHINE_PAGINATION:
            return {
                ...state,
                machines: [...action.payload.machines],
                metaMachine: action.payload.meta
            }
        default:
            return state;
    }
}
