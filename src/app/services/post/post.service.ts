import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Posts } from 'src/app/model/posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  getpost(): Observable<Posts> {
    return this.http.get<Posts>(`https://muzammil-ishtiaq-default-rtdb.firebaseio.com/post.json`)
      .pipe(map((data) => {
        const posts: Posts[] = []
        for (let key in data) {
          posts.push({ ...data[key], id: key })
        }
        return posts;
      }))
  }
  addpost(post: Posts):Observable<{name:string}> {
    return this.http.post<{name:string}>('https://muzammil-ishtiaq-default-rtdb.firebaseio.com/post.json',post)
  }

  updatePost(post:Posts){
    const postdata={
      [post.id]:{title:post.title,description:post.description},
    }
    return this.http.patch('https://muzammil-ishtiaq-default-rtdb.firebaseio.com/post.json',postdata)
  }

  deletepost(id:string){
    return this.http.delete(`https://muzammil-ishtiaq-default-rtdb.firebaseio.com/post/${id}.json`);
  }
}
