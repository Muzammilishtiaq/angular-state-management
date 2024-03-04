import { createReducer, on } from '@ngrx/store';
import { initalState } from './counter.state'
import { changechannelname, customCounter, decrement, increment, reset } from './counter.action';


const _counterReducer = createReducer(initalState,
    on(increment, (state) => {
        return {
            ...state,
            counter: state.counter + 1,
        };
    }),
    on(decrement, (state) => {
        return {
            ...state,
            counter: state.counter - 1,
        };
    }),
    on(reset, (state) => {
        return {
            ...state,
            counter: 0,
        }
    }),
    on(customCounter, (state,action) => {
        return {
            ...state,
            counter: state.counter + action.count
        }
    }),
    on(changechannelname,state=>{
        return{
            ...state,
            channelName:'muzammil',
        }
    })
);
export function counterReducer(state: any, action: any) {
    return _counterReducer(state, action);
}