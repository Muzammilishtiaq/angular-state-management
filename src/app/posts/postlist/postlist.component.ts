import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Posts } from 'src/app/model/posts.model';
import { AppState } from 'src/app/store/app.state';
import { getpost } from '../state/post.selector';
import { deletepost, loadpost} from '../state/post.action';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit {
  posts!: Observable<Posts[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.posts = this.store.select(getpost);
  }
  deletepost(id: string) {
    if (confirm('ARE YOU SURE YOU TO DELETE')) {
      this.store.dispatch(deletepost({ id }));
      console.log(this.store.dispatch(deletepost({ id })))
      this.store.dispatch(loadpost())
    }
  }
}
