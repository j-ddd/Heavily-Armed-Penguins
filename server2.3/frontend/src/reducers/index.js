import { combineReducers } from "redux";
import { map } from "./map";
import { user } from "./user";
import { machine } from "./machine";
import { builder } from "./builder";

export const reducers = combineReducers({
    user, machine, builder
})
