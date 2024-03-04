import { createFeatureSelector, createSelector, props } from "@ngrx/store";
import { postsState } from "./post.state";
export const POST_STATE_NAME= 'post';
const getPostState = createFeatureSelector<postsState>(POST_STATE_NAME);

export const getpost = createSelector(getPostState, (state) => {
    return state.posts;
})

export const getPostById = createSelector(getPostState, (state:any,props:any) => {
    console.log(props)
    return state.posts.find((post: { id: any; })=> post.id === props.id)
})