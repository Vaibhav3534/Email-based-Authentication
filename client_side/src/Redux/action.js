import { type } from "os"

export const IS_LOGIN = "IS_LOGIN"

export const isLogin = (obj) =>({
    type:IS_LOGIN,
    payload:obj
})