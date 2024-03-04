import { createReducer, on } from "@ngrx/store";
import { initialState } from "./post.state";
import { addpostsuccess, deletepost, editpost, editpostsuccess, loadpostsuccess } from "./post.action";

const _postReducer = createReducer(initialState,
    on(addpostsuccess, (state, action) => {
        let post = { ...action.post };
        return {
            ...state,
            posts: [...state.posts, post],
        }
    }),
    on(editpostsuccess, (state, action) => {
        const editpost = state.posts.map((post) => {
            return action.post.id === post.id ? action.post : post
        })
        return {
            ...state,
            posts: editpost,
        }
    }),
    on(deletepost, (state, { id }) => {
        const updatepost = state.posts.filter((post) => {
            return post.id !== id;
        })
        return {
            ...state,
            posts: updatepost,
        }
    }),
    on(loadpostsuccess, (state, action) => {
        return {
            ...state,
            posts: action.posts
        }
    })
);

export function postReducer(state: any, action: any) {
    return _postReducer(state, action);
}