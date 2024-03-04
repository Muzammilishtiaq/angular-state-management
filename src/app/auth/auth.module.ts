import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AUTH_STATE_NAME } from './state/auth.seletor';
import { AuthReducer } from './state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';
import { AuthService } from '../services/auth.service';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(AUTH_STATE_NAME,AuthReducer),
  ],
  providers: [
    provideHttpClient(),
  ],

})
export class AuthModule { }
