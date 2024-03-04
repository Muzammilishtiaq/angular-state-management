import { createReducer, on } from "@ngrx/store";
import { initialState } from "./shared.state";
import { seterrormessage, setloadingaction } from "./shared.action";

const _sharedReducer = createReducer(initialState,
    on(setloadingaction,(state,action)=>{
return{
    ...state,
    showLoading:action.status
}
    }),
    on(seterrormessage, (state,action)=>{
        return{
            ...state,
            errorMessage:action.message
        }
    })
    )
export function sharedReducer(state: any, action: any) {
    return _sharedReducer(state, action)
}