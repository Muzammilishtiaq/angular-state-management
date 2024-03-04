import { createAction, props } from "@ngrx/store";
import { Posts } from "src/app/model/posts.model";

// type
export const ADD_POST_ACTION = '[POST PAGE] ADD POST';
export const ADD_POST_SUCCESS = '[POST PAGES] ADD POST SUCCESS'
export const EDIT_POST_ACTION = '[POST PAGE] UPDATE POST';
export const EDIT_POST_SUCCESS='[POST PAGE] UPDATE POST SUCCESS'
export const DELETE_POST_ACTION = '[POST PAGE] DELETE POST';
export const DELETE_POST_SUCCESS = '[POST PAGE] DELETE POST SUCCESS';
export const LOAD_POST = '[POST PAGE] load post'
export const LOAD_POST_SUCCESS = '[POST PAGE] load post sucess'

// action function
export const addpostaction = createAction(ADD_POST_ACTION, props<{ post: Posts }>());
export const addpostsuccess = createAction(ADD_POST_SUCCESS,props<{ post: Posts }>())
export const editpost = createAction(EDIT_POST_ACTION, props<{ post: Posts }>());
export const editpostsuccess = createAction(EDIT_POST_SUCCESS, props<{ post: Posts[] }>());
export const deletepost = createAction(DELETE_POST_ACTION, props<{ id: string }>());
export const deletepostsuccess = createAction(DELETE_POST_SUCCESS, props<{ id: string }>());
export const loadpost = createAction(LOAD_POST);
export const loadpostsuccess = createAction(LOAD_POST_SUCCESS, props<{ posts: Posts[] }>());