import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginstart } from '../state/auth.action';
import { AppState } from 'src/app/store/app.state';
import { setloadingaction } from 'src/app/shared/shared.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private store:Store<AppState>){}
  loginform!: FormGroup;
  // validemail=this.loginform.get('loginemail');
  // validpassword=this.loginform.get('loginpassword');
  ngOnInit(): void {
    this.loginform=new FormGroup({
      loginemail: new FormControl('', [Validators.required,Validators.email]),
      loginpassword:new FormControl('',[Validators.required,Validators.maxLength(30)])
    })
  }
  loginsubmit(){
    console.log(this.loginform.value)
    const email= this.loginform.value.loginemail;
    const password= this.loginform.value.loginpassword;
    this.store.dispatch(setloadingaction({status:true}))
    this.store.dispatch(loginstart({email,password}))
    this.loginform.reset()
  }
}
