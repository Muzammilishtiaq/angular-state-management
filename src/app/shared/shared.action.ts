import { createAction, props } from "@ngrx/store";
import { initialState } from "./shared.state";

export const SET_LOADING_ACTION = '[share state] set loading spinner';
export const ERROR_MESSAGE_ACTION='[share loading] set message error';

export const setloadingaction = createAction(SET_LOADING_ACTION, props<{ status: boolean }>())
export const seterrormessage=createAction(ERROR_MESSAGE_ACTION,props<{message:string}>())