import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getErrorMessage, getloading } from './shared/shared.selector';
import { AppState } from './store/app.state';
import { autologinaction } from './auth/state/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'state-management';
  showLoading!: Observable<boolean>;
  errorMessage!: Observable<string>;
  constructor(private store: Store<AppState>){}
ngOnInit(): void {
  this.showLoading = this.store.select(getloading);
  this.errorMessage=this.store.select(getErrorMessage)
  this.store.dispatch(autologinaction())
}
}
