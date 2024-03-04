import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostService } from "src/app/services/post/post.service";
import { EDIT_POST_ACTION, addpostaction, addpostsuccess, deletepost, deletepostsuccess, editpost, editpostsuccess, loadpost, loadpostsuccess } from "./post.action";
import { map, mergeMap, of, switchMap } from "rxjs";

@Injectable()
export class postEffect {
    constructor(private action$: Actions, private postservice: PostService) { }
    addpost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(addpostaction),
            mergeMap((action) => {
                return this.postservice.addpost(action.post).pipe(
                    map((data) => {
                        console.log(data)
                        const post={...action.post,id:data.name};
                      return addpostsuccess({post});
                    })
                )
            })
        )
    })
    loadpost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loadpost),
            mergeMap((action) => {
                return this.postservice.getpost().pipe(
                    map((posts) => {
                        return loadpostsuccess({ posts });
                    })
                )
            })
        )
    })

    updatepost$=createEffect(()=>{
        return this.action$.pipe(
            ofType(editpost),
            switchMap((action)=>{
                return this.postservice.updatePost(action.post).pipe(map((data)=>{
                    return editpostsuccess({post:action.post})
                }))
            })
        )
    })

    deletepost$=createEffect(()=>{
        return this.action$.pipe(
            ofType(deletepost),
            switchMap((action)=>{
                return this.postservice.deletepost(action.id).pipe(map((data)=>{
                    return deletepostsuccess({id:action.id})
                }))
            })
        )
    })

}