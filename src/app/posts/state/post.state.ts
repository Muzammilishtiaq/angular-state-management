import { Posts } from "src/app/model/posts.model";

export interface postsState {
    posts: Posts[];
}

export const initialState:postsState = {
    posts: [],
}