import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment.prod';
import { Observable } from 'rxjs';
import { PostRes } from '../models/posts-res';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly http = inject(HttpClient);
  getAllPosts(limit: number, page: number): Observable<PostRes> {
    return this.http.get<PostRes>(
      environment.BASEURL + `posts?limit=${limit}&page=${page}`
    );
  }
  createPost(formData: FormData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      environment.BASEURL + `posts`,
      formData
    );
  }
}
