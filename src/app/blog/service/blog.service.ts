import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostBlog } from '../model/post-blog';
import { Comment } from '../model/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private url = 'https://jsonplaceholder.typicode.com/';

  public page!: number;
  public itemsPerPage = 10;
  public totalItems!: number;

  constructor(private http: HttpClient) {}

  getData(): Observable<PostBlog[]> {
    return this.http.get<PostBlog[]>(
      `${this.url}posts?page=${1}&size=${this.itemsPerPage}`
    );
  }

  getPostById(id: string | null): Observable<PostBlog> {
    return this.http.get<PostBlog>(`${this.url}posts/${id}`);
  }

  addPost(postBlog: PostBlog): Observable<PostBlog> {
    return this.http.post<PostBlog>(`${this.url}posts`, postBlog);
  }

  editPost(id: string | null, postEdit: PostBlog): Observable<PostBlog> {
    return this.http.put<PostBlog>(`${this.url}posts/${id}`, postEdit);
  }

  getCommentsById(postId: string | null): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.url}posts/${postId}/comments`);
  }

  addComments(id: string | null, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.url}posts/${id}/comments`, comment);
  }

  getPage(page: number) {
    return this.http.get<PostBlog[]>(
      `${this.url}posts?page=${page}&size=${this.itemsPerPage}`
    );
  }
}
