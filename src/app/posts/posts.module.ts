import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostlistComponent } from './postlist/postlist.component';
import { AddpostComponent } from './postlist/addpost/addpost.component';
import { EditpostComponent } from './postlist/editpost/editpost.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { postReducer } from './state/post.reducer';
import { POST_STATE_NAME } from './state/post.selector';
import { EffectsModule } from '@ngrx/effects';
import { postEffect } from './state/post.effect';


@NgModule({
  declarations: [
    PostlistComponent,
    AddpostComponent,
    EditpostComponent
  ],
  imports: [
    StoreModule.forFeature(POST_STATE_NAME,postReducer),
    EffectsModule.forFeature([postEffect]),
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PostsModule { }
