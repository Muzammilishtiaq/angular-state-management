import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { autologinaction, autologout, loginstart, loginsuccess, signupStart, signupSuccess } from "./auth.action";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { Store } from "@ngrx/store";
import { seterrormessage, setloadingaction } from "src/app/shared/shared.action";
import { Router } from "@angular/router";

@Injectable()

export class AuthEffects {
    constructor(
        private action$: Actions,
        private authservice: AuthService,
        private store: Store,
        private router: Router) { };

    login$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loginstart),
            exhaustMap((action) => {
                return this.authservice.login(action.email, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(setloadingaction({ status: false }));
                        this.store.dispatch(seterrormessage({ message: '' }));
                        const user = this.authservice.formatUser(data);
                        this.authservice.setUserInLocalStorage(user);
                        return loginsuccess({ user, redirect: true });
                    }),
                    catchError((errResp) => {
                        this.store.dispatch(setloadingaction({ status: false }));
                        const errorMessage = this.authservice.getErrorMessage(
                            errResp.error.error.message
                        );
                        return of(seterrormessage({ message: errorMessage }));
                    })
                );
            })
        );
    });

    loginRedirect$ = createEffect(
        () => {
            return this.action$.pipe(
                ofType(...[loginsuccess, signupSuccess]),
                tap((action) => {
                    this.store.dispatch(seterrormessage({ message: '' }));
                    if (action.redirect) {
                        this.router.navigate(['/']);
                    }
                })
            );
        },
        { dispatch: false }
    );

    signUp$ = createEffect(() => {
        return this.action$.pipe(
            ofType(signupStart),
            exhaustMap((action) => {
                return this.authservice.signUp(action.email, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(setloadingaction({ status: false }));
                        const user = this.authservice.formatUser(data);
                        this.authservice.setUserInLocalStorage(user);
                        return signupSuccess({ user, redirect: true });
                    }),
                    catchError((errResp) => {
                        this.store.dispatch(setloadingaction({ status: false }));
                        const errorMessage = this.authservice.getErrorMessage(
                            errResp.error.error.message
                        );
                        return of(seterrormessage({ message: errorMessage }));
                    })
                );
            })
        );
    });

    autologin$=createEffect(()=>{
        return this.action$.pipe(
            ofType(autologinaction),
            mergeMap((action)=>{
           const user=this.authservice.getUserfromInLocalStorage();
               return of(loginsuccess({user, redirect: true }));
            })
        )
    })

    autologout$=createEffect(()=>{
       return this.action$.pipe(
            ofType(autologout),
            map((action)=>{
                this.authservice.logout()
                this.router.navigate(['auth']);
            })
        )
    },{dispatch:false})

}