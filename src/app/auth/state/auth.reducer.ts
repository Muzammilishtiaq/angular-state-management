import { createReducer, on } from "@ngrx/store"
import { initialState } from "./auth.state"
import { autologout, loginsuccess, signupSuccess } from "./auth.action"


const _Auth_Reducer= createReducer(initialState,
    on(loginsuccess, (state,action)=>{
        return{
            ...state,
            user:action.user,
        }
    }),on(signupSuccess,(state,action)=>{
        return {
            ...state,
            user:action.user
        }
    }),
    on(autologout,(state,action)=>{
        return{
            ...state,
            user:null
        }
    })
    )
export function AuthReducer(state:any,action:any){
    return _Auth_Reducer(state,action)
}