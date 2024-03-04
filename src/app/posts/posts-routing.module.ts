import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostlistComponent } from './postlist/postlist.component';
import { AddpostComponent } from './postlist/addpost/addpost.component';
import { EditpostComponent } from './postlist/editpost/editpost.component';

const routes: Routes = [
  {
    path: '',
    component: PostlistComponent,
    children: [
      {
        path: 'add-post',
        component: AddpostComponent
      },
      {
        path:'edit/:id',
        component:EditpostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
