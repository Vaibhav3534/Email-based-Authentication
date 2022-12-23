import { Types } from "./actionType";

// export const Action ={
//     login: (user)=>({type:Types.LOGIN, payload:{user}})
// }

export const login =()=>{
    return {
        type:"LOGIN"
    }
}