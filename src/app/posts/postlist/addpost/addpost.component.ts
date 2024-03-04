import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Posts } from 'src/app/model/posts.model';
import { AppState } from 'src/app/store/app.state';
import { addpostaction } from '../../state/post.action';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  postFrom!: FormGroup;
  constructor(private store: Store<AppState>) { }
  ngOnInit(): void {
    this.postFrom = new FormGroup({
      posttitle: new FormControl(null, [Validators.required]),
      postdescription: new FormControl(null, [Validators.required])
    })
  }


  onsubmit() {
    if (this.postFrom.valid) {
    console.log(this.postFrom.value)
      const post: Posts = {
        title: this.postFrom.value.posttitle,
        description: this.postFrom.value.postdescription,
        id: 'unique_id_here'
      }
      this.store.dispatch(addpostaction({post}))

  }
}

}
