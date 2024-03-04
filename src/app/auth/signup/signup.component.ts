import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signupStart } from '../state/auth.action';
import { setloadingaction } from 'src/app/shared/shared.action';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private store:Store<AppState>){}
 sigupform!: FormGroup;

 ngOnInit(): void {
   this.sigupform=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
   })
 }

 onsubmit(){if (!this.sigupform.valid) {
  return
 }
const email= this.sigupform.value.email;
const password= this.sigupform.value.password;
this.store.dispatch(signupStart({email,password}));
this.store.dispatch(setloadingaction({status:true}));
}

}
