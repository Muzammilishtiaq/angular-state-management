import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user.model";

// type is upper letter
export const LOGIN_START = '[AUTH PAGE] login start';
export const LOGIN_SUCCESS = '[AUTH PAGE] login success';
export const LOGIN_FAIL = '[AUTH PAGE] login fail';

export const SIGNUP_START = '[AUTH PAGE] LOGIN START';
export const SIGNUP_SUCCESS = '[AUTH PAGE] LOGIN SUCCESS';

export const AUTO_LOGIN_ACTION='[auth page] auto login'
export const LOGOUT_ACTION='[auth page] logout '

export const loginstart = createAction(LOGIN_START, props<{ email: string; password: string }>());
export const loginsuccess = createAction(LOGIN_SUCCESS, props<{ user: User; redirect: boolean }>());
export const signupStart = createAction(SIGNUP_START, props<{ email: string; password: string }>());
export const signupSuccess = createAction(SIGNUP_SUCCESS, props<{ user: User;redirect:boolean }>());
export const autologinaction=createAction(AUTO_LOGIN_ACTION,)
export const autologout=createAction(LOGOUT_ACTION)