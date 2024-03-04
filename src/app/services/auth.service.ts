import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../model/AuthResponseData.model';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { autologout } from '../auth/state/auth.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  timeoutinterval: any;
  constructor(private http: HttpClient, private router: Router,private store:Store) { }
  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=sigin`,
      { email, password, returnSecureToken: true }
    );
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=suapi`,
      { email, password, returnSecureToken: true }
    );
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );
    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userdata', JSON.stringify(user))
    this.runtimeinterval(user)
  }

  runtimeinterval(user: User) {
    const todatdate = new Date().getTime();
    const expirationDate = user.expirateDate.getTime();
    const timeinterval = expirationDate - todatdate;
    this.timeoutinterval = setTimeout(() => {
this.store.dispatch(autologout())
    }, timeinterval);
  }
  getUserfromInLocalStorage() {
    const userdatastring = localStorage.getItem('userdata');
    if (userdatastring) {
      const userdata = JSON.parse(userdatastring)
      const expirationDate = new Date(userdata.expirationDate)
      const user = new User(
        userdata.email,
        userdata.token,
        userdata.localId,
        expirationDate
      )
      this.runtimeinterval(user)
      return user;

    }
    return null;
  }
  logout(){
    localStorage.removeItem('userdata');
    if (this.timeoutinterval) {
      clearTimeout(this.timeoutinterval);
      this.timeoutinterval=null;
    }
  }
}
