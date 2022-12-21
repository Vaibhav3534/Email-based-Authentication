import { Types } from "./actionType";

const initialState ={
    isLoggedIn:false
}

const reducer = (state = initialState, action)=>{
    switch (action.type){
        case Types.LOGIN:
            return {
                ...state,
                isLoggedIn:true
            }
        default:
            return state
    }
}

export default reducer