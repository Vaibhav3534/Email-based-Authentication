import { Types } from "./actionType";

export const Action ={
    login: (user)=>({type:Types.LOGIN, payload:{user}})
}