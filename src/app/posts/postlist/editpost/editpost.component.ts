import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getPostById } from '../../state/post.selector';
import { Posts } from 'src/app/model/posts.model';
import { Subscription } from 'rxjs';
import { editpost } from '../../state/post.action';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit, OnDestroy {
  editpostfrom!: FormGroup;
  post!: Posts;
  postSubscription: Subscription = new Subscription;
  constructor(private router: ActivatedRoute, private store: Store,private route:Router) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      const id = param.get('id');
      this.postSubscription = this.store.select(getPostById, { id }).subscribe((data) => {
        this.post = data;
        this.createform();
      })
      console.log(this.post)
    })
  }

  createform() {
    this.editpostfrom = new FormGroup({
      editposttitle: new FormControl(this.post.title, [Validators.required]),
      editpostdescription: new FormControl(this.post.description, [Validators.required])
    })
  }

  editsubnmit() {
    if (!this.editpostfrom.valid) {
      return;
    }
      const title = this.editpostfrom.value.editposttitle;
      const description = this.editpostfrom.value.editpostdescription;
      const post: Posts = {
        id: this.post.id,
        title,
        description
      }
      console.log(post)
     this.store.dispatch(editpost({ post }));
     this.route.navigate(['/post']);
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
